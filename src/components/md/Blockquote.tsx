import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';

import React, { useRef,Children, SyntheticEvent, useEffect, useState } from 'react';

const StyledBlockquote = styled('blockquote', { name: 'div' })(({ theme }) => ({
  marginBlockStart: '3rem',
  marginBlockEnd: `2rem`,
  marginInlineStart: '1rem',
  marginInlineEnd: '1rem',
  // unicodeBidi: 'embed',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '1rem',
  borderLeft: '0.5rem solid',
  borderColor: theme.palette.primary.main,
  fontStyle: 'italic',
  userSelect: 'none',
  ['& span ']: {
    // padding: '1rem',
    // display: 'inline-block',
  },
  ['& p']: {
    // display: 'inline-block',
    // padding: '1rem',
    // margin: 0,
    // marginTop: '1rem',
    // marginBlockEnd: '1rem',
  },
  ['& img']: {
    // marginTop: '1rem',
    // marginBottom: '1rem',
  },
  ['& blockquote']: {
    // marginTop: '1rem',
    // paddingBottom: '1rem',
  },
  // ['& + p:last-of-type:not(blockquote)']:{
  //   backgroundColor: 'blue',
  // },

  

}));

const getCalloutStyles = (type: string, theme: Theme): SxProps => ({
  backgroundColor: getBackgroundColorForCallout(type, theme),
  border: 'none',
  margin: 0,
  // padding: '3rem',
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 0,
  marginInlineEnd: 0,
  paddingBlockStart: 0,
  paddingBlockEnd: 0,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,

  display: 'flex',
  flexDirection: 'column',
  'strong, em, del': {
    display: 'inline-block',
    padding: '0.3rem',
    marginBlockEnd: 0,
  },
  // paddingLeft: '1rem',
  '& ol': {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    paddingBottom: '1rem',
  },
  
  ['p:empty,span:empty']: {
    display: 'none',
  },

  ['&.folded']: {
    
    display: 'none',
    // padding: 0,
    // margin: 0,
    // ['p:first-of-type']: {
      // marginTop: 0,
      // marginBlockEnd: 0,
    // },
  },

  // '& p + span + :not(blockquote)': {
    // display: 'inline-block',
    // padding: '2rem',
    // backgroundColor: 'red',
  // },
  // },
  'p,span:not(.obsidian-hilight)': {
    // display: 'inline-block',
    marginTop: 0,
    padding: '1rem',
    marginBlockEnd: 0,
  },

  ['&.foldable']: {
    cursor: 'pointer',
    '& svg.lucide-chevron-right': {
      display: 'flex',
      transform: 'rotate(90deg)',
      transition: 'transform .1s ease-out',
    }
  },
  '&.is_folded svg.lucide-chevron-right': {
    transform: 'rotate(0deg)',
    transition: 'transform .1s ease-out',

  },
  ['&.is_folded > :not(blockquote) > *']: {},
  ['&.is_folded > :not(blockquote)']: {
    display: 'none',
  },
  ['&.is_folded >.callout-title:first-of-type']: {
    display: 'inline-flex',
  },
  ['&.is_folded >.callout-title:first-of-type > *']: {
    display: 'inline-flex',
    '&.lucide-chevron-right': {
      transform: 'rotate(0deg)',
      transition: 'transform .1s ease-out',

    },
  },
});

const getBackgroundColorForCallout = (type: string, theme: Theme) => {
  switch (type) {
    case 'warning':
    return theme.palette.warning.main;
    case 'danger':
    case 'bug':
    return theme.palette.error.main;
    case 'success':
    case 'question':
    return theme.palette.success.main;
    case 'magic':
    case 'book':
    case 'calendar':
    return theme.palette.secondary.main;
    case 'info':
    case 'example':
    case 'rocket':
    case 'swords':
    case 'gem':
    case 'pencil':
    case 'tip':
    case 'star':
    case 'wip':
    default:
      return theme.palette.background.paper;
  }
};



type Props = React.ComponentProps<typeof ReactMarkdown> & {
  ['data-callout']: string;
  ['data-initial-folded']: string;
}

export const Blockquote = (props: Props) => {
  const { children, ['data-callout']: calloutType, ['data-initial-folded']: initialFolded, className: cn} = props;
  const [folded, setFolded] = useState(initialFolded === 'true');
  const blockquoteRef = useRef<HTMLQuoteElement>(null);

  const theme = useTheme();
  const sx = calloutType ? getCalloutStyles(calloutType, theme) : undefined;
  
  const isFoldable = cn?.includes('foldable');  
  const classes = [cn , (isFoldable ? folded ? 'is_folded' : '' : '')];

  const handleToggle = (event: Event) => {
    event.stopImmediatePropagation();
    setFolded((prev) => !prev);

  };

 useEffect(() => {
  if (!isFoldable) return;
  
  const blockquote = blockquoteRef.current;
  if (!blockquote) return;
  
  const calloutTitle = blockquote.querySelector('.callout-title');
  if (!calloutTitle) return;
  
  blockquote.addEventListener("callout-toggle", handleToggle);
    () => blockquote.removeEventListener('callout-toggle', handleToggle);
 }, []);



  return (
    <StyledBlockquote ref={blockquoteRef} {...props}  sx={sx} className={classes.join(' ')} >
      {children}
    </StyledBlockquote>
  );
};
