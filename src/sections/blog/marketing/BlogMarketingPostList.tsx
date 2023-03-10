// @mui
import { Box } from '@mui/material';
// @types
import { BlogProps } from '../../../@types/blog';
//
import BlogMarketingPostItem from './BlogMarketingPostItem';

// ----------------------------------------------------------------------

type Props = {
  posts: BlogProps[];
};

export default function BlogMarketingPostList({ posts }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          columnGap: 4,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        {posts.slice(0, 8).map((post) => (
          <BlogMarketingPostItem key={post.slug} post={post} />
        ))}
      </Box>
    </>
  );
}
