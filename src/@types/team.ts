import { SocialLinks } from './socials';

// ----------------------------------------------------------------------

export type TeamMemberPropsHB = {
  id: string;
  name: string;
  role: string;
  photo: string;
  socialLinks?: SocialLinks;
};

export type TeamMemberPropsHBHB = {
  id: number | string;
  name: string;
  role: string;
  photo: string;
  about: string;
  type: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  twitter?: string;
  created_at: string;
  updated_at: string;
};
