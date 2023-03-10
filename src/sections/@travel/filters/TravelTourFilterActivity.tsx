import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// icons
import mountainIcon from '@iconify/icons-carbon/mountain';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Autocomplete, InputAdornment } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
// _data
// components
import { Iconify } from '../../../components';
import { InputStyle } from './TravelTourBarFilters';
import { ActivityProps } from '../../../@types/activity/activity';
import { Dispatch, SetStateAction } from 'react';

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
  activities_list: ActivityProps[];
  setActivityLocal?: Dispatch<SetStateAction<ActivityProps | null>>;
};

export default function TravelTourFilterActivity({ activities_list, setActivityLocal }: Props) {
  return (
    <RootStyle>
      <Autocomplete
        autoHighlight
        options={activities_list}
        getOptionLabel={(option) => option.title}
        filterOptions={createFilterOptions({
          stringify: (option) => option.title,
        })}
        onChange={(_event, newValue) => {
          if (setActivityLocal) {
            setActivityLocal(newValue);
          }
        }}
        renderInput={(params) => (
          <InputStyle
            {...params}
            variant="filled"
            placeholder="Select Activity"
            InputProps={{
              ...params.InputProps,
              autoComplete: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={mountainIcon}
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
