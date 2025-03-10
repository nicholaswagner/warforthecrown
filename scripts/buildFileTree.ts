#!/usr/bin/env -S npx tsx

import yargs from 'yargs';

import fs, { Dirent, readFileSync } from 'fs';
import path from 'path';
import hash from '../src/lib/hash'; // TODO - dont forget to include copyright and license notice for emotion-js for this
import slugify from '../src/lib/slugify';




type FileTreeNode = {
    children?: FileTreeNode[];
    extension?: string; // file extension no dot, undefined for folders
    filepath: string;
    fileType?: 'file' | 'folder' | 'symlink';
    id: string; // hash of the raw filepath including file+extension to ensure uniqueness
    label: string; // the raw file/folder name that the user uses on their local filesystem
    labelSlug: string; // slugified version of the label
    webPath: string;

}

const argv = await yargs(process.argv.slice(2))
    .option('vault', { type: 'string', demandOption: true, describe: 'path to obsidian vault' })
    .option('output', { type: 'string', demandOption: true, describe: 'output path' })
    .option('ignore', { type: 'string', describe: 'path to gitignore which will filter the vault' })
    .help()
    .argv;


const gitignorePath = argv.ignore || `${argv.vault}/.gitignore`;
const gitignoreExists = fs.existsSync(gitignorePath)
const mask = gitignoreExists ? fs.readFileSync(gitignorePath, 'utf8').split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#')).join(' ').trim() : '';

// console.log('gitignorePath:', gitignorePath);
// console.log('gitignoreExists:', gitignoreExists);
console.log('[✎ note]: ', gitignoreExists ? '.gitignore will be used for vault files' : 'no .gitignore found will only ignore dotfiles this run.');

const filterIgnored = (files: Dirent[]) => {
    return files.filter((file) => {
        if (file.name.startsWith('.')) return false; // no hidden files
        if (mask.includes(file.name)) return false; // no ignored files
        else return true;
    });
};


async function getTargetDirents(targetDir: string, basePath: string = ''): Promise<fs.Dirent[]> {
    const ents = await fs.promises.readdir(targetDir, { withFileTypes: true });
    const filtered = filterIgnored(ents); // remove hidden and ignored files

    const result: fs.Dirent[] = [];

    for (const ent of filtered) {
        const currentPath = path.join(basePath, ent.name);
        result.push(ent);

        if (ent.isDirectory()) {
            const subDirents = await getTargetDirents(path.join(targetDir, ent.name), currentPath);
            result.push(...subDirents); // Append sub-directory contents
        }
    }

    return result;
}

const getFileExtension = (filePath: string): string => path.extname(filePath).slice(1);


type FileTree = {
    tree: FileTreeNode[];
    metrics: Record<string, number>;
}

const buildFileTree = (dirents: Dirent[]): FileTree => {
    const metrics: Record<string, number> = {};

    const root: FileTreeNode = { label: '', labelSlug: '', filepath: '', webPath: '', id: 'root', children: [] };

    for (const ent of dirents) {
        const { name: filename, parentPath } = ent;
        const dirPath = path.relative(argv.vault, parentPath);
        const filepath = dirPath ? `${dirPath}/${filename}` : filename; // full file path including extension
        const pathParts = filepath.split('/');

        let current = root;

        pathParts.forEach((part, index) => {
            // const isFile = index === pathParts.length - 1;
            const isFile = ent.isFile();
            const isDirectory = ent.isDirectory();
            const existingChild = current.children?.find((child) => child.label === part);

            if (!existingChild) {
                const fileType = isFile ? 'file' : isDirectory ? 'folder' : 'symlink'; // assume symlink for now since we wont be using those either
                const extension = getFileExtension(part) || undefined;
                const label = extension === 'md' ? part.slice(0, -3) : part;
                const newPath = path.join(current.filepath, part);
                const normalizedPath = path.normalize(newPath);
                const webPath = slugify(normalizedPath);
                const fileNode: FileTreeNode = {
                    children: isDirectory ? [] : undefined,
                    extension,
                    filepath: newPath,
                    fileType,
                    id: hash(newPath),
                    label,
                    labelSlug: slugify(label),
                    webPath: extension === 'md' ? webPath.slice(0, -3) : webPath, // markdown files should not have the .md extension in the webPath
                };

                if (extension) {
                    if (!metrics[extension]) metrics[extension] = 0;
                    metrics[extension]++;
                }

                if (!metrics[fileType]) metrics[fileType] = 0;
                metrics[fileType]++;

                // if (!current.children) {
                //     current.children = [];
                // }
                current.children?.push(fileNode);

                if (!isFile) {
                    current = fileNode;
                }

            } else {
                if (!isFile && !existingChild.children) {
                    existingChild.children = [];
                }
                current = existingChild;
            }
        });
    }
    return { tree: root.children || [], metrics };
}


const dirents = await getTargetDirents(argv.vault).catch((err) => {
    console.error('[!! Error] encountered while attempting to map vault files:  ', err);
    process.exit(1);
});
const results = buildFileTree(dirents);

fs.writeFileSync(argv.output, JSON.stringify(results.tree, null, 2));

console.log('File tree written to:', argv.output);

console.log('\nMetrics:');
console.log(JSON.stringify(results.metrics, null, 2));



