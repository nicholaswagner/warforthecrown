import { Transformer } from 'unified';
import { visit, Visitor } from 'unist-util-visit';
import { Literal, PhrasingContent, Parent, Text, Paragraph } from 'mdast';
import visitObsidianCalloutsV2 from './visitObsidianCalloutsV2';

// Define the highlight regex
const hilight = /==([^=]+)==/gm; // Obsidian highlight syntax

// Define the callout regex
// const calloutRegex = /$!(.*?)$\s*(.*)/;
const calloutRegex = /\[\!\s*([\S]+)+\s*\](.*)/g;


// Define the highlight visitor function
const visitObsidianHighlights: Visitor<Literal> = (node, index, parent) => {
    if (!node.value || typeof node.value !== 'string' || !parent || index === undefined) return;

    const matches = [...node.value.matchAll(hilight)];
    if (matches.length === 0) return;

    const results: PhrasingContent[] = [];
    let bufferIndex = 0;

    for (const match of matches) {
        if (bufferIndex !== match.index) {
            results.push({ type: 'text', value: node.value.slice(bufferIndex, match.index) });
        }

        results.push({
            type: 'text',
            value: match[1],
            data: { hName: 'span', hProperties: { className: 'obsidian-hilight' } },
        });

        bufferIndex = match.index + match[0].length;
    }

    if (bufferIndex < node.value.length) {
        results.push({ type: 'text', value: node.value.slice(bufferIndex) });
    }

    if (parent.children) {
        parent.children.splice(index, 1, ...results);
    }
};

// Export the combined transformer
export default function obsidianPlugin(): Transformer {
    return (tree) => {
        visit(tree, 'blockquote', visitObsidianCalloutsV2);
        visit(tree, 'text', visitObsidianHighlights);
    };
}
