import { CDN_PREFIX } from "../AppConstants";
import { getFileByWebPath } from "./getFileByLabelSlug";

interface Args {
    webPath: string;
}

export const fetchImageByWebPath = async ({ webPath }: Args) => {
    const meta = getFileByWebPath(webPath);
    return fetch(`${CDN_PREFIX}${meta?.filepath}`)
        .then((response) => response.blob())
        .then((blob) => ({
            meta,
            src: URL.createObjectURL(blob)
        })
        )
        .catch((err) => {
            throw new Error(`Failed to fetch markdown using ${webPath} `, err);
        });
} 