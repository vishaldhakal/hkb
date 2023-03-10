// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Container, Typography } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { BlogProps } from '../../../@types/blog';
// components
import { Image, BgOverlay } from '../../../components';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(20, 0),
}));

// ----------------------------------------------------------------------

type Props = {
  post: BlogProps;
};

export default function BlogTravelPostHero({ post }: Props) {
  const {
    blog_duration_to_read,
    meta_description,
    title,
    thumbnail_image,
    thumbnail_image_alt_description,
    created_at,
  } = post;

  return (
    <RootStyle>
      <Container sx={{ position: 'relative', zIndex: 9 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack
              spacing={3}
              alignItems={{
                xs: 'center',
                md: 'flex-start',
              }}
              sx={{
                color: 'common.white',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {blog_duration_to_read}
              </Typography>

              <Typography variant="h2" component="h1">
                {title}
              </Typography>
              <Typography variant="caption" component="h1">
                {meta_description}
              </Typography>

              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                {fDate(created_at, 'dd/MM/yyyy p')}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <BgOverlay />

      <Image
        alt={thumbnail_image_alt_description}
        src={ngrokapi + thumbnail_image}
        sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1 }}
      />
    </RootStyle>
  );
}
