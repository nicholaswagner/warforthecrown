import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

// import { Markdown } from '../components/Markdown';
import { fetchMarkdown } from '../utils/fetchMarkdown';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// import ReactMarkdown from 'react-markdown';
import { remark } from 'remark';
import remarkObsidian from 'remark-obsidian';
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import MyPlugin from '../lib/MyPlugin';
import { getAllFileMeta } from '../utils/getAllFiles';
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
# A Blockquote
Suspendisse dapibus condimentum ante, vel semper purus pellentesque non. Maximus est nec molestie.  felis quis posuere. Cras vel leo interdum, vulputate velit dignissim, ultricies ligula.



> “Do not wait to strike till the iron is hot, but make it hot by striking.” — William Butler Yeats

Quisque accumsan quis felis quis posuere. Cras vel leo interdum, vulputate velit dignissim, ultricies ligula.

---
# Nested Callouts

  > [!Book]+ Who doesn't love books? 
> **bold** ==block quote== containing _another block_
> quote which contains a ~~strikethrough item~~ and a list.
> > [!Question]+ == This text should be hilighted ==
> >
> > 1. Item **One**
> > 2. Item Two
> > > [!Warning]+
> > >    
> > > The Warning callout has no title.
> Here is an embeddedd image of Arturo
> ![[arturo_basri.png]]
> ^ It should be right here.   
>

  > [!Book]- Who doesn't love books? 
> **bold** ==block quote== containing _another block_
> quote which contains a ~~strikethrough item~~ and a list.
> > [!Question]- == This text should be hilighted ==
> >
> > 1. Item **One**
> > 2. Item Two
> > > [!Warning]-
> > >    
> > > The Warning callout has no title.
> Here is an embeddedd image of Arturo
> ![[arturo_basri.png]]
> ^ It should be right here.   
>

---

# One last callout

> [!info]- Info
> ==Whatever else you want to say== goes on the following lines.
> **Bold** _Italics_ and ~~strikethrough~~ should also work,
> And you should be able to embed images
> ![[castle.png]]
> 
`

  // process(content);


  // return(
  //   <Box component="section" sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%' }}>test</Box>);



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
