import { CDN_PREFIX } from "../AppConstants";
import { getFileByLabelSlug } from "./getFileByLabelSlug";
// import { getFileMetaForId, getFileMetaForPathSlug } from "./getFileDataForUrl";
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
export const fetchMarkdown = async ({ pathname }: Args) => {
    const fileMeta = getFileByLabelSlug(pathname);
    if (!fileMeta) {
        throw new Error(`The file requested in the URL above could not be located in the hashfile: ${pathname}`);
    }
    return fetch(`${CDN_PREFIX}${fileMeta?.filepath}`)
        .then((res) => res.text())
        .then((result) => {
            const matter = parseFrontmatter<Matter>(result);
            return { markdown: result, matter };
        })
        .catch((err) => {
            throw new Error(`Failed to fetch markdown using ${pathname} `, err);
        });
} 