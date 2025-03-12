import { Alert, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { fetchImageByWebPath } from '../utils/fetchImageByWebPath';


const ImageComponent = () => {
  const {src,meta} = Route.useLoaderData();
  
  if (!src || !meta)
    return (
      <Container>
        <Alert sx={{ marginTop: 'auto' }} variant="filled" severity="error">
          Image was not found
        </Alert>
      </Container>
    );
  return (
    <Container sx={{}}>
      <ImageList variant="standard" cols={1} gap={8}>
        <ImageListItem key={meta?.id} sx={{ cursor: 'auto' }}>
          <img src={src} alt={meta?.label} loading="lazy" />
          <ImageListItemBar title={meta?.label} position="bottom" />
        </ImageListItem>
      </ImageList>
    </Container>
  );
};

export const Route = createFileRoute('/images_/$')({
  loader: ({ params }) => fetchImageByWebPath({ webPath: `images/${params._splat}` || '404' }),
  component: ImageComponent,
});
