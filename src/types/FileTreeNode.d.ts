export type FileTreeNode = {
    children?: FileTreeNode[];
    extension?: string; // file extension no dot, undefined for folders
    filepath: string;
    fileType?: 'file' | 'folder' | 'symlink';
    id: string; // hash of the raw filepath including file+extension to ensure uniqueness
    label: string; // the raw file/folder name that the user uses on their local filesystem
    labelSlug: string; // slugified version of the label
    webPath: string;
}