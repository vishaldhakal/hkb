import { useState, useEffect, ReactElement } from 'react';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Iconify, Page } from '../src/components';
import { IconButtonAnimate } from '../src/components/animate';
// sections
import { SupportHero, SupportSidebar, SupportContent } from '../src/sections/support';
import { ElearningContactInfo } from '../src/sections/@e-learning';
import {
  currencyAndPaymentsFAQs,
  healthAndSafetyFAQs,
  popularDestinationFAQs,
  transportationFAQs,
  _faqsBestTime,
  _faqsVisa,
} from '../_data/mock/_faqs';
import { navbarGenerator } from '../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const TOPICS = [
  {
    title: 'Visa requirements',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_account.svg',
    content: <SupportContent contents={_faqsVisa} />,
  },
  {
    title: 'Best time',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_payment.svg',
    content: <SupportContent contents={_faqsBestTime} />,
  },
  {
    title: 'Health & safety',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_delivery.svg',
    content: <SupportContent contents={healthAndSafetyFAQs} />,
  },
  {
    title: 'Popular destinations',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_package.svg',
    content: <SupportContent contents={popularDestinationFAQs} />,
  },
  {
    title: 'Transportation options',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_refund.svg',
    content: <SupportContent contents={transportationFAQs} />,
  },
  {
    title: 'Currency & payment',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_assurances.svg',
    content: <SupportContent contents={currencyAndPaymentsFAQs} />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function SupportPage() {
  const [topic, setTopic] = useState('Visa requirements');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChangeTopic = (event: React.SyntheticEvent, newValue: string) => {
    setTopic(newValue);
  };

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <Page title="Support">
      <RootStyle>
        <SupportHero />

        <ElearningContactInfo />
        <Stack
          alignItems="flex-end"
          sx={{
            py: 1.5,
            px: 2.5,
            display: { md: 'none' },
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <IconButtonAnimate onClick={() => setMobileOpen(true)}>
            <Iconify icon={menuIcon} />
          </IconButtonAnimate>
        </Stack>

        <Container>
          <Typography
            variant="h2"
            sx={{
              py: { xs: 3, md: 10 },
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Stack
            direction="row"
            sx={{
              pb: { xs: 10, md: 15 },
            }}
          >
            <SupportSidebar
              sidebarConfig={TOPICS}
              topic={topic}
              isOpenSidebar={mobileOpen}
              onChangeTopic={handleChangeTopic}
              onCloseSidebar={() => setMobileOpen(false)}
            />

            {TOPICS.map((item) => {
              const { title, content } = item;
              return title === topic && <div key={title}>{content}</div>;
            })}
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

SupportPage.getLayout = function getLayout(page: ReactElement) {
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
