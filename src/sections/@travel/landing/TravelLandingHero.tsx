import Slider from 'react-slick';
import { useRef, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Typography, Button, Box, Container, Divider, Slide } from '@mui/material';
// components
import {
  Image,
  BgOverlay,
  TextMaxLine,
  CarouselArrows,
  varHover,
  varTranHover,
} from '../../../components';
import { m } from 'framer-motion';
import { useBoundingClientRect, useResponsive } from '../../../hooks';
import { ActivityProps } from '../../../@types/activity/activity';
import Routes from '../../../routes';
import cssStyles from '../../../utils/cssStyles';
import { Grid } from '@mui/material';
import { ngrokapi } from '../../../config';
import { HEROCONTENTPROPS } from '../../../../pages';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  activities_list: ActivityProps[];
  hero_content: HEROCONTENTPROPS;
};

const CarouselArrowsStyle = styled(CarouselArrows)(({ theme }) => ({
  '& button': {
    borderRadius: '50%',
    border: `solid 2px ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: '10px',
    '& button': {
      borderRadius: '50%',
      border: `solid 2px ${theme.palette.common.white}`,
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.primary.main,
        border: `solid 2px ${theme.palette.primary.main}`,
        // background: theme.palette.common.white,
      },
    },
  },
}));

const RootStyle = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  minHeight: '100vh',

  padding: theme.spacing(10, 0, 12, 0),
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    padding: theme.spacing(20, 0),
  },
}));

const ContainerStyle = styled(Container)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
}));

export default function TravelLandingHero({ activities_list, hero_content }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const [selected, setSelected] = useState(0);

  const carouselThumbnailSettings = {
    speed: 1440,
    autoplaySpeed: 3000,
    autoplay: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,

    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setSelected(next),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const carouselRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <>
      <RootStyle
        sx={{
          ...cssStyles(theme).bgImage({
            url: `${ngrokapi}${hero_content.hero_section_image}`,
            direction: 'top',
            endColor: 'rgba(0,0,0,0)',
            midColor: 'rgba(0,0,0,0)',
            startColor: 'rgba(0,0,0,1) 30%',
          }),
        }}
      >
        <ContainerStyle maxWidth={false} sx={{ ml: { md: 2, xs: 0 }, mt: { md: 6, xs: 18 } }}>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12} md={6} sx={{ zIndex: 9 }}>
              <Stack
                sx={{
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: { md: 5, xs: 3 },
                  }}
                >
                  {hero_content.hero_title_line1} <br />
                  <Box component="span" color="primary.main">
                    {hero_content.hero_title_line2.split(' ').slice(0, 2).join(' ')}{' '}
                  </Box>
                  {hero_content.hero_title_line2.split(' ').slice(2).join(' ')}
                  <br />
                  <Box component="span" color="primary.main">
                    {hero_content.hero_title_line3.split(' ').slice(0, 2).join(' ')}{' '}
                  </Box>
                  {hero_content.hero_title_line3.split(' ').slice(2).join(' ')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: { md: 8, xs: 5 }, maxWidth: { md: '580px', xs: 1 } }}
                >
                  {hero_content.hero_section_subtitle}
                </Typography>

                <Stack spacing={{ md: 3, xs: 2 }} direction={{ md: 'row', xs: 'column' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      width: 'fit-content',
                      color: 'common.black',
                    }}
                    href={'/activities'}
                  >
                    View All Packages
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{ width: 'fit-content' }}
                    href={Routes.bookTrip.bookTripForm}
                  >
                    Book A Trip
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box ref={containerRef} />
            </Grid>
          </Grid>
        </ContainerStyle>

        {isDesktop && activities_list.length && (
          <Box
            sx={{
              pl: `${offsetLeft}px`,
              width: { md: `calc(100%)` },
              position: 'absolute',
              bottom: { md: '18%', xl: '15%' },
            }}
          >
            <Box
              sx={{
                width: { md: `calc(100% + 120px)` },
              }}
            >
              <Slider {...carouselThumbnailSettings} ref={carouselRef}>
                {activities_list.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      ml: '-1px',
                      pl: { xs: 0, md: 2 },
                      pr: { xs: 2, md: 0 },
                      color: 'common.white',
                      overflow: 'hidden',
                    }}
                  >
                    <ThumbnailItem activity={activity} />
                  </Box>
                ))}
              </Slider>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 3,
                pr: 3,
              }}
            >
              <CarouselArrowsStyle onNext={handleNext} onPrevious={handlePrevious} />

              <Box
                sx={{
                  width: `calc((100%/${activities_list.length + 1}) * ${selected})`,
                  transition: 'width 1s',
                  ml: 3,
                }}
              >
                <Divider
                  sx={{
                    border: (theme) => `3px solid ${theme.palette.primary.main}`,
                    borderRadius: '2px',
                  }}
                />
              </Box>
              <Box
                flex={1}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.common.white}`,
                  mr: 3,
                }}
              />
              <Typography
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
                variant="h2"
              >
                {' '}
                {selected + 1}
              </Typography>
            </Box>
          </Box>
        )}
      </RootStyle>

      {!isDesktop && activities_list.length && (
        <Container
          sx={{
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          <Grid item xs={12} md={4}>
            <Stack
              sx={{
                padding: theme.spacing(6, 0),
              }}
            >
              <Typography variant="h2">
                Our{' '}
                <Typography variant="h2" component="span" sx={{ color: 'primary.main' }}>
                  activities
                </Typography>
              </Typography>
              <Typography variant="overline" paragraph sx={{ color: 'text.disabled' }}>
                Your next trip in a swipe
              </Typography>
            </Stack>
          </Grid>
          <Box
            sx={{
              pb: 2,
              background: (theme) => theme.palette.background.neutral,
            }}
          >
            <Box
              sx={{
                color: 'common.white',
              }}
            >
              <Slider {...carouselThumbnailSettings} ref={carouselRef}>
                {activities_list.map((activity) => (
                  <Box key={activity.id}>
                    <ThumbnailItem activity={activity} />
                  </Box>
                ))}
              </Slider>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  m: 2,
                  mx: 0,
                }}
              >
                <CarouselArrowsStyle
                  sx={{
                    button: {
                      border: '2px solid black',
                      color: 'black',
                      '&:hover': {
                        border: (theme) => `2px solid ${theme.palette.primary.main}`,

                        color: (theme) => theme.palette.primary.main,
                      },
                    },
                  }}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.common.black,
                  }}
                  variant="h2"
                >
                  {' '}
                  {selected + 1}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
