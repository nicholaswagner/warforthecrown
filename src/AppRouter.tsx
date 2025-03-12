import { Alert } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { fetchImageByLabelSlug } from './utils/fetchImageByLabelSlug';
import { fetchMarkdownForWebPath } from './utils/fetchMarkdownForWebPath';

// Handle GitHub Pages redirect **before** router creation
// const searchParams = new URLSearchParams(window.location.search);
// const redirect = searchParams.get('redirect');
// const history = createBrowserHistory();
// if (redirect) {
//   history.push(redirect);
// }

export const router = createRouter({
  basepath: '/warforthecrown/',
  // history,
  routeTree,
  context: {
    fetchMarkdownForWebPath: fetchMarkdownForWebPath,
    fetchImage: fetchImageByLabelSlug,
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