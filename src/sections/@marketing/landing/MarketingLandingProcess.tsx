// icons
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Container, Typography, Card, Box } from '@mui/material';
// components
import { Iconify, SvgIconStyle } from '../../../components';
import NextLink from 'next/link';
import Routes from '../../../routes';
import { Button } from '@mui/material';
// ----------------------------------------------------------------------

const SERVICES = [
  {
    name: 'Inquiry handling',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_sketch_design.svg',
  },
  {
    name: 'Itinerary planning',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_search.svg',
  },
  {
    name: 'Booking confirmation',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_optimization.svg',
  },
  {
    name: 'Post-travel follow-up',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_analysis.svg',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),

  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

export default function MarketingLandingProcess() {
  return (
    <RootStyle>
      <Container>
        <Stack
          sx={{
            textAlign: { xs: 'unset', md: 'center' },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Work Flow
          </Typography>

          <Typography variant="h2">
            Working{' '}
            <Box component="span" color="primary.main">
              Process
            </Box>
          </Typography>

          <Typography sx={{ mt: 2, color: 'text.secondary' }}>
            Simplifying Your Journey: A Four-Step Travel Workflow
          </Typography>
        </Stack>

        <Box
          sx={{
            alignItems: 'flex-end',
            display: 'grid',
            gap: 4,
            my: { xs: 8, md: 10 },

            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {SERVICES.map((service, index) => (
            <ServiceItem key={service.name} service={service} index={index} />
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <NextLink href={Routes.bookTrip.bookTripForm} passHref>
            <Button
              size="large"
              variant="contained"
              sx={{
                color: 'common.black',
                minWidth: '160px',
              }}
            >
              Book Now
            </Button>
          </NextLink>
        </Box>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type ServiceItemProps = {
  service: {
    name: string;
    icon: string;
  };
  index: number;
};

function ServiceItem({ service, index }: ServiceItemProps) {
  const { name, icon } = service;

  return (
    <Card
      sx={{
        p: 1,
        color: (theme) => theme.palette.text.primary,
        boxShadow: (theme) => `0px 4px 4px 0px ${alpha(theme.palette.common.black, 0.2)}`,
      }}
    >
      <SvgIconStyle
        src={icon}
        sx={{
          width: 64,
          height: 64,
          opacity: 1,
          color: (theme) => theme.palette.primary.main,
          m: 1,
        }}
      />

      <Stack
        component={'h3'}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mt: 3, typography: 'h6', opacity: 0.8 }}
      >
        {name}
        {index !== 3 && (
          <Iconify icon={directionStraightRight} sx={{ width: 22, height: 22, ml: 1, mr: 0 }} />
        )}
      </Stack>
    </Card>
  );
}
