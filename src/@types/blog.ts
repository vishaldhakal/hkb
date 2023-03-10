import { MDXRemoteSerializeResult } from 'next-mdx-remote';
//
import { AuthorProps } from './author';
import { SocialLinks } from './socials';

// ----------------------------------------------------------------------

type PostFrontmatter = {
  title: string;
  description: string;
  category: string;
  coverImg: string;
  heroImg: string;
  createdAt: Date | string | number;
  duration: string;
  favorited: boolean;
  shareLinks?: SocialLinks;
  author: AuthorProps;
  tags: string[];
};

export type BlogPostProps = {
  slug: string;
  content: MDXRemoteSerializeResult;
  frontmatter: PostFrontmatter;
};

export interface BlogProps {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  blog_duration_to_read: string;
  thumbnail_image: string;
  thumbnail_image_alt_description: string;
  blog_content: string;
  meta_title: string;
  meta_description: string;
  category: HBCategory;
  author: HBAuthorProps;
  tags: HBTags[];
}

export type HBCategory = {
  category_name: string;
  category_image: string;
};

export type HBAuthorProps = {
  id: number;
  name: string;
  role: string;
  phone: string;
  picture: string;
  about: string;
  created_at: string;
  updated_at: string;
};

export type HBTags = {
  id: number;
  tag_name: string;
};
