/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ReactElement, useEffect } from 'react';
// next
import menuIcon from '@iconify/icons-carbon/menu';

import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Divider, Container, SelectChangeEvent } from '@mui/material';
// routes
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// hooks
import { useResponsive } from '../../../src/hooks';
// _data
import { _reviews } from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import {
  Page,
  ErrorScreen,
  Breadcrumbs,
  IconButtonAnimate,
  Iconify,
} from '../../../src/components';
// sections
import {
  TravelTourDetails,
  TravelTourSimilar,
  TravelTourReserveForm,
} from '../../../src/sections/@travel';
import { Box } from '@mui/material';
import {
  ActivitiesSearchProps,
  EachActivityCardProps,
  EachActivityProps,
} from '../../../src/@types/travel';
import TourHero from '../../../src/sections/@travel/tours/TourHero';
import TourSidebar from '../../../src/sections/@travel/tours/TourSidebar';
import { Typography } from '@mui/material';
import { fDate } from '../../../src/utils/formatTime';
import { NavItemProps } from '../../../src/@types/layout';
import Routes from '../../../src/routes';
import { OtherLinks } from '../../../src/layouts/nav';
import { navbarGenerator } from '../../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  activity: EachActivityProps;
  similarActivity: EachActivityCardProps[];
};
export default function TravelTourPage({ activity, similarActivity }: Props) {
  const router = useRouter();

  const [sort, setSort] = useState('latest');

  const [openReview, setOpenReview] = useState(false);

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const [selected, setSelected] = useState('Tour Overview');

  const isDesktop = useResponsive('up', 'md');

  const handleChangeCategory = (event: React.SyntheticEvent, newValue: string) => {
    setSelected(newValue);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const categories = [
    { name: 'Tour Overview', id: 'tour-overview' },
    { name: 'Description', id: 'tour-description' },
    { name: 'Highlights', id: 'tour-highlights' },
    { name: 'Includes', id: 'tour-includes' },
    { name: 'Excludes', id: 'tour-excludes' },
    { name: 'Itinerary', id: 'itinerary' },
    { name: 'Gallery', id: 'gallery' },

    { name: 'FAQs Section', id: 'faqs' },
  ];

  const handleClickScroll = (value: string) => {
    const element = document.getElementById(value);
    const headerOffset = HEADER_DESKTOP_HEIGHT;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      // 👇 Will scroll smoothly to the top of the next section
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (!activity) {
    return <ErrorScreen />;
  }

  return (
    <Page title={`${activity.slug} - Travel`}>
      <RootStyle>
        <TourHero activity={activity} />
        <Container maxWidth={false}>
          <Breadcrumbs
            sx={{ my: 3 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Tours', href: '/destinations/nepal' },
              { name: activity.activity_title },
            ]}
          />
          <Divider
            sx={{
              mb: 6,
            }}
          />
        </Container>
        <Container maxWidth={false}>
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={3}>
              <TravelTourReserveForm tour={activity} />
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
                {activity.activity_title}
              </Typography>
              <TravelTourDetails tour={activity} />
            </Grid>
            <Grid item xs={12} md={2}>
              <Stack
                alignItems="flex-end"
                sx={{
                  display: { md: 'none' },
                  position: 'fixed',
                  top: '50%',
                  right: -10,
                  zIndex: 10,
                }}
              >
                <IconButtonAnimate
                  onClick={() => setMobileOpen(true)}
                  sx={{
                    backgroundColor: 'secondary.main',
                    borderRadius: '0px',
                    color: 'common.white',
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    p: 2,
                  }}
                >
                  <Iconify icon={menuIcon} />
                </IconButtonAnimate>
              </Stack>
              <Box
                sx={{
                  position: { md: 'sticky' },
                  alignSelf: 'start',
                  top: isDesktop ? HEADER_DESKTOP_HEIGHT : HEADER_MOBILE_HEIGHT,
                  color: 'white',
                }}
              >
                <TourSidebar
                  sidebarConfig={categories}
                  topic={selected}
                  isOpenSidebar={mobileOpen}
                  onChangeTopic={handleChangeCategory}
                  onCloseSidebar={() => setMobileOpen(false)}
                  onClick={handleClickScroll}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* <Container>
          <Grid container spacing={8}>
            <Grid item xs={12} md={7} lg={8}>
              <ReviewTravelToolbar
                totalReview={_reviews.length}
                onOpenReview={() => setOpenReview(!openReview)}
                sort={sort}
                onChangeSort={handleChangeSort}
              />
              <Collapse in={openReview}>
                <ReviewForm onClose={() => setOpenReview(false)} />
              </Collapse>
              <ReviewTravelTourList reviews={_reviews} />
            </Grid>
          </Grid>
        </Container> */}

        <TravelTourSimilar tours={similarActivity.slice(-4)} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelTourPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const res = await fetch(ngrokapi + `/api/activity-detail/${params.slug}`);
  const activity = await res.json();
  const req2 = await fetch(ngrokapi + `/api/activities-all/nepal`);
  const res2 = await req2.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      activites_search,
      activity,
      nav_config,
      similarActivity: res2.activities,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req = await fetch(ngrokapi + `/api/activities-slug`);
  const activities = await req.json();
  const paths = activities.map((activity: { slug: string; id: number }) => ({
    params: { slug: activity.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}
