import { useState, useEffect } from 'react';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
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
  Stack,
  Button,
  Drawer,
  Collapse,
  ListItemText,
  ListItemButton,
  ListItemButtonProps,
} from '@mui/material';
// routes
import Routes from '../../routes';
import Phone from '@iconify/icons-carbon/phone';
// config
import { DRAWER_WIDTH } from '../../config';
// @types
import { NavProps, NavItemMobileProps } from '../../@types/layout';
// components
import { Logo, Scrollbar, Iconify, NavSection } from '../../components';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

const RootLinkStyle = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function NavMobile({ navConfig, sx }: NavProps) {
  const { pathname } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate color="default" onClick={handleDrawerOpen} sx={sx}>
        <Iconify icon={menuIcon} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Scrollbar>
          <Box sx={{ px: 2.5, py: 3, lineHeight: 0 }}>
            <Logo />
          </Box>

          <List sx={{ px: 0 }}>
            {navConfig.map((link) => (
              <NavItemMobile handleDrawerClose={handleDrawerClose} key={link.title} item={link} />
            ))}
          </List>
          <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
            <NextLink href={Routes.loginIllustration} passHref>
              <Button variant="outlined" size="small" href={Routes.bookTrip.bookTripForm}>
                Plan Your Trip
              </Button>
            </NextLink>
            <NextLink href="tel:+977 9860617338" passHref>
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={Phone} sx={{ width: 16, height: 16 }} />}
              >
                +977 9860617338
              </Button>
            </NextLink>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

function NavItemMobile({ item, handleDrawerClose }: NavItemMobileProps) {
  const { title, path, children } = item;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (children) {
    return (
      <>
        <RootLinkStyle onClick={handleOpen}>
          <ListItemText disableTypography primary={title} />
          <Iconify icon={open ? chevronDown : chevronRight} sx={{ width: 16, height: 16, ml: 1 }} />
        </RootLinkStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              item={item}
              handleDrawerClose={handleDrawerClose}
              sx={{
                // Root
                position: 'relative',
                '&:before': {
                  top: 0,
                  bottom: 0,
                  height: 0.96,
                  my: 'auto',
                  left: 20,
                  width: '1px',
                  content: "''",
                  bgcolor: 'divider',
                  position: 'absolute',
                },
                '& .MuiListSubheader-root': { mb: 1 },
                '& .MuiListItemButton-root': {
                  backgroundColor: 'transparent',
                  '&:before': { display: 'none' },
                },
                // Sub
                '& .MuiCollapse-root': {
                  '& .MuiList-root': {
                    '&:before': {
                      top: 0,
                      bottom: 0,
                      left: 40,
                      my: 'auto',
                      height: 0.82,
                      width: '1px',
                      content: "''",
                      bgcolor: 'divider',
                      position: 'absolute',
                    },
                  },
                  '& .MuiListItemButton-root': {
                    pl: 8,
                    '& .MuiListItemIcon-root, .MuiTouchRipple-root': {
                      display: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  // if (title === 'Documentation') {
  //   return (
  //     <Link href={path} underline="none" target="_blank" rel="noopener">
  //       <RootLinkStyle>
  //         <ListItemText disableTypography primary={title} />
  //       </RootLinkStyle>
  //     </Link>
  //   );
  // }

  return (
    <NextLink key={title} href={path || ''} passHref>
      <RootLinkStyle>
        <ListItemText disableTypography primary={title} />
      </RootLinkStyle>
    </NextLink>
  );
}
