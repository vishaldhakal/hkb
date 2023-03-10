// @mui
import { Typography, Stack, Avatar } from '@mui/material';
// @types
import { TestimonialProps } from '../../../@types/testimonial';
// components
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

type Props = {
  testimonial: TestimonialProps;
  isSelected?: boolean;
};

export function TestimonialsElearningContentItem({ testimonial }: Props) {
  const { review } = testimonial;

  return (
    <Stack alignItems="center">
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          mb: 5,
          textAlign: 'center',
          lineHeight: 1.75,
          fontSize: { xs: 18, md: 20 },
        }}
      >
        {review}
      </Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function TestimonialsElearningThumbnailItem({ testimonial, isSelected }: Props) {
  const { avatar } = testimonial;

  return (
    <Stack
      sx={{
        width: 96,
        height: 96,
        mx: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        src={ngrokapi + avatar}
        sx={{
          width: 48,
          height: 48,
          opacity: 0.48,
          cursor: 'pointer',
          transition: (theme) => theme.transitions.create('all'),
          ...(isSelected && {
            opacity: 1,
            transform: 'scale(2)',
          }),
        }}
      />
    </Stack>
  );
}
