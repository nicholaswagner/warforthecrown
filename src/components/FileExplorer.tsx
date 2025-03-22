import { alpha, styled } from '@mui/material';
import { useTreeViewApiRef } from '@mui/x-tree-view';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { ChevronDown, ChevronRight, FileIcon } from 'lucide-react';
import { useState } from 'react';

import { SIDEBAR_WIDTH } from '../AppConstants';
import { slugify, ObsidiousVault, slugifyFilepath, ObsidiousVaultImageFiletypes } from 'remark-obsidious';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    ['&.Mui-expanded']: {
      backgroundColor: 'transparent !important', //alpha(theme.palette.primary.main, 0.1),
    },
    [`&:hover`]: {
      backgroundColor: 'transparent !important', //alpha(theme.palette.primary.main, 0.1),
    },
    [`&.Mui-selected`]: {
      backgroundColor: alpha(theme.palette.primary.main, 1) + ' !important',
      color: theme.palette.primary.contrastText,
      fontWeight: 700,
      [`& .${treeItemClasses.iconContainer}`]: {
        padding: 0,
        margin: 0,
        transform: 'scale(0.8)',
        color: theme.palette.primary.contrastText,
      },
    },
    [`& .${treeItemClasses.label}`]: {
      fontSize: '1rem',
      fontWeight: 300,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    padding: 0,
    margin: 0,
    transform: 'scale(0.8)',
    color: theme.palette.primary.main,
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 7,
    borderLeft: `1px dashed ${alpha(theme.palette.primary.main, 1)}`,
    backgroundColor: 'none',
  },
}));

const StyledTreeView = styled(RichTreeView)(() => ({
  position: 'sticky',
  top: 40,
  left: 0,
  overflowY: 'scroll',
  height: '100vh',
  backgroundColor: 'background.paper',
  width: SIDEBAR_WIDTH,
}));

const FileExplorer = () => {
  const apiRef = useTreeViewApiRef();
  const navigate = useNavigate();
  const {basepath,latestLocation} = useRouter();
  const pathIds = latestLocation.pathname.replace(basepath, '')
    .split('/')
    .map((path) => {
      if (path === '') return;
      const fileMeta = ObsidiousVault.getFileForWebPathSlug(slugify(path))
      return fileMeta?.id;
    })
    .filter((id) => id !== undefined);

  const expandedIds = pathIds.slice(0, -1);
  const selectedId = pathIds.at(-1);
  const [expandedItems, setExpandedItems] = useState<string[]>(expandedIds);
  const [selectedItem, setSelectedItem] = useState<string>(selectedId || '');

  return (
    <StyledTreeView
      apiRef={apiRef}
      selectedItems={selectedItem}
      expandedItems={expandedItems}
      onSelectedItemsChange={(_event, itemIds) => {
        if (typeof itemIds === 'string') setSelectedItem(itemIds);
      }}
      onExpandedItemsChange={(_event, ids) => setExpandedItems((prev) => [...prev.filter((ids) => !ids.includes(ids)), ...ids])}
      experimentalFeatures={{
        indentationAtItemLevel: true,
      }}
      itemChildrenIndentation={0}
      slots={{
        expandIcon: ChevronRight,
        collapseIcon: ChevronDown,
        endIcon: FileIcon,
        item: CustomTreeItem,
      }}
      items={ObsidiousVault.getFileTree()}
      onItemClick={(_, itemId) => {
        const file = ObsidiousVault.getFileForId(itemId);
        if (!file) return;
        // images is a special case
        if (file.label === 'images') navigate({
          to: `/${slugifyFilepath(file.filepath)}`,
          resetScroll: true,
        });

        if (file.extension && file.extension in ObsidiousVaultImageFiletypes){
          
          navigate({to: `/images/${slugify(file.label)}`});
          return;
        }

        
        
        if(file.fileType !== 'file') return;


        navigate({
          to: `/${slugifyFilepath(file.filepath, file.extension)}`,
          resetScroll: true,
        });
      }}
    />
  );
};

export default FileExplorer;
