// import { FileTreeNode } from "../types/FileTreeNode";

// export const getFlatFileTree = (tree: FileTreeNode[]): FileTreeNode[] =>
//     tree.flatMap((node: FileTreeNode): FileTreeNode[] => {
//         const { children = [], ...rest } = node
//         return [{ ...rest }, ...getFlatFileTree(children)]
//     });