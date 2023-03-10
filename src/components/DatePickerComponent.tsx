import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { Box, SxProps, TextField } from '@mui/material';
// @mui
import { CalendarPickerSkeleton, DatePicker, PickersDay } from '@mui/x-date-pickers';

// icons

//

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps;
  Date: Date | string | number | null;
  setDate: Dispatch<SetStateAction<Date | string | number | null>>;
  error?: FieldError;
  label: string;
  disableFuture?: boolean;
  disablePast?: boolean;
};

export default function DatePickerComponent({
  Date,
  setDate,
  sx,
  error,
  disableFuture,
  disablePast,
  label,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLDivElement) | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setIsOpen((isOpen) => !isOpen);
    setAnchorEl(e.currentTarget);
  };

  return (
    <DatePicker
      open={isOpen}
      onClose={() => setIsOpen(false)}
      value={Date}
      disableFuture={disableFuture}
      disablePast={disablePast}
      onChange={(newValue) => {
        if (newValue !== null) {
          setDate(newValue);
        }
      }}
      PopperProps={{
        anchorEl: anchorEl,
      }}
      disableMaskedInput
      disableOpenPicker
      inputFormat="dd-MMM-yyyy"
      label=" "
      renderInput={(params) => {
        const { InputProps, inputProps } = params;
        return (
          <Box onClick={handleClick} sx={{ width: 1, ...sx }}>
            <TextField
              {...params}
              fullWidth
              label={label}
              value={Date ? Date.toLocaleString() : ''}
              variant="outlined"
              error={Boolean(error)}
              helperText={error?.message}
              inputProps={{
                ...inputProps,
              }}
              InputProps={{
                ...InputProps,
              }}
            />
          </Box>
        );
      }}
      renderLoading={() => <CalendarPickerSkeleton />}
      renderDay={(day, _value, DayComponentProps) => <PickersDay {...DayComponentProps} />}
    />
  );
}

// ----------------------------------------------------------------------
