/* eslint-disable react/no-unescaped-entities */
import { Box, Divider, Link } from '@mui/material';
import { List } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
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

const terms = [
  {
    id: 1,
    title: 'Use of the Site',
    description:
      "You may use the Site and the services offered through the Site (the 'Services') only for lawful purposes and in accordance with these Terms. You agree not to use the Site or the Services for any commercial or non-personal purpose, or for any purpose that is illegal or prohibited by these Terms.",
  },
  {
    id: 2,
    title: 'Booking and Purchase of Products and Services',
    description:
      'When you book or purchase a product or service through the Site, you will be required to provide certain information, including but not limited to your name, email address, and payment information. You represent and warrant that all information you provide is accurate and complete.',
  },
  {
    id: 3,
    title: 'Payment and Cancellation',
    description:
      'All payments for products and services booked through the Site must be made in advance. If you need to cancel or change a booking, please contact us at info@hikingbeesnepal.com as soon as possible. Cancellation and change fees may apply.',
  },
  {
    id: 4,
    title: 'Responsibility for Your Conduct',
    description:
      'You are responsible for your own conduct and any content that you submit, post, or display on the Site. You must comply with all applicable laws and regulations and shall not engage in any activity that is harmful to us or to other users of the Site.',
  },
  {
    id: 5,
    title: 'Disclaimer of Warranties',
    description:
      "The Site and the Services are provided on an 'as is' and 'as available' basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Site or the Services, or the information, content, materials, or products included on the Site.",
  },
  {
    id: 6,
    title: 'Limitation of Liability',
    description:
      'To the fullest extent permitted by law, we will not be liable for any damages of any kind arising from the use of the Site or the Services, including but not limited to direct, indirect, incidental, punitive, and consequential damages.',
  },
  {
    id: 7,
    title: 'Indemnification',
    description:
      "You agree to indemnify and hold us harmless from and against any and all claims, damages, and expenses, including attorneys' fees, arising from your use of the Site or the Services.",
  },
  {
    id: 8,
    title: 'Modification of Terms',
    description:
      'We reserve the right to modify these Terms at any time, and any modifications will be effective immediately upon posting on the Site. Your continued use of the Site or the Services following any modifications indicates your acceptance of the new terms.',
  },
  {
    id: 9,
    title: 'Governing Law',
    description:
      'These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.',
  },
  {
    id: 9,
    title: 'Contact Us',
    description:
      'If you have any questions about these Terms or the Site, please contact us at info@hikingbeesnepal.com.',
  },
];

const TermsAndConditions = () => (
  <RootStyle>
    <Container>
      <Typography variant="h2" sx={{ my: '3rem' }}>
        Terms and Conditions
      </Typography>
      <Divider sx={{ my: '2rem' }} />
      <Typography variant="body1">
        <Box component="span" fontWeight={800}>
          Hiking Bees ("Company," "we," or "us"){' '}
        </Box>
        provides an online platform that allows users to plan and book travel-related services. By
        accessing or using the website located at{' '}
        <CustomLink href={'/'}>https://www.hikingbees.com</CustomLink> (the "Site"), or by booking
        any product or service offered through the Site, you agree to be bound by these terms and
        conditions (the "Terms").
      </Typography>

      <List sx={{ mb: 3 }}>
        {terms.map((term, index) => (
          <>
            <Typography variant="h4" sx={{ mt: 3, mb: 0 }}>
              {index + 1}. {term.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0 }}>
              {term.description}
            </Typography>
          </>
        ))}
      </List>

      <ElearningContactInfo />
    </Container>
  </RootStyle>
);

export default TermsAndConditions;

TermsAndConditions.getLayout = function getLayout(page: ReactElement) {
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
