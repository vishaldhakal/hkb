import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// utils
// @types
import { BlogProps, HBTags } from '../../../src/@types/blog';
// layouts
import Layout from '../../../src/layouts';
// components
import { ErrorScreen, Page } from '../../../src/components';
import { SearchInput } from '../../../src/components';
// sections
import {
  BlogMarketingPostList,
  BlogMarketingFeaturedPosts,
  BlogSidebar,
} from '../../../src/sections/blog';
import { navbarGenerator } from '../../../src/utils/navbargenerator';

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
  tags: HBTags[];
  categories: BlogProps['category'][];
};

export default function MarketingBlogPage({ posts, tags, categories }: Props) {
  if (!posts.length) {
    return <ErrorScreen title="No Posts Found" description="No Blog Posts Available" />;
  }
  return (
    <Page title="Blog - Marketing">
      <RootStyle>
        <Container>
          <SearchInput
            sx={{
              display: { xs: 'flex', md: 'none' },
              my: { xs: 4, md: 0 },
            }}
          />
        </Container>

        <BlogMarketingFeaturedPosts posts={posts.slice(-5)} />

        <Container sx={{ mt: { xs: 4, md: 10 } }}>
          <Grid container spacing={{ md: 8 }}>
            <Grid item xs={12} md={8}>
              <BlogMarketingPostList posts={posts} />
            </Grid>

            <Grid item xs={12} md={4}>
              <BlogSidebar
                categories={categories}
                tags={tags}
                recentPosts={{
                  list: posts.slice(-4),
                  path: '/travel/blog',
                }}
                // advertisement={{
                //   title: 'Advertisement',
                //   description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                //   imageUrl: _mock.image.marketing(9),
                //   path: '#',
                // }}
              />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingBlogPage.getLayout = function getLayout(page: ReactElement) {
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
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();
  return {
    props: {
      posts: res.posts,
      tags: res.tags,
      categories: res.categories,
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}
