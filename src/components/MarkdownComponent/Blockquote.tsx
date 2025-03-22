import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import type {ExtraProps} from 'react-markdown'
import { useRef, useEffect, useState, ComponentProps } from 'react';
import { DataAttributes, getDataAttributes } from '../../utils/getDataAttributes';

const StyledBlockquote = styled('blockquote', { name: 'div' })(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  borderLeft: '0.5rem solid',
  display: 'flex',
  flexDirection: 'column',
  fontStyle: 'italic',
  marginBlockEnd: `2rem`,
  marginBlockStart: '3rem',
  marginInlineEnd: '1rem',
  marginInlineStart: '1rem',
  paddingLeft: '1rem',
  userSelect: 'none',
  width: '100%',
}));

const getCalloutStyles = (type: string, theme: Theme): SxProps => ({
  backgroundColor: getBackgroundColorForCallout(type, theme),
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  paddingBlockEnd: '1rem',
  paddingBlockStart: '1rem',
  paddingInlineEnd: '1rem',
  paddingInlineStart: '1rem',
  'strong, em, del': {
    display: 'inline-block',
    padding: '0.3rem',
    marginBlockEnd: 0,
  },
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
  },
  'p,span:not(.obsidian-hilight)': {
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
    case 'bug':
    case 'danger':
    return theme.palette.error.main;
    case 'success':
      return theme.palette.success.main;
    case 'calendar':
    case 'magic':
    case 'question':
      return theme.palette.info.main; 
    case 'book':
    case 'example':
    case 'gem':
    case 'info':
    case 'pencil':
    case 'rocket':
    case 'star':
    case 'swords':
    case 'tip':
    case 'wip':
    default:
      return theme.palette.background.paper;
  }
};



// type Props = ComponentProps<typeof ReactMarkdown> & {
//   ['data-callout']: string;
//   ['data-initial-folded']: string;
// }


// type Components = {
//   [Key in Extract<ElementType, string>]?: ElementType<ComponentProps<Key> & ExtraProps> & {
//     dataAttributes?: DataAttributes;
//   }
// }

type ExtendedComponentProps = ComponentProps<'blockquote'> & ExtraProps & { dataAttributes?: DataAttributes };

export const Blockquote = (props: ExtendedComponentProps) => {
  const { children, className: cn} = props;
  const { 'data-callout': calloutType, 'data-initial-folded': initialFolded } = getDataAttributes(props);

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
