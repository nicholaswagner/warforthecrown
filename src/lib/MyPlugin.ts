
import { Root } from 'mdast';
import { visit } from "unist-util-visit";

import { FileTreeNode } from '../types/FileTreeNode';
import { visitObsidianCallout } from './visitObsidianCallouts';
import { visitObsidianEmbeds } from './visitObsidianEmbeds';
import { visitObsidianHighlights } from './visitObsidianHighlights';
import { h } from 'hastscript';

export type PluginOptions = {
    fileMeta: FileTreeNode[];
    hrefTemplate?: (path: string) => string;
    vaultPathPrefix?: string; // while the UX should give the illusion that mirrors your vault, the actual files might be stored in a different location (like a CDN)
}



const defaultHrefTemplate = (path: string) => path; // by default its assumed that the path to the file is just ./file









export default function MyPlugin({ fileMeta, hrefTemplate = defaultHrefTemplate, vaultPathPrefix = '' }: PluginOptions) {
    return (tree: Root) => {


        visit(tree, 'text', (node, index, parent) => {
            visitObsidianHighlights(node, index, parent || null);
            // visitObsidianEmbeds({ fileMeta, hrefTemplate, vaultPathPrefix }, node, index, parent || null);
        })

        // visit(tree, 'blockquote', (node, index, parent) => {
        //     visitObsidianCallout({ fileMeta, hrefTemplate, vaultPathPrefix }, node, index, parent || null);
        // })

        // visit(tree, (node, index, parent) => {
        //     if (node.type === 'code') return;
        //     if (!('value' in node)) return;
        //     visitObsidianHighlights(node, index, parent || null);
        // });

        // visit(tree, 'paragraph', (node, index, parent) => {
        /**
         * ![[file_label]] // embeds the file
         * paragraph.match(embed-regex)
         * if node.children.some type === 'inlineCode' return  because its a code block and there's nothing i can do about that right now
         * fetch the embeded content from the file
         * if no content, return node// what happens when you return the node?
         * parse the fetched content into a tree (fetchedTree?)
         * parent.children.splice(index, 1, fetchedTree)
         * return node
         *
        */
        /**
         * [[file_label | alias]] // links to the file with an alias
         * [[file_label#heading]] // links to the file with a heading anchor
         * [[file_label#heading | alias]] // links to the file with a heading anchor and an alias
         * [[file_label#^id | alias]] // links to the file with a heading anchor and a carot - obsidian specific and not supported by me but shouldn't break things
         * 
         * paragraph.match(link-regex)
         * node.children.some value === '[[]] pattern' && type === 'inlineCode' return the [[]] link
         * <a href={website_link#slugified(heading)} title={alias text | file.label} data-type='md | image' data-file-id='file.id'>text</a>
         * if the link is an image, the data-type should be image and the text should be the alt text
         * 
         * // if html === paragraph return node // not sure what this really _means_
         * delete node.children // eslint-disable-line // <-- guessing that removing the children from mdast node results in a cleaner P tag output?
         * return Object.assign(node, { type: 'html', value: html }); // replaces node with html ... which I'm trying to avoid
         */
        // });

        // visit (tree, 'blockquote', (node, index, parent) => {
        /**
         *  match the [!callout] pattern
         * match.replace.trim.replace(/\n/g, ' ')
         * maybe do the icon lookup here
         * 
         */

        // });



    };
}