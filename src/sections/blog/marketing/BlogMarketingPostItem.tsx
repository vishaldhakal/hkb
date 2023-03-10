import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
// components
import { Image, BgOverlay, TextMaxLine } from '../../../components';
import { varHover, varTranHover } from '../../../components/animate';
import { BlogProps } from '../../../@types/blog';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

type Props = {
  post: BlogProps;
};

export default function BlogMarketingPostItem({ post }: Props) {
  const { slug,  title, blog_duration_to_read, created_at, thumbnail_image } = post;

  return (
    <NextLink passHref as={Routes.travel.post(slug)} href={Routes.travel.post('[slug]')}>
      <Stack
        component={m.div}
        whileHover="hover"
        variants={varHover(1)}
        transition={varTranHover()}
        sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      >
        <m.div variants={varHover(1.25)} transition={varTranHover()}>
          <Image src={ngrokapi + thumbnail_image} alt={title} ratio="3/4" />
        </m.div>

        <Stack
          justifyContent="flex-end"
          sx={{
            px: 5,
            py: 2,
            height: 1,
            zIndex: 9,
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ opacity: 0.72, typography: 'caption' }}
            >
              {fDate(created_at)}
              <DotStyle />
              {blog_duration_to_read}
            </Stack>

            <TextMaxLine variant="h4">{title}</TextMaxLine>
          </Stack>
        </Stack>

        <BgOverlay direction="bottom" midColor="rgba(0,0,0,0)" endColor="rgba(0,0,0,0.7)" />
      </Stack>
    </NextLink>
  );
}
