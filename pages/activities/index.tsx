import { ReactElement, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../src/config';
// hooks
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { TravelTourList } from '../../src/sections/@travel';
import { ActivityProps } from '../../src/@types/activity/activity';
import {
  ActivityRegionProps,
  EachActivityCardProps,
  EachActivityProps,
} from '../../src/@types/travel';
import TravelTourBarFiltersActivities from '../../src/sections/@travel/filters/TravelTourBarFiltersActivities';
import { navbarGenerator } from '../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

type Props = {
  activities: EachActivityCardProps[];
  categories: ActivityProps[];
  regions: ActivityRegionProps[];
  destinations: EachActivityProps['destination'][];
};

// ----------------------------------------------------------------------

export default function TravelToursPage({ activities, categories, regions, destinations }: Props) {
  const [location, setLocation] = useState<EachActivityProps['destination'] | null>(null);

  const [regionslocal, setRegionsLocal] = useState<ActivityRegionProps | null>(null);
  const [activityLocal, setActivityLocal] = useState<ActivityProps | null>(null);

  function filterActivities(
    activities: EachActivityCardProps[],
    destinationName?: string,
    regionTitle?: string,
    categoryTitle?: string
  ): EachActivityCardProps[] {
    return activities.filter((activity) => {
      let destinationFilter = true;
      let regionFilter = true;
      let categoryFilter = true;

      if (destinationName) {
        destinationFilter = activity.destination.name === destinationName;
      }

      if (regionTitle) {
        regionFilter = activity.activity_region.title === regionTitle;
      }

      if (categoryTitle) {
        categoryFilter = activity.activity_category.some(
          (category) => category.title === categoryTitle
        );
      }

      return destinationFilter && regionFilter && categoryFilter;
    });
  }

  const filteredActivities = filterActivities(
    activities,
    location?.name,
    regionslocal?.title,
    activityLocal?.title
  );
  
  const getCover = (activities:any)=>{
    if(activities){
      return activities[0].coverImg;
    }else{
      return "no-image.png";
    }
  }

  return (
    <Page meta={<Meta hero_image={getCover(activities)}/>}>
      <RootStyle>
        <TravelTourBarFiltersActivities
          activities_list={categories}
          destinations={destinations}
          location={location}
          setLocation={setLocation}
          setRegionsLocal={setRegionsLocal}
          regions={regions}
          setActivityLocal={setActivityLocal}
        />
        <Container
          sx={{
            mb: 8,
          }}
        >
          <TravelTourList activities={filteredActivities} loading={!activities} />
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelToursPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

type MetaProps={
  hero_image:string;
}

const Meta = ({hero_image}:MetaProps)=>{
  return(
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
        <title>Plan Your Dream Nepal Adventure with Hiking Bees: Our List of Activities Has Something for Everyone</title>
        <meta
          name="title"
          content="Plan Your Dream Nepal Adventure with Hiking Bees: Our List of Activities Has Something for Everyone"
        ></meta>
        <meta
          name="description"
          content="At Hiking Bees, we believe that adventure is a way of life. That's why we have curated a list of activities that showcases the best of Nepal's natural and cultural treasures. "
        ></meta>
        <link rel="canonical" href="https://hikingbees.com/activities/" />
        <meta
          property="og:title"
          content="Plan Your Dream Nepal Adventure with Hiking Bees: Our List of Activities Has Something for Everyone"
        />
        <meta
          property="og:description"
          content="At Hiking Bees, we believe that adventure is a way of life. That's why we have curated a list of activities that showcases the best of Nepal's natural and cultural treasures. "
        />
        <meta property="og:image" content={ngrokapi+hero_image} />
        <meta property="og:url" content="https://hikingbees.com/activities/" />

        <meta property="twitter:url" content="https://hikingbees.com/activities/" />
        <meta property="twitter:title" content="Plan Your Dream Nepal Adventure with Hiking Bees: Our List of Activities Has Something for Everyone" />
        <meta property="twitter:description" content="At Hiking Bees, we believe that adventure is a way of life. That's why we have curated a list of activities that showcases the best of Nepal's natural and cultural treasures. " />
        <meta property="twitter:image" content={ngrokapi+hero_image}></meta>
    </>
  )
}

export async function getStaticProps() {
  const req1 = await fetch(ngrokapi + '/api/activities');
  const { activities, categories, regions, destinations } = await req1.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      activities,
      categories,
      activites_search,
      regions,
      nav_config,
      destinations,
    },
    revalidate: 10,
  };
}
