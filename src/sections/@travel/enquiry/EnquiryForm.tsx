import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, TextField, Container, Typography, Button } from '@mui/material';
// components
import TravelTourItem from '../tours/TravelTourItem';
import { EachActivityProps } from '../../../@types/travel';
import { ngrokapi } from '../../../config';
import axios from 'axios';
import swal from 'sweetalert';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('That is not an email'),
  phone: Yup.string().nullable(),
  message: Yup.string().required('Message is required'),
});

type FormValuesProps = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// ----------------------------------------------------------------------

type Props = {
  handleClose: () => void;
  activity: EachActivityProps;
};

export default function EnquiryForm({ handleClose, activity }: Props) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValuesProps>({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const form_data = new FormData();

    form_data.append('name', data.name);
    form_data.append('email', data.email);
    form_data.append('phone', data.phone);
    form_data.append('message', data.message);
    form_data.append('slug', activity.slug);

    const url = `${ngrokapi}/api/enquiry-submit/`;
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        mode: 'no-cors',
      } as any)
      .then(() => {
        swal(
          `Thank You, ${data.name}`,
          'Your enquiry has been sent. Please expect an email or call from us shortly',
          'success'
        );
        handleClose();
      })
      .catch((errr) => {
        console.log(errr);
        swal('Enquiry Failed', 'Cannot send your mail', 'error');
        handleClose();
      });

    reset();
  };

  return (
    <>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <TravelTourItem activity={activity} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack
              spacing={2}
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h3">{activity.activity_title}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make and Enquiry</Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5} alignItems="flex-start">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full name"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="message"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      error={Boolean(error)}
                      helperText={error?.message}
                      sx={{ pb: 2.5 }}
                    />
                  )}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    width: 1,
                  }}
                >
                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      mx: { xs: 'auto !important', md: 'unset !important' },
                    }}
                  >
                    Send Request
                  </LoadingButton>
                  <Button onClick={handleClose} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
