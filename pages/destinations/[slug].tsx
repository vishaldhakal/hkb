import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../src/config';
// utils
// @types
import { BlogProps } from '../../src/@types/blog';
// layouts
import Layout from '../../src/layouts';
// components
import { HTMLToReact, Page } from '../../src/components';
// sections
import { TestimonialsTravel } from '../../src/sections/testimonials';
import { BlogElearningLatestPosts, BlogTravelLatestPosts } from '../../src/sections/blog';
import { MarketingCaseStudiesList } from '../../src/sections/@marketing';
import { ActivityProps } from '../../src/@types/activity/activity';
import { EachActivityCardProps } from '../../src/@types/travel';
import { ElearningContactForm } from '../../src/sections/@e-learning';
import { TestimonialProps } from '../../src/@types/testimonial';
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
  activities: EachActivityCardProps[];
  activity_categories: ActivityProps[];
  destination_details: any;
  testimonials: TestimonialProps[];
};

export default function MarketingCaseStudiesPage({
  posts,
  activities,
  activity_categories,
  testimonials,
  destination_details,
}: Props) {
  return (
    <Page title={`Activities in ${destination_details.name}`}>
      <RootStyle>
        <Container>
          <Stack
            spacing={3}
            sx={{
              mt: { xs: 8, md: 10 },
            }}
          >
            <Typography variant="h2">
              Activites in{' '}
              <Box component="span" color="primary.main">
                {destination_details.name}
              </Box>{' '}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }} variant="button">
              {destination_details.destination_small_detail}
            </Typography>
          </Stack>

          <MarketingCaseStudiesList
            activities={activities}
            activity_categories={activity_categories}
          />

          <HTMLToReact html={destination_details.destination_detail} />
        </Container>

        <TestimonialsTravel testimonials={testimonials} />

        {!!posts.length && <BlogTravelLatestPosts posts={posts.slice(0, 4)} />}

        <ElearningContactForm />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingCaseStudiesPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

// ----------------------------------------------------------------------

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const req = await fetch(ngrokapi + '/api/posts');
  const res = await req.json();
  const req2 = await fetch(ngrokapi + `/api/activities-all/${params.slug}`);
  const res2 = await req2.json();
  const req4 = await fetch(ngrokapi + '/api/testimonials');
  const { testimonials } = await req4.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();
  return {
    props: {
      posts: res.posts,
      activities: res2.activities,
      testimonials,
      activites_search,
      activity_categories: res2.activity_categories,
      destination_details: res2.destination_details,
      nav_config,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req = await fetch(ngrokapi + `/api/destinations-slug`);
  const destinations = await req.json();
  const paths = destinations.map((destination: { name: string }) => ({
    params: { slug: destination.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}
