import { CDN_PREFIX } from "../AppConstants";
import { getFileMetaForId, getFileMetaForPathSlug } from "./getFileDataForUrl";
import { parseFrontmatter } from "./parseFrontmatter";

type Matter = {
    title?: string;
    date?: string;
    tags?: string;
};

interface Args {
    pathname: string;
    id?: string;
}
export const fetchMarkdown = async ({ pathname, id }: Args) => {
    const fileMeta = id ? getFileMetaForId(id) : getFileMetaForPathSlug(pathname);
    if (!fileMeta) {
        throw new Error(`No file meta found for path: ${pathname}`);
    }
    return fetch(`${CDN_PREFIX}${fileMeta?.path}`)
        .then((res) => res.text())
        .then((result) => {
            const matter = parseFrontmatter<Matter>(result);
            return { markdown: result, matter };
        })
        .catch((err) => {
            throw new Error(`Failed to fetch markdown using ${pathname} `, err);
        });
} 