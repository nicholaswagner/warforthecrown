import { IconButton, styled } from '@mui/material';
import parse from 'html-react-parser';
import { CopyIcon } from 'lucide-react';
import { FC, ReactNode, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const CodeFigure = styled('figure', {
  name: 'CodeFigure',
  slot: 'root',
})(({ theme }) => ({
  backgroundColor: 'rgba(31,31,41,1)',
  borderRadius: '0.5rem',
  color: theme.palette.common.white,
  height: 'auto',
  maxHeight: '50vh',
  overflowY: 'scroll',
  marginInlineStart: 0,
  marginInlineEnd: 0,
  fontSize: '1.15rem',
  ['& > figcaption']: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    letterSpacing: '-0.05em',
    padding: '1rem 1rem 0 1rem',
    background: 'linear-gradient(2deg, rgba(31,31,41,0) 0%, rgba(31,31,41,1) 50%)',
    position: 'sticky',
    textAlign: 'right',
    top: 0,
    margin: 0,
    userSelect: 'none',
    ['> button']: {
      color: theme.palette.common.white,
    },
  },
  ['& > pre']: {
    margin: 0,
    backgroundColor: 'rgb(26, 27, 38)',
    overflowX: 'scroll',
    whiteSpace: 'pre-wrap',
    padding: '2rem',
  },
}));

type CodeBlockProps = {
  children?: ReactNode;
  className?: string;
  inline?: boolean;
};

const CodeBlock: FC<CodeBlockProps> = ({ children, className, inline }: CodeBlockProps) => {
  const [text, setText] = useState<string | null>(null);
  const { copy } = useCopyToClipboard(String(children));
  const match = /language-(\w+)/.exec(className || '');
  const codeLanguage = (match && match[1]) ?? 'plaintext';

  useEffect(() => {
    codeToHtml(String(children), {
      lang: codeLanguage,
      theme: 'kanagawa-wave',//'poimandres',//'laserwave',//'catppuccin-mocha',//'tokyo-night', // some other favorites
    }).then((highlightedCode) => {
      setText(highlightedCode);
    });
  }, [children, codeLanguage, text]);

  if (inline || !match) {
    return <code className={className}>{children}</code>;
  }

  return (
    <CodeFigure>
      <figcaption>
        {codeLanguage}{' '}
        <IconButton onClick={copy}>
          <CopyIcon style={{ width: '0.75rem', height: '0.75rem' }} />
        </IconButton>
      </figcaption>
      {parse(text ?? '')}
    </CodeFigure>
  );
};

export default CodeBlock;
