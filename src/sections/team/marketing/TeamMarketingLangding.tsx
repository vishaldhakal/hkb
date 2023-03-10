import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// hooks
import { useBoundingClientRect } from '../../../hooks';
// @types
import { TeamMemberPropsHBHB } from '../../../@types/team';
// components
import { CarouselArrows, CarouselDots } from '../../../components';
//
import TeamMarketingMember from './TeamMarketingMember';
import Routes from '../../../routes';
import NextLink from 'next/link';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  ...cssStyles(theme).bgImage(),
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    padding: theme.spacing(20, 0),
  },
}));

const ContainerStyle = styled(Container)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    left: 0,
    right: 0,
    marginBottom: 0,
    position: 'absolute',
    height: 'calc(100% - 320px)',
  },
}));

const CarouselArrowsStyle = styled(CarouselArrows)(({ theme }) => ({
  display: 'none',
  '& button': {
    borderRadius: '50%',
    border: `solid 1px ${alpha(theme.palette.primary.main, 0.24)}`,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    bottom: 0,
    display: 'block',
  },
}));

// ----------------------------------------------------------------------

type Props = {
  members: TeamMemberPropsHBHB[];
};

export default function TeamMarketingLangding({ members }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 3,
        mr: 4,
        display: { md: 'none' },
      },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <ContainerStyle>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Stack sx={{ textAlign: { xs: 'left', md: 'unset' }, pl: { xs: 2, md: 0 } }}>
              <Typography variant="overline" sx={{ color: 'grey.600' }}>
                Team
              </Typography>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                Meet
                <br />
                Our Hive
              </Typography>
              <Typography sx={{ color: 'common.white', mt: 2 }}>
                Expertise, Experience and Passion for Travel
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>

        <CarouselArrowsStyle onNext={handleNext} onPrevious={handlePrevious} />
      </ContainerStyle>

      <Box
        sx={{
          pl: `${offsetLeft}px`,
          width: { md: `calc(100% + 120px)` },
        }}
      >
        <Slider ref={carouselRef} {...carouselSettings}>
          {members.map((member) => (
            <NextLink key={member.id} href={Routes.about.team_single(member.id)}>
              <Box
                sx={{
                  ml: { xs: '1px', md: '-1px' },
                  pl: { xs: 2, md: 2 },
                  pr: { xs: 4, md: 2 },
                  color: 'common.white',
                }}
              >
                <TeamMarketingMember member={member} />
              </Box>
            </NextLink>
          ))}
        </Slider>
      </Box>
    </RootStyle>
  );
}
