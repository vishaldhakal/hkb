import {
  Controller,
  Control,
  FieldPath,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
// @mui
import { Stack, TextField, Typography } from '@mui/material';
// @types
import { CheckoutFormValuesProps } from '../../../@types/travel';
import DatePickerComponent from '../../../components/DatePickerComponent';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  control: Control<CheckoutFormValuesProps>;
  register: UseFormRegister<CheckoutFormValuesProps>;
  setValue: UseFormSetValue<CheckoutFormValuesProps>;
  trigger: UseFormTrigger<CheckoutFormValuesProps>;
};
export default function TravelCheckOutShippingForm({
  control,
  register,
  setValue,
  trigger,
}: Props) {
  const [arrivalDate, set_arrivalDate] = useState<Date | string | number | null>(null);
  const [departureDate, set_departureDate] = useState<Date | string | number | null>(null);

  useEffect(() => {
    setValue('additionalInformation.departureDate', departureDate);
    if (departureDate !== null) {
      trigger('additionalInformation.departureDate');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureDate]);

  useEffect(() => {
    setValue('additionalInformation.arrivalDate', arrivalDate);
    if (arrivalDate !== null) {
      trigger('additionalInformation.arrivalDate');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalDate]);

  return (
    <Stack spacing={5}>
      <section>
        <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>
          Personal Information
        </Typography>

        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Field control={control} name="personalInformation.firstName" label="First Name" />
            <Field control={control} name="personalInformation.lastName" label="Last Name" />
          </Stack>
          <Field control={control} name="personalInformation.fullAddress" label="Full Address" />
          <Field control={control} name="personalInformation.emailAddress" label="Email Address" />
          <Field
            control={control}
            name="personalInformation.contactNumber"
            label="Contact Number"
          />
        </Stack>
      </section>

      <section>
        <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>
          Additional Information
        </Typography>

        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Controller
              control={control}
              name="additionalInformation.departureDate"
              render={({ field, fieldState: { error } }) => (
                <DatePickerComponent
                  disablePast
                  label="Departure Date"
                  Date={departureDate}
                  setDate={set_departureDate}
                  {...field}
                  error={error}
                  {...register('additionalInformation.departureDate')}
                />
              )}
            />
            <Controller
              control={control}
              name="additionalInformation.arrivalDate"
              render={({ field, fieldState: { error } }) => (
                <DatePickerComponent
                  disablePast
                  label="Arrival Date"
                  Date={arrivalDate}
                  setDate={set_arrivalDate}
                  {...field}
                  error={error}
                  {...register('additionalInformation.arrivalDate')}
                />
              )}
            />
          </Stack>

          <Controller
            control={control}
            name="additionalInformation.message"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                variant="outlined"
                rows={5}
                label={'Message'}
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </section>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type FieldProps = {
  control: Control<CheckoutFormValuesProps>;
  name: FieldPath<CheckoutFormValuesProps>;
  label: string;
};

function Field({ control, name, label, ...other }: FieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          label={label}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
      {...other}
    />
  );
}
