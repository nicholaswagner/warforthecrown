import extractMarkdownHeaderContent from "../utils/extractMarkdownHeaderContent";
import { fetchMarkdownById } from "../utils/fetchMarkdownById"


const useEmbeddedMarkdown = async (fileId: string, hashSlug: string) => {
    const { text } = await fetchMarkdownById(fileId);
    const result = hashSlug === '' ? text : extractMarkdownHeaderContent(text, hashSlug);
    return result;
}

export default useEmbeddedMarkdown;