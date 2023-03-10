import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// icons
import locationIcon from '@iconify/icons-carbon/location';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Autocomplete, InputAdornment } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
// _data
// components
import { Iconify } from '../../../components';
import { InputStyle } from './TravelTourBarFilters';
import { Dispatch, SetStateAction } from 'react';
import { ActivityRegionProps } from '../../../@types/travel';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  width: '100%',
  '& .MuiAutocomplete-root': {
    '& .MuiFilledInput-root': {
      padding: '0 12px',
    },
  },
}));

// ----------------------------------------------------------------------

type Props = {
  regions: ActivityRegionProps[];
  setRegion: Dispatch<SetStateAction<ActivityRegionProps | null>>;
};

export default function TravelTourFilterRegions({ setRegion, regions }: Props) {
  return (
    <RootStyle>
      <Autocomplete
        autoHighlight
        onChange={(_event, newValue) => {
          setRegion(newValue);
        }}
        options={regions}
        getOptionLabel={(option) => option.title}
        filterOptions={createFilterOptions({
          stringify: (option) => option.title,
        })}
        renderInput={(params) => (
          <InputStyle
            {...params}
            variant="filled"
            placeholder="Select Region"
            InputProps={{
              ...params.InputProps,
              autoComplete: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={locationIcon}
                    sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0, mr: 1 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.title, inputValue);
          const parts: {
            text: string;
            highlight: boolean;
          }[] = parse(option.title, matches);
          return (
            <Box component="li" {...props}>
              {parts.map((part, index) => (
                <Box
                  key={index}
                  component="span"
                  sx={{
                    ...(part.highlight && {
                      fontWeight: 'fontWeightBold',
                    }),
                  }}
                >
                  {part.text}
                </Box>
              ))}
            </Box>
          );
        }}
      />
    </RootStyle>
  );
}
