import { getFileByLabelSlug } from "./getFileByLabelSlug";

interface Args {
    labelSlug: string;
}

export const fetchImageByLabelSlug = async ({ labelSlug }: Args) => {
    const meta = getFileByLabelSlug(labelSlug);
    return fetch(`${import.meta.env.VITE_FILEPATH_PREFIX}${meta?.webPath}`)
        .then((response) => response.blob())
        .then((blob) => ({
            meta,
            image: URL.createObjectURL(blob)
        }))
        .catch((err) => {
            throw new Error(`Failed to fetch markdown using ${labelSlug} `, err);
        });
} 