export type FileTreeNode = {
    id: string;
    label: string;
    path: string;
    slug: string;
    pathSlug: string;
    type: string;
    children?: FileTreeNode[];
};