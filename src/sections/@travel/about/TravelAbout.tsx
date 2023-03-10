// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// _data
import _mock from '../../../../_data/mock';
// components
import { Image, CountUpNumber } from '../../../components';

// ----------------------------------------------------------------------

const IMAGES = [...Array(4)].map((_, index) => _mock.image.travel(index + 2));

const SUMMARY = [
  { name: 'Air tickets sold', number: 130 },
  { name: 'Tours booked', number: 196 },
  { name: 'Site visitors', number: 10679 },
  { name: 'Verified hotels', number: 877 },
];

// ----------------------------------------------------------------------

export default function TravelAbout() {
  return (
    <Container
      sx={{
        mb: 7,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h1" sx={{ mb: 0.5 }}>
            About <br />
            <Box component="span" color="primary.main">
              Hiking Bees
            </Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Discovering the Beauty of the World, One Journey at a Time
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {IMAGES.map((img, index) => (
          <Grid
            key={img}
            item
            xs={12}
            sm={6}
            md={index === 0 ? 6 : 2}
            sx={{
              ...((index === 1 || index === 2 || index === 3) && {
                display: { xs: 'none', sm: 'block' },
              }),
            }}
          >
            <Image alt={img} src={img} sx={{ height: 350, borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: { xs: 8, md: 10 },
          mb: { xs: 8, md: 15 },
          textAlign: 'center',
          display: 'grid',
          rowGap: 5,
          columnGap: 3,
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value) => (
          <div key={value.name}>
            <Typography variant="h2" gutterBottom>
              <CountUpNumber
                start={value.number / 5}
                end={value.number}
                formattingFn={(value: number) => fShortenNumber(value)}
              />

              <Typography
                variant="h4"
                component="span"
                sx={{ verticalAlign: 'top', ml: 0.5, color: 'primary.main' }}
              >
                +
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {value.name}
            </Typography>
          </div>
        ))}
      </Box>

      <Grid container spacing={{ xs: 5, md: 3 }} justifyContent="space-between">
        <Grid item xs={12} md={6} lg={5}>
          <Box
            sx={{
              mb: 2,
              width: 24,
              height: 3,
              borderRadius: 3,
              bgcolor: 'primary.main',
              mx: { xs: 'auto', md: 0 },
            }}
          />
          <Typography variant="h3">
            Embark on a journey of discovery in the Himalayas with Hiking Bees.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" paragraph>
            Your Guide to Exploring the Himalayas
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Hiking Bees Travel is your ultimate guide to exploring the breathtaking landscapes of
            the Himalayas. From the rolling hills of Nepal to the soaring peaks of Tibet, Bhutan,
            and India, we offer a wealth of information and resources for travelers looking to
            immerse themselves in nature.
            <br />
            <br />
            Whether you&apos;re a seasoned hiker or a beginner, our expert advice and top-notch gear
            recommendations will help make your journey unforgettable. Join us on a journey of
            discovery in the heart of the Himalayas.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
