import files_hash from '../assets/files_hash.json';
import type { FileTreeNode } from '../types/FileTreeNode';


type Lookup = {
    byLabelSlug: Record<string, string>;
    byWebPath: Record<string, string>;
    byId: Record<string, FileTreeNode>;
    getAllImageIds: string[];
};

export const getFileById = (id: string) => Lookup.byId[id];
export const getFileByLabelSlug = (labelSlug: string) => getFileById(Lookup.byLabelSlug[labelSlug]);
export const getFileByWebPath = (webPath: string) => getFileById(Lookup.byWebPath[webPath]);
export const getFilesByExtension = (ext: string[]) => Object.values(Lookup.byId).filter((file) => (file.extension && ext.includes(file.extension)));
export const getAllImageIds = () => Lookup.getAllImageIds;

const Lookup = files_hash as unknown as Lookup;


const useHashLookup = () => {
    return { getFileById, getFileByLabelSlug, getFileByWebPath, getFilesByExtension, getAllImageIds };
}

export default useHashLookup;