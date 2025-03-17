import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

import createVisitObsidianEmbeds from './createVisitObsidianEmbeds';
import createVisitObsidianCallouts from './createVisitObsidianCallouts';
import createVisitObsidianHilights from './createVisitObsidianHilights';

export type PluginOptions = {
    basePath: string; // base path for the site, example:  github profile page you'd use "/" but a sub repo you would use "/repo-name/" defaults to "/"
    classNames: {
        calloutClassName: string;
        calloutIsFoldableClassName: string;
        calloutTitleClassName: string;
        embeddedMdClassName: string;
        errorClassName: string;
        hilightClassName: string;
        imageClassName: string;
        linkClassName: string;
    },
    filePathPrefix?: string; // while the UX should give the illusion that mirrors your vault, the actual files might be stored in a different location (like a CDN)
}

const defaultConfig = {
    basePath: '/',
    classNames: {
        calloutClassName: 'callout',
        calloutIsFoldableClassName: 'foldable',
        calloutTitleClassName: 'callout-title',
        errorClassName: 'obsidian-md-error',
        hilightClassName: 'obsidian-hilight',
        imageClassName: 'obsidian-img',
        linkClassName: 'obsidian-link',
        embeddedMdClassName: 'obsidian-md-embed ',
    },
    filePathPrefix: '/warforthecrown/vault/',
};

export default function obsidianPlugin(options: PluginOptions): Transformer {
    const config = { ...defaultConfig, ...options };
    const visitObsidianEmbeds = createVisitObsidianEmbeds({ ...config });
    const visitObsidianCallouts = createVisitObsidianCallouts({ ...config });
    const visitObsidianHilights = createVisitObsidianHilights({ ...config });

    return (tree) => {
        visit(tree, 'blockquote', visitObsidianCallouts);
        visit(tree, 'text', visitObsidianHilights);
        visit(tree, 'text', visitObsidianEmbeds);
    };
}
