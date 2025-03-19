// #!/usr/bin/env -S npx tsx

// import yargs from 'yargs';
// import fs, { Dirent, readFileSync } from 'fs';
// import path from 'path';
// import hash from '../src/lib/hash'; // TODO - dont forget to include copyright and license notice for emotion-js for this
// import { slugify } from 'remark-obsidious'; // this creates a url safe slug from a string, its used by the webapp, filetree, and filehash
// // import { printTable } from './printTable'; // just a silly little table printer for the metrics

// import type { FileTreeNode } from '../src/types/FileTreeNode';

// type FileTree = {
//     tree: FileTreeNode[];
//     metrics: Record<string, number>;
// }

// const argv = await yargs(process.argv.slice(2))
//     .option('in', { type: 'string', demandOption: true, describe: 'The is the directory where we begin walking the file tree' })
//     .option('out', { type: 'string', demandOption: true, describe: 'This is the directory where the filetree and filehash files will be created' })
//     .option('nameTree', { type: 'string', demandOption: false, describe: 'Use a custom name for the resulting filetree.json' })
//     .option('nameHash', { type: 'string', demandOption: false, describe: 'Use a custom name for the resulting filehash.json' })
//     .option('ignore', { type: 'string', describe: 'path to gitignore which will filter the vault' })
//     .help()
//     .argv;

// // We dont want to try to capture any hidden .dotfiles or try to process any files that are in the gitignore
// const gitignorePath = argv.ignore || `${argv.vault}/.gitignore`;
// const gitignoreExists = fs.existsSync(gitignorePath)
// const mask = gitignoreExists ? readFileSync(gitignorePath, 'utf8').split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#')).join(' ').trim() : '';

// // 🐍_case is best case for files, if you don't agree you can override it ... but you're still wrong 🤪
// const treeFilepath = path.join(argv.out, argv.nameTree || 'files_tree.json');
// const hashFilepath = path.join(argv.out, argv.nameHash || 'files_hash.json');


// if (gitignoreExists) {
//     console.log('[ info ]: In addition to ignoring .dotfiles, the following .gitignore rules will be applied (if supported)');
//     console.log(mask.split(' '));
// }
// else {
//     console.log('[ info ]: no .gitignore found. will only ignore dotfiles this run.');
// }

// const filterIgnored = (files: Dirent[]) => {
//     return files.filter((file) => {
//         if (file.name.startsWith('.')) return false; // no hidden files
//         if (mask.includes(file.name)) return false; // no ignored files
//         else return true;
//     });
// };

// async function getTargetDirents(targetDir: string, basePath: string = ''): Promise<fs.Dirent[]> {
//     const ents = await fs.promises.readdir(targetDir, { withFileTypes: true });
//     const filtered = filterIgnored(ents); // remove hidden and ignored files
//     const result: fs.Dirent[] = [];
//     for (const ent of filtered) {
//         const currentPath = path.join(basePath, ent.name);
//         result.push(ent);
//         if (ent.isDirectory()) {
//             const subDirents = await getTargetDirents(path.join(targetDir, ent.name), currentPath);
//             result.push(...subDirents);
//         }
//     }
//     return result;
// }


// const getFileExtension = (filePath: string): string => path.extname(filePath).slice(1);

// const buildFileTree = (dirents: Dirent[]): FileTree => {
//     const metrics: Record<string, number> = {};

//     const root: FileTreeNode = { label: '', labelSlug: '', filepath: '', webPath: '', id: 'root', children: [] };

//     for (const ent of dirents) {
//         const { name: filename, parentPath } = ent;
//         const dirPath = path.relative(argv.in, parentPath);
//         const filepath = dirPath ? `${dirPath}/${filename}` : filename; // full file path including extension
//         const pathParts = filepath.split('/');
//         let current = root;

//         pathParts.forEach((part) => {
//             const isFile = ent.isFile();
//             const isDirectory = ent.isDirectory();
//             const existingChild = current.children?.find((child) => child.label === part);

//             if (!existingChild) {
//                 const fileType = isFile ? 'file' : isDirectory ? 'folder' : 'symlink'; // assume symlink for now since we wont be using those either
//                 const extension = getFileExtension(part) || undefined;
//                 const label = extension === 'md' ? part.slice(0, -3) : part;
//                 const newPath = path.join(current.filepath, part); // Joins file paths with OS-friendly separators
//                 const normalizedPath = path.normalize(newPath); // Normalize to remove any redundant slashes
//                 const webPath = slugify(normalizedPath);
//                 const fileNode: FileTreeNode = {
//                     children: isDirectory ? [] : undefined,
//                     extension,
//                     filepath: newPath,
//                     fileType,
//                     id: hash(newPath),
//                     label,
//                     labelSlug: slugify(label),
//                     webPath: extension === 'md' ? webPath.slice(0, -3) : webPath, // markdown files are extensionless in the byWebPath, everything else has their extension preserved (but still slugified).  This is to align with the obsidian.app behavior
//                 };

//                 if (extension) {
//                     if (!metrics[extension]) metrics[extension] = 0;
//                     metrics[extension]++;
//                 }

//                 if (!metrics[fileType]) metrics[fileType] = 0;
//                 metrics[fileType]++;

//                 current.children?.push(fileNode);

//                 if (!isFile) {
//                     current = fileNode;
//                 }

//             } else {
//                 if (!isFile && !existingChild.children) {
//                     existingChild.children = [];
//                 }
//                 current = existingChild;
//             }
//         });
//     }
//     return { tree: root.children || [], metrics };
// }


// //https://help.obsidian.md/file-formats
// const obsidianImageTypes = ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'];


// const buildHashTable = (tree: FileTreeNode[]) => {
//     const byId: Record<string, FileTreeNode> = {};
//     const byWebPath: Record<string, string> = {};
//     const byLabelSlug: Record<string, string> = {};
//     const getAllImageIds: string[] = []; // list of image id's

//     const traverse = (node: FileTreeNode) => {
//         const { children: _, ...rest } = node;
//         byId[node.id] = { ...rest };  // Create a shallow copy to avoid mutation of the original object
//         byWebPath[node.webPath] = node.id;
//         byLabelSlug[node.labelSlug] = node.id;
//         if (node.fileType === 'file' && node.extension) {
//             if (obsidianImageTypes.includes(node.extension)) getAllImageIds.push(node.id);
//         }
//         // delete byId[node.labelSlug].children; // Remove the children property to flatten
//         node.children?.forEach(traverse); // Continue traversing if needed
//     };
//     tree.forEach(traverse);
//     return { byId, byWebPath, byLabelSlug, getAllImageIds };
// }

// const dirents = await getTargetDirents(argv.in).catch((err) => {
//     console.error('\n[ Error ] encountered while attempting to map vault files:  ', err, '\n');
//     process.exit(1);
// });

// // Builds a FileTree object from the Dirent[] array first, then we build the hashTable from the tree
// const results = buildFileTree(dirents);

// fs.writeFileSync(treeFilepath, JSON.stringify(results.tree, null, 2));
// console.log(`[ info ]: file tree data has been saved as:    ${treeFilepath}`);

// const hashTable = buildHashTable(results.tree);
// fs.writeFileSync(hashFilepath, JSON.stringify(hashTable, null, 2));
// console.log(`[ info ]: file hash data has been saved as:    ${hashFilepath}`);


// // printTable(Object.entries(hashTable).map(([labelSlug, node]) => [`${labelSlug}`, `${JSON.stringify(node)}`]));
// // printTable([
// //     ['filetype', 'count'],
// //     ['file', results.metrics.file],
// //     ['folder', results.metrics.folder],
// //     ['symlink', results.metrics.symlink ?? 0],
// //     ...Object.entries(results.metrics).filter(([key]) => key !== 'file' && key !== 'folder' && key !== 'symlink')
// // ]);



