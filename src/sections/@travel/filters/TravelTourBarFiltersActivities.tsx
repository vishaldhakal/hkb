import { Dispatch, SetStateAction } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, TextField, TextFieldProps, SxProps } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import { Iconify } from '../../../components';
//
import TravelTourFilterLocation from './TravelTourFilterLocation';
import TravelTourFilterActivity from './TravelTourFilterActivity';
import { Container } from '@mui/material';
import { ActivityProps } from '../../../@types/activity/activity';
import { ActivityRegionProps, EachActivityProps } from '../../../@types/travel';
import TravelTourFilterRegions from './TravelTourFilterRegions';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

type BarStyleProps = {
  onDark: boolean;
};

const BarStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'onDark',
})<BarStyleProps>(({ onDark, theme }) => ({
  width: '100%',
  borderRadius: Number(theme.shape.borderRadius) * 2,
  ...cssStyles().bgBlur({
    blur: 4,
    opacity: 0.08,
    color: theme.palette.common.black,
  }),
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    ...(onDark && {
      ...cssStyles().bgBlur({
        blur: 4,
        opacity: 0.08,
        color: theme.palette.common.black,
      }),
      '& .MuiFilledInput-root': {
        color: theme.palette.common.white,
        '& .MuiFilledInput-input': {
          '&::placeholder': {
            color: theme.palette.grey[600],
          },
        },
        '& .MuiInputAdornment-root svg': {
          color: theme.palette.grey[600],
        },
      },
    }),
  },
}));

export const InputStyle = styled((props: TextFieldProps) => <TextField fullWidth {...props} />)(
  ({ theme }) => ({
    '& .MuiFilledInput-root': {
      backgroundColor: 'transparent',
      '&.Mui-focused, &:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiFilledInput-input': {
        ...theme.typography.subtitle1,
        padding: 0,
        height: 48,
      },
      '& .MuiInputAdornment-root': {
        marginTop: '0 !important',
      },
    },
  })
);

// ----------------------------------------------------------------------

type Props = {
  onDark?: boolean;
  sx?: SxProps;
  activities_list: ActivityProps[];
  destinations: EachActivityProps['destination'][];
  regions: ActivityRegionProps[];
  setRegionsLocal: Dispatch<SetStateAction<ActivityRegionProps | null>>;
  location: EachActivityProps['destination'] | null;
  setLocation: Dispatch<SetStateAction<EachActivityProps['destination'] | null>>;
  setActivityLocal: Dispatch<SetStateAction<ActivityProps | null>>;
};

export default function TravelTourBarFiltersActivities({
  onDark = false,
  sx,
  activities_list,
  destinations,
  regions,
  location,
  setLocation,
  setActivityLocal,
  setRegionsLocal,
}: Props) {
  return (
    <RootStyle sx={sx}>
      <Container>
        <BarStyle
          spacing={2.5}
          alignItems={{ md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          onDark={onDark}
        >
          <Stack
            spacing={2.5}
            sx={{ width: 1 }}
            alignItems="center"
            direction={{ xs: 'column', md: 'row' }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              />
            }
          >
            <TravelTourFilterLocation setLocation={setLocation} destinations={destinations} />
            <TravelTourFilterActivity
              activities_list={activities_list}
              setActivityLocal={setActivityLocal}
            />
            <TravelTourFilterRegions setRegion={setRegionsLocal} regions={regions} />
          </Stack>

          <Button
            size="large"
            color="secondary"
            disabled={!!!location?.name.length}
            variant="contained"
            href={`/destinations/${location?.name}`}
            sx={{
              px: 0,
              flexShrink: 0,
              minWidth: { xs: 1, md: 48 },
            }}
          >
            <Iconify icon={searchIcon} sx={{ width: 20, height: 20 }} />
          </Button>
        </BarStyle>
      </Container>
    </RootStyle>
  );
}
