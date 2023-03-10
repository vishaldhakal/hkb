// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box, Tabs, Tab, Grid } from '@mui/material';
// @types
import { TeamMemberPropsHBHB } from '../../../@types/team';
//
import TeamElearningMember from './TeamElearningMember';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  members: TeamMemberPropsHBHB[];
};

export default function TeamElearningAbout({ members }: Props) {
  const [value, setValue] = useState('Executive Team');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  function filterByType(teamMembers: TeamMemberPropsHBHB[], type: string): TeamMemberPropsHBHB[] {
    return teamMembers.filter((member) => member.type === type);
  }

  const filteredMembers = filterByType(members, value);

  return (
    <RootStyle>
      <Container>
        <Typography
          variant="h2"
          sx={{
            my: 3,
          }}
        >
          Our{' '}
          <Box component="span" color="primary.main">
            Hive
          </Box>
        </Typography>
        <Typography sx={{ color: 'text.disabled' }}>
          At Hiking Bees, we are a team of passionate travel enthusiasts and outdoor enthusiasts.
          Our goal is to provide an immersive and authentic travel experience to our readers and
          clients. We have extensive knowledge of the hiking trails and outdoor destinations and are
          dedicated to helping people find the perfect adventure for their needs. Our team is always
          on the lookout for new and exciting places to explore and share with our audience.
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{
            p: 3,
            my: 2,
          }}
          centered
          variant="scrollable"
          allowScrollButtonsMobile
        >
          <Tab value="Executive Team" label="Executive Team" />
          <Tab value="Representative" label="Representative" />
          <Tab value="Trekking Guides" label="Trekking Guides" />
          <Tab value="Tour Guide" label="Tour Guide" />
        </Tabs>
        <Grid container spacing={2}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} key={member.id}>
              <TeamElearningMember member={member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
