import { styled, SxProps } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

import { usePreviewModal } from '../hooks/usePreviewModal';
import { PreviewModal } from './PreviewModal';
import { MarkdownComponents } from './md/MarkdownDefaults';

import { RemarkObsidious, Obsidious, ObsidiousOptions, slugify } from 'remark-obsidious';

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
  // const { getFileByLabelSlug } = useHashLookup();
  const { preview, isVisible, handleMouseEnter, handleMouseClick } = usePreviewModal();
  
  const options:ObsidiousOptions = {
    basePath: import.meta.env.BASE_URL, 
    filePathPrefix: import.meta.env.VITE_FILEPATH_PREFIX,
    getFileMetaForLabel: (label: string) => Obsidious.getFileForLabelSlug(slugify(label)), 
  };

  return (
    <StyledArticle sx={{ ...sxProps }}>
      {isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkFrontmatter,
          [RemarkObsidious, options],
        ]}
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
