import { Transformer } from 'unified';
import { visit, Visitor } from 'unist-util-visit';
// import { Literal, PhrasingContent, Parent, Text, Paragraph } from 'mdast';
import visitObsidianCallouts from './visitObsidianCallouts';
import visitObsidianHilights from './visitObsidianHilights';


// Export the combined transformer
export default function obsidianPlugin(): Transformer {
    return (tree) => {
        visit(tree, 'blockquote', visitObsidianCallouts);
        visit(tree, 'text', visitObsidianHilights);

    };
}
