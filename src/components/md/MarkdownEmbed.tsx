import { Box, styled, SvgIcon, useTheme } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { LinkIcon } from 'lucide-react';
import { ImgHTMLAttributes, useEffect, useState } from 'react';

import extractMarkdownHeaderContent from '../../utils/extractMarkdownHeaderContent';
import { Markdown } from '../Markdown';
import { getFileByWebPath } from '../../utils/getFileByLabelSlug';
import { fetchMarkdownById } from '../../utils/fetchMarkdownById';
import { BASE_PATH } from '../../AppConstants';

type MarkdownImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  options?: string;
  type?: string;
  'data-label'?: string;
  'data-ext'?: string;
  'data-weburl'?: string;
  'data-anchor'?: string;
};

const StyledSpan = styled('span')(() => ({
  display: 'block',
  width: '100%',
  textAlign: 'right',
}));

const StyledImageBox = styled('span')(() => ({
  display: 'inline-block',
  position: 'relative',
  lineHeight: 0,
  ['&::after']: {
    content: `'""'`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    mixBlendMode: 'overlay',
    background: 'rgb(255, 181, 91)',
    opacity: 0.1,
  },
  ['& > img']: {
    filter: 'brightness(100%) contrast(120%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(10%)',
    mixBlendMode: 'normal',
  },
}));

export const MarkdownImage = (props: MarkdownImageProps) => {
  const [text, setText] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    src,
    className,
    options,
    'data-label': _label,
    'data-ext': ext,
    'data-weburl': weburl,
    'data-anchor': hash,
  } = props;

  const file = weburl ? getFileByWebPath(weburl) : undefined;
  
  useEffect(() => {
    if (ext !== 'md') return;
    if (!file) return;
    fetchMarkdownById(file.id)
      .then(({ text }) => {
        setText(hash ? extractMarkdownHeaderContent(text, hash) || text : text);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [file, hash, weburl, ext]);

  if (ext === 'md') {
    return (
      <Box
        className={'toc_exclude'}
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          padding: '2rem',
          // ['& span']: {
          //   padding: '1rem',
          // },
          // borderRadius: '2rem',
        }}
      >
        <StyledSpan>
          <a href={`${BASE_PATH}${file?.webPath}${hash?'#'+hash:''}`}>
            <SvgIcon fontSize="small">
              <LinkIcon />
            </SvgIcon>
          </a>
        </StyledSpan>
        <Markdown
          sxProps={{
            padding: 0,
            margin: 0,
            '& > p:first-of-type': {
              margin: 0,
              padding: 0,
              display: 'inline',
            },
          }}
        >
          {text}
        </Markdown>
        </Box>
    );
  } else {
    return (
      <StyledImageBox sx={{ padding: 0, margin: 0 }}>
        <img
          src={src}
          className={className}
          data-pathslug={weburl}
          data-options={options}
          onClick={() => navigate({ to: '/$', params: { _splat: weburl } })}
        />
      </StyledImageBox>
    );
  }
};
