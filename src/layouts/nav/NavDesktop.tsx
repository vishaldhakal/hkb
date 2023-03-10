import { useState, useEffect } from 'react';
// icons
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronUp from '@iconify/icons-carbon/chevron-up';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, LinkProps } from '@mui/material';
// @types
import { NavProps, NavItemDesktopProps } from '../../@types/layout';
// components
import { Iconify } from '../../components';
//
import NavDesktopMenu from './NavDesktopMenu';

// ----------------------------------------------------------------------

interface RootLinkStyleProps extends LinkProps {
  open?: boolean;
  scrolling?: boolean;
  transparent?: boolean;
}

const RootLinkStyle = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'scrolling' && prop !== 'transparent' && prop !== 'open',
})<RootLinkStyleProps>(({ scrolling, transparent, open, theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: theme.typography.fontWeightBold,
  display: 'flex',
  color: theme.palette.common.black,
  border: '0px solid transparent',
  position: 'relative',
  alignItems: 'center',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0px',
    height: '3px',
    left: '50%',
    bottom: '0',
    backgroundColor: theme.palette.primary.main,
    transition: 'all ease-in-out .2s',
  },
  '&:hover': {
    opacity: 0.9,
    textDecoration: 'none',
    transition: 'all ease-in-out .2s',
    '&:after': {
      width: '100%',
      left: '0',
    },
  },
  ...(transparent && { color: theme.palette.common.white }),

  ...(scrolling && { color: theme.palette.text.primary }),

  ...(open && {
    opacity: 0.9,
    textDecoration: 'none',
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    transition: 'all ease-in-out .2s',
    ...(scrolling && { color: theme.palette.secondary.main }),
  }),
}));

// ----------------------------------------------------------------------

export default function NavDesktop({ isScrolling, isTransparent, navConfig }: NavProps) {
  return (
    <Stack
      direction="row"
      sx={{
        color: 'text.secondary',
        ...(isTransparent && {
          color: 'inherit',
        }),
        ...(isScrolling && {
          color: 'text.secondary',
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        mx: { md: 10, xs: 4, lg: 16 },
      }}
    >
      {navConfig.map((link) => (
        <NavItemDesktop
          key={link.title}
          item={link}
          isScrolling={isScrolling}
          isTransparent={isTransparent}
        />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function NavItemDesktop({ item, isScrolling, isTransparent }: NavItemDesktopProps) {
  const { title, path, children } = item;

  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <RootLinkStyle
          onClick={handleOpen}
          open={open}
          scrolling={isScrolling}
          transparent={isTransparent}
        >
          {title}
          <Iconify
            icon={open ? chevronUp : chevronDown}
            sx={{
              ml: 0.2,
              width: 16,
              height: 16,
            }}
          />
        </RootLinkStyle>

        <NavDesktopMenu
          lists={children}
          isOpen={open}
          onClose={handleClose}
          isScrolling={isScrolling}
        />
      </>
    );
  }

  // if (title === 'Documentation') {
  //   return (
  //     <RootLinkStyle
  //       href={path}
  //       target="_blank"
  //       rel="noopener"
  //       scrolling={isScrolling}
  //       transparent={isTransparent}
  //     >
  //       {title}
  //     </RootLinkStyle>
  //   );
  // }

  return (
    <NextLink key={title} href={path || ''} passHref>
      <RootLinkStyle scrolling={isScrolling} transparent={isTransparent}>
        {title}
      </RootLinkStyle>
    </NextLink>
  );
}
