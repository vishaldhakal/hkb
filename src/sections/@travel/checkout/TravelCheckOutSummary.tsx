import { Dispatch, SetStateAction, useState } from 'react';
// icons
import eventsIcon from '@iconify/icons-carbon/events';
import calendarIcon from '@iconify/icons-carbon/calendar';
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronUp from '@iconify/icons-carbon/chevron-up';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Divider, Typography, MenuItem, Menu } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { EachActivityProps } from '../../../@types/travel';
// components
import { Image, Iconify, TextMaxLine, Label } from '../../../components';
//
import { TravelTourFilterGuests, TravelTourFilterTime } from '../filters';
import { HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../config';
import { Button } from '@mui/material';
import { calculatePrice } from '../../../utils/calculatePrice';

// ----------------------------------------------------------------------

const resetInputStyles = {
  '& .MuiFilledInput-root': {
    padding: 0,
  },
  '& .MuiFilledInput-input': {
    height: '26px !important',
  },
  '& .MuiInputAdornment-root': {
    display: 'none',
  },
};

// ----------------------------------------------------------------------

type Props = {
  tour: EachActivityProps;
  guests: {
    adults: number;
    children: number;
  };
  setGuests: Dispatch<
    SetStateAction<{
      adults: number;
      children: number;
    }>
  >;
  departureDay: Date | null;
  setDepartureDay: Dispatch<SetStateAction<Date | null>>;
  isSubmitting: boolean;
};

export default function TravelCheckOutSummary({
  tour,
  guests,
  setGuests,
  departureDay,
  setDepartureDay,
  isSubmitting,
}: Props) {
  const { coverImg, slug, price, activity_title, priceSale } = tour;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openanchorEl = Boolean(anchorEl);
  const handleClickanchorEl = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseanchorEl = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        position: 'sticky',
        top: HEADER_DESKTOP_HEIGHT,
      }}
    >
      <Stack sx={{ p: 4, pb: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Image alt={slug} src={ngrokapi + coverImg} ratio="1/1" sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextMaxLine variant="h5">{activity_title}</TextMaxLine>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              Price
            </Typography>
            <Typography
              component="span"
              sx={{ fontWeight: 800 }}
              variant="h4"
              color="secondary.main"
            >
              {fCurrency(priceSale)}
            </Typography>
            {price > 0 && (
              <Typography
                component="span"
                sx={{ color: 'grey.500', textDecoration: 'line-through', ml: 1 }}
              >
                <Typography component="span">{fCurrency(price)}</Typography>
              </Typography>
            )}
            {tour.prices && (
              <>
                <Label variant="filled" sx={{ color: 'text.disabled' }}>
                  <Button
                    id="demo-customized-button"
                    aria-controls={openanchorEl ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openanchorEl ? 'true' : undefined}
                    sx={{
                      color: 'text.disabled',
                      '&:hover': {
                        background: 'transparent',
                      },
                      height: 1,
                      fontSize: 'inherit',
                    }}
                    disableRipple
                    fullWidth
                    disableElevation
                    onClick={handleClickanchorEl}
                    endIcon={<Iconify icon={!openanchorEl ? chevronDown : chevronUp} />}
                  >
                    Group Prices Available
                  </Button>
                </Label>
              </>
            )}
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={openanchorEl}
              onClose={handleCloseanchorEl}
              PaperProps={{
                style: { width: '280px' },
              }}
            >
              {tour.prices &&
                tour.prices.map((pr) => (
                  <MenuItem
                    key={pr.id}
                    onClick={handleCloseanchorEl}
                    disableGutters
                    disableRipple
                    sx={{
                      borderRadius: '0px',
                      width: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body1">{pr.group_size}</Typography>

                    <Typography variant="subtitle1">{fCurrency(pr.price)}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Grid>
        </Grid>
        <Label
          sx={{
            color: 'text.primary',
            width: 'fit-content',
            mt: 2,
            background: (theme) => theme.palette.error.lighter,
          }}
        >
          Max Group Size: {tour.max_group_size} People
        </Label>
      </Stack>

      <Stack sx={{ p: 4, pb: 3 }}>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', sm: 'row' }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderStyle: 'dashed', display: { xs: 'none', sm: 'block' } }}
            />
          }
          sx={{
            p: 2.5,
            borderRadius: 2,
            color: 'text.disabled',
            bgcolor: 'background.neutral',
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon={eventsIcon} sx={{ width: 24, height: 24, flexShrink: 0 }} />
            <Stack spacing={0.5}>
              <Typography variant="caption">Guests</Typography>
              <TravelTourFilterGuests
                guests={guests}
                setGuests={setGuests}
                sx={{ ...resetInputStyles }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon={calendarIcon} sx={{ width: 24, height: 24, flexShrink: 0 }} />
            <Stack spacing={0.5}>
              <Typography variant="caption">Booking Date</Typography>
              <TravelTourFilterTime
                departureDay={departureDay}
                setDepartureDay={setDepartureDay}
                sx={{ ...resetInputStyles }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mx: 4 }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Total</Typography>
          {tour.prices ? (
            <Typography variant="h5">
              <Typography component="span" variant="subtitle3" sx={{ mr: 3 }}>
                {`${guests.adults + guests.children} x  
                $${calculatePrice(
                  guests.adults + guests.children,
                  tour.prices,
                  parseInt(tour.max_group_size),
                  priceSale
                )}`}
              </Typography>
              {fCurrency(
                calculatePrice(
                  guests.adults + guests.children,
                  tour.prices,
                  parseInt(tour.max_group_size),
                  priceSale
                ) *
                  (guests.adults + guests.children)
              )}
            </Typography>
          ) : (
            <Typography variant="h5">
              {fCurrency(priceSale * (guests.adults + guests.children))}
            </Typography>
          )}
        </Stack>

        <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting}>
          Complete Booking
        </LoadingButton>
      </Stack>
    </Card>
  );
}
