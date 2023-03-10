// @mui
import { Box } from '@mui/material';
// @types
import { EachActivityCardProps } from '../../../@types/travel';
// components
import { TourItemSkeleton } from '../../../components/skeleton';
//
import TravelTourItem from './TravelTourItem';

// ----------------------------------------------------------------------

type Props = {
  activities: EachActivityCardProps[];
  loading?: boolean;
};

export default function TravelTourList({ activities, loading }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          columnGap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(8)] : activities).map((activity, index) =>
          activity ? (
            <TravelTourItem key={activity.id} activity={activity} index={index} />
          ) : (
            <TourItemSkeleton key={index} />
          )
        )}
      </Box>
    </>
  );
}
