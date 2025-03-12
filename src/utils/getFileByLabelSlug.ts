import files_hash from '../assets/files_hash.json';
import type { FileTreeNode, } from '../types/FileTreeNode';

type Lookup = {
    byId: Record<string, FileTreeNode>;
    byLabelSlug: Record<string, string>;
    byWebPath: Record<string, string>;
    imageIDs: string[];
};

const Lookup = files_hash as unknown as Lookup;

export const getFileById = (id: string) => Lookup.byId[id];
export const getFileByLabelSlug = (labelSlug: string) => getFileById(Lookup.byLabelSlug[labelSlug]);
export const getFileByWebPath = (webPath: string) => getFileById(Lookup.byWebPath[webPath]);
export const getFilesByExtension = (ext: string[]) => Object.values(Lookup.byId).filter((file) => (file.extension && ext.includes(file.extension)));
export const getAllImageIds = () => Lookup.imageIDs;
