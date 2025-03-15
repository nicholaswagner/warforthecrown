import { getFileByWebPath } from "./getFileByLabelSlug";
import { parseFrontmatter } from "./parseFrontmatter";


interface Args {
    webPath: string;
}
export const fetchMarkdownForWebPath = async ({ webPath }: Args) => {
    const fileMeta = getFileByWebPath(webPath);
    if (!fileMeta) {
        throw new Error(`This url path does not have an associated file in the lookup table: ${webPath}`);
    }
    return fetch(`${import.meta.env.VITE_FILEPATH_PREFIX}${fileMeta?.filepath}`)
        .then((res) => res.text())
        .then((text) => {
            const matter = parseFrontmatter(text);
            return { text, matter };
        })
        .catch((err) => {
            throw new Error(`Failed to fetch markdown designed in hash from cdn prefix`, err);
        });
} 