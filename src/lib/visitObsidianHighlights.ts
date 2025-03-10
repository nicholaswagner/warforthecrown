import { Literal, PhrasingContent } from 'mdast';
import { Parent } from 'unist';


const hilight = /==([^=]+)==/gm // Obsidian hilight syntax

export const visitObsidianHighlights = (node: Literal, index: number | undefined, parent: Parent | null) => {
    const matches = [...node.value?.matchAll(hilight)];
    if (matches.length) {
        const results: PhrasingContent[] = [];
        let bufferIndex = 0;
        for (const match of matches) {

            if (bufferIndex !== match.index)
                results.push({ type: 'text', value: node.value?.slice(bufferIndex, match.index) });

            results.push({
                type: 'text',
                value: match[1],
                data: { hName: 'span', hProperties: { className: 'obsidian-hilight' } }
            })

            bufferIndex = match.index + match[0].length;
        }

        if (bufferIndex < node.value.length) {
            results.push({ type: 'text', value: node.value.slice(bufferIndex) });
        }

        if (typeof index === 'number' && parent?.children)
            parent.children.splice(index, 1, ...results);
        return;
    }
}

