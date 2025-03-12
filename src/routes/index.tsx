import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

// import { Markdown } from '../components/Markdown';
import { fetchMarkdown } from '../utils/fetchMarkdown';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// import ReactMarkdown from 'react-markdown';
// import { remark } from 'remark';
// import remarkObsidian from 'remark-obsidian';
// import rehypeStringify from 'rehype-stringify'
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkGfm from 'remark-gfm'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import {unified} from 'unified'
// import MyPlugin from '../lib/MyPlugin';
// import { getAllFileMeta } from '../utils/getAllFiles';
import { Markdown } from '../components/Markdown';


// const file = await unified()
//   .use(remarkParse)
//   .use(remarkFrontmatter)
//   .use(remarkGfm)
//   .use(remarkRehype)
//   .use(rehypeStringify)
//   .process(value)

// console.log(String(file))

// const process = async (text:string) => {
//   // const content = String(await remark().use(remarkObsidian).process(text));
//   const fileMeta = getAllFileMeta();
// const file = await unified()
// .use(remarkParse)
// .use(remarkFrontmatter)
// .use(remarkGfm)
// .use(MyPlugin, { fileMeta, vaultPathPrefix: '/warforthecrown/' })
// // .use(MyPlugin, { fileMeta, vaultPathPrefix: '/warforthecrown/' })
// .use(remarkRehype)
// .use(rehypeStringify)
// .process(text)

// console.log(String(file))

  
//   return file;
// }


function RouteComponent() {
  const { markdown: text } = Route.useLoaderData();

  const content = `

`

  // process(content);

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%' }}>
      <Markdown sxProps={{ width: 'inherit', paddingTop: '4rem' }}>{content}</Markdown>
    </Box>
  );
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => fetchMarkdown({ pathname: 'readme' }),
  notFoundComponent: () => <h1>404</h1>,
});
