// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import { Image } from '../../../components';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    title: 'Expertise and Experience',
    description: 'Years of experience planning trips worldwide.',
    iconColor: 'primary',
  },
  {
    title: 'Best Price Guarantee',
    description: 'Get the best prices on your vacation.',
    iconColor: 'secondary',
  },
  {
    title: 'Flexible Booking Options',
    description: 'Change or cancel bookings with no penalty.',
    iconColor: 'primary',
  },
  {
    title: '24/7 Customer Support',
    description: 'Assistance available at any time. We are always here.',
    iconColor: 'primary',
  },
  {
    title: 'Safety and Security',
    description: 'Prioritize your safety and security. Your trust worthy travel partner.',
    iconColor: 'secondary',
  },
  {
    title: 'Dedicated Specialists',
    description: 'Specialists for different destinations and travel types.',
    iconColor: 'primary',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function MarketingServicesBenefits() {
  return (
    <RootStyle>
      <Container>
        <Stack
          sx={{
            mx: 'auto',
            textAlign: { md: 'center', xs: 'left' },
            mb: { xs: 8, md: 15 },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Why us
          </Typography>
          <Typography variant="h2">
            Why Hiking{' '}
            <Box component="span" color="primary.main">
              Bees?
            </Box>
          </Typography>
          <Typography sx={{ mt: 2, opacity: 0.72 }}>
            Experience Nepal&apos;s beauty like never before with us.
          </Typography>
        </Stack>

        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          }}
        >
          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(0, 3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} reverse />
            ))}
          </Stack>

          <Image
            alt="benefits"
            src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_benefits.svg"
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(-3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} />
            ))}
          </Stack>
        </Box>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type BenefitItemProps = {
  index: number;
  reverse?: boolean;
  benefit: {
    title: string;
    description: string;
    iconColor: string;
  };
};

function BenefitItem({ benefit, reverse, index }: BenefitItemProps) {
  const { title, description, iconColor } = benefit;
  return (
    <Stack
      spacing={1}
      direction={{ xs: 'row', md: reverse ? 'row-reverse' : 'row' }}
      sx={{
        ...(reverse && {
          textAlign: { md: 'right' },
        }),
        ...(index === 1 && {
          pl: { md: 6 },
          ...(reverse && {
            pl: { md: 0 },
            pr: { md: 6 },
          }),
        }),
      }}
    >
      <Box
        sx={{
          m: 1,
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: '50%',
          background: (theme) => theme.palette.gradients.primary,
          ...(iconColor === 'secondary' && {
            background: (theme) => theme.palette.gradients.secondary,
          }),
          ...(iconColor === 'success' && {
            background: (theme) => theme.palette.gradients.success,
          }),
        }}
      />
      <Stack spacing={1}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
