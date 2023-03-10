import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Stack, Button, Card, CardContent, Dialog, Menu, Typography } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronUp from '@iconify/icons-carbon/chevron-up';

// @types
import { EachActivityProps } from '../../../@types/travel';
//
import { HEADER_DESKTOP_HEIGHT } from '../../../config';
import { DialogContent } from '@mui/material';
import EnquiryForm from '../enquiry/EnquiryForm';
import TravelTourItem from './TravelTourItem';
import { Iconify, Label } from '../../../components';
import { MenuItem } from '@mui/material';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

type Props = {
  tour: EachActivityProps;
};

export default function TravelTourReserveForm({ tour }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeReserve = () => {
    router.push(Routes.travel.checkoutPackage(tour.slug));
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openanchorEl = Boolean(anchorEl);
  const handleClickanchorEl = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseanchorEl = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        position: 'sticky',
        alignSelf: 'start',
        top: HEADER_DESKTOP_HEIGHT,
      }}
    >
      <Card
        sx={{
          boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
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
          <Stack spacing={3}>
            <TravelTourItem activity={tour} />
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

            <Button
              size="large"
              variant="contained"
              sx={{
                color: 'common.black',
              }}
              onClick={handleChangeReserve}
            >
              Book Now
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <CardContent
        sx={{
          width: 1,
          mt: 2,
          gap: 2,
        }}
      >
        <Stack spacing={2}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClickOpen}
          >
            Plan this Trip
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleClickOpen}
          >
            Make an enquiry
          </Button>
        </Stack>
      </CardContent>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <EnquiryForm handleClose={handleClose} activity={tour} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
