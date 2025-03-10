import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { forwardRef } from 'react';

/**
 * https://tanstack.com/router/latest/docs/framework/react/guide/link-options
 */
type MUILinkProps = Omit<ButtonProps, 'href'>;

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>((props, ref) => (
  <Button component={'a'} ref={ref} {...props} />
));

MUILinkComponent.displayName = 'MUILinkComponent'; // name is used when debugging

const CreatedLinkComponent = createLink(MUILinkComponent);

export const MarkdownLink: LinkComponent<typeof MUILinkComponent> = (props) => (
  <CreatedLinkComponent preload={'intent'} {...props} />
);

export const StyledMarkdownLink = styled(MarkdownLink, {
  shouldForwardProp: (_prop) => true,
})(({ theme }) => ({
  // color: theme.palette.text.primary,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.error.main,
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
  '&:visited': {
    color: theme.palette.text.secondary,
  },
}));
