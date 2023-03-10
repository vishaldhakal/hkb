// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  Stack,
  Button,
  Container,
  Typography,
  InputAdornment,
  Box,
  OutlinedInput,
} from '@mui/material';
// utils
// components
import { Iconify, Image } from '../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 0),
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function NewsletterTravel() {
  return (
    <Box>
      <Image
        src="/newsletter.svg"
        alt="newsletter mountain"
        sx={{
          maxHeight: '100%',
          maxWidth: '870px',
          top: 85,
          lineHeight: '0px',
          position: 'relative',
          zIndex: 9,
          display: { xs: 'none', md: 'flex' },
        }}
      />
      <RootStyle
        sx={{
          background:
            'linear-gradient(1.02deg, #FFFFFF -0.24%, rgba(255, 255, 255, 0) 33.88%), #DAF6FF;',
        }}
      >
        <Container>
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                color: 'common.black',
                zIndex: 9,
                alignSelf: 'center',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h3">
                  Newsletter{' '}
                  <Box component="span" color="primary.main">
                    Subscription
                  </Box>
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                color: 'common.black',
                zIndex: 9,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h3">
                  Join the{' '}
                  <Box component="span" color="primary.main">
                    HIVE
                  </Box>
                  <br /> Explore the{' '}
                  <Box component="span" color="primary.main">
                    TRAILS!!
                  </Box>
                </Typography>
                <Typography>
                  Sign up now to receive hot special offers
                  <br /> and information about the best tours!
                </Typography>

                <OutlinedInput
                  fullWidth
                  placeholder="Enter your email"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" size="large" sx={{ minWidth: 48, px: 0 }}>
                        <Iconify icon={chevronRight} sx={{ width: 22, height: 22 }} />
                      </Button>
                    </InputAdornment>
                  }
                  sx={{
                    pr: 0.5,
                    my: 5,
                    background: (theme) => theme.palette.common.white,
                    '& .MuiFilledInput-input': {
                      py: '18px',
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Box>
  );
}
