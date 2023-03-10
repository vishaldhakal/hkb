import { ReactElement } from 'react';
// @mui
// hooks
// @types
import { BlogProps } from '../src/@types/blog';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { TestimonialsTravel } from '../src/sections/testimonials';
import { BlogTravelFeaturedPosts } from '../src/sections/blog';
import {
  TravelLandingHero,
  TravelLandingSummary,
  TravelLandingTourFeatured,
  TravelLandingFavoriteDestinations,
} from '../src/sections/@travel';
import { TeamMarketingLangding } from '../src/sections/team';
import { MarketingLandingProcess, MarketingServicesBenefits } from '../src/sections/@marketing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _travel_testimonials } from '../_data/mock/_testimonials';
import { ngrokapi } from '../src/config';
import MapLanding from '../src/sections/@travel/landing/MapLanding';
import { EachActivityCardProps, EachActivityProps } from '../src/@types/travel';
import { ActivityProps } from '../src/@types/activity/activity';
import BannerSection from '../src/sections/@travel/landing/BannerSection';
import { TestimonialProps } from '../src/@types/testimonial';
import { TeamMemberPropsHBHB } from '../src/@types/team';
import TravelTourBarFiltersLanding from '../src/sections/@travel/filters/TravelTourBarFilters';
import TravelLaningTourPopular from '../src/sections/@travel/landing/TravelLaningTourPopular';
import TravelLandingTourBestSelling from '../src/sections/@travel/landing/TravelLandingTourBestSelling';
import { navbarGenerator } from '../src/utils/navbargenerator';
import Head from "next/head";

// ----------------------------------------------------------------------

export type HEROCONTENTPROPS = {
  id: number;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_title_line3: string;
  hero_section_subtitle: string;
  hero_section_image: string;
};

type Props = {
  hero_content: HEROCONTENTPROPS;
  posts: BlogProps[];
  featured_packages: EachActivityCardProps[];
  popular_packages: EachActivityCardProps[];
  best_selling_packages: EachActivityCardProps[];
  activities_list: ActivityProps[];
  testimonials: TestimonialProps[];
  team_members: TeamMemberPropsHBHB[];
  destinations: EachActivityProps['destination'][];
};

export default function TravelLandingPage({
  posts,
  featured_packages,
  best_selling_packages,
  popular_packages,
  activities_list,
  testimonials,
  hero_content,
  team_members,
  destinations,
}: Props) {
  return (
    <>

    <Page meta={<Meta hero_image={hero_content.hero_section_image} />}>
      <TravelLandingHero activities_list={activities_list} hero_content={hero_content} />
      <TravelTourBarFiltersLanding
        sx={{ py: { xs: 3, md: 3 } }}
        activities_list={activities_list}
        destinations={destinations}
      />

      <TravelLandingFavoriteDestinations />
      {!!featured_packages.length && (
        <TravelLandingTourFeatured featured_packages={featured_packages} />
      )}
      <MarketingLandingProcess />
      {!!best_selling_packages.length && (
        <TravelLandingTourBestSelling best_selling_packages={best_selling_packages} />
      )}
      <BannerSection />
      {!!popular_packages.length && <TravelLaningTourPopular popular_packages={popular_packages} />}

      <TravelLandingSummary />

      {!!posts.length && <BlogTravelFeaturedPosts posts={posts} />}

      <TestimonialsTravel testimonials={testimonials} />
      <TeamMarketingLangding members={team_members} />

      <MarketingServicesBenefits />

      <MapLanding />
    </Page>
    </>
  );
}

type MetaProps={
  hero_image:string;
}

const Meta = ({hero_image}:MetaProps)=>{
  return(
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
        <title>Nepal Awaits You - Book Your Adventure with Hiking Bees: Tours, Treks, and More</title>
        <meta
          name="title"
          content="Nepal Awaits You - Book Your Adventure with Hiking Bees: Tours, Treks, and More"
        ></meta>
        <meta
          name="description"
          content="Book your adventure, travel, trekking and peak climbing now with Hiking Bees for expert guidance, unbeatable prices, and unforgettable memories in Nepal."
        ></meta>
        <link rel="canonical" href="https://hikingbees.com/" />
        <meta
          property="og:title"
          content="Nepal Awaits You - Book Your Adventure with Hiking Bees: Tours, Treks, and More"
        />
        <meta
          property="og:description"
          content="Book your adventure, travel, trekking and peak climbing now with Hiking Bees for expert guidance, unbeatable prices, and unforgettable memories in Nepal."
        />
        <meta property="og:image" content={ngrokapi+hero_image} />
        <meta property="og:url" content="https://hikingbees.com/" />

        <meta property="twitter:url" content="https://hikingbees.com/" />
        <meta property="twitter:title" content="Nepal Awaits You - Book Your Adventure with Hiking Bees: Tours, Treks, and More" />
        <meta property="twitter:description" content="Book your adventure, travel, trekking and peak climbing now with Hiking Bees for expert guidance, unbeatable prices, and unforgettable memories in Nepal." />
        <meta property="twitter:image" content={ngrokapi+hero_image}></meta>
    </>
  )
}

// ----------------------------------------------------------------------

TravelLandingPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout transparentHeader activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const req1 = await fetch(ngrokapi + '/api/landing-page');
  const res1 = await req1.json();
  const req2 = await fetch(ngrokapi + '/api/activities');
  const { destinations } = await req2.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();

  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      hero_content: res1.hero_content,
      posts: res1.recent_posts,
      featured_packages: res1.featured_activities,
      popular_packages: res1.popular_activities,
      best_selling_packages: res1.best_selling_activities,
      activities_list: res1.activity_categories,
      testimonials: res1.testimonials,
      team_members: res1.team_members,
      activites_search,
      destinations,
      nav_config,
    },
    revalidate: 10,
  };
}
