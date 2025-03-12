import { Box, Dialog, DialogContent, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { CircleXIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CDN_PREFIX } from '../AppConstants';
import { FileTreeNode } from '../types/FileTreeNode';
import { getAllImageIds, getFileById } from '../utils/getFileByLabelSlug';
type ImageData = Omit<FileTreeNode, 'children'>;

const ImagesComponent = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<ImageData | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const images = getAllImageIds().map((id) => getFileById(id));

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(location.hash);
      if (!element) return;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      element.click();
      setOpen(true);
    }, 300);
  }, [location.hash]);

  const handleClickImage = (image: ImageData) => {
    setOpen(false);
    setImage(image);

    if (location.hash !== image.id) {
      navigate({
        to: `/images#${image.id}`,
      });
    } else {
      setOpen(true);
    }
  };

  const DialogImage = ({ image }: { image: ImageData }) => {
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <IconButton sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2000 }} onClick={() => setOpen(false)}>
          <CircleXIcon />
        </IconButton>
        <DialogContent>
          <ImageListItem onClick={() => handleClickImage(image)} sx={{ cursor: 'pointer' }}>
            <img
              srcSet={`${CDN_PREFIX}${image.filepath}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${CDN_PREFIX}${image.filepath}?w=248&fit=crop&auto=format`}
              alt={image.label}
              loading="lazy"
            />
            <ImageListItemBar title={image.label} position="bottom" />
          </ImageListItem>
        </DialogContent>
      </Dialog>
    );
  };

  const ImageListItems = images.map((item) => (
    <ImageListItem key={item.id} id={item.id} onClick={() => handleClickImage(item)} sx={{ cursor: 'pointer' }}>
      <img
        srcSet={`${CDN_PREFIX}${item.filepath}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${CDN_PREFIX}${item.filepath}?w=248&fit=crop&auto=format`}
        alt={item.label}
        loading="lazy"
      />
    </ImageListItem>
  ));

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }} overflow={'scroll'}>
        <Typography variant="caption">Images</Typography>
        {image && <DialogImage image={image} />}
        <ImageList variant="masonry" cols={5} gap={8}>
          {ImageListItems}
        </ImageList>
      </Box>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute('/images')({
  component: ImagesComponent,
});
