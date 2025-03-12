import { Transformer } from 'unified';
import { visit, Visitor } from 'unist-util-visit';
// import { Literal, PhrasingContent, Parent, Text, Paragraph } from 'mdast';
import visitObsidianCallouts from './visitObsidianCallouts';
import visitObsidianHilights from './visitObsidianHilights';


// chopping block
import { FileTreeNode } from '../types/FileTreeNode';
import createVisitObsidianEmbedsV2 from './visitObsidianEmbedsV2';

export type PluginOptions = {
    fileMeta?: FileTreeNode[];
    hrefTemplate?: (path: string) => string;
    filePathPrefix?: string; // while the UX should give the illusion that mirrors your vault, the actual files might be stored in a different location (like a CDN)
}
// const defaultHrefTemplate = (path: string) => path; // by default its assumed that the path to the file is just ./file


const defaultConfig = {
    // className: 'obsidian-hilight',
    filePathPrefix: '/warforthecrown/vault/',
};

// Export the combined transformer
export default function obsidianPlugin(options: PluginOptions): Transformer {
    const visitObsidianEmbeds = createVisitObsidianEmbedsV2({ ...defaultConfig });

    return (tree) => {
        visit(tree, 'blockquote', visitObsidianCallouts);
        visit(tree, 'text', visitObsidianHilights);
        visit(tree, 'text', visitObsidianEmbeds);
    };
}
