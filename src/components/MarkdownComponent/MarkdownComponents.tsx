import type {ExtraProps} from 'react-markdown'
import type {ComponentProps, ElementType} from 'react'
import CodeBlock from './CodeBlock';
import {slugify} from 'remark-obsidious';
import { Blockquote } from './Blockquote';
import CalloutTitle from './CalloutTitle';
import { DataAttributes } from '../../utils/getDataAttributes';
import EmbeddedMarkdown from './EmbeddedMarkdown';
import { MarkdownImage } from './MarkdownImage';
import { styled, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  fontWeight: 300,
  fontSize: '.8rem',
  fontFamily: 'monospace',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.primary.main,

  '&:nth-of-type(odd) > td': {
    // backgroundColor: 'rgba(164, 92, 92, 0.05)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottomWidth: 0,
    borderBottomStyle: 'none',
    borderBottomColor: 'transparent !important',
  },
}));

const StyledTableHead = styled(TableHead)(() => ({
  [`& > tr > th`]: {
    fontWeight: 800,
    fontSize: '1rem',
    textEmphasis: 'bold',
    textTransform: 'Capitalize',
    padding: '1.2rem',
    backgroundColor: 'none',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'inherit',
  [`& > thead`]: {
    borderBottomWidth: '0.5rem',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.primary.main,
  },
  ['& > tbody > tr > td']: {
    padding: '1rem',
  },
}));


export type MarkdownComponent = {
  [Key in Extract<ElementType, string>]?: ElementType<ComponentProps<Key> & ExtraProps>
}
export type ExtendedComponentProps = ComponentProps<any> & ExtraProps & { dataAttributes?: DataAttributes };

const getHeaderVariant = (variant:'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' , props: ExtendedComponentProps) => {
  const variantProps = {
    variant, component: 
    variant, gutterBottom: true, 
    id: slugify(String(props.children) || variant.toString()),
    ...(props)
  };
  return (<Typography {...variantProps} />)
}


export const MarkdownComponents: MarkdownComponent = {
  h1: (props: ComponentProps<'h1'>) => (getHeaderVariant('h1', props)),
  h2: (props: ComponentProps<'h2'>) => (getHeaderVariant('h2', props)),
  h3: (props: ComponentProps<'h3'>) => (getHeaderVariant('h3', props)),
  h4: (props: ComponentProps<'h4'>) => (getHeaderVariant('h4', props)),
  h5: (props: ComponentProps<'h5'>) => (getHeaderVariant('h5', props)),
  h6: (props: ComponentProps<'h6'>) => (getHeaderVariant('h6', props)),
  ul: (props: ComponentProps<'ul'>) => <Typography component="ul" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <Typography component="ol" {...props} />,
  li: (props: ComponentProps<'li'>) => <Typography component="li" {...props} />,
  hr: (props: ComponentProps<'hr'>) => <hr {...props} />,
  code: CodeBlock,
  blockquote: Blockquote,
  img: MarkdownImage,
  p: (props: ExtendedComponentProps) => {
    if (props['data-callout']) return <CalloutTitle {...props} />;
    return <Typography variant="body2" component={'p'} {...props} />;
  },
  div: (props: ExtendedComponentProps) => {
    if (props.className?.includes('obsidian-md-embed')) {
      const {'data-file-id': id, 'data-hash-params': hash} = props;
      if (!id || !hash) return;
      return <EmbeddedMarkdown fileid={id} hash={hash} {...props}/>;
    }
    return <div {...props}/>;
  },
  table: ({ ...rest }: ExtendedComponentProps) => {
    return (
      <TableContainer sx={{ my: 4, borderRadius: 1.5 }}>
        <StyledTable {...rest} />
      </TableContainer>
    );
  },
  thead: ({ ...rest }) => {
    return <StyledTableHead {...rest} />;
  },
  tr: ({ ...rest }) => {
    return <StyledTableRow {...rest} />;
  },
  td: ({ ...rest }) => {
    const { align, ...filteredRest } = rest;
    return <StyledTableCell {...(align === 'char' ? filteredRest : rest)} />;
  },



}