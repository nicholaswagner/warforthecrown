import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import MarkdownItem from '../components/MarkdownItem';
import { usePreviewModal } from '../hooks/usePreviewModal';
import { PreviewModal } from '../components/PreviewModal';
import { ExtendedComponentProps } from '../components/MarkdownComponent/MarkdownComponents';
import { fetchVaultItemForWebPath } from '../utils/fetchVaultItemforWebPath';

function RouteComponent() {
  const { text } = Route.useLoaderData();
  const { preview, isVisible, handleMouseEnter, handleMouseClick } = usePreviewModal();

 
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {isVisible && <PreviewModal {...preview} onClick={handleMouseClick} />}
      <MarkdownItem 
        componentOverrides={
          { a: (props: ExtendedComponentProps) => <a {...props} onMouseEnter={handleMouseEnter} />
        }} children={text} />
    </Box>
  );
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => fetchVaultItemForWebPath(
    { webPath: 'readme' }),
  notFoundComponent: () => <h1>404</h1>,
});
