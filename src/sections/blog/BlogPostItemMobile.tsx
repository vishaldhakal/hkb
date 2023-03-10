// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// @types
import { BlogProps } from '../../@types/blog';
// components
import { Image, TextMaxLine } from '../../components';
import { ngrokapi } from '../../config';

// ----------------------------------------------------------------------

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

type BlogPostItemMobileProps = {
  post: BlogProps;
  onSiderbar?: boolean;
  path: string;
};

export default function BlogPostItemMobile({ post, path, onSiderbar }: BlogPostItemMobileProps) {
  const {
    slug,
    title,
    blog_duration_to_read,
    created_at,
    thumbnail_image,
    thumbnail_image_alt_description,
  } = post;

  const as = `${path}/${slug}`;
  const href = `${path}/[slug]`;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={thumbnail_image_alt_description}
        src={ngrokapi + thumbnail_image}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <NextLink passHref as={as} href={href}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} asLink>
            {title}
          </TextMaxLine>
        </NextLink>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {fDate(created_at)}
          <DotStyle />
          {blog_duration_to_read}
        </Stack>
      </Stack>
    </Stack>
  );
}
