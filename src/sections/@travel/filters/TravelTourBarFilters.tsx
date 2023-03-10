import { useState } from 'react';
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
import TravelTourFilterGuests from './TravelTourFilterGuests';
import { EachActivityProps } from '../../../@types/travel';

// ----------------------------------------------------------------------

const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'onDark',
})<BarStyleProps>(({ onDark, theme }) => ({
  backgroundColor: `${
    !onDark ? theme.palette.background.neutral : theme.palette.background.default
  }`,
  padding: theme.spacing(5, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.default,
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
};

export default function TravelTourBarFiltersLanding({
  onDark = false,
  sx,
  activities_list,
  destinations,
}: Props) {
  const [location, setLocation] = useState<EachActivityProps['destination'] | null>(
    destinations[0]
  );

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });

  return (
    <RootStyle sx={sx} onDark={onDark}>
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
            <TravelTourFilterLocation
              setLocation={setLocation}
              destinations={destinations}
              location={location}
            />
            <TravelTourFilterActivity activities_list={activities_list} />
            <TravelTourFilterGuests guests={guests} setGuests={setGuests} />
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
