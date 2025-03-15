import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { fetchMarkdownForWebPath } from '../utils/fetchMarkdownForWebPath';
import { Markdown } from '../components/Markdown';

function RouteComponent() {
  const { text } = Route.useLoaderData();
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%' }}>
      <Markdown sxProps={{ width: 'inherit', paddingTop: '4rem' }}>{text}</Markdown>
    </Box>
  );
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => fetchMarkdownForWebPath({ webPath: 'readme' }),
  notFoundComponent: () => <h1>404</h1>,
});
