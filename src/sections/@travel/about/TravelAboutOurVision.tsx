// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Grid, Card, Box } from '@mui/material';
// components
import { Image } from '../../../components';

// ----------------------------------------------------------------------

const VISIONS = [
  {
    name: 'Discover',
    description: 'Inspiring travelers to discover the beauty of the Himalayas.',
  },
  {
    name: 'Explore',
    description: 'Enabling adventurers to explore the best hiking destinations in the region.',
  },
  {
    name: 'Experience',
    description: 'Providing resources for a memorable and unforgettable hiking experience.',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function TravelAboutOurVision() {
  return (
    <RootStyle>
      <Container>
        <Stack
          sx={{
            maxWidth: 466,
            mb: { xs: 8, md: 5 },
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">
            Our{' '}
            <Box component="span" color="primary.main">
              Mission
            </Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Guiding You on Your Journey to Discover the Heart of the Himalayas
          </Typography>
        </Stack>

        <Grid
          container
          spacing={{ xs: 8, md: 3 }}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
        >
          <Grid item xs={12} md={6} lg={5}>
            <Image
              alt="vision"
              src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_vision.svg"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Stack
              sx={{
                position: 'relative',
              }}
              alignItems={{ md: 'flex-end' }}
            >
              {VISIONS.map((vision, index) => {
                const { name, description } = vision;
                const firstVision = index === 0;
                const secondVision = index === 1;
                const thirdVision = index === 2;

                return (
                  <Card
                    key={name}
                    sx={{
                      p: 4,
                      mt: 4,
                      width: { md: 'calc(50% - 16px)' },
                      ...(firstVision && {
                        top: { md: 0 },
                        left: { md: 0 },
                        bottom: { md: 0 },
                        my: { md: 'auto' },
                        boxShadow: { md: 0 },
                        maxHeight: { md: 304 },
                        display: { md: 'flex' },
                        position: { md: 'absolute' },
                        flexDirection: { md: 'column' },
                        justifyContent: { md: 'center' },
                      }),
                      ...(secondVision && {
                        boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
                      }),
                      ...(thirdVision && {
                        boxShadow: { md: 0 },
                      }),
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="h2"
                      sx={{ color: 'text.disabled', opacity: 0.24, mb: 3 }}
                    >
                      {`0${index + 1}`}
                    </Typography>

                    <Typography variant="h4" paragraph>
                      {name}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
                  </Card>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
