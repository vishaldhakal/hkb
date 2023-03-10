// ----------------------------------------------------------------------

import { ReactElement } from 'react';
import { TeamMemberPropsHBHB } from '../../../src/@types/team';
import { Page } from '../../../src/components';
import { ngrokapi } from '../../../src/config';
import Layout from '../../../src/layouts';
import { MarketingServicesBenefits } from '../../../src/sections/@marketing';
import MapLanding from '../../../src/sections/@travel/landing/MapLanding';
import { TeamElearningAbout } from '../../../src/sections/team';
import { navbarGenerator } from '../../../src/utils/navbargenerator';

type Props = {
  team_members: TeamMemberPropsHBHB[];
};

export default function OurTeam({ team_members }: Props) {
  return (
    <Page title="Hiking Bees Pvt Ltd">
      <TeamElearningAbout members={team_members} />

      <MarketingServicesBenefits />

      <MapLanding />
    </Page>
  );
}

// ----------------------------------------------------------------------

OurTeam.getLayout = function getLayout(page: ReactElement) {
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
  const req5 = await fetch(ngrokapi + '/api/team-members');
  const { team_members } = await req5.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();
  return {
    props: {
      team_members,
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}