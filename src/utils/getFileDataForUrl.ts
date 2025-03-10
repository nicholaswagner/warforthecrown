import data from '../assets/files.json';
import { getFlatFileTree } from './getFlatFileTree';


export const getFileMetaForId = (id: string) => {
    const files = getFlatFileTree(data)
    const file = files.find((item) => item.id === id);
    if (!file) return null;
    return file;
}

export const getFileMetaForSlug = (slug: string) => {
    const files = getFlatFileTree(data);
    const file = files.find((item) => item.slug === slug);
    if (!file) return null;
    return file;
}

export const getFileMetaForPathSlug = (pathSlug: string) => {
    // if (pathSlug[0] === '/') pathSlug = pathSlug.slice(1);
    const baseless = pathSlug.replace(/\/warforthecrown\//, '');
    const files = getFlatFileTree(data);
    const file = files.find((file) => file.pathSlug === baseless);
    return file ?? null;
}