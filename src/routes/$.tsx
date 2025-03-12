import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import { Markdown } from '../components/Markdown';
import { TableOfContents } from '../components/TableOfContents';
import { fetchMarkdownForWebPath } from '../utils/fetchMarkdownForWebPath';

function RouteComponent() {
  const { text } = Route.useLoaderData();

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        width: '100%',
      }}
    >
      <Markdown sxProps={{ width: 'inherit', paddingTop: '4rem' }}>{text}</Markdown>
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
        <TableOfContents />
      </Box>
    </Box>
  );
}

export const Route = createFileRoute('/$')({
  loader: ({ params }) => {
    return fetchMarkdownForWebPath({ webPath: params._splat || '404' })},
  component: RouteComponent,
});