type ItemProps = {
  activity: ActivityProps;
};

function ThumbnailItem({ activity }: ItemProps) {
  const { image, title, subtitle, slug } = activity;

  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  return (
    <Link
      href={Routes.activities.activity(slug)}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Box
        component={m.div}
        whileHover="hover"
        variants={varHover(0.95)}
        transition={varTranHover()}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        sx={{
          position: 'relative',
          overflow: 'hidden !important',
          height: 1,
          maxWidth: 330,
          cursor: 'pointer',
        }}
      >
        <BgOverlay
          direction="top"
          midColor="rgba(0,0,0,0) 30%"
          endColor="rgba(0,0,0,0)"
          startColor="rgba(0,0,0,1)"
          sx={{
            opacity: 0.9,
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.short,
              }),
            '&:hover': { opacity: 1 },
          }}
        >
          <Box
            sx={{
              zIndex: 9,
              bottom: 10,
              left: 10,
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              justifyContent: 'center',
            }}
          >
            {showTitle && (
              <TextMaxLine variant="button" color="primary.main" line={1}>
                {title}
              </TextMaxLine>
            )}
            <Slide
              direction="up"
              in={show}
              mountOnEnter
              unmountOnExit
              onEnter={() => setShowTitle(false)}
              onExited={() => setShowTitle(true)}
            >
              <Stack>
                <TextMaxLine variant="button" color="primary.main" line={1}>
                  {title}
                </TextMaxLine>
                <TextMaxLine variant="caption" line={3}>
                  {subtitle}
                </TextMaxLine>
              </Stack>
            </Slide>
          </Box>
        </BgOverlay>

        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden !important',
            height: { md: 270, xs: 230 },
          }}
        >
          <m.div variants={varHover(1.15)} transition={varTranHover()}>
            <Image
              src={ngrokapi + image}
              alt={title}
              sx={{
                objectFit: 'cover',
                height: { md: 270, xs: 230 },
                width: 1,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            />
          </m.div>
        </Box>
      </Box>
    </Link>
  );
}
