import { useState } from 'react';
// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
import chevronDown from '@iconify/icons-carbon/chevron-down';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  BoxProps,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListSubheaderProps,
  ListItemButtonProps,
} from '@mui/material';
// components
import { Iconify } from '../components';
import { NavItemProps } from '../@types/layout';

// ----------------------------------------------------------------------

interface ListSubheaderStyleProps extends ListSubheaderProps {
  children?: React.ReactNode;
}

const ListSubheaderStyle = styled((props: ListSubheaderStyleProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

interface ListItemStyleProps extends ListItemButtonProps {
  activeRoot?: boolean;
  activeSub?: boolean;
}

const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub',
})<ListItemStyleProps>(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: 22,
    height: 22,
  },
});

interface ListSubItemIconStyleProps extends BoxProps {
  active?: boolean;
}

const ListSubItemIconStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListSubItemIconStyleProps>(({ theme }) => ({
  width: 4,
  height: 4,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create('transform'),
}));

// ----------------------------------------------------------------------

interface NavSectionProps extends BoxProps {
  item: NavItemProps;
  handleDrawerClose: () => void;
}

export default function NavSection({ item, handleDrawerClose, ...other }: NavSectionProps) {
  const { children } = item;
  return (
    <Box {...other}>
      {children &&
        children.map((list) => (
          <List key={list.subheader} onClick={handleDrawerClose} disablePadding sx={{ px: 0 }}>
            <NextLink href={`${list.path}`} passHref>
              <ListSubheaderStyle>{list.subheader}</ListSubheaderStyle>
            </NextLink>
            {list.items &&
              list.items.map((item) => (
                <NavSectionItem
                  handleDrawerClose={handleDrawerClose}
                  key={item.title}
                  item={item}
                />
              ))}
          </List>
        ))}
    </Box>
  );
}

// ----------------------------------------------------------------------
type ItemProps = {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
};

type NavSectionItemProps = {
  item: ItemProps;
  handleDrawerClose: () => void;
};

function NavSectionItem({ item }: NavSectionItemProps) {
  const { pathname, asPath } = useRouter();

  const { title, path, icon, info, children } = item;
  const isActiveRoot = pathname === path || asPath === path;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (children) {
    return (
      <>
        <ListItemStyle onClick={handleOpen} activeRoot={isActiveRoot}>
          {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify icon={open ? chevronDown : chevronRight} sx={{ width: 16, height: 16, ml: 1 }} />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = pathname === path || asPath === path;

              return (
                <NextLink key={title} href={path} passHref>
                  <ListItemStyle activeSub={isActiveSub}>
                    <ListItemIconStyle>
                      <ListSubItemIconStyle component="span" active={isActiveSub} />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle activeRoot={isActiveRoot}>
        {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemStyle>
    </NextLink>
  );
}
