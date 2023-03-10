// icon
import document from '@iconify/icons-carbon/document';
import phone from '@iconify/icons-carbon/phone';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Button } from '@mui/material';
//
import Image from './Image';
import Iconify from './Iconify';
import Routes from '../routes';
import cssStyles from '../utils/cssStyles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  ...cssStyles(theme).bgImage(),
  textAlign: 'center',
  color: theme.palette.primary.main,
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
};

export default function ErrorScreen({ title, description, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Stack spacing={5} alignItems="center" direction="row">
        <Image
          alt="500"
          src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_500.svg"
          sx={{ maxWidth: 200 }}
        />

        <Stack spacing={2} alignItems="center">
          <Typography variant="h3"> {title || 'Failed To Load '}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {description || 'Unable to download data please try again'}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              href={Routes.bookTrip.bookTripForm}
              startIcon={<Iconify icon={document} sx={{ width: 20, height: 20 }} />}
            >
              Plan Your Trip
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              startIcon={<Iconify icon={phone} sx={{ width: 20, height: 20 }} />}
              href={Routes.support}
            >
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
