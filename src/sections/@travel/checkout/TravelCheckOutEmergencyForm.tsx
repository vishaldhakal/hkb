import { Controller, Control, FieldPath } from 'react-hook-form';
// @mui
import { Stack, TextField, Typography } from '@mui/material';
// @types
import { CheckoutFormValuesProps } from '../../../@types/travel';

// ----------------------------------------------------------------------

type Props = {
  control: Control<CheckoutFormValuesProps>;
};
export default function TravelCheckOutEmergencyForm({ control }: Props) {
  return (
    <Stack spacing={5}>
      <section>
        <Typography variant="overline" sx={{ color: 'text.secondary', mb: 3, display: 'block' }}>
          Emergency Contact Information
        </Typography>

        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Field
              control={control}
              name="emergencyContactInformation.firstName"
              label="First Name"
            />
            <Field
              control={control}
              name="emergencyContactInformation.lastName"
              label="Last Name"
            />
          </Stack>
          <Field
            control={control}
            name="emergencyContactInformation.fullAddress"
            label="Full Address"
          />
          <Field
            control={control}
            name="emergencyContactInformation.emailAddress"
            label="Email Address"
          />
          <Field
            control={control}
            name="emergencyContactInformation.contactNumber"
            label="Contact Number"
          />
          <Field
            control={control}
            name="emergencyContactInformation.relationship"
            label="Relationship"
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
