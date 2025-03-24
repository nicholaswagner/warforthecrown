import { Box, Dialog, DialogContent, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { CircleXIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {ObsidiousVault, ObsidiousVaultItem} from 'remark-obsidious';




const ImagesComponent = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<ObsidiousVaultItem | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  


  const images = useMemo(() => ObsidiousVault.getAllImageFiles(),[]);
  const prefix = `${import.meta.env.BASE_URL}${import.meta.env.VITE_FILEPATH_PREFIX}`.replace(/\/\//g, "/");

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

  const handleClickImage = (image: ObsidiousVaultItem) => {
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

  const DialogImage = ({ image }: { image: ObsidiousVaultItem }) => {

    const url = `${prefix}${image.filepath}`.replace(/\/\//g, "/");

    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <IconButton sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2000 }} onClick={() => setOpen(false)}>
          <CircleXIcon />
        </IconButton>
        <DialogContent>
          <ImageListItem onClick={() => handleClickImage(image)} sx={{ cursor: 'pointer' }}>
            <img
              srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${url}?w=248&fit=crop&auto=format`}
              alt={image.label}
              loading="lazy"
            />
            <ImageListItemBar title={image.label} position="bottom" />
          </ImageListItem>
        </DialogContent>
      </Dialog>
    );
  };

  const ImageListItems = useMemo(() => images.map((image) => {
    const url = `${prefix}${image.filepath}`.replace(/\/\//g, "/");
    return (
    <ImageListItem key={image.id} id={image.id} onClick={() => handleClickImage(image)} sx={{ cursor: 'pointer' }}>
      <img
        srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${url}?w=248&fit=crop&auto=format`}
        alt={image.label}
        loading="lazy"
      />
    </ImageListItem>
  )
}),[images]);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }} overflow={'scroll'}>
        {image && <DialogImage image={image} />}
        <ImageList variant="masonry" cols={5} gap={8}>
          {ImageListItems}
        </ImageList>
      </Box>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute('/images/')({
  component: ImagesComponent,
});
