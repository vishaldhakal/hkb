import _mock from './_mock';

// ----------------------------------------------------------------------

export const _testimonials = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
  review:
    'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

export const _travel_testimonials = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Solo traveler',
    avatar: _mock.image.avatar(0),
    rating: 5,
    review:
      'I had an amazing time on my solo trip to Nepal. The itinerary was well-planned and the guides were incredibly knowledgeable about the culture and history of Nepal. I would definitely recommend this company to other travelers.',
  },
  {
    id: '2',
    name: 'Jane Doe',
    role: 'Couple',
    avatar: _mock.image.avatar(1),
    rating: 4,
    review:
      'My husband and I had a great honeymoon in Nepal. The accommodations were top-notch and the trekking itinerary was well-organized. The only downside was that the transportation was not always on time.',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Family',
    avatar: _mock.image.avatar(2),
    rating: 5,
    review:
      'We had a fantastic family vacation in Nepal. The company made sure that there was something for everyone in the itinerary and the guides were great with our kids. The views of the Himalayas were breathtaking, it was an unforgettable experience.',
  },
  {
    id: '4',
    name: 'Emily Williams',
    role: 'Group of friends',
    avatar: _mock.image.avatar(3),
    rating: 5,
    review:
      'We had an incredible time in Nepal with our group of friends. The company organized a great itinerary for us, including a mix of trekking and cultural activities. The guides were friendly and knowledgeable, and the views of the Himalayas were breathtaking.',
  },
  {
    id: '5',
    name: 'David Brown',
    role: 'Couple',
    avatar: _mock.image.avatar(4),
    rating: 4,
    review:
      'My wife and I had a great time on our trip to Nepal. The trekking itinerary was well-planned and the guides were knowledgeable. The only downside was that the food options were limited.',
  },
  {
    id: '6',
    name: 'Ashley Taylor',
    role: 'Solo traveler',
    avatar: _mock.image.avatar(5),
    rating: 5,
    review:
      'I had an amazing time on my solo trip to Nepal. The company planned a great itinerary for me including a mix of trekking and cultural activities. The guides were friendly, knowledgeable and helped me with everything. I would definitely recommend this company to other travelers.',
  },
];
