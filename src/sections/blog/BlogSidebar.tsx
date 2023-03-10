// @mui
import { Stack, StackProps } from '@mui/material';
// @types
import { BlogProps, HBAuthorProps, HBCategory, HBTags } from '../../@types/blog';
import { AdvertisementProps } from '../../@types/advertisement';
// hooks
import { useResponsive } from '../../hooks';
// components
import { SearchInput } from '../../components';
//
import { Advertisement01 } from '../advertisement';
import BlogSidebarAuthor from './BlogSidebarAuthor';
import BlogSidebarCategories from './BlogSidebarCategories';
import BlogSidebarPopularTags from './BlogSidebarPopularTags';
import BlogSidebarRecentPosts from './BlogSidebarRecentPosts';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  author?: HBAuthorProps;
  categories: HBCategory[];
  tags: HBTags[];
  recentPosts: {
    list: BlogProps[];
    path: string;
  };
  advertisement?: AdvertisementProps;
}

export default function BlogSidebar({
  author,
  recentPosts,
  advertisement,
  sx,
  categories,
  tags,
  ...other
}: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      {author && isDesktop && <BlogSidebarAuthor author={author} />}

      {isDesktop && <SearchInput />}

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 0 },
          ...sx,
        }}
        {...other}
      >
        <BlogSidebarCategories categories={categories} />
        <BlogSidebarRecentPosts recentPosts={recentPosts} />
        <BlogSidebarPopularTags tags={tags} />
        {advertisement && <Advertisement01 advertisement={advertisement} />}
      </Stack>
    </>
  );
}
