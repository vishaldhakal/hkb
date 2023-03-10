import Slider from 'react-slick';
import { useRef, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Container, Stack, Avatar, Box, Link } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// @types
import { BlogProps } from '../../../@types/blog';
// components
import { Image, BgOverlay, CarouselDots, CarouselArrows, TextMaxLine } from '../../../components';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6, 0),
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
  [theme.breakpoints.up('md')]: {
    height: '100vh',
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

export default function BlogMarketingFeaturedPosts({ posts }: Props) {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);
  const carouselRef = useRef<Slider | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setSelected(next),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 5 },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Container sx={{ position: 'relative', zIndex: 9 }}>
        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            '& .arrow': {
              mt: -5,
              '& button': {
                mx: 0.5,
                opacity: 0.72,
                color: 'common.white',
                bgcolor: 'primary.main',
                '& svg': { width: 18, height: 18 },
                '&:hover': {
                  opacity: 1,
                  bgcolor: 'primary.main',
                  color: 'common.white',
                },
              },
            },
          }}
        >
          <Slider ref={carouselRef} {...carouselSettings}>
            {posts.map((post) => (
              <PostItem key={post.slug} post={post} />
            ))}
          </Slider>
        </CarouselArrows>
      </Container>

      {posts.map(
        (post, index) =>
          selected === index && (
            <Box key={post.slug} sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}>
              <BgOverlay
                sx={{
                  ...cssStyles().bgBlur({
                    color: theme.palette.grey[900],
                    opacity: 0.24,
                  }),
                }}
              />

              <Image
                alt={post.thumbnail_image_alt_description}
                src={ngrokapi + post.thumbnail_image}
                sx={{ width: 1, height: 1 }}
              />
            </Box>
          )
      )}
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
    meta_description,
  } = post;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={{ bgcolor: 'background.default' }}>
      <Image
        src={ngrokapi + thumbnail_image}
        alt={thumbnail_image_alt_description}
        sx={{ flexGrow: 1 }}
      />

      <Stack
        justifyContent="space-between"
        sx={{
          p: { xs: 3, md: 5 },
          maxWidth: { md: 396 },
          flexGrow: 1,
        }}
      >
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
            <Link color="inherit" variant="h3">
              {title}
            </Link>
          </NextLink>
          <TextMaxLine line={3} variant="body2" sx={{ color: 'text.secondary' }}>
            {meta_description}
          </TextMaxLine>
          {/* <HTMLToReact html={blog_content} firstLetter={false} /> */}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ pt: 2, typography: 'body2' }}>
          <Avatar src={author.picture} sx={{ mr: 1 }} />
          {author.name}
        </Stack>
      </Stack>
    </Stack>
  );
}
