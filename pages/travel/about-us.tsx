import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../src/config';
// @types
import { BlogProps } from '../../src/@types/blog';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { BlogTravelLatestPosts } from '../../src/sections/blog';
import { TestimonialsTravel } from '../../src/sections/testimonials';
import { TeamMarketingLangding } from '../../src/sections/team';
import { OurClientsTravel } from '../../src/sections/our-clients';
import { TravelAbout, TravelAboutOurVision } from '../../src/sections/@travel';
import { TestimonialProps } from '../../src/@types/testimonial';
import { TeamMemberPropsHBHB } from '../../src/@types/team';
import { Affiliations } from '../../src/layouts/footer/Footer';
import OurPartners from '../../src/sections/our-clients/travel/OurPartners';
import { navbarGenerator } from '../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  posts: BlogProps[];
  testimonials: TestimonialProps[];
  team_members: TeamMemberPropsHBHB[];
};

export default function TravelAboutUsPage({ posts, team_members, testimonials }: Props) {
  return (
    <Page title="About Us - Travel">
      <RootStyle>
        <TravelAbout />

        <TravelAboutOurVision />

        <TeamMarketingLangding members={team_members} />

        <TestimonialsTravel testimonials={testimonials} />

        <OurClientsTravel brands={Affiliations} />
        <OurPartners brands={Affiliations} />

        <BlogTravelLatestPosts posts={posts.slice(0, 4)} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelAboutUsPage.getLayout = function getLayout(page: ReactElement) {
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
  const req = await fetch(ngrokapi + '/api/posts');
  const res = await req.json();
  const req4 = await fetch(ngrokapi + '/api/testimonials');
  const { testimonials } = await req4.json();
  const req5 = await fetch(ngrokapi + '/api/team-members');
  const { team_members } = await req5.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      posts: res.posts,
      testimonials,
      team_members,
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}
