import _mock from './_mock';

// ----------------------------------------------------------------------

export const _faqs = [
  'Sed augue ipsum, egestas nec, vestibulum et',
  'alesuada adipiscing, dui vestibulum suscipit nulla quis orci.',
  'Ut varius tincidunt libero',
  'In ut quam vitae odio lacinia tincidunt.',
  'In ut quam vitae odio lacinia tincidunt.',
  'Fusce vel dui Morbi nec metus.',
].map((question, index) => ({
  id: _mock.id(index),
  question,
  answer:
    'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

export const _faqsSupport = [
  `[Covid] Seasonal Shopping Guide`,
  'I Want To Check Where My Order Is Delivered',
  '[Shipping Information] How To Contact The Shipping Unit/Look Up Shipping Information/Delivery Exchange?',
  '[Seller] Start Selling With Shopee',
  'Why Is My Account Locked/Limited?',
  'Free Shipping Code User Guide (Freeship Code)',
  'How To Buy / Order On Shopee App',
  `Why I Didn't Receive the Verification Code (OTP)?`,
  `Frequently Asked Questions About Product Reviews / Comments`,
  `How to Login Shopee Account When Forgot/Lost Password`,
].map((question, index) => ({
  id: _mock.id(index),
  question,
  answer:
    'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

export const _faqsVisa = [
  {
    id: 'visa1',
    question: 'What types of visas are available for travelers visiting Nepal?',
    answer:
      'There are two main types of visas available for travelers visiting Nepal: tourist visas and trekking visas. Tourist visas are intended for travelers who want to visit the country for leisure purposes, while trekking visas are specifically for those who want to go trekking in Nepal. Trekking visas typically require additional permits and fees.',
  },
  {
    id: 'visa2',
    question: 'How do I apply for a visa to visit Nepal?',
    answer:
      "Visas for Nepal can be obtained in advance from a Nepalese embassy or consulate, or upon arrival at Tribhuvan International Airport in Kathmandu. When applying for a visa in advance, you'll need to provide your passport, a completed visa application form, and one passport-sized photo. When applying upon arrival, you'll need to have a passport with at least six months of validity and the necessary fee in US dollars or local currency.",
  },
  {
    id: 'visa3',
    question: 'What documents do I need to enter Nepal?',
    answer:
      "In addition to a valid passport, you'll need to have proof of onward travel and enough funds to support yourself during your stay in Nepal. You may also need to show proof of yellow fever vaccination if you are arriving from a country with a high risk of yellow fever transmission.",
  },
  {
    id: 'visa4',
    question: 'How long is a tourist visa valid for in Nepal?',
    answer:
      'Tourist visas in Nepal are available for a variety of lengths of stay, ranging from 15 days to 150 days. The length of stay you select will determine the cost of your visa. Visitors can also apply for multiple entry visas if they plan to leave and re-enter the country during their trip.',
  },
  {
    id: 'visa5',
    question: 'Is it possible to extend my visa while in Nepal?',
    answer:
      'Yes, it is possible to extend your visa while in Nepal. You can do this by visiting the Department of Immigration in Kathmandu. You will need to provide your passport and a reason for the extension. The cost and length of the extension will depend on your visa type and the reason for the extension.',
  },
];

export const _faqsBestTime = [
  {
    id: 'besttime_01',
    question: 'When is the best time to visit Nepal for trekking?',
    answer:
      'The best time to visit Nepal for trekking is from September to November and from March to May. During these months, the weather is clear and dry, making it easier for trekkers to reach high elevations. The views of the mountains are also typically clearer during these months, allowing for better vistas.',
  },
  {
    id: 'besttime_02',
    question: 'Is monsoon season a good time to visit Nepal?',
    answer:
      "Monsoon season in Nepal typically lasts from June to August and is not ideal for trekking or outdoor activities due to heavy rainfall and potential landslides. However, this is a good time to visit if you're interested in exploring the country's cultural and historical sites, as the rain can bring a lush greenness to the landscapes.",
  },
  {
    id: 'besttime_03',
    question: 'Can I raft in Nepal during the winter months?',
    answer:
      'Rafting in Nepal during the winter months can be challenging due to the cold water and potential for snow and ice in the high elevations. However, some brave and experienced rafters may still enjoy the adventure during this time. The best time for rafting in Nepal is from September to November and from March to June, when the water levels are high and the weather is warm.',
  },
  {
    id: 'besttime_04',
    question: 'Is it possible to go on a cultural tour in Nepal during the monsoon season?',
    answer:
      'Yes, it is possible to go on a cultural tour in Nepal during the monsoon season. The rain can bring a vibrant greenness to the landscapes and make for some beautiful scenery. Additionally, many of the cultural and historical sites in Nepal are located in lower elevations, where the rain is not as intense as in the higher elevations.',
  },
  {
    id: 'besttime_05',
    question: 'Can I visit Nepal during the peak climbing season?',
    answer:
      "Yes, you can visit Nepal during the peak climbing season, which is typically from May to October. However, keep in mind that this is also a busy time for trekkers and mountaineers, so you may encounter more crowds and limited accommodations in certain areas. If you're interested in visiting Nepal for trekking or climbing, it may be best to plan your trip for the shoulder season, from March to April or November.",
  },
];

export const healthAndSafetyFAQs = [
  {
    id: 'health_01',
    question: 'What vaccinations are required for travel to Nepal?',
    answer:
      "It is recommended to be up to date on routine vaccinations, such as MMR (measles, mumps, and rubella), DPT (diphtheria, pertussis, and tetanus), and polio. Some specific vaccinations that may be recommended for travel to Nepal include hepatitis A, typhoid, and rabies. It's best to consult with a healthcare professional or travel clinic for personalized advice based on your travel itinerary and health history.",
  },
  {
    id: 'health_02',
    question: 'Is tap water safe to drink in Nepal?',
    answer:
      "It is generally not safe to drink tap water in Nepal. It's best to drink bottled water or boil tap water for at least one minute before drinking to ensure that it's safe. It's also recommended to avoid ice in drinks and to brush your teeth with bottled water.",
  },
  {
    id: 'health_03',
    question: 'Are there any health risks associated with trekking in Nepal?',
    answer:
      "Yes, there are health risks associated with trekking in Nepal, particularly at high elevations. Altitude sickness, also known as acute mountain sickness (AMS), can occur above 2,500 meters. Symptoms include headache, nausea, fatigue, and shortness of breath. It's important to acclimatize properly, avoid alcohol and sleeping at elevations higher than where you slept the previous night, and to descend if symptoms persist or worsen.",
  },
  {
    id: 'health_04',
    question: 'What should I do in case of an emergency in Nepal?',
    answer:
      "In case of an emergency in Nepal, it's important to remain calm and seek help. If you need medical assistance, head to the nearest hospital or clinic. If you're trekking or climbing, ensure that you have adequate travel insurance and carry a comprehensive first aid kit. It's also recommended to bring important personal information, such as your passport and insurance policy, with you when traveling.",
  },
  {
    id: 'health_05',
    question: 'What is the crime rate like in Nepal?',
    answer:
      "The crime rate in Nepal is generally low, but it's still important to be aware of your surroundings and take precautions to ensure your safety. Avoid carrying large amounts of cash and valuables, and be mindful of pickpocketing in crowded areas. It's also recommended to take taxis or ride-sharing services instead of walking alone at night.",
  },
];

export const popularDestinationFAQs = [
  {
    id: 'destination_01',
    question: 'What are the most popular destinations in Nepal?',
    answer:
      'The most popular destinations in Nepal include Kathmandu, Pokhara, Everest Base Camp, Annapurna Circuit, Langtang National Park, Chitwan National Park, and Bhaktapur. These destinations offer a range of experiences, from city life and cultural heritage to trekking and wildlife viewing.',
  },
  {
    id: 'destination_02',
    question: 'What is the best time to visit Kathmandu?',
    answer:
      "The best time to visit Kathmandu is from October to April, when the weather is dry and mild. During this time, the skies are generally clear, making it ideal for exploring the city's temples, palaces, and museums. It's important to note that the city can be crowded during peak tourist season, so booking accommodations in advance is recommended.",
  },
  {
    id: 'destination_03',
    question: 'What is the best time to trek in the Annapurna region?',
    answer:
      "The best time to trek in the Annapurna region is from September to November, and from March to May. During these months, the weather is clear and the skies are generally sunny, making for excellent views of the mountains. It's important to note that some trekking routes may be closed during the monsoon season from June to August.",
  },
  {
    id: 'destination_04',
    question: 'What is the best time to visit Chitwan National Park?',
    answer:
      "The best time to visit Chitwan National Park is from October to March, when the weather is dry and visibility is good for wildlife viewing. During this time, the animals are also more active and easier to spot. It's important to note that the park may be closed during the monsoon season from June to September.",
  },
  {
    id: 'destination_05',
    question: 'What is the best way to get around in Nepal?',
    answer:
      "The best way to get around in Nepal depends on your destination and travel itinerary. In the cities, taxis, rickshaws, and public transportation are commonly used. For longer distances, domestic flights are available, and private cars or jeeps can be hired. For trekking and climbing, it's best to hire a local guide and porter to ensure a safe and enjoyable experience.",
  },
];

export const transportationFAQs = [
  {
    id: 'transportation_01',
    question: 'What are the modes of transportation available in Nepal?',
    answer:
      'The modes of transportation available in Nepal include taxis, rickshaws, public buses, private cars, jeeps, motorcycles, bicycles, domestic flights, and trekking. The most commonly used modes of transportation in cities are taxis and rickshaws, while domestic flights are used for longer distances and trekking is used for adventure travel.',
  },
  {
    id: 'transportation_02',
    question: 'How much does it cost to take a taxi in Nepal?',
    answer:
      "The cost of a taxi in Nepal depends on the distance traveled and the time of day. On average, a one-way trip within the city can cost anywhere from NPR 200 to NPR 500. It's important to note that taxi fares are not regulated and it's recommended to agree on the fare with the driver before starting the trip.",
  },
  {
    id: 'transportation_03',
    question: 'What are the domestic airlines in Nepal?',
    answer:
      "The domestic airlines in Nepal include Nepal Airlines, Buddha Air, Yeti Airlines, and Simrik Airlines. These airlines offer flights between major cities in Nepal, including Kathmandu, Pokhara, and Lukla, among others. It's important to book flights in advance, as the availability of flights can be limited, especially during peak tourist season.",
  },
  {
    id: 'transportation_04',
    question: 'What is the best way to get around in the cities?',
    answer:
      "The best way to get around in the cities is by taxis or rickshaws. Taxis can be hailed on the street or booked in advance, and rickshaws can be found at stands or hailed on the street. It's important to agree on the fare with the driver before starting the trip, as taxi fares are not regulated.",
  },
  {
    id: 'transportation_05',
    question: 'What is the best way to get to trekking trailheads?',
    answer:
      "The best way to get to trekking trailheads is by private car or jeep. These vehicles can be hired in Kathmandu or Pokhara, and they will take you directly to the trailhead. It's important to hire a reputable driver and vehicle, as the roads in Nepal can be challenging and safety should be a top priority.",
  },
];

export const currencyAndPaymentsFAQs = [
  {
    id: 'currency_and_payments_01',
    question: 'What is the currency used in Nepal?',
    answer:
      'The currency used in Nepal is the Nepalese Rupee (NPR). The Nepalese Rupee is divided into 100 paise. Banknotes come in denominations of 1000, 500, 100, 50, 20, 10, 5, 2, and 1 Rupee, while coins come in denominations of 5, 2, and 1 Rupee, and 50 and 25 paise.',
  },
  {
    id: 'currency_and_payments_02',
    question: 'Where can I exchange money in Nepal?',
    answer:
      "You can exchange money in Nepal at banks, money exchange counters at the airport, or authorized money exchange dealers. It's important to exchange money at a reputable establishment and to check the current exchange rate before making a transaction.",
  },
  {
    id: 'currency_and_payments_03',
    question: 'Can I use my credit card in Nepal?',
    answer:
      "Yes, you can use your credit card in Nepal, but it's important to note that not all establishments accept credit cards. The more upscale hotels, restaurants, and shops in cities like Kathmandu and Pokhara will generally accept credit cards, but it's always best to check with the establishment before making a purchase.",
  },
  {
    id: 'currency_and_payments_04',
    question: 'Are there ATMs available in Nepal?',
    answer:
      "Yes, there are ATMs available in Nepal, especially in cities like Kathmandu and Pokhara. However, it's important to note that not all ATMs accept foreign cards and it's best to check with your bank before leaving your home country to ensure that your card will work in Nepal.",
  },
  {
    id: 'currency_and_payments_05',
    question: 'Can I tip in Nepal?',
    answer:
      "Yes, tipping is common in Nepal and it's customary to tip in restaurants, hotels, and for taxi and rickshaw services. The amount to tip is usually a small percentage of the total bill and is left at the discretion of the individual. In general, a 10% tip is appreciated, but higher or lower tips can be given based on the level of service provided.",
  },
];
