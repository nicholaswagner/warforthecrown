const calloutRegex = /^\[\!\s*([\w-]+)\s*\]([-+]?)/;

import type { Blockquote, Paragraph, Text } from 'mdast';

const visitObsidianCallouts: import('unist-util-visit').Visitor<Blockquote> = (blockquoteNode) => {
    if (!Array.isArray(blockquoteNode.children) || blockquoteNode.children.length === 0) return;

    const firstParagraph = blockquoteNode.children.find((child) => child.type === 'paragraph') as Paragraph | undefined;
    if (!firstParagraph || firstParagraph.children.length === 0) return;

    const firstTextNode = firstParagraph.children.find((child) => child.type === 'text') as Text | undefined;
    if (!firstTextNode || typeof firstTextNode.value !== 'string' || firstTextNode.value.trim() === '') return;

    const match = calloutRegex.exec(firstTextNode.value);
    if (!match) return;

    const calloutType = match[1].toLowerCase();
    const foldableModifier = match[2] || '';
    const foldable = foldableModifier !== '';
    const initialFolded = foldableModifier === '-';

    firstTextNode.value = firstTextNode.value.replace(calloutRegex, '').trim();
    const titleText = firstTextNode.value || calloutType;

    blockquoteNode.data ??= {};
    blockquoteNode.data.hProperties = {
        ...blockquoteNode.data.hProperties,
        'data-callout': calloutType,
        'data-initial-folded': String(initialFolded),
        'data-title': titleText,
        className: ['callout', foldable ? 'foldable' : '']
    };

    firstParagraph.data ??= {};
    firstParagraph.data.hProperties = {
        ...firstParagraph.data.hProperties,
        className: ['callout-title'],
        'data-callout': calloutType,
        'data-title': titleText
    };
};
export default visitObsidianCallouts;