#!/usr/bin/env -S npx tsx

import fs, { Dirent, readFileSync } from 'fs';
import path from 'path';

import hash from '../src/lib/hash';
import { slugify } from '../src/lib/slugifyString';
import { FileTreeNode } from '../src/types/FileTreeNode';

const targetDir = process.argv[2];
const list: Dirent[] = [];

export const getGitIgnorables = (filePath: string): string[] => {

  try {
    const fileContent = readFileSync(filePath, "utf8");
    // Process lines: trim, remove comments, and empty lines
    const entries = fileContent
      .split("\n")
      .map(line => line.trim()) // Remove extra spaces
      .filter(line => line && !line.startsWith("#")); // Remove empty & comment lines
    return entries;
  } catch (error) {
    console.error("Error reading .gitignore file:", error);
    return [];
  }
};

// Only very very minimal support right now.  Just reads the .gitignore file and returns the entries
const mask = getGitIgnorables(`${targetDir}/.gitignore`).join(' ').trim();

function getFileExtension(filePath: string): string {
  const lastDotIndex = filePath.lastIndexOf('.');  // Find the last occurrence of the dot in the file path
  // If no dot assume its a folder
  if (lastDotIndex === -1) {
    return 'folder';
  }

  return filePath.substring(lastDotIndex + 1);
}


const filterIgnored = (files: Dirent[]) => {
  return files.filter((file) => {
    if (file.name.startsWith('.')) return false; // no hidden files
    if (mask.includes(file.name)) return false; // no ignored files
    if (file.name === 'files.json') return false; // no generated files
    else return true;
  });
};


async function getTargetDirents(targetDir: string, basePath: string = '') {
  const ents = await fs.promises.readdir(targetDir, { withFileTypes: true });
  const filtered = filterIgnored(ents); // remove hidden and ignored files

  for (const ent of filtered) {
    const currentPath = basePath ? `${basePath}/${ent.name}` : ent.name;
    list.push(ent);

    if (ent.isDirectory()) {
      await getTargetDirents(`${targetDir}/${ent.name}`, currentPath);
    }
  }
}



function buildFileTree() {
  const counter: Record<string, number> = {};

  const root: FileTreeNode = { label: '', slug: '', path: '', pathSlug: '', type: '', id: '', children: [] };
  for (const ent of list) {
    const { name: filename, parentPath } = ent;
    // Note - adjusts the filepath to be relative to the root of where this script gets executed
    const relativePath = path.relative(process.argv[2], parentPath);
    const absoluteFilePath = relativePath ? `${relativePath}/${filename}` : filename;

    const components = absoluteFilePath.split('/');
    let current = root;
    components.forEach((component, index) => {
      const isFile = index === components.length - 1;
      const existingChild = current.children?.find((child) => child.label === component);

      if (!existingChild) {
        const type = getFileExtension(component);
        const label = type === 'md' ? component.slice(0, -3) : component;
        const newPath = `${current.path}${index > 0 ? '/' : ''}${component}${isFile ? '' : '/'}`;
        const newPathSlug = slugify(newPath);
        const newChild: FileTreeNode = {
          type: type,
          label: label,
          slug: slugify(label),
          path: newPath,
          pathSlug: type === 'md' ? newPathSlug.slice(0, -3) : newPathSlug,
          children: isFile ? undefined : [],
          id: hash(newPath),
        };

        if (!counter[type]) counter[type] = 0;
        counter[type]++;

        if (!current.children) {
          current.children = [];
        }
        current.children.push(newChild);

        if (!isFile) {
          current = newChild;
        }

      } else {
        if (!isFile && !existingChild.children) {
          existingChild.children = [];
        }
        current = existingChild;
      }
    });
  }
  console.log('//////////////////////////');
  Object.entries(counter).forEach(([key, value]) => {
    console.log(`Found ${value} ${key} files`);
  });
  return root.children || [];
}

async function runScript() {
  try {
    await getTargetDirents(targetDir);

    // // builds and exports a list of permalinks for linking
    // const permalinks = list.filter((ent) => !ent.isDirectory()).map((ent) => {
    //   const currentPath = path.relative(process.argv[2], ent.parentPath);
    //   const p = currentPath ? `${currentPath}/${ent.name}` : ent.name
    //   return { id: slugify(ent.name), url: p };
    // });

    const outLocation = process.argv[2];
    // await fs.promises.writeFile(`${outLocation}/permalinks.json`, JSON.stringify(permalinks, null, 2) + '\n');

    console.log('Building file tree ...');
    // builds and exports the file tree json
    const tree = buildFileTree();
    const output = JSON.stringify(tree, null, 2);
    await fs.promises.writeFile(`${outLocation}/files.json`, output + '\n');


    console.log(`File tree built and saved to ${outLocation}/files.json`);

  } catch (error) {
    console.error("Error during script execution:", error);
  }
}

runScript();