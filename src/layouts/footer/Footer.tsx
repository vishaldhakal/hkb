import { useRef, useState } from 'react';
// icons
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronRight from '@iconify/icons-carbon/chevron-right';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  Divider,
  Collapse,
  Container,
  LinkProps,
  Typography,
  FilledInput,
  InputAdornment,
  CardMedia,
} from '@mui/material';
// hooks
import { useResponsive } from '../../hooks';
// components
import { Logo, Iconify, Image, CarouselArrows } from '../../components';
//
import { FooterLinks } from '../nav/NavConfig';
import Slider from 'react-slick';
import { NewsletterTravel } from '../../sections/newsletter';

// ----------------------------------------------------------------------

const LinkStyle = styled((props: LinkProps) => <Link target="_blank" rel="noopener" {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body3,
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  })
);

export const Affiliations = [
  {
    title: 'Nepal Tourism Board',
    img: '/affiliations/ntb.png',
  },
  {
    title: "Expedition Operator's Association ",
    img: '/affiliations/eoa.jpg',
  },
  {
    title: 'Himalayan Rescue Association',
    img: '/affiliations/hra.png',
  },
  {
    title: 'Nepal Mountaineering Association',
    img: '/affiliations/nma.png',
  },
  {
    title: 'Government of Nepal',
    img: '/affiliations/gon.png',
  },
  {
    title: 'TAAn',
    img: '/affiliations/taan.png',
  },
];

// ----------------------------------------------------------------------
const CarouselArrowsStyle = styled(CarouselArrows)(({ theme }) => ({
  position: 'unset',
  justifyContent: 'center',
  '& button': {
    borderRadius: '50%',
    border: `solid 2px ${theme.palette.divider}`,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
  },
}));

export default function Footer() {
  const isDesktop = useResponsive('up', 'md');
  const carouselRef1 = useRef<Slider | null>(null);
  const carouselRef2 = useRef<Slider | null>(null);

  const theme = useTheme();

  const handlePrevious1 = () => {
    carouselRef1.current?.slickPrev();
  };

  const handleNext1 = () => {
    carouselRef1.current?.slickNext();
  };

  const handlePrevious2 = () => {
    carouselRef2.current?.slickPrev();
  };

  const handleNext2 = () => {
    carouselRef2.current?.slickNext();
  };

  const carouselSettings = {
    arrows: false,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const lists = FooterLinks.filter((list) => list.subheader !== 'Coming Soon');

  const renderLists = isDesktop
    ? lists
    : lists.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  return (
    <>
      <NewsletterTravel />
      <Divider />
      <Container sx={{ py: { xs: 8, md: 10 } }} maxWidth={'xl'}>
        <Grid container spacing={4} justifyContent={{ md: 'space-between' }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Our Affiliations</Typography>
                <Box sx={{ position: 'relative', width: 1 }}>
                  <CarouselArrowsStyle
                    onNext={handleNext1}
                    onPrevious={handlePrevious1}
                    sx={{
                      '& .arrow.left': { left: { lg: -10 }, opacity: { xs: 1, md: 0 } },
                      '& .arrow.right': { right: { lg: -10 }, opacity: { xs: 1, md: 0 } },
                      '&:hover': {
                        '& .arrow.left': { opacity: 1 },
                        '& .arrow.right': { opacity: 1 },
                      },
                    }}
                  >
                    <Stack spacing={3}>
                      <Slider ref={carouselRef1} {...carouselSettings}>
                        {Affiliations.map((company) => (
                          <Box
                            key={company.title}
                            sx={[
                              {
                                width: { sm: 'fit-content !important', xs: '100%' },
                                my: 2,
                                height: 80,
                                borderRadius: 2,
                                backgroundColor: 'transparent',
                                transition: (theme) => theme.transitions.create('box-shadow'),
                              },
                            ]}
                          >
                            <CardMedia
                              component="img"
                              title={company.title}
                              image={company.img}
                              sx={{
                                height: '100%',
                                mr: 6,
                                width: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </Slider>
                    </Stack>
                  </CarouselArrowsStyle>
                </Box>
              </Stack>
              <Stack alignItems="flex-start">
                <Logo />
                <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                  Find your perfect destination and book your dream vacation with us
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">Let’s stay in touch</Typography>
                  <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                    Subscribe to our newsletter to receive latest articles to your inbox weekly.
                  </Typography>
                </Stack>
                <FilledInput
                  placeholder="Email address"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" size="small" sx={{ py: '9px' }}>
                        Subscribe
                      </Button>
                    </InputAdornment>
                  }
                  sx={{
                    pr: 0.5,
                    width: { md: '60%', xs: 1 },
                    '& .MuiFilledInput-input': { py: '14px' },
                  }}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h6">We Accept</Typography>
                <Image
                  src="/CreditCards.gif"
                  alt="card details"
                  sx={{
                    width: '50%',
                  }}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h6">Recommended by</Typography>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{
                    display: 'flex',
                    justifyItems: 'start',
                  }}
                  alignItems="center"
                >
                  <Image
                    src="/tripadvisor.png"
                    alt="card details"
                    sx={{
                      width: { md: 0.3, xs: 0.4 },
                      mr: 2,
                    }}
                  />

                  <Image
                    src="/trust-pilot.svg"
                    alt="trust pilot"
                    sx={{
                      width: { md: 0.25, xs: 0.4 },
                      mb: 0.5,
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack spacing={2}>
                <Typography variant="h6">Our Partners</Typography>
                <Box sx={{ position: 'relative', width: 1 }}>
                  <CarouselArrowsStyle
                    onNext={handleNext2}
                    onPrevious={handlePrevious2}
                    sx={{
                      '& .arrow.left': { left: { lg: -10 }, opacity: { xs: 1, md: 0 } },
                      '& .arrow.right': { right: { lg: -10 }, opacity: { xs: 1, md: 0 } },
                      '&:hover': {
                        '& .arrow.left': { opacity: 1 },
                        '& .arrow.right': { opacity: 1 },
                      },
                    }}
                  >
                    <Stack spacing={3}>
                      <Slider ref={carouselRef2} {...carouselSettings}>
                        {Affiliations.map((company) => (
                          <Box
                            key={company.title}
                            sx={[
                              {
                                width: { sm: 'fit-content !important', xs: '100%' },
                                my: 2,
                                height: 80,
                                borderRadius: 2,
                                backgroundColor: 'transparent',
                                transition: (theme) => theme.transitions.create('box-shadow'),
                              },
                            ]}
                          >
                            <CardMedia
                              component="img"
                              title={company.title}
                              image={company.img}
                              sx={{
                                height: '100%',
                                mr: 6,
                                width: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </Slider>
                    </Stack>
                  </CarouselArrowsStyle>
                </Box>
              </Stack>
              {isDesktop ? (
                <>
                  <Grid container spacing={3}>
                    {renderLists.map((list) => (
                      <Grid item md={4} key={list.subheader}>
                        <ListDesktop list={list} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <Stack spacing={1.5}>
                  {renderLists.map((list) => (
                    <ListMobile key={list.subheader} list={list} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()}. All rights reserved
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="body3" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

type ListProps = {
  list: {
    subheader: string;
    items?: {
      title: string;
      path: string;
    }[];
  };
};

function ListDesktop({ list }: ListProps) {
  const { subheader, items } = list;

  return (
    <Stack alignItems="flex-start" sx={{ pb: { md: 1 } }}>
      <Typography variant="h6">{subheader}</Typography>
      {items?.map((link) => (
        <LinkStyle key={link.title} href={link.path}>
          {link.title}
        </LinkStyle>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function ListMobile({ list }: ListProps) {
  const { subheader, items } = list;

  const [expand, setExpand] = useState(false);

  const onExpand = () => {
    setExpand(!expand);
  };

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="h6"
        onClick={onExpand}
        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {subheader}
        <Iconify
          icon={expand ? chevronDown : chevronRight}
          sx={{ width: 20, height: 20, ml: 0.5 }}
        />
      </Typography>

      <Collapse in={expand} sx={{ width: 1 }}>
        <Box
          sx={{
            display: 'grid',
            rowGap: 1,
            columnGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {items?.map((link) => (
            <LinkStyle key={link.title} href={link.path}>
              {link.title}
            </LinkStyle>
          ))}
        </Box>
      </Collapse>
    </Stack>
  );
}
