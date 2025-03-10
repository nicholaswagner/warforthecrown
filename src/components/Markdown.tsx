import { styled, SxProps } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';

import { CDN_PREFIX } from '../AppConstants';
import { usePreviewModal } from '../hooks/usePreviewModal';
// import MyPlugin from '../lib/MyPlugin';
import { getAllFileMeta } from '../utils/getAllFiles';
import { MarkdownComponents } from './MarkdownDefaults';
import { PreviewModal } from './PreviewModal';
import obsidianPlugin from '../lib/obsidianPlugin';

type MarkdownProps = {
  id?: string;
  sxProps?: SxProps;
} & React.ComponentProps<typeof ReactMarkdown>;

const StyledArticle = styled('article')(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& > p:first-of-type': {
    margin: 0,
    padding: 0,
    display: 'flex',
  },
}));

export const Markdown = (props: MarkdownProps) => {
  const { sxProps, children, components } = props;
  const fileMeta = getAllFileMeta();
  /*@ts-expect-error  ts is saying setIsVisible is never read ... which ... is correct ... its not supposed to be*/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preview, isVisible, setIsVisible, handleMouseEnter, handleMouseLeave, handleMouseClick } = usePreviewModal();

  return (
    <StyledArticle sx={{ ...sxProps }}>
      {isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkFrontmatter,
          obsidianPlugin,
          // [
          //   MyPlugin,
          //   {
          //     fileMeta,
          //     vaultPathPrefix: CDN_PREFIX, // prefix any media src with this
          //     // hrefTemplate: (path: string) => `${path}`,
          //   },
          // ],
        ]}
        // rehypePlugins={[rehypeRaw]}
        components={{
          ...MarkdownComponents,
          ...components,
          a: ({ ...rest }) => <a {...rest} onMouseEnter={handleMouseEnter} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </StyledArticle>
  );
};

export default Markdown;
