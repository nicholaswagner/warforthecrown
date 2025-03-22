import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { RemarkObsidious, Obsidious, ObsidiousOptions, slugify } from 'remark-obsidious';
import { MarkdownComponents } from "../components/MarkdownComponent/MarkdownComponents";
import { useMemo } from "react";







const useMarkdown = (text: string) => {
    const options: Options = {
        remarkPlugins: [remarkGfm, RemarkObsidious],
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