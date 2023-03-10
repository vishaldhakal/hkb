// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Box, CardMedia } from '@mui/material';
// components

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: theme.palette.background.neutral,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  brands: {
    img: string;
    title: string;
  }[];
};

export default function OurPartners({ brands }: Props) {
  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gap: 0.5,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(1, 1fr)',
            },
          }}
        >
          <Typography variant="h2">
            Our{' '}
            <Box component="span" color="primary.main">
              Partners
            </Box>
          </Typography>

          <Stack spacing={2}>
            <Typography paragraph sx={{ color: 'text.secondary' }}>
              Partnering with Trusted Organizations for a Safe and Memorable Journey
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              At Hiking Bees Travel, we are committed to providing travelers with a safe and
              unforgettable experience in the Himalayas. That&apos;s why we have partnered with
              trusted organizations in Nepal, Tibet, Bhutan, and India to offer the best possible
              services to our clients. From experienced local guides to top-notch gear providers,
              our partnerships ensure that our clients have the support they need to make the most
              of their journey. Join us on a journey of discovery and experience the beauty of the
              Himalayas with confidence.
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            display: 'grid',
            rowGap: { xs: 4, md: 5 },
            columnGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {brands.map((brand) => (
            <Box
              key={brand.title}
              sx={[
                {
                  my: 4,
                  height: 120,
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: (theme) => theme.transitions.create('box-shadow'),
                },
              ]}
            >
              <CardMedia
                component="img"
                title={brand.title}
                image={brand.img}
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {' '}
                {brand.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
