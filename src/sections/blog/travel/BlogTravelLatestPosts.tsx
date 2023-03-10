// next
import NextLink from 'next/link';
// icons
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Avatar, Container, Typography } from '@mui/material';
// routes
import Routes from '../../../routes';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { BlogProps } from '../../../@types/blog';
// components
import { Image, Iconify, TextMaxLine } from '../../../components';
//
import BlogPostItemMobile from '../BlogPostItemMobile';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

type Props = {
  posts: BlogProps[];
};

export default function BlogTravelLatestPosts({ posts }: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <RootStyle>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h2">Latest Posts</Typography>

          <NextLink href={Routes.travel.posts} passHref>
            <Button
              endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
              sx={{ display: { xs: 'none', md: 'inline-flex' } }}
            >
              View All
            </Button>
          </NextLink>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {posts
            .slice(0, 4)
            .map((post) =>
              isDesktop ? (
                <PostItem key={post.slug} post={post} />
              ) : (
                <BlogPostItemMobile key={post.slug} post={post} path="/travel/blog" />
              )
            )}
        </Box>

        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <NextLink href={Routes.travel.posts} passHref>
            <Button
              endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
            >
              View All
            </Button>
          </NextLink>
        </Stack>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  post: BlogProps;
};

function PostItem({ post }: PostItemProps) {
  const {
    slug,
    author,
    title,
    blog_duration_to_read,
    created_at,
    thumbnail_image,
    thumbnail_image_alt_description,
  } = post;

  return (
    <Stack spacing={2.5}>
      <Image
        src={ngrokapi + thumbnail_image}
        alt={thumbnail_image_alt_description}
        ratio="1/1"
        sx={{ borderRadius: 2 }}
      />

      <Stack spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {fDate(created_at)}
          <DotStyle />
          {blog_duration_to_read}
        </Stack>

        <NextLink passHref as={Routes.travel.post(slug)} href={Routes.travel.post('[slug]')}>
          <TextMaxLine variant="h6" asLink persistent>
            {title}
          </TextMaxLine>
        </NextLink>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <Avatar src={author.picture} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2">{author.name}</Typography>
      </Stack>
    </Stack>
  );
}
