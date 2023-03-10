// icons
import locationIcon from '@iconify/icons-carbon/location';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Box } from '@mui/material';
// components
import {
  Image,
  BgOverlay,
  Iconify,
  TextMaxLine,
  TextIconLabel,
  varHover,
  varTranHover,
} from '../../../components';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const LINES = [
  'Expertise in trekking and hiking',
  'Tailor-made itineraries',
  'Professional guides',
  'Quality accommodation and transport',
  'Responsible tourism',
  'Comprehensive services',
];

{
  /*
Expertise in trekking and hiking: Hiking Bees is a specialized travel company that has extensive experience and knowledge in trekking and hiking in Nepal. They can provide expert guidance and support on the best routes and itineraries to suit your needs and abilities.

Tailor-made itineraries: Hiking Bees can create customized itineraries based on your specific interests and preferences, ensuring that you get the most out of your trip.

Professional guides: Hiking Bees employs experienced and professional guides who are knowledgeable about the local culture, history and environment. They can provide valuable insights and information about the places you visit.

Quality accommodation and transport: Hiking Bees partners with reputable local hotels and transportation providers to ensure that you have comfortable and safe accommodations and transportation throughout your trip.

Responsible tourism: Hiking Bees is committed to sustainable and responsible tourism, ensuring that their activities have a positive impact on the local communities and environment.

Comprehensive services: Hiking Bees provides a wide range of services, including trekking and hiking, cultural tours, jungle safaris, and mountaineering expeditions. They can also assist with visa, flight, and insurance arrangements, making your trip planning and preparation easy and stress-free.


  */
}
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

type DestinationProps = {
  id: string;
  title: string;
  location: string;
  coverImg: string;
};

const favourite_destinations = [
  {
    id: 'kathmandu',
    title: 'Kathmandu',
    location: 'Kathmandu, Nepal',
    coverImg: '/destinations/kathmandu.jpg',
  },
  {
    id: 'pokhara',
    title: 'Pokhara',
    location: 'Pokhara, Nepal',
    coverImg: '/destinations/pokhara.jpg',
  },
  {
    id: 'chitwan',
    title: 'Chitwan National Park',
    location: 'Chitwan, Nepal',
    coverImg: '/destinations/chitwan.jpg',
  },
  {
    id: 'everest',
    title: 'Everest Base Camp',
    location: 'Everest Region, Nepal',
    coverImg: '/destinations/everest.jpg',
  },
];

export default function TravelLandingFavoriteDestinations() {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={{ xs: 8, md: 3 }}
          alignItems={{ md: 'start' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Grid item xs={12} md={4}>
            <Typography variant="h2">
              Our{' '}
              <Box component="span" color="primary.main">
                Favorite{' '}
              </Box>
              Destinations
            </Typography>
            <Typography sx={{ mb: 4, mt: 2, color: 'text.secondary' }}>
              Why choose us as a Traveling partner?
            </Typography>

            <Stack
              spacing={1}
              component={'ul'}
            >
              {LINES.map((line) => (
                <Box
                key={line}
                component={'li'}
                  sx={{
                    mr: 2,
                    borderRadius: '50%',
                  }}
                >
                  {line}
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              {favourite_destinations.map((destination, index) => (
                <Grid key={destination.id} item xs={12} sm={index === 0 || index === 3 ? 8 : 4}>
                  <DestinationItem destination={destination} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type DestinationItemProps = {
  destination: DestinationProps;
};

function DestinationItem({ destination }: DestinationItemProps) {
  const { location, title, coverImg } = destination;

  return (
    <Box
      component={m.div}
      whileHover="hover"
      variants={varHover(1)}
      transition={varTranHover()}
      sx={{
        width: 1,
        height: '220px',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BgOverlay
        direction="top"
        midColor="rgba(0,0,0,0) 40%"
        endColor="rgba(0,0,0,0)"
        startColor="rgba(0,0,0,1)"
      />
      <m.div
        variants={varHover(1.25)}
        transition={varTranHover()}
        style={{
          objectFit: 'contain',
          height: '100%',
        }}
      >
        <Image
          alt={location}
          src={coverImg}
          sx={{
            objectFit: 'contain',
            height: '1',
            width: '1',
          }}
        />
      </m.div>

      <Stack
        spacing={1}
        sx={{
          px: 2,
          pb: 1,
          left: 0,
          bottom: 0,
          zIndex: 9,
          color: 'common.white',
          position: 'absolute',
        }}
      >
        <TextIconLabel
          icon={
            <Iconify icon={locationIcon} sx={{ width: 16, height: 16, color: 'primary.main' }} />
          }
          value={
            <TextMaxLine variant="body3" line={1} sx={{ color: 'primary.main' }}>
              {location}
            </TextMaxLine>
          }
        />
        <TextMaxLine
          variant="h6"
          line={1}
          sx={{
            m: '0 !important',
            boxSizing: 'border-box',
            p: 0,
          }}
        >
          {title}
        </TextMaxLine>
      </Stack>
    </Box>
  );
}
