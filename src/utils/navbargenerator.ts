import { NavItemProps } from '../@types/layout';
import { OtherLinks } from '../layouts/nav';
import Routes from '../routes';

export const navbarGenerator = (nav_config: {
  climbing_nav: any;
  destination_nav: {
    destinations: { id: { toString: () => any }; name: string; thumnail_image: string }[];
  };
  other_activities_nav: {
    activity_categories: {
      slug: string;
      id: { toString: () => any };
      title: string;
      image: string;
    }[];
  };
  trekking_nav: {
    innerdropdowns: {
      id: { toString: () => string };
      activity_region: {
        activity_category: any;
        title: string;
        image: string;
        slug: string;
      };
      activites: { activity_title: string; slug: string | number }[];
    }[];
  };
}) => {
  const destinationList: NavItemProps = {
    title: 'Destinations',
    children: nav_config.destination_nav.destinations.map(
      (destination: { id: { toString: () => any }; name: string; thumnail_image: string }) => ({
        order: destination.id.toString(),
        subheader: destination.name,
        path: `/destinations/${destination.name}`,
        cover: destination.thumnail_image,
      })
    ),
  };
  const activitiesList: NavItemProps = {
    title: 'Activities',
    children: nav_config.other_activities_nav.activity_categories.map(
      (activity: { slug: string; id: { toString: () => any }; title: string; image: string }) => ({
        order: activity.id.toString(),
        subheader: activity.title,
        path: `/activities/${activity.slug}`,
        cover: activity.image,
      })
    ),
  };

  const trekkingList: NavItemProps = {
    title: 'Trekking',
    children: nav_config.trekking_nav.innerdropdowns.map((region) => ({
      order: region.id.toString(),
      subheader: region.activity_region.title,
      path: `/activities/${region.activity_region.activity_category[0].slug}/?region=${region.activity_region.title}`,
      cover: region.activity_region.image,
      items: region.activites.map((activity: { activity_title: any; slug: string | number }) => ({
        title: activity.activity_title,
        path: Routes.travel.tour(activity.slug),
      })),
    })),
  };

  const climbingList: NavItemProps = {
    title: 'Climbing',
    children: nav_config.climbing_nav.map(
      (climbing: {
        id: { toString: () => any };
        activity_title: any;
        slug: string | number;
        coverImg: any;
      }) => ({
        order: climbing.id.toString(),
        subheader: climbing.activity_title,
        path: Routes.travel.tour(climbing.slug),
        cover: climbing.coverImg,
      })
    ),
  };

  const navConfig = [
    destinationList,
    activitiesList,
    trekkingList,
    climbingList,
    {
      title: 'About',
      children: OtherLinks,
    },
    { title: 'Contact', path: Routes.travel.contact },
  ];

  return navConfig;
};
