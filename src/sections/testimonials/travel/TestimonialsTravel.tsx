import Slider from 'react-slick';
import { useRef } from 'react';
// icons
import quotesIcon from '@iconify/icons-carbon/quotes';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Stack, Box, Avatar } from '@mui/material';
// @types
import { TestimonialProps } from '../../../@types/testimonial';
// components
import { Iconify, CarouselArrows } from '../../../components';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  testimonials: TestimonialProps[];
};

export default function TestimonialsTravel({ testimonials }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);

  const carouselSettings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={12}>
            <Typography
              variant="h2"
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              What Our Customer Say
            </Typography>

            <Slider ref={carouselRef} {...carouselSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Slider>
          </Grid>
        </Grid>

        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            mt: 6,
            justifyContent: { xs: 'center', md: 'unset' },
          }}
        />
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type TestimonialItemProps = {
  testimonial: TestimonialProps;
};

function TestimonialItem({ testimonial }: TestimonialItemProps) {
  const { name, review, avatar } = testimonial;

  return (
    <Stack
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    >
      <Iconify
        icon={quotesIcon}
        sx={{ width: 48, height: 48, opacity: 0.48, color: 'primary.main' }}
      />
      <Typography
        sx={{
          mt: 2,
          mb: 5,
          lineHeight: 1.75,
          fontSize: { md: 20 },
        }}
      >
        {review}
      </Typography>

      <Stack spacing={1.5} alignItems="center" direction="row">
        <Avatar
          src={ngrokapi + avatar}
          sx={{
            width: 64,
            height: 64,
          }}
        />
        <Box sx={{ width: 8, height: 9, bgcolor: 'primary.main', borderRadius: '50%' }} />
        <Typography variant="h6">{name}</Typography>
      </Stack>
    </Stack>
  );
}
