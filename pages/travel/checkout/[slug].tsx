import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, ReactElement } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Divider, Container, Typography, TypographyProps } from '@mui/material';
// hooks
// routes
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, ngrokapi } from '../../../src/config';
// @types
import { CheckoutFormValuesProps, EachActivityProps } from '../../../src/@types/travel';
// _data
// layouts
import Layout from '../../../src/layouts';
// components
import { Page } from '../../../src/components';
//
import { TravelCheckOutSummary, TravelCheckOutShippingForm } from '../../../src/sections/@travel';
import { navbarGenerator } from '../../../src/utils/navbargenerator';
import TravelCheckOutEmergencyForm from '../../../src/sections/@travel/checkout/TravelCheckOutEmergencyForm';
import axios from 'axios';
import swal from 'sweetalert';
import { fCurrency } from '../../../src/utils/formatNumber';
import { calculatePrice } from '../../../src/utils/calculatePrice';
import { fDate } from '../../../src/utils/formatTime';
import { useRouter } from 'next/router';
import Routes from '../../../src/routes';

// ----------------------------------------------------------------------

interface LabelStepStyleProps extends TypographyProps {
  step: string;
}

const LabelStepStyle = styled((props: LabelStepStyleProps) => (
  <Typography
    variant="h4"
    {...props}
    sx={{
      mb: 3,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        mr: 1.5,
        width: 28,
        height: 28,
        display: 'flex',
        typography: 'h6',
        borderRadius: '50%',
        alignItems: 'center',
        bgcolor: 'primary.main',
        justifyContent: 'center',
        color: 'primary.contrastText',
      }}
    >
      {props.step}
    </Box>
    {props.title}
  </Typography>
))({});

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  personalInformation: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    fullAddress: Yup.string().required('Full address is required'),
    emailAddress: Yup.string().email('Enter Valid Email').required('Email address is required'),
    contactNumber: Yup.string().nullable(),
  }),
  additionalInformation: Yup.object().shape({
    departureDate: Yup.date().nullable().min(new Date(), 'Departure Date must be not be in past'),
    arrivalDate: Yup.date().nullable().min(new Date(), 'Arrival Date must be not be in Past'),
    message: Yup.string().required('Full address is required'),
  }),
  emergencyContactInformation: Yup.object().shape({
    firstName: Yup.string().nullable(),
    lastName: Yup.string().nullable(),
    fullAddress: Yup.string().nullable(),
    emailAddress: Yup.string().email('Enter Valid Email'),
    contactNumber: Yup.string().nullable(),
  }),
});

// ----------------------------------------------------------------------

type Props = {
  activity: EachActivityProps;
};
export default function CheckoutPackagePage({ activity }: Props) {
  const [departureDay, setDepartureDay] = useState<Date | null>(new Date());
  const router = useRouter();
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });

  const {
    reset,
    control,
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CheckoutFormValuesProps>({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      personalInformation: {
        firstName: '',
        lastName: '',
        fullAddress: '',
        contactNumber: '',
        emailAddress: '',
      },
      additionalInformation: {
        departureDate: '',
        arrivalDate: '',
        message: '',
      },
      emergencyContactInformation: {
        firstName: '',
        lastName: '',
        fullAddress: '',
        contactNumber: '',
        emailAddress: '',
        relationship: '',
      },
    },
  });

  const onSubmit = async (data: CheckoutFormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const form_data = new FormData();

    form_data.append(
      'name',
      `${data.personalInformation.firstName} ${data.personalInformation.lastName}`
    );
    form_data.append('address', data.personalInformation.fullAddress);
    form_data.append('email', data.personalInformation.emailAddress);
    form_data.append('phone', data.personalInformation.contactNumber);
    form_data.append('message', data.additionalInformation.message);

    form_data.append('no_of_guests', `${guests.adults + guests.children}`);
    form_data.append(
      'total_price',
      `${
        activity.prices
          ? calculatePrice(
              guests.adults + guests.children,
              activity.prices,
              parseInt(activity.max_group_size),
              activity.priceSale
            ) *
            (guests.adults + guests.children)
          : activity.priceSale * (guests.adults + guests.children)
      }`
    );
    {
      data.additionalInformation.departureDate &&
        form_data.append(
          'departure_date',
          new Date(data.additionalInformation.departureDate).toISOString()
        );
    }
    {
      data.additionalInformation.arrivalDate &&
        form_data.append(
          'arrival_date',
          new Date(data.additionalInformation.arrivalDate).toISOString()
        );
    }
    {
      departureDay && form_data.append('booking_date', new Date(departureDay).toISOString());
    }

    form_data.append(
      'emergency_contact_name',
      `${data.emergencyContactInformation.firstName} ${data.emergencyContactInformation.lastName}`
    );
    form_data.append('emergency_address', data.emergencyContactInformation.fullAddress);
    form_data.append('emergency_phone', data.emergencyContactInformation.contactNumber);
    form_data.append('emergency_email', data.emergencyContactInformation.emailAddress);
    form_data.append('emergency_relationship', data.emergencyContactInformation.relationship);
    form_data.append('slug', activity.slug);

    const url = `${ngrokapi}/api/booking-submit/`;
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        mode: 'no-cors',
      } as any)
      .then(() => {
        swal(
          `Thank You, ${data.personalInformation.firstName} ${data.personalInformation.lastName}`,
          'Your enquiry has been sent. Please expect an email or call from us shortly',
          'success'
        );
      })
      .catch((errr) => {
        console.log(errr);
        swal('Enquiry Failed', 'Cannot send your mail', 'error');
      });

    reset();
  };

  return (
    <Page title="Checkout - Travel">
      <RootStyle>
        <Container
          sx={{
            mt: { xs: 8, md: 10 },
            mb: { xs: 8, md: 15 },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={8}>
              <Grid item xs={12} md={7}>
                <Stack spacing={5}>
                  <Typography variant="h2">Book your Trip</Typography>

                  <Divider />

                  <section>
                    <LabelStepStyle title="Personal Information" step="1" />
                    <TravelCheckOutShippingForm
                      control={control}
                      register={register}
                      trigger={trigger}
                      setValue={setValue}
                    />
                  </section>
                  <section>
                    <LabelStepStyle title="Emergency Contact" step="2" />
                    <TravelCheckOutEmergencyForm control={control} />
                  </section>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <TravelCheckOutSummary
                  tour={activity}
                  guests={guests}
                  setGuests={setGuests}
                  departureDay={departureDay}
                  setDepartureDay={setDepartureDay}
                  isSubmitting={isSubmitting}
                />
              </Grid>
            </Grid>
          </form>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CheckoutPackagePage.getLayout = function getLayout(page: ReactElement) {
  const { props } = page;

  const navConfig = navbarGenerator(props.nav_config);

  return (
    <Layout activities_search={props.activites_search} navConfig={navConfig}>
      {page}
    </Layout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const res = await fetch(ngrokapi + `/api/activity-detail/${params.slug}`);
  const activity = await res.json();
  const req3 = await fetch(ngrokapi + '/api/activities-search');
  const activites_search = await req3.json();
  const nav_req = await fetch(ngrokapi + '/api/navbar');
  const nav_config = await nav_req.json();

  return {
    props: {
      activity,
      activites_search,
      nav_config,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const req = await fetch(ngrokapi + `/api/activities-slug`);
  const activities = await req.json();
  const paths = activities.map((activity: { slug: string; id: number }) => ({
    params: { slug: activity.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}
