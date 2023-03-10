// next
import NextLink from 'next/link';
// @mui
import { Stack, Avatar, Typography, Paper, Divider } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { BlogProps } from '../../../@types/blog';
// components
import { Image, TextMaxLine } from '../../../components';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

type Props = {
  post: BlogProps;
};

export default function BlogElearningPostItem({ post }: Props) {
  const {
    title,
    thumbnail_image,
    thumbnail_image_alt_description,
    blog_duration_to_read,
    created_at,
    meta_description,
    author,
    slug,
  } = post;

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Image src={ngrokapi + thumbnail_image} alt={thumbnail_image_alt_description} ratio="1/1" />

      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{fDate(created_at, 'MMM')}</Typography>
          <Divider sx={{ mt: 1, mb: 0.5 }} />
          <Typography variant="h3">{fDate(created_at, 'dd')}</Typography>
        </Stack>

        <Stack spacing={1}>
          <NextLink passHref as={Routes.travel.post(slug)} href={Routes.travel.post('[slug]')}>
            <TextMaxLine variant="h6" asLink persistent>
              {title}
            </TextMaxLine>
          </NextLink>

          <TextMaxLine variant="body2" persistent color="text.secondary">
            {meta_description}
          </TextMaxLine>

          <Stack spacing={1.5} direction="row" alignItems="center" sx={{ pt: 1.5 }}>
            <Avatar src={author.picture} sx={{ width: 40, height: 40 }} />
            <Stack>
              <Typography variant="body2">{author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {blog_duration_to_read}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
