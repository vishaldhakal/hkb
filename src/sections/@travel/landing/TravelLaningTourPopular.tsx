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
  popular_packages: EachActivityCardProps[];
};

export default function TravelLaningTourPopular({ popular_packages }: Props) {
  return (
    <RootStyle>
      <Container>
        <Stack spacing={0} sx={{ textAlign: { md: 'center', xs: 'unset' } }}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Short and Rewarding
          </Typography>
          <Typography variant="h2">
            Short yet{' '}
            <Box component="span" color="primary.main">
              Rewarding{' '}
            </Box>
            Packages
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 2 }}>
            {`Our Short and Rewarding Packages at Hiking Bees is waiting for you`}
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
          {popular_packages.map((popular_package) => (
            <TravelTourItem key={popular_package.id} activity={popular_package} />
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
