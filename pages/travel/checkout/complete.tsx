import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// hooks
import { useRequest } from '../../../src/hooks';
// _data
import { _tours } from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, Image } from '../../../src/components';
// sections
import { TravelCheckOutCompleteInfo } from '../../../src/sections/@travel';
import { navbarGenerator } from '../../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function TravelCheckoutCompletePage() {
  const { data: tour, error } = useRequest(`/api/travel/tours/${_tours[0].id}`);

  if (error) {
    return <ErrorScreen />;
  }

  if (!tour) {
    return null;
  }

  return (
    <Page title="Checkout Complete - Travel">
      <RootStyle>
        <Container
          sx={{
            mt: { xs: 8, md: 10 },
            mb: { xs: 10, md: 15 },
            alignItems: 'flex-start',
            display: 'grid',
            gap: 10,
            gridTemplateColumns: { md: 'repeat(2, 1fr)' },
          }}
        >
          <Image
            alt="cover"
            src={tour.coverImg}
            ratio="3/4"
            sx={{ borderRadius: 2, display: { xs: 'none', md: 'block' } }}
          />

          <TravelCheckOutCompleteInfo tour={tour} />
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelCheckoutCompletePage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

export async function getStaticProps() {
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}
