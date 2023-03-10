import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Divider, Stack, Chip } from '@mui/material';
// routes
import Routes from '../../../src/routes';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// @types
import { BlogProps, HBCategory, HBTags } from '../../../src/@types/blog';
// layouts
import Layout from '../../../src/layouts';
// components
import { HTMLToReact, Page } from '../../../src/components';
import { Breadcrumbs } from '../../../src/components';
// sections
import {
  BlogAuthorInfo,
  BlogSidebar,
  BlogTravelLatestPosts,
  BlogTravelPostHero,
} from '../../../src/sections/blog';
import { navbarGenerator } from '../../../src/utils/navbargenerator';
import { ElearningContactForm } from '../../../src/sections/@e-learning';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: BlogProps;
  posts: BlogProps[];
  categories: HBCategory[];
  tagss: HBTags[];
};

export default function MarketingPostPage({ post, posts, categories }: Props) {
  const { title, author, blog_content, meta_description, tags } = post;
  return (
    <Page title={`${title} - Post`}>
      <RootStyle>
        <BlogTravelPostHero post={post} />
        <Container>
          <Breadcrumbs
            sx={{ my: 3 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Blogs', href: Routes.travel.posts },
              { name: title },
            ]}
          />
        </Container>

        <Divider
          sx={{
            mb: { xs: 6, md: 10 },
          }}
        />

        <Container maxWidth={false}>
          <Grid container spacing={{ md: 8 }}>
            <Grid item xs={12} md={3}>
              <BlogSidebar
                author={author}
                categories={categories}
                tags={tags}
                recentPosts={{
                  list: posts.slice(-4),
                  path: '/travel/blog',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 5 }}>
                {meta_description}
              </Typography>

              <HTMLToReact html={blog_content} firstLetter={false} />

              <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Tags:
                </Typography>
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    size="small"
                    label={tag.tag_name}
                    sx={{ m: 0.5 }}
                    onClick={() => {}}
                  />
                ))}
              </Stack>

              <Divider sx={{ mt: 8 }} />

              <BlogAuthorInfo author={author} />
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <BlogTravelLatestPosts posts={posts.slice(0, 4)} />
        <ElearningContactForm />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingPostPage.getLayout = function getLayout(page: ReactElement) {
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
  const res = await fetch(ngrokapi + `/api/post-single/${params.slug}`);
  const post = await res.json();
  const req = await fetch(ngrokapi + '/api/posts');
  const response2 = await req.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();
  return {
    props: {
      // posts: res.data,
      post,
      posts: response2.posts,
      tagss: response2.tags,
      activites_search,
      categories: response2.categories,
      nav_config,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req = await fetch(ngrokapi + `/api/posts-slug`);
  const posts = await req.json();
  const paths = posts.map((post: { slug: string }) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}
