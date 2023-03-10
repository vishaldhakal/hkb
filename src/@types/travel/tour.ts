import { ActivityProps } from '../activity/activity';
import { AuthorProps } from '../author';
import { DestinationProps } from '../navbar/destination';
import { SocialLinks } from '../socials';

// ----------------------------------------------------------------------

export type TourProps = {
  id: string | number;
  slug: string;
  price: number;
  heroImg: string;
  ratings: number;
  reviews: number;
  coverImg: string;
  location: string;
  duration: string;
  continent: string;
  priceSale: number;
  gallery: string[];
  popular: boolean;
  description: string;
  languages: string[];
  highlights: string[];
  tourGuide: AuthorProps;
  shareLinks: SocialLinks;
  createdAt: Date | string | number;
  availableEnd: Date | string | number;
  availableStart: Date | string | number;
  program: {
    label: string;
    text: string;
  }[];
  includes: {
    label: string;
    enabled: boolean;
  }[];
};

export type GalleryProps = {
  id: string | number;
  image: string;
  image_alt_description: string;
  activity: number;
};

export interface EachActivityCardProps {
  id: number | string;
  popular: boolean;
  best_selling: boolean;
  slug: string;
  activity_title: string;
  activity_category: ActivityProps[];
  destination: {
    name: string;
  };
  location: string;
  duration: string;
  price: number;
  priceSale: number;
  coverImg: string;
  ratings: number;
  activity_region: ActivityRegionProps;
}

export type EachActivityProps = {
  id: string | number;
  itinerary: {
    id: number;
    day: number;
    title: string;
    trek_distance: string;
    trek_duration: string;
    highest_altitude: string;
    meals: string;
    description: string;
    activity: number;
  }[];
  enquiries: {
    id: number;
  }[];
  gallery: GalleryProps[];
  faqs: {
    id: number;
    question: string;
    answer: string;
    active: boolean;
    created_at: string | Date | number;
    activity: number;
  }[];
  prices?: {
    id: number;
    group_size: string;
    price: number;
    activity: number;
  }[];
  createdAt: Date | string | number;
  activity_title: string;
  slug: string;
  price: number;
  heroImg: string;
  ratings: number;
  coverImg: string;
  location: string;
  duration: string;
  trip_grade: string;
  max_group_size: string;
  best_time: string;
  priceSale: number;
  popular: boolean;
  best_selling: boolean;
  featured: boolean;
  tour_description: string;
  tour_highlights: string;
  tour_includes: string;
  tour_excludes: string;
  availableStart: Date | string | number;
  availableEnd: Date | string | number;
  activity_region: ActivityRegionProps;
  destination: DestinationProps;
  activity_category: ActivityProps[];
};

export type ActivityRegionProps = {
  id: number | string;
  title: string;
  slug: string;
  image: string;
  image_alt_description: string;
  activity_category: ActivityProps;
};

export type ActivitiesSearchProps = {
  id: number;
  slug: string;
  activity_title: string;
  destination: {
    name: string;
  };
  duration: string;
  price: number;
  priceSale: number;
  trip_grade: string;
  max_group_size: string;
  best_time: string;
};
