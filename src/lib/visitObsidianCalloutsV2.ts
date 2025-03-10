// import { visit } from 'unist-util-visit';
// import type { Parent, Node, Data as UnistData, Literal } from 'unist';
// interface HastParent extends Parent, UnistData {
//     data: {
//         className?: string[];
//         hProperties?: {
//             [key: string]: any;
//         };
//         hName?: string;
//     }
// }

// // Updated regex to handle spaces and newlines
// const calloutRegex = /(\[\!\s*([\S]+)\s*\]([-+]?)).*/;
// const calloutReplacement = /^\[\!\s*[\S]+\s*\][-+]?/;

// // Define the callouts visitor function
// const visitObsidianCalloutsV2: import('unist-util-visit').Visitor<Parent> = (node) => {
//     visit(node, 'blockquote', (blockquoteNode: HastParent, index) => {
//         // Ensure data and hProperties exist
//         blockquoteNode.data = blockquoteNode.data || {};
//         blockquoteNode.data.hProperties = blockquoteNode.data.hProperties || {};

//         // Check if the first child is a paragraph
//         const firstParagraph = blockquoteNode.children[0] as HastParent;
//         if (firstParagraph.type !== 'paragraph' || firstParagraph.children.length < 1) return;

//         // Check if the first child of the paragraph is text
//         const parachild = firstParagraph.children[0] as Literal;
//         if (parachild.type !== 'text') return

//         if (parachild.value as string === '') return;

//         const match = calloutRegex.exec(parachild.value as string);

//         if (!match) return;

//         const calloutType = match[2].toLowerCase();
//         const foldableModifier = match[3] || '';
//         let foldable = foldableModifier !== '';
//         let initialFolded = foldableModifier === '-';

//         parachild.value = (parachild.value as string).replace(calloutReplacement, '').trim();
//         const titleText = parachild.value || calloutType;

//         blockquoteNode.data = {
//             ...(blockquoteNode.data || {}),
//             hName: 'blockquote',
//             hProperties: {
//                 ...(blockquoteNode.data.hProperties || {}),
//                 'data-callout': calloutType,
//                 'data-initial-folded': String(initialFolded),
//                 'data-title': titleText,
//                 className: ['callout', (foldable ? 'foldable' : '')]
//             }
//         };

//         firstParagraph.data = {
//             ...(firstParagraph.data || {}),
//             hName: 'p',
//             hProperties: {
//                 ...(firstParagraph.data?.hProperties || {}),
//                 className: ['callout-title'],
//                 'data-callout': calloutType,
//                 'data-title': titleText
//             }
//         };

//     });
// };

// export default visitObsidianCalloutsV2;

const calloutRegex = /^\[\!\s*([\w-]+)\s*\]([-+]?)/;

import type { Blockquote, Paragraph, Text } from 'mdast';

const visitObsidianCalloutsV2: import('unist-util-visit').Visitor<Blockquote> = (blockquoteNode) => {
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
export default visitObsidianCalloutsV2;