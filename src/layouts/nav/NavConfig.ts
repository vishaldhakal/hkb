// routes
import Routes from '../../routes';
// _data
import { NavItemProps } from '../../@types/layout';

// ----------------------------------------------------------------------

export const DestinationsLinks = [
  {
    order: '1',
    subheader: 'Nepal',
    path: '/destinations/Nepal',
    cover: '/country/nepal.jpg',
  },
  {
    order: '4',
    subheader: 'Bhutan',
    path: '/destinations/bhutan',
    cover: '/country/bhutan.jpg',
  },
  {
    order: '2',
    subheader: 'Tibet',
    path: '/destinations/tibet',
    cover: '/country/tibet.jpg',
  },
  {
    order: '5',
    subheader: 'India',
    path: '/destinations/india',
    cover: '/country/india.jpg',
  },
];

export const OtherActivities = [
  {
    order: '1',
    subheader: 'Wildlife Safari',
    path: '/activities/wildlife-safari',
    cover: '/activities/wildlife-safari.jpg',
  },
  {
    order: '2',
    subheader: 'Jeep Tour',
    path: '/activities/jeep-tour',

    cover: '/activities/jeep-tour.jpg',
  },
  {
    order: '3',
    path: '/activities/heli-tour',
    subheader: 'Heli Tour',
    cover: '/activities/heli-tour.jpeg',
  },
  {
    order: '4',
    subheader: 'Photography Tour',
    path: '/activities/photography-tour',
    cover: '/activities/photography-tour.jpg',
  },
  {
    order: '5',
    subheader: 'Sightseeing',
    path: '/activities/sightseeing',
    cover: '/activities/sightseeing-tour.jpg',
  },
  {
    order: '6',
    subheader: 'Mountain Flight Tour',
    path: '/activities/mountain-flight-tour',
    cover: '/activities/mountain-flight-tour.jpg',
  },
  {
    order: '7',
    subheader: 'Trekking',
    path: '/activities/trekking',
    cover: '/activities/trekking.jpg',
  },
  {
    order: '8',
    subheader: 'Peak Climbing',
    path: '/activities/peak-climbing',
    cover: '/activities/peakclimbing.jpg',
  },
];

export const PeakClimbingLinks = [
  {
    order: '5',
    subheader: '< 5000m',
    path: '/activities/peak-climbing',
    cover: '/activities/peak-climbing/Annapurna-II.jpg',
  },
  {
    order: '1',
    subheader: 'Over 5000m',
    path: '/activities/peak-climbing',
    cover: '/activities/peak-climbing/langtang.jpg',
  },
  {
    order: '3',
    subheader: 'Over 6000m',
    path: '/activities/peak-climbing',
    cover: '/activities/peak-climbing/Dhaulagiri_mountain.jpg',
  },
  {
    order: '4',
    subheader: 'Over 7000m',
    path: '/activities/peak-climbing',
    cover: '/activities/peak-climbing/Choyou-EXPEDITION.jpg',
  },
  {
    order: '2',
    subheader: 'Over 8000m',
    path: '/activities/peak-climbing',
    cover: '/activities/peak-climbing/everest.jpg',
  },
];
export const TrekkingLinks = [
  {
    order: '5',
    subheader: 'Everest Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/everest-region.jpg',
  },
  {
    order: '5',
    subheader: 'Annapurna Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/annapurna-region.jpg',
  },
  {
    order: '5',
    subheader: 'Langtang Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/langtang-region.jpg',
  },
  {
    order: '1',
    subheader: 'Dhaulagiri Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/dhaulagiri-region.jpg',
  },
  {
    order: '1',
    subheader: 'Manaslu Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/manaslu-region.jpg',
  },
  {
    order: '1',
    subheader: 'Other Region',
    path: '/activities/trekking',
    cover: '/activities/trekking/other-region.jpg',
  },
];

export const OtherLinks = [
  // {
  //   order: '5',
  //   subheader: 'Travel Tips',
  //   items: [
  //     { title: 'Gear List', path: Routes.travel.landing },
  //     { title: 'Restricted Area Permit', path: Routes.travel.tours },
  //     { title: 'Altitude Sickness', path: Routes.travel.tour(_tours[0].id) },
  //   ],
  // },
  {
    order: '5',
    subheader: 'Article',
    items: [{ title: 'Articles', path: Routes.travel.posts }], // #################DONE
  },
  {
    order: '5',
    subheader: 'Policies',
    items: [
      { title: 'Terms And Conditions', path: Routes.about.terms_and_condition }, // #################DONE
      { title: 'Privacy Policies', path: Routes.about.privacy_policies }, // #################DONE
      { title: 'Cookie Policies', path: Routes.about.cookie_policies }, // #################DONE
    ],
  },
  {
    order: '1',
    subheader: 'About Us',

    items: [
      { title: 'Our Team', path: Routes.about.team }, // #################DONE
      { title: 'Our Partner', path: Routes.travel.about },
      // { title: 'Legal Documents', path: Routes.travel.about },
      // { title: 'Why Hiking Bees?', path: Routes.travel.tour(_tours[0].id) },
      { title: 'About', path: Routes.travel.about }, // #################DONE
      { title: 'Contact', path: Routes.travel.contact }, // #################DONE
    ],
  },
];

export const FooterLinks = [
  // {
  //   order: '5',
  //   subheader: 'Travel Tips',
  //   items: [
  //     { title: 'Gear List', path: Routes.travel.landing },
  //     { title: 'Restricted Area Permit', path: Routes.travel.tours },
  //     { title: 'Altitude Sickness', path: Routes.travel.tour(_tours[0].id) },
  //   ],
  // },
  {
    order: '5',
    subheader: 'Article',
    items: [{ title: 'Articles', path: Routes.travel.posts }], // #################DONE
  },
  {
    order: '5',
    subheader: 'Policies',
    items: [
      { title: 'Terms And Conditions', path: Routes.about.terms_and_condition }, // #################DONE
      { title: 'Privacy Policies', path: Routes.about.privacy_policies }, // #################DONE
      { title: 'Cookie Policies', path: Routes.about.cookie_policies }, // #################DONE
    ],
  },
  {
    order: '1',
    subheader: 'About Us',

    items: [
      { title: 'Our Team', path: Routes.about.team }, // #################DONE
      { title: 'Our Partner', path: Routes.travel.about },
      // { title: 'Legal Documents', path: Routes.travel.about },
      // { title: 'Why Hiking Bees?', path: Routes.travel.tour(_tours[0].id) },
      { title: 'About', path: Routes.travel.about }, // #################DONE
      { title: 'Contact', path: Routes.travel.contact }, // #################DONE
    ],
  },
];

export const navConfig: NavItemProps[] = [
  {
    title: 'Destinations',
    children: DestinationsLinks,
  },
  {
    title: 'Trekking',
    children: TrekkingLinks,
  },
  {
    title: 'Climbing',
    children: PeakClimbingLinks,
  },

  {
    title: 'Activities',
    children: OtherActivities,
  },
  {
    title: 'About',
    children: OtherLinks,
  },
  { title: 'Contact', path: Routes.travel.contact },
];
