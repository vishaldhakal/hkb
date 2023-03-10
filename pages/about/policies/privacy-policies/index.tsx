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

const policies = [
  {
    id: 1,
    title: 'Information Collection and Use',
    description:
      'We collect and use personal information for the purpose of providing the Services, including but not limited to booking and purchasing travel-related products and services. This information may include your name, email address, and payment information.',
  },
  {
    id: 2,
    title: 'Information Sharing and Disclosure',
    description:
      'We may share your personal information with third parties for the purpose of providing the Services, including but not limited to travel providers, payment processors, and marketing partners. We will not sell or rent your personal information to third parties for their own marketing purposes.',
  },
  {
    id: 3,
    title: 'Cookies and Tracking Technologies',
    description:
      'We use cookies and other tracking technologies to improve the performance of the Site and the Services, and to provide you with more personalized content and advertising. You can control the use of cookies through your browser settings.',
  },
  {
    id: 4,
    title: 'Security',
    description:
      'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no security measures are perfect or impenetrable, and we cannot guarantee the security of your personal information.',
  },
  {
    id: 5,
    title: 'Changes to the Privacy Policy',
    description:
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site. Your continued use of the Site or the Services following any changes indicates your acceptance of the new Privacy Policy.',
  },
];

const PrivacyPolicy = () => (
  <RootStyle>
    <Container>
      <Typography variant="h2" sx={{ my: '3rem' }}>
        Privacy Policy
      </Typography>
      <Divider sx={{ my: '2rem' }} />
      <Typography variant="body1">
        <Box component="span" fontWeight={800}>
          Hiking Bees ("Company," "we," or "us"){' '}
        </Box>
        provides an online platform that allows users to plan and book travel-related services. By
        accessing or using the website located at{' '}
        <CustomLink href={'/'}>https://www.hikingbees.com</CustomLink> (the "Site"), or by booking
        any product or service offered through the Site, you agree to be bound by these Privacy
        Policy.
      </Typography>

      <List sx={{ mb: 3 }}>
        {policies.map((policy, index) => (
          <>
            <Typography variant="h4" sx={{ mt: 3, mb: 0 }}>
              {index + 1}. {policy.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0 }}>
              {policy.description}
            </Typography>
          </>
        ))}
      </List>

      <ElearningContactInfo />
    </Container>
  </RootStyle>
);

export default PrivacyPolicy;

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
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
