import data from '../assets/files.json';
import { getFlatFileTree } from './getFlatFileTree';

export const getAllFileMeta = () => {
    return getFlatFileTree(data);
}

export const getAllImageMeta = () => {
    return getFlatFileTree(data).filter(
        (node) =>
            node.type === 'png' || node.type === 'jpg' || node.type === 'jpeg',
    );
}