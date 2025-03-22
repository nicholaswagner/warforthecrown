import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { RemarkObsidious, ObsidiousVault, slugify } from 'remark-obsidious';
import { MarkdownComponents } from "./MarkdownComponent/MarkdownComponents";
import { useMemo } from "react";



type Props = {
    children: string | null | undefined;
    componentOverrides?: typeof MarkdownComponents;
}
const MarkdownItem = ({children,componentOverrides}:Props) => {

    const options:Options = useMemo(() => ({
        remarkPlugins: [
            remarkGfm, 
            [RemarkObsidious,{
                basePath: import.meta.env.BASE_URL, 
                filePathPrefix: import.meta.env.VITE_FILEPATH_PREFIX,
                getFileMetaForLabel: (label: string) => ObsidiousVault.getFileForLabelSlug(slugify(label)) 
            }]],
        components: {
            ...MarkdownComponents,
            ...componentOverrides
        },
        children,
      }), [children]);
    
    const md = MarkdownHooks(options);
    
    return(md);
}

export default MarkdownItem;