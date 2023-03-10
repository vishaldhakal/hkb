import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// @types
import { TestimonialProps } from '../../../src/@types/testimonial';
// layouts
import Layout from '../../../src/layouts';
// components
import { HTMLToReact, Image, Page, SocialsButton } from '../../../src/components';
// sections
import { TestimonialsTravel } from '../../../src/sections/testimonials';
import { TeamMemberPropsHBHB } from '../../../src/@types/team';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { TeamMarketingLangding } from '../../../src/sections/team';
import { navbarGenerator } from '../../../src/utils/navbargenerator';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  testimonials: TestimonialProps[];
  team_member: TeamMemberPropsHBHB;
  team_members: TeamMemberPropsHBHB[];
};

export default function MarketingCaseStudiesPage({
  testimonials,
  team_member,
  team_members,
}: Props) {
  const { about, name, photo, role, type, facebook, instagram, linkedin, twitter, email } =
    team_member;
  return (
    <Page title={`About Teams`}>
      <RootStyle>
        <Container>
          <Grid container xs={12} spacing={8} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Image
                src={ngrokapi + photo}
                alt={name}
                sx={{
                  height: 1,
                  borderRadius: 2,
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={1}>
                <Typography variant="h2">
                  <Box component="span" color="primary.main">
                    {team_member.name}
                  </Box>
                </Typography>
                <Typography variant="body3" sx={{ color: 'text.disabled' }}>
                  {role} / {type}
                </Typography>
                <SocialsButton
                  initialColor
                  links={{ facebook, instagram, linkedin, twitter, email }}
                />
              </Stack>
              <HTMLToReact html={about} />
            </Grid>
          </Grid>
        </Container>
        <TeamMarketingLangding members={team_members} />
        <TestimonialsTravel testimonials={testimonials} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingCaseStudiesPage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

// ----------------------------------------------------------------------

type Params = {
  params: {
    id: number;
  };
};

export async function getStaticProps({ params }: Params) {
  const req2 = await fetch(ngrokapi + `/api/team-single/${params.id}`);
  const { team_member } = await req2.json();
  const req4 = await fetch(ngrokapi + '/api/testimonials');
  const { testimonials } = await req4.json();
  const req5 = await fetch(ngrokapi + '/api/team-members');
  const { team_members } = await req5.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();
  return {
    props: {
      testimonials,
      team_members,
      team_member,
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req5 = await fetch(ngrokapi + '/api/team-members-id');
  const { team_members } = await req5.json();

  const paths = team_members.map((team_member: { id: number }) => ({
    params: { id: `${team_member.id}` },
  }));
  console.log(paths);
  return {
    paths,
    fallback: 'blocking',
  };
}
