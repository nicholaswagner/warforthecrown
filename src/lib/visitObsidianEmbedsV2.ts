import { Visitor } from 'unist-util-visit';
import { Literal, PhrasingContent } from 'mdast';

import slugify from './slugify';
import { getFileById, getFileByLabelSlug } from '../utils/getFileByLabelSlug';
import { BASE_PATH } from '../AppConstants';
import { fetchMarkdownById } from '../utils/fetchMarkdownById';
import extractMarkdownHeaderContent from '../utils/extractMarkdownHeaderContent';

const defaultConfig = {
    filePathPrefix: '/warforthecrown/vault/',
};

const obsidianEmbed = /!?\[\[[^\]]+\]\]/g; // Matches all the ![[...]] in the markdown
const obsidianEmbedParams = /!?\[\[([^\|\]]+)(?:\s*\|\s*([^\|\]]+))?\]\]/; // Captures the link and optional alias

const createVisitObsidianEmbedsV2 = (config?: typeof defaultConfig): Visitor<Literal> => {
    const { filePathPrefix } = { ...defaultConfig, ...config };
    return (node, index, parent) => {
        if (!node.value || typeof node.value !== 'string' || !parent || index === undefined) return;

        if (!node.value?.match(obsidianEmbed)?.length) return;

        const matches = [...node.value.matchAll(obsidianEmbed)];
        const results: PhrasingContent[] = [];
        let bufferIndex = 0;

        for (const match of matches) {
            if (bufferIndex !== match.index) {
                results.push({ type: 'text', value: node.value.slice(bufferIndex, match.index) });
            }

            const params = match[0].match(obsidianEmbedParams);
            if (!params) {
                results.push({ type: 'text', value: match[0] });
                bufferIndex = match.index + match[0].length;
                continue;
            }

            const urlParamsIndex = params[1].indexOf('#');
            const urlParams = urlParamsIndex !== -1 ? params[1].slice(urlParamsIndex) : '';
            const isCarotParams = urlParams.startsWith('^');
            const file = getFileByLabelSlug(urlParamsIndex !== -1 ? slugify(params[1].slice(0, urlParamsIndex)) : slugify(params[1]));
            const title = isCarotParams ? `${file?.label} > ${urlParams.slice(1)}` : params[1];

            if (!file) {
                results.push({
                    type: 'text',
                    value: `"${params[1]}" could not be found`,
                    data: { hName: 'span', hProperties: { className: 'obsidian-md-error' } },
                });
            } else {
                if (params[0].startsWith('!')) {

                    // if (file.extension === 'md') {
                    //     fetchMarkdownById(getFileById(file.id).id).then(({ text }) => {
                    //         console.log('embed this markdown as ... embedded:  ', urlParams, extractMarkdownHeaderContent(text, slugify(urlParams)))
                    //     }).catch((err) => { });
                    // }


                    const src = file.filepath;
                    results.push({
                        type: 'image',
                        url: src,
                        alt: title,
                        data: {
                            hProperties: {
                                className: 'obsidian-embed',
                                options: params[2] ?? undefined,
                                src: filePathPrefix + src,
                                'data-ext': file.extension,
                                'data-weburl': file.webPath,// + urlParams,
                                'data-anchor': slugify(urlParams),
                                'data-label': file.label,

                            },
                        },
                    });
                } else {
                    results.push({
                        type: 'link',
                        url: BASE_PATH + file.webPath + urlParams,
                        title,
                        data: {
                            hProperties: {
                                className: 'obsidian-link',
                                options: params[2] ?? undefined,
                                src: filePathPrefix + file.filepath,
                                'data-ext': file.extension,
                                'data-weburl': file.webPath,
                                'data-anchor': slugify(urlParams),
                                'data-label': file.label,
                            },
                        },
                        children: [{ type: 'text', value: title }],
                    });
                }
            }

            bufferIndex = match.index + match[0].length;
        }

        // Add any remaining text after the last match
        if (bufferIndex < node.value.length) {
            results.push({ type: 'text', value: node.value.slice(bufferIndex) });
        }

        if (typeof index === 'number' && parent.children) {
            parent.children.splice(index, 1, ...results);
        } else {
            parent.children = results;
        }
    }
}

export default createVisitObsidianEmbedsV2;