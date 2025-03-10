import { Literal, Parent } from 'unist';
import { PluginOptions } from './MyPlugin';
const calloutRegex = /\[\!\s*([\S]+)+\s*\](.*)/;

export const visitObsidianCallout = (_options: PluginOptions, node: Parent, _index: number | undefined, _parent: Parent | null) => {
    if (!node.children || node.children.length === 0) return;

    const firstChild = node.children[0] as Parent;
    if (firstChild.type !== 'paragraph' || !(firstChild as Parent).children || (firstChild as Parent).children.length === 0) return;

    const textNode = firstChild.children[0] as Literal;
    if (textNode.type !== 'text') return;

    const match = (textNode.value as string).match(calloutRegex);
    if (!match) return;

    const calloutType = match[1].slice(); // Remove '!'
    const calloutTitle = match[2].trim();

    node.data = {
        hName: 'blockquote',
        hProperties: { 'data-title': calloutTitle, 'data-callout': calloutType, className: 'obsidian-callout' }
    };

    textNode.value = (textNode.value as string).replace(calloutRegex, '');
};

export default visitObsidianCallout;