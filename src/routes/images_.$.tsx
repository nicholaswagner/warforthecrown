import { Alert, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { ObsidiousVault } from 'remark-obsidious';



  
const ImageComponent = () => {
  const data = Route.useLoaderData();
  const vaultItem = ObsidiousVault.getFileForWebPathSlug(data);

  if (!vaultItem) throw new Error(`no vault item for found for webPath: ${data}`);
  const prefix = `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/");
  const src = `${prefix}${vaultItem?.filepath}`.replace(/\/\//g, "/");

  return (
    <Container sx={{}}>
      <ImageList variant="standard" cols={1} gap={8}>
        <ImageListItem key={vaultItem?.id} sx={{ cursor: 'auto' }}>
          <img src={src} alt={vaultItem?.label} loading="lazy" />
          <ImageListItemBar title={vaultItem?.label} position="bottom" />
        </ImageListItem>
      </ImageList>
    </Container>
  );
};

const errorComponent = ({ error }: { error: Error }) => {
  const src = error.message.includes('webPath') ? error.message.split(': ')[1] : 'unknown';
  return (
    <Container>
      <Alert sx={{ marginTop: '25vh', marginBottom: 'auto' }} variant="filled" severity="error">
        {error.message} for {src}
      </Alert>
    </Container>
  );
}

export const Route = createFileRoute('/images_/$')({
  loader: ({ params }) => `images/${params._splat}`,
  errorComponent,
  component: ImageComponent,
});
