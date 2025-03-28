import { MarkdownHooks, Options } from "react-markdown";
import remarkGfm from 'remark-gfm';
import { remarkObsidious, ObsidiousVault, slugify } from 'remark-obsidious';
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
            [remarkObsidious,{
                basePath: import.meta.env.BASE_URL, 
                filePathPrefix: `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/"),            
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