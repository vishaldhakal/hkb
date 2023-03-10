// ----------------------------------------------------------------------

const Routes = {
  // Marketing
  marketing: {
    landing: '/marketing',
    services: '/marketing/services',
    caseStudies: '/marketing/case-studies',
    caseStudy: (slug: string) => `/marketing/case-studies/${slug}`,
    posts: '/marketing/blog',
    post: (slug: string) => `/marketing/blog/${slug}`,
    about: '/marketing/about-us',
    contact: '/marketing/contact-us',
  },

  // About

  about: {
    landing: '/about',
    terms_and_condition: '/about/policies/terms-and-conditions',
    privacy_policies: '/about/policies/privacy-policies',
    cookie_policies: '/about/policies/cookie-policies',
    team: '/about/team',
    team_single: (id: string | number) => `/about/team/${id}`,
  },
  // Travel
  travel: {
    landing: '/travel',
    tours: '/travel/tours',
    tour: (id: string | number) => `/travel/tours/${id}`,
    checkout: '/travel/checkout',
    checkoutPackage: (slug: string) => `/travel/checkout/${slug}`,
    checkoutComplete: '/travel/checkout/complete',
    posts: '/travel/blog',
    post: (slug: string) => `/travel/blog/${slug}`,
    about: '/travel/about-us',
    contact: '/travel/contact-us',
  },

  // activities
  activities: {
    allActivities: '/activities',
    activity: (slug: string) => `/activities/${slug}`,
  },
  // Career
  career: {
    landing: '/career',
    jobs: '/career/jobs',
    job: (id: string) => `/career/jobs/${id}`,
    posts: '/career/blog',
    post: (slug: string) => `/career/blog/${slug}`,
    about: '/career/about-us',
    contact: '/career/contact-us',
  },
  // E-Learning
  eLearning: {
    landing: '/e-learning',
    courses: '/e-learning/courses',
    course: (id: string) => `/e-learning/courses/${id}`,
    posts: '/e-learning/blog',
    post: (slug: string) => `/e-learning/blog/${slug}`,
    about: '/e-learning/about-us',
    contact: '/e-learning/contact-us',
  },
  // Plan your trip
  bookTrip: {
    bookTripForm: '/book-trip/book-trip-form',
  },
  // Common
  loginCover: '/auth/login-cover',
  registerCover: '/auth/register-cover',
  loginIllustration: '/auth/login-illustration',
  registerIllustration: '/auth/register-illustration',
  resetPassword: '/auth/reset-password',
  verifyCode: '/auth/verify-code',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricing01: '/pricing-01',
  pricing02: '/pricing-02',
  checkout: '/checkout',
  support: '/support',
  page404: '/404',
  page500: '/500',
  // Others
  pages: '/pages',
  componentsUI: '/components-ui',
  componentUI: (slug: string) => `/components-ui/${slug}`,
  muiComponents: 'https://mui.com/components',
  docs: 'https://zone-docs.vercel.app',
  license: 'https://material-ui.com/store/license/#i-standard-license',
  minimalDashboard: 'https://material-ui.com/store/items/minimal-dashboard',
  buyNow: 'https://material-ui.com/store/items/zone-landing-page',
  figmaPreview:
    'https://www.figma.com/file/iAnp6x4J6YNvbVzdBnGM8P/%5BPreview%5D-Zone-Web?node-id=0%3A1',
};

export default Routes;
