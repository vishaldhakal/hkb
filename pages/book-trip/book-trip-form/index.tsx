import { ReactElement } from 'react';
// @mui
import Layout from '../../../src/layouts';
import { Page } from '../../../src/components';
import BookTripForm from '../../../src/sections/@book-trip/booktripform/BookTripForm';
import { ngrokapi } from '../../../src/config';
import { navbarGenerator } from '../../../src/utils/navbargenerator';
// ----------------------------------------------------------------------

export default function TravelLandingPage() {
  return (
    <Page title="Book Your Trip">
      <BookTripForm />
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelLandingPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

// ----------------------------------------------------------------------
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
