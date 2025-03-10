import { Alert, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

import { fetchImageForSlug } from '../utils/fetchImage';

const ImageComponent = () => {
  const { image, meta } = Route.useLoaderData();

  if (!image || !meta)
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
          <img src={image} alt={meta?.label} loading="lazy" />
          <ImageListItemBar title={meta?.label} position="bottom" />
        </ImageListItem>
      </ImageList>
    </Container>
  );
};

export const Route = createFileRoute('/images_/$imageId')({
  loader: ({ params: { imageId } }) => fetchImageForSlug({ path: imageId }),
  component: ImageComponent,
});
