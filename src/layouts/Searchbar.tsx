import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
//icon
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Slide,
  InputAdornment,
  ClickAwayListener,
  SxProps,
  Autocomplete,
  createFilterOptions,
  Box,
} from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../config';
// components
import { Iconify } from '../components';
import { FabButtonAnimate } from '../components/animate';
import { ActivitiesSearchProps } from '../@types/travel';
import { InputStyle } from '../sections/@travel/filters/TravelTourBarFilters';
import Link from 'next/link';
import Routes from '../routes';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE_HEIGHT,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP_HEIGHT,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

type SearchbarProps = {
  sx?: SxProps;
  activities_search?: ActivitiesSearchProps[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Searchbar({ sx, activities_search }: SearchbarProps) {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <FabButtonAnimate
          size="large"
          color="secondary"
          onClick={handleOpen}
          sx={{ width: 44, height: 44, boxShadow: 'none', zIndex: 1 }}
        >
          <Iconify icon={searchIcon} sx={{ width: 32, height: 32 }} />
        </FabButtonAnimate>

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            {activities_search ? (
              <Autocomplete
                autoHighlight
                fullWidth
                options={activities_search}
                getOptionLabel={(option) => option.activity_title}
                filterOptions={createFilterOptions({
                  stringify: (option) => option.activity_title,
                })}
                renderInput={(params) => (
                  <InputStyle
                    {...params}
                    variant="filled"
                    fullWidth
                    autoFocus
                    sx={{
                      flex: 1,
                    }}
                    placeholder="Search..."
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: 'search',
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify
                            icon={searchIcon}
                            sx={{
                              width: 20,
                              height: 20,
                              color: 'text.disabled',
                              flexShrink: 0,
                              mr: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option, { inputValue }) => {
                  const matches = match(option.activity_title, inputValue);
                  const parts: {
                    text: string;
                    highlight: boolean;
                  }[] = parse(option.activity_title, matches);
                  return (
                    <Link href={Routes.travel.tour(option.slug)}>
                      <Box component="li" {...props} onClick={handleClose}>
                        <Stack spacing={1}>
                          <Box component="span">
                            {parts.map((part, index) => (
                              <Box
                                component="span"
                                key={index}
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
                          <Stack spacing={2}>
                            <Stack
                              direction="row"
                              sx={{
                                color: 'text.disabled',
                              }}
                              spacing={3}
                            >
                              <Stack spacing={1}>
                                <Typography variant="caption">
                                  Best Time: {option.best_time}
                                </Typography>
                                <Typography variant="caption">
                                  Trip Grade: {option.trip_grade}
                                </Typography>
                              </Stack>
                              <Stack spacing={1}>
                                <Typography variant="caption">
                                  Duration: {option.duration}
                                </Typography>
                                <Typography variant="caption">
                                  Max Group Size: {option.max_group_size}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </Link>
                  );
                }}
              />
            ) : null}
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
