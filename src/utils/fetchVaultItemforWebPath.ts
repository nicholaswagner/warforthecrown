import { ObsidiousVault, ObsidiousVaultItem, ObsidiousVaultImageFiletypes, slugify } from "remark-obsidious";
import { parseFrontmatter } from "./parseFrontmatter";

const SUPPORTED_FILETYPES = new Set(['md', ...ObsidiousVaultImageFiletypes]);

interface Args {
    webPath: string;
}

const notSupportedMessage = (vaultItem: ObsidiousVaultItem) => `
> [!error] view vaultfile by webpath in this context is not yet supported.
I need to add support for it... details below


${JSON.stringify(vaultItem)}

`

export const fetchVaultItemForWebPath = async ({ webPath }: Args) => {
    const vaultItem = ObsidiousVault.getFileForWebPathSlug(webPath);

    if (!vaultItem)
        throw new Error(`ObsidianVault was unable to find a VaultItemID for: ${webPath}`);

    if (vaultItem.fileType !== 'file')
        throw new Error(`requested vaultitem for ${webPath} is not a 'file' and can not be fetched`);

    if (!vaultItem.extension) {
        throw new Error(`vaultItem for ${webPath} either does not have an extension or is not supported: ${vaultItem.extension}`);
    }

    if (vaultItem.extension === "md") {
        return fetch(`${import.meta.env.VITE_FILEPATH_PREFIX}${vaultItem?.filepath}`)
            .then((res) => res.text())
            .then((text) => {
                const matter = parseFrontmatter(text);
                return { text, matter };
            })
            .catch((err) => {
                throw new Error(`Failed to fetch markdown designed in hash from cdn prefix`, err);
            });
    }
    else if (SUPPORTED_FILETYPES.has(vaultItem.extension)) {
        const text = `> [!bug] This is a buuuuuug!
        ![[${slugify(vaultItem.label)}]]`;
        return { text, matter: {} };
    }
    else {
        return { text: notSupportedMessage(vaultItem), matter: {} };
    }
}; 