// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Button, Typography, Box } from '@mui/material';
// routes
import Routes from '../../../routes';
// @types
import { EachActivityCardProps } from '../../../@types/travel';
//
import TravelTourItem from '../tours/TravelTourItem';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  featured_packages: EachActivityCardProps[];
};

export default function TravelLandingTourFeatured({ featured_packages }: Props) {
  return (
    <RootStyle>
      <Container>
        <Stack spacing={0} sx={{ textAlign: { md: 'center', xs: 'unset' } }}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Best packages
          </Typography>
          <Typography variant="h2">
            Featured{' '}
            <Box component="span" color="primary.main">
              Packages
            </Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 2 }}>
            {`Our Featured Packages can help you find the trip that's perfect for you!`}
          </Typography>
        </Stack>

        <Box
          sx={{
            my: { xs: 8, md: 10 },
            display: 'grid',
            gap: { xs: 4, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {featured_packages.map((featured_package) => (
            <TravelTourItem key={featured_package.id} activity={featured_package} />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <NextLink href={Routes.activities.allActivities} passHref>
            <Button
              size="large"
              variant="contained"
              sx={{
                color: 'common.black',
              }}
            >
              View All Packages
            </Button>
          </NextLink>
        </Box>
      </Container>
    </RootStyle>
  );
}
