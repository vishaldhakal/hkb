import { add } from 'date-fns';
//
import _mock from './_mock';

// ----------------------------------------------------------------------

const CONTINENTS = [
  'Everest Base Camp',
  'Annapurna Base Camp',
  'Langtang Valley',
  'Manaslu Circuit',
  'Upper Mustang',
  'Dhaulagiri Base Camp',
  'Kanchenjunga Base Camp',
  'Rara Lake',
  'Khaptad National Park',
  'Gokyo Lakes',
  'Makalu Base Camp',
  'Nar Phu Valley',
];

export const _tours = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  coverImg: _mock.image.travel(index),
  heroImg: _mock.image.travelLarge(index),
  slug: _mock.text.tourName(index),
  createdAt: _mock.time(index),
  availableStart: add(new Date(), { days: 2 }),
  availableEnd: add(new Date(), { months: 4 }),
  location: CONTINENTS[index],
  continent: CONTINENTS[index],
  duration: '3 days 2 nights',
  price: (index % 2 && 999.99) || 559.99,
  priceSale: (index === 2 && 899.99) || (index === 5 && 799.99) || 0,
  reviews: 345,
  popular: index === 2 || index == 4 || false,
  ratings: 3.5 + index / 10,
  tourGuide: {
    name: _mock.name.fullName(index),
    role: _mock.role(index),
    picture: _mock.image.avatar(index),
    phoneNumber: _mock.phoneNumber(index),
    quotes: 'Member since Mar 15, 2021',
    verified: true,
    ratings: 5,
    reviews: 345,
    about:
      'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
    shareLinks: _mock.shareLinks,
  },
  includes: [
    { label: 'Audio guide', enabled: true },
    { label: 'Entrance fees', enabled: true },
    { label: 'Food and drinks', enabled: true },
    { label: 'Gratuities', enabled: true },
    { label: 'Lunch', enabled: true },
    { label: 'Pick-up and drop off', enabled: false },
    { label: 'Private tour', enabled: false },
    { label: 'Professional guide', enabled: false },
    { label: 'Special activities', enabled: false },
    { label: 'Transport by air-conditioned', enabled: false },
  ],
  languages: ['Russian', 'Spanish'],
  tags: ['Lamp', 'A man', 'Human', 'Lantern', 'Festival'],
  gallery: [...Array(3)].map((_, index) => _mock.image.travel(index + 2)),
  description: _mock.text.description(index),
  highlights: [...Array(6)].map((_, index) => _mock.text.sentence(index)),
  program: [...Array(8)].map((_, index) => ({
    label: `Day ${index + 1}`,
    text: _mock.text.description(index),
  })),
  shareLinks: _mock.shareLinks,
}));
