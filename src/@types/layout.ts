import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type NavProps = {
  isScrolling?: boolean | undefined;
  isTransparent?: boolean | undefined;
  navConfig: NavItemProps[];
  sx?: SxProps;
};

export type NavItemChildProps = {
  subheader: string;
  cover?: string;
  path?: string;
  items?: {
    title: string;
    path: string;
  }[];
};

export type NavItemProps = {
  title: string;
  path?: string;
  children?: NavItemChildProps[];
};

export type NavItemDesktopProps = {
  item: NavItemProps;
  isScrolling: boolean | undefined;
  isTransparent: boolean | undefined;
};

export type NavItemMobileProps = {
  item: NavItemProps;
  handleDrawerClose: () => void;
};

export type NavDesktopMenuProps = {
  lists: NavItemChildProps[];
  isOpen: boolean;
  isScrolling: boolean | undefined;
  onClose: VoidFunction;
};
