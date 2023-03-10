// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Grid } from '@mui/material';
// components
import { ElearningContactForm } from '../../@e-learning';

const RootStyle = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(15),
  },
}));

const BookTripForm = () => (
  <RootStyle>
    <Container>
      <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            alignItems={'center'}
            justifyContent="center"
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h1">
              Personalize <br /> your trip with
              <Box component="span" sx={{ color: 'primary.main' }}>
                {''} Hiking
              </Box>{' '}
              Bees
            </Typography>

            <Typography>
              Fill our form and get a personalized itinerary from hiking bees experts.
            </Typography>
          </Stack>
          <ElearningContactForm />
        </Grid>
      </Grid>
    </Container>
  </RootStyle>
);

export default BookTripForm;
