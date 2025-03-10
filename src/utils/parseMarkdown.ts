// /**
//  * Keeping this for reference , this is really no longer needed.
//  */

// import remarkFrontmatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype'
// import remarkStringify from 'remark-stringify';
// // import remarkWikiLink from 'remark-wiki-link';
// import { unified } from 'unified';


// export interface FrontMatter {
//     title?: string;
//     date?: string;
//     tags?: string[];
//     [key: string]: any;
// }

// export interface ParsedMarkdown {
//     content: string;
//     frontMatter: FrontMatter;
// }

// export async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
//     const processor = unified()
//         .use(remarkParse)
//         .use(remarkFrontmatter, ['yaml'])
//         .use(remarkGfm)
//         // .use(remarkWikiLink, {
//         //     aliasDivider: '|',
//         //     pageResolver: (name: string) => [name.toLowerCase().replace(/\s+/g, '-')],
//         //     hrefTemplate: (permalink: string) => `/md/${permalink}`,
//         //     wikiLinkClassName: 'wiki-link'
//         // })
//         .use(remarkRehype)
//         .use(remarkStringify)

//     const parsed = await processor.parse(markdown);
//     // const result = await processor.run(parsed);
//     const html = await processor.stringify(parsed);

//     // console.log(html);
//     // const html = await processor.stringify(result);

//     // Extract frontmatter if it exists
//     const frontMatterNode = parsed.children.find(
//         (node: any) => node.type === 'yaml'
//     );

//     const frontMatter = frontMatterNode
//         ? JSON.parse(JSON.stringify(frontMatterNode))
//         : {};

//     return {
//         content: html,
//         frontMatter,
//     };
// }