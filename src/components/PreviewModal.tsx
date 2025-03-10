import { Backdrop, Box, styled } from '@mui/material';
import { useEffect } from 'react';

import { PreviewModalProps } from '../hooks/usePreviewModal';
import Markdown from './Markdown';

const StyledBackdrop = styled(Backdrop, { name: 'div' })(() => ({
  backgroundColor: 'rgba(17, 17, 17, .8)',
  padding: 0,
  margin: 0,
}));

const StyledModal = styled(Box, { name: 'div' })(({ theme }) => ({
  padding: 0,
  margin: 0,
  borderRadius: 0,
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer !important',
  filter: 'drop-shadow(4px 8px 13px rgb(30, 30, 30))',
}));

export const PreviewModal = ({ type, content, x, y, setIsVisible, hash, onClick }: PreviewModalProps) => {
  let result;
  switch (type) {
    case 'image':
      result = (
        <Markdown
          sxProps={{
            width: '350px',
            height: '350px',
            pointerEvents: 'none',
          }}
        >
          {content}
        </Markdown>
      );
      break;
    case 'markdown':
      result = (
        <Markdown
          sxProps={{
            width: '350px',
            height: '400px',
            pointerEvents: 'none',
            textAlign: 'center',
          }}
        >
          {content}
        </Markdown>
      );
      break;
    case 'url':
      result = <iframe src={content} style={{ width: '350px', height: '400px' }} />;
      break;
    default:
      result = null;
      break;
  }

  useEffect(() => {
    if (type === 'markdown') {
      const container = document.querySelector('#preview > article');
      if (!container) return;
      const element = container.querySelector(`[id="${hash}"]`);
      if (!element) return;
      element.scrollIntoView({ behavior: 'instant', block: 'start', inline: 'center' });
    }
  }, [content, hash, type, y, x]);

  return (
    <Box sx={{ zIndex: 9001 }}>
      <StyledBackdrop
        open={true}
        onClick={() => {
          setIsVisible(false);
        }}
      />
      <StyledModal
        id="preview"
        onClick={onClick && onClick}
        sx={{
          position: 'fixed',
          overflow: type === 'markdown' ? 'auto' : 'hidden',
          left: `calc(${x}px - 20px)`,
          top: `calc(${y}px - 20px)`,
          height: type === 'markdown' ? '400px' : '350px',
        }}
      >
        {result}
      </StyledModal>
    </Box>
  );
};
