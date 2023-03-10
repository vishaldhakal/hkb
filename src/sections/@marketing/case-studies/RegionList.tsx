import { useState } from 'react';
// @mui
import { Tabs, Tab, Box } from '@mui/material';
// @types
//
import { ActivityRegionProps, EachActivityCardProps } from '../../../@types/travel';
import TravelTourItem from '../../@travel/tours/TravelTourItem';
import { ErrorScreen } from '../../../components';

// ----------------------------------------------------------------------

type Props = {
  activities: EachActivityCardProps[];
  activity_regions: ActivityRegionProps[];
  selected_region: string | undefined;
};

export default function RegionList({ activities, activity_regions, selected_region }: Props) {
  const [selected, setSelected] = useState(selected_region || 'All');

  const getCategories = activity_regions.map((region) => region.title);

  const categories = ['All', ...Array.from(new Set(getCategories))];

  const filtered = filterActivitiesByTitle(activities, selected);

  const handleChangeCategory = (event: React.SyntheticEvent, newValue: string) => {
    setSelected(newValue);
  };

  return (
    <Box
      sx={{
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Box
        sx={{
          pt: 0,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Tabs
          value={selected}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeCategory}
        >
          {categories.map((category) => (
            <Tab key={category} value={category} label={category} />
          ))}
        </Tabs>
      </Box>

      {!!filtered.length ? (
        <Box
          sx={{
            display: 'grid',
            rowGap: { xs: 4, md: 5 },
            columnGap: 4,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {filtered.map((activity) => (
            <TravelTourItem key={activity.slug} activity={activity} />
          ))}
        </Box>
      ) : (
        <ErrorScreen title="No such Packages" description="Unable to find packages as requested" />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function filterActivitiesByTitle(
  activities: EachActivityCardProps[],
  title: string
): EachActivityCardProps[] {
  if (title === 'All') {
    return activities;
  }
  return activities.filter((activity) => activity.activity_region.title === title);
}
