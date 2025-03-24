import { ObsidiousVault } from "remark-obsidious";

interface Args {
    webPath: string;
}

export const fetchImageByWebPath = async ({ webPath }: Args) => {
    const vaultItem = ObsidiousVault.getFileForWebPathSlug(webPath);
    const prefix = `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/");

    console.log('images/:: fetch url:', `${prefix}${vaultItem?.filepath}`);

    return fetch(`${prefix}${vaultItem?.filepath}`)
        .then((response) => {
            console.log('images/${webPath}:: response:', response);
            return response.blob()
        })
        .then((blob) => ({
            vaultItem,
            src: URL.createObjectURL(blob)
        }))
        .catch((err) => {
            console.log('--------')
            console.error('[ error ] :: error fetching image', err);
            throw new Error(`Failed to fetch markdown using ${webPath} `, err);
        });
} 