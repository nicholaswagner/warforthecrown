import { Divider, styled, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ReactNode } from 'react';

import slugify from '../lib/slugify'
import { Blockquote } from './md/Blockquote';
import CodeBlock from './md/CodeBlock';
import { MarkdownImage } from './md/MarkdownEmbed';
import CalloutTitle from './md/CalloutTitle';

type ComponentProps = {
  children?: ReactNode;
  className?: string;
  inline?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any;
  ['data-title']?: string;
  ['data-callout']?: string;
  ['data-collapsible']?: string;
  ['data-collapsed']?: string;
  href?: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.divider,
  // borderBottomColor: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  fontWeight: 300,
  fontSize: '.8rem',
  fontFamily: 'monospace',
  // backgroundColor: theme.palette.primary.main,
  // color: theme.palette.common.white,
  // color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.primary.main,
  // borderBottomColor: theme.palette.secondary.main,

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
    // color: theme.palette.primary.main,
    textTransform: 'Capitalize',
    padding: '1.2rem',
    backgroundColor: 'none',
    // backgroundColor: 'rgb(26, 27, 38)',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'inherit',
  [`& > thead`]: {
    // width: '100%',
    // padding: '10rem',
    borderBottomWidth: '0.5rem',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.primary.main,

    // backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.background.paper,

    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: theme.palette.grey[300],
    // backgroundColor: theme.palette.primary.main,
    // backgroundColor: 'transparent',
    // color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  ['& > tbody > tr > td']: {
    padding: '1rem',
  },
}));


// export const StyledLink = styled('a', {
//   shouldForwardProp: (prop) => prop !== 'to',
// })(({ theme }) => ({
//   // color: theme.palette.text.primary,
//   color: theme.palette.common.white,
//   backgroundColor: theme.palette.error.main,
//   textDecoration: 'underline',
//   '&:hover': {
//     textDecoration: 'underline',
//     color: theme.palette.primary.main,
//   },
//   '&:visited': {
//     color: theme.palette.text.secondary,
//   },
// }));

export const MarkdownComponents = {
  h1: (props: ComponentProps) => {
    return (
      <Typography
        variant="h1"
        component={'h1'}
        gutterBottom
        sx={{ mt: 4 }}
        id={slugify(String(props.children) || 'h1')}
        {...props}
      />
    );
  },
  h2: (props: ComponentProps) => (
    <Typography variant="h2" component={'h2'} gutterBottom id={slugify(String(props.children) || 'h2')} {...props} />
  ),
  h3: (props: ComponentProps) => (
    <Typography variant="h3" component={'h3'} gutterBottom id={slugify(String(props.children) || 'h3')} {...props} />
  ),
  h4: (props: ComponentProps) => (
    <Typography variant="h4" component={'h4'} gutterBottom id={slugify(String(props.children) || 'h4')} {...props} />
  ),
  h5: (props: ComponentProps) => (
    <Typography variant="h5" component={'h5'} gutterBottom id={slugify(String(props.children) || 'h5')} {...props} />
  ),
  h6: (props: ComponentProps) => (
    <Typography variant="h6" component={'h6'} gutterBottom id={slugify(String(props.children) || 'h6')} {...props} />
  ),
  ul: (props: ComponentProps) => <Typography component="ul" {...props} />,
  ol: (props: ComponentProps) => <Typography component="ol" {...props} />,
  li: (props: ComponentProps) => <Typography component="li" {...props} />,
  hr: (props: ComponentProps) => <Divider sx={{ marginY: 6 }} {...props} />,
  break: (props: ComponentProps) => <br {...props} />,
  code: CodeBlock,
  img: MarkdownImage,
  blockquote: Blockquote,
  span: ({ children, ...props }: ComponentProps) => {
    return <span {...props}>{children}</span>;
  },
  p: (_props: ComponentProps) => {
    if (_props['data-callout']) {
      return <CalloutTitle {..._props} />;
    }
    return <span {..._props} />;
    // return <p {..._props} />;
    // return (
    //   <Typography
    //     variant="body2"
    //     component={'span'}
    //     color="textPrimary"
    //     sx={{
    //       textJustify: 'inter-word',
    //       // margin: '1rem',
    //       padding: '1rem',
    //     }}
    //     {..._props}
    //   >
    //     {_props.children}
    //   </Typography>
    // );
  },
  // blockquote: (props: ComponentProps) => {
  //   console.log(props.node.hProperties);
    
  //   const { node, children, ['data-callout']: type, ['data-collapsible']: collapsible, ['data-title']: title, ...rest } = props;
  //   return (
  //     <Callout type={type} {...rest} {...(node.data?.hProperties || {})}>
  //       {children}
  //     </Callout>
  //   );
  // },
  table: ({ ...rest }: ComponentProps) => {
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
    return <StyledTableCell {...rest} />;
  },
};
