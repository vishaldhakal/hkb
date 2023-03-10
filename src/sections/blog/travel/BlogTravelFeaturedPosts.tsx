// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Box } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @types
import { BlogProps } from '../../../@types/blog';
// components
import {
  Image,
  BgOverlay,
  TextMaxLine,
  Iconify,
  varHover,
  varTranHover,
} from '../../../components';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { ngrokapi } from '../../../config';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
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

export default function BlogTravelFeaturedPosts({ posts }: Props) {
  return (
    <RootStyle>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
            textAlign: { xs: 'left', md: 'left' },
          }}
        >
          <Stack>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              BLOG
            </Typography>
            <Typography variant="h2">
              Read Our{' '}
              <Box component="span" color="primary.main">
                Latest News
              </Box>
            </Typography>
            <Typography sx={{ mt: 0.5, color: 'text.secondary' }}>
              Outstanding articles for you to read
            </Typography>
          </Stack>

          <NextLink href={Routes.travel.posts} passHref>
            <Button
              variant="contained"
              endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
              sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'common.black' }}
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
              md: 'repeat(2, 1fr)',
            },
          }}
        >
          <PostItem post={posts[0]} largePost />

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              },
            }}
          >
            {posts.slice(1, 5).map((post) => (
              <PostItem key={post.slug} post={post} />
            ))}
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  post: BlogProps;
  largePost?: boolean;
};

function PostItem({ post, largePost }: PostItemProps) {
  const {
    slug,
    author,
    title,
    blog_duration_to_read,
    created_at,
    thumbnail_image,
    thumbnail_image_alt_description,
    meta_description,
  } = post;

  return (
    <NextLink passHref as={Routes.travel.post(slug)} href={Routes.travel.post('[slug]')}>
      <Box
        component={m.a}
        whileHover="hover"
        variants={varHover(0.95)}
        transition={varTranHover()}
        sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}
      >
        <m.div variants={varHover(1.15)} transition={varTranHover()}>
          <Image
            src={ngrokapi + thumbnail_image}
            alt={thumbnail_image_alt_description}
            ratio="4/3"
            sx={{ height: 1 }}
          />
        </m.div>

        <BgOverlay
          midColor="rgba(0,0,0,0) 50%"
          sx={{
            opacity: 1,
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.short,
              }),
            '&:hover': { opacity: 0 },
          }}
        >
          <Stack
            spacing={1}
            sx={{
              py: 2,
              px: { md: 5, xs: 2 },
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              color: 'common.white',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ opacity: 0.72, typography: 'caption' }}
            >
              {fDate(created_at)}
              <DotStyle />
              {blog_duration_to_read}
            </Stack>

            <TextMaxLine
              sx={{
                typography: 'h3',
                ...(largePost && {
                  typography: { xs: 'h6', md: 'h4' },
                }),
                fontSize:'1.1rem !important',
              }}
            >
              {title}
            </TextMaxLine>
          </Stack>
        </BgOverlay>
      </Box>
    </NextLink>
  );
}
