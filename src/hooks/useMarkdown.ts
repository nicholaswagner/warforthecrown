import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { remarkObsidious } from 'remark-obsidious';
import { MarkdownComponents } from "../components/MarkdownComponent/MarkdownComponents";







const useMarkdown = (text: string) => {
    const options: Options = {
        remarkPlugins: [remarkGfm, remarkObsidious],
        className: "markdown",
        components: MarkdownComponents,
        // disallowedElements: [],
        // allowedElements: [],
        children: text,
    }


    const result = MarkdownHooks(options);

    return result;
}
export default useMarkdown;