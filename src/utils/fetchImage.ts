import { CDN_PREFIX } from "../AppConstants";
import { getFileMetaForSlug } from "./getFileDataForUrl";

interface Args {
    path: string;
}
export const fetchImageForSlug = async ({ path }: Args) => {
    const fileMeta = getFileMetaForSlug(path);
    return fetch(`${CDN_PREFIX}${fileMeta?.path}`)
        .then((response) => response.blob())
        .then((blob) => ({
            meta: fileMeta,
            image: URL.createObjectURL(blob)
        }))
        .catch((err) => {
            throw new Error(`Failed to fetch markdown using ${path} `, err);
        });
} 