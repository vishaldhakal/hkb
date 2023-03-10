// icons
import locationIcon from '@iconify/icons-carbon/location';
import mobileIcon from '@iconify/icons-carbon/mobile';
import emailIcon from '@iconify/icons-carbon/email';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Link, Divider } from '@mui/material';
// components
import { SocialsButton, Iconify, TextIconLabel } from '../../../components';
import { Box } from '@mui/material';
import { SOCIAL_LINKS } from '../../../config';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningContactInfo() {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent={{ md: 'space-between' }}
          sx={{ height: '100%' }}
        >
          <Grid item xs={12} md={6} lg={4}>
            <Typography
              variant="h2"
              sx={{
                mb: 5,
              }}
            >
              Contact{' '}
              <Box component="span" color="primary.main">
                Us
              </Box>
            </Typography>

            <Stack spacing={3} alignItems={'flex-start'}>
              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={emailIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Email"
                  sx={{ typography: 'subtitle2' }}
                />
                <Link color="inherit" variant="body2" href="mailto:beeshiking@gmail.com">
                  beeshiking@gmail.com
                </Link>
              </Stack>

              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={mobileIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Phone"
                  sx={{ typography: 'subtitle2' }}
                />

                <Link color="inherit" variant="body2" href="tel:+977 9860617338">
                  +977 9860617338
                </Link>
              </Stack>

              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={locationIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Address"
                  sx={{ typography: 'subtitle2' }}
                />
                <Typography variant="body2">Bagawan Bahal Marg, Kathmandu 44600, Nepal</Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed', width: 1 }} />

              <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Typography variant="overline">Follow Us</Typography>
                <SocialsButton initialColor simple={false} links={SOCIAL_LINKS} />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={7} height="100%" alignSelf="end">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4995.045795058714!2d85.31368812619624!3d27.716336713836082!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x92cec85a29e7ab95!2sHiking%20Bees!5e0!3m2!1sen!2sus!4v1674113833219!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{
                    border: 'none',
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
