// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Container, Typography } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { Image, BgOverlay } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(20, 0),
}));

// ----------------------------------------------------------------------

export default function BannerSection() {
  return (
    <RootStyle>
      <Container sx={{ position: 'relative', zIndex: 9 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack
              alignItems={{
                xs: 'center',
                md: 'flex-start',
              }}
              sx={{
                color: 'common.white',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              <Typography variant="h2" component="h1">
                Everest Tour Base Camp
              </Typography>

              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                {fDate(new Date(), 'dd/MM/yyyy p')}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <BgOverlay endColor="rgba(0,0,0,0.6)" />

      <Image
        alt="Banner Image"
        src="/activities/trekking/other-region.jpg"
        ratio="21/9"
        sx={{ position: 'absolute', bottom: 0, left: 0, height: 1, width: 1 }}
      />
    </RootStyle>
  );
}
