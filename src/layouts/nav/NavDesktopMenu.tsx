import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  List,
  Link,
  Stack,
  ListItem,
  BoxProps,
  ListItemProps,
  ListSubheader,
  ListSubheaderProps,
  Button,
} from '@mui/material';
// config
import { HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../config';
// @types
import { NavDesktopMenuProps } from '../../@types/layout';
//
import { Image, CarouselDots, CarouselArrows, BgOverlay } from '../../components';
import { DialogAnimate, MotionContainer, varFade } from '../../components/animate';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface SubLinkStyleProps extends ListItemProps {
  active?: boolean;
}

interface IconBulletStyleProps extends BoxProps {
  active?: boolean;
}

const SubLinkStyle = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<SubLinkStyleProps>(({ active, theme }) => ({
  ...theme.typography.body3,
  padding: 0,
  width: 'auto',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary,
  },
  ...(active && {
    ...theme.typography.subtitle3,
    color: theme.palette.text.primary,
  }),
}));

const IconBulletStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<IconBulletStyleProps>(({ active, theme }) => ({
  width: 12,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: '""',
    display: 'block',
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
  },
  ...(active && {
    '&:before': {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }),
}));

const ListSubheaderStyled = styled((props: ListSubheaderProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(2.5),
  color: theme.palette.text.primary,
}));

// ----------------------------------------------------------------------

export default function NavDesktopMenu({
  lists,
  isOpen,
  onClose,
  isScrolling,
}: NavDesktopMenuProps) {
  const router = useRouter();

  const theme = useTheme();

  const carouselRef = useRef<Slider | null>(null);

  const carouselList = lists.filter((list) => list.subheader !== 'Quick Links');

  const commonList = lists.filter((list) => list.subheader === 'Quick Links')[0];

  const minList = lists.length > 5;

  const carouselSettings = {
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: carouselList.length > 5 ? 5 : carouselList.length,
    slidesToScroll: 1,
    ...CarouselDots(),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <DialogAnimate
      hideBackdrop
      maxWidth={false}
      open={isOpen}
      onClose={onClose}
      variants={
        varFade({
          distance: 80,
          durationIn: 0.16,
          durationOut: 0.24,
          easeIn: 'easeIn',
          easeOut: 'easeOut',
        }).inRight
      }
      PaperProps={{
        sx: {
          m: 0,
          maxWidth: 1,
          position: 'absolute',
          borderRadius: '0 !important',
          top: isScrolling ? HEADER_DESKTOP_HEIGHT - 20 : HEADER_DESKTOP_HEIGHT,
          // Fix scroll on window
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
      }}
    >
      <Grid container columns={15} spacing={4}>
        <Grid item xs={commonList ? 12 : 15}>
          <Box sx={{ position: 'relative', px: 2, py: 6 }}>
            <Slider ref={carouselRef} {...carouselSettings}>
              {carouselList.map((list) => {
                const { subheader, items, cover, path } = list;

                const path_card = path ? path : '';

                return (
                  <List key={subheader} disablePadding sx={{ px: 2 }} component={MotionContainer}>
                    {cover ? (
                      <NextLink href={path_card} passHref>
                        <Box
                          component={m.a}
                          variants={varFade({ distance: 80 }).inLeft}
                          sx={{ display: 'block', position: 'relative' }}
                        >
                          <BgOverlay
                            endColor="rgba(0,0,0,0)"
                            startColor="rgba(0,0,0,1)"
                            midColor="rgba(0,0,0,0) 40%"
                            direction="top"
                            sx={{
                              borderRadius: 1.5,
                              transition: (theme) =>
                                theme.transitions.create('opacity', {
                                  easing: theme.transitions.easing.sharp,
                                  duration: theme.transitions.duration.short,
                                }),
                            }}
                          />
                          <ListSubheaderStyled
                            sx={{
                              position: 'absolute',
                              zIndex: (theme) => theme.zIndex.fab,
                              bottom: 0,
                              left: 0,
                              backgroundColor: 'transparent',
                              padding: '20px 20px 0 20px',
                              boxSizing: 'border-box',
                              color: (theme) => theme.palette.common.white,
                            }}
                          >
                            {subheader}
                          </ListSubheaderStyled>
                          <Image
                            alt={cover}
                            src={ngrokapi + cover}
                            sx={{
                              mb: 2.5,
                              height: 220,
                              borderRadius: 1.5,
                              cursor: 'pointer',
                              transition: theme.transitions.create('opacity'),
                              border: (theme) => `solid 1px ${theme.palette.divider}`,
                              '&:hover': { opacity: 0.8 },
                            }}
                          />
                        </Box>
                      </NextLink>
                    ) : (
                      <Box
                        sx={{
                          mb: 2.5,
                          typography: 'h5',
                          color: 'text.primary',
                        }}
                      >
                        {subheader}
                      </Box>
                    )}

                    <DisplayChildren items={items} />
                  </List>
                );
              })}
            </Slider>

            {minList && (
              <CarouselArrows
                onNext={handleNext}
                onPrevious={handlePrevious}
                sx={{
                  top: -28,
                  position: 'relative',
                  justifyContent: 'flex-end',
                }}
              />
            )}
          </Box>
        </Grid>
        {/* Common List */}
        {commonList && (
          <Grid
            item
            xs={3}
            sx={{
              borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <List disablePadding sx={{ py: 6 }} component={MotionContainer}>
              <ListSubheaderStyled>{commonList.subheader}</ListSubheaderStyled>
              <Stack spacing={1.5} alignItems="flex-start">
                {commonList.items &&
                  commonList.items.map((item) => {
                    const { title, path } = item;
                    const active = router.pathname === path;

                    return <LinkItem key={title} title={title} href={path} active={active} />;
                  })}
              </Stack>
            </List>
          </Grid>
        )}
      </Grid>
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type LinkItemProps = {
  title: string;
  href: string;
  active: boolean;
};

function LinkItem({ title, href, active }: LinkItemProps) {
  return (
    <NextLink key={title} href={href} passHref>
      <Link
        color="inherit"
        underline="hover"
        component={m.a}
        variants={
          varFade({
            distance: 12,
            durationIn: 0.16,
            durationOut: 0.12,
            easeIn: 'easeIn',
          }).inRight
        }
      >
        <SubLinkStyle active={active}>
          <IconBulletStyle active={active} />
          {title}
        </SubLinkStyle>
      </Link>
    </NextLink>
  );
}

type Props = {
  items:
    | {
        title: string;
        path: string;
      }[]
    | undefined;
};

const DisplayChildren = ({ items }: Props) => {
  const [size, setSize] = useState(4);
  const router = useRouter();
  return (
    <Stack spacing={1.5} alignItems="flex-start">
      {items?.slice(0, size)?.map((item) => {
        const { title, path } = item;

        const active = router.pathname === path || router.asPath === path;

        return <LinkItem key={title} title={title} href={path} active={active} />;
      })}
      {items && items?.length > 4 && (
        <>
          {!(size === items.length) ? (
            <Button
              color="secondary"
              disableFocusRipple
              disableElevation
              onClick={() => setSize(items.length)}
            >
              <Typography variant="caption">View More</Typography>
            </Button>
          ) : (
            <Button
              color="secondary"
              disableFocusRipple
              disableElevation
              onClick={() => setSize(4)}
            >
              <Typography variant="caption">View Less</Typography>
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};
