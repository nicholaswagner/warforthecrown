import { Alert } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
// import { fetchImageByLabelSlug } from './utils/fetchImageByLabelSlug';
import { fetchMarkdownForWebPath } from './utils/fetchMarkdownForWebPath';


export const router = createRouter({
  basepath: import.meta.env.BASE_URL,
  routeTree,
  context: {
    fetchMarkdownForWebPath: fetchMarkdownForWebPath,
    // fetchImage: fetchImageByLabelSlug,
  },
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
  defaultNotFoundComponent: () => (
    <h1>
      <Alert variant="filled">404</Alert>
    </h1>
  ),
});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};