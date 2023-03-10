import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../src/config';
// @types
import { BlogProps } from '../../src/@types/blog';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { BlogElearningLatestPosts, BlogTravelLatestPosts } from '../../src/sections/blog';
import { ActivityRegionProps, EachActivityCardProps } from '../../src/@types/travel';
import { useRouter } from 'next/router';
import { ElearningContactForm } from '../../src/sections/@e-learning';
import RegionList from '../../src/sections/@marketing/case-studies/RegionList';
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
  activity_regions: ActivityRegionProps[];
};

export default function MarketingCaseStudiesPage({ posts, activities, activity_regions }: Props) {
  const router = useRouter();
  const selected_region = router.query['region']?.toString();
  return (
    <Page
      title={`Activities in ${`${router.query.slug
        ?.toString()
        .charAt(0)
        .toUpperCase()}${router.query.slug?.toString().slice(1)}`}`}
    >
      <RootStyle>
        <Container>
          <Stack
            spacing={3}
            sx={{
              mt: { xs: 8, md: 10 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h2">
              <Box component="span" color="primary.main">
                {`${router.query.slug?.toString().replaceAll('-', ' ')}`}
              </Box>{' '}
            </Typography>
          </Stack>

          <RegionList
            activities={activities}
            activity_regions={activity_regions}
            selected_region={selected_region}
          />
        </Container>

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
  const req2 = await fetch(ngrokapi + `/api/activities-region-wise/${params.slug}`);
  const res = await req.json();
  const res2 = await req2.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      posts: res.posts,
      activites_search,
      activities: res2.activities,
      activity_regions: res2.activity_regions,
      nav_config,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req = await fetch(ngrokapi + `/api/activitiy-categories-slug`);
  const activitiesCategories = await req.json();
  const paths = activitiesCategories.map((activity: { slug: string; id: number }) => ({
    params: { slug: activity.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}
