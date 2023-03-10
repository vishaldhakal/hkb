import { useState } from 'react';
// @mui
import { Tabs, Tab, Box } from '@mui/material';
// @types
//
import { ActivityRegionProps, EachActivityCardProps } from '../../../@types/travel';
import TravelTourItem from '../../@travel/tours/TravelTourItem';
import { ActivityProps } from '../../../@types/activity/activity';
import { ErrorScreen } from '../../../components';

// ----------------------------------------------------------------------

type Props = {
  activities: EachActivityCardProps[];
  activity_categories: ActivityProps[] | ActivityRegionProps[];
};

export default function MarketingCaseStudiesList({ activities, activity_categories }: Props) {
  const [selected, setSelected] = useState('All');

  const getCategories = activity_categories.map((activity) => activity.title);

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
        <ErrorScreen
          title="Packages Coming Soon"
          description="Your Packages are getting Ready! Plan your Trip With us"
        />
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
  return activities.filter((activity) =>
    activity.activity_category.some((category) => category.title === title)
  );
}
