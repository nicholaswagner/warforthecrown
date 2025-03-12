import extractMarkdownHeaderContent from "../utils/extractMarkdownHeaderContent";
import { fetchMarkdownById } from "../utils/fetchMarkdownById"


const useEmbeddedMarkdown = async (fileId: string, hashSlug: string) => {
    const { text } = await fetchMarkdownById(fileId);
    return hashSlug === '' ? text : extractMarkdownHeaderContent(text, hashSlug);
}

export default useEmbeddedMarkdown;