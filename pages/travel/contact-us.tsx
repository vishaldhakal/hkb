import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../src/config';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { ElearningContactInfo, ElearningContactForm } from '../../src/sections/@e-learning';
import { TestimonialsTravel } from '../../src/sections/testimonials';
import { _travel_testimonials } from '../../_data/mock/_testimonials';
import { MarketingLandingProcess } from '../../src/sections/@marketing';
import { navbarGenerator } from '../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningContactUsPage() {
  return (
    <Page title="Contact Us - E-Learning">
      <RootStyle>
        <ElearningContactInfo />

        <ElearningContactForm />
        <TestimonialsTravel testimonials={_travel_testimonials} />
        <MarketingLandingProcess />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningContactUsPage.getLayout = function getLayout(page: ReactElement) {
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
