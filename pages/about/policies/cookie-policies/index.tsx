/* eslint-disable react/no-unescaped-entities */
import { Box, List } from '@mui/material';
import { Container, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { ReactElement } from 'react';
import { ngrokapi } from '../../../../src/config';
import Layout from '../../../../src/layouts';
import { ElearningContactInfo } from '../../../../src/sections/@e-learning';
import { navbarGenerator } from '../../../../src/utils/navbargenerator';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const cookies = [
  {
    id: 1,
    title: 'What are cookies',
    description:
      'Cookies are small text files that are placed on your device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the website owner.',
  },
  {
    id: 2,
    title: 'How we use cookies',
    description:
      'We use cookies to improve the performance of our website and to provide you with more personalized content and advertising. We also use cookies to track your browsing behavior on our website and to analyze website traffic. We may also use cookies to remember your preferences and login information.',
  },
  {
    id: 3,
    title: 'Types of Cookies we use',
    description:
      'We use different types of cookies on our website, including session cookies, persistent cookies, and third-party cookies. Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them. Third-party cookies are placed by a domain other than our website.',
  },
  {
    id: 4,
    title: 'Managing cookies',
    description:
      'You can control the use of cookies through your browser settings. You can also delete cookies that have already been placed on your device. However, please note that disabling cookies may affect the functionality of our website.',
  },
  {
    id: 5,
    title: 'Changes to the Cookie Policy',
    description:
      'We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on the Site. Your continued use of the Site following any changes indicates your acceptance of the new Cookie Policy.',
  },
];

const CookiePolicy = () => (
  <RootStyle>
    <Container>
      <Typography variant="h2" sx={{ my: '3rem' }}>
        Cookie Policy
      </Typography>
      <Divider sx={{ my: '2rem' }} />
      <Typography variant="body1">
        <Box component="span" fontWeight={800}>
          Hiking Bees ("Company," "we," or "us"){' '}
        </Box>
        provides an online platform that allows users to plan and book travel-related services. By
        accessing or using the website located at{' '}
        <CustomLink href={'/'}>https://www.hikingbees.com</CustomLink> (the "Site"), or by booking
        any product or service offered through the Site, you agree to be bound by these Cookie
        Policy
      </Typography>

      <List sx={{ mb: 3 }}>
        {cookies.map((cookie, index) => (
          <>
            <Typography variant="h4" sx={{ mt: 3, mb: 0 }}>
              {index + 1}. {cookie.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0 }}>
              {cookie.description}
            </Typography>
          </>
        ))}
      </List>

      <ElearningContactInfo />
    </Container>
  </RootStyle>
);

export default CookiePolicy;

CookiePolicy.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

export async function getStaticProps() {
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}
