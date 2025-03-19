import { Obsidious } from "remark-obsidious";

interface Args {
    webPath: string;
}

export const fetchImageByWebPath = async ({ webPath }: Args) => {
    const meta = Obsidious.getFileForWebPathSlug(webPath);
    return fetch(`${import.meta.env.VITE_FILEPATH_PREFIX}${meta?.filepath}`)
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