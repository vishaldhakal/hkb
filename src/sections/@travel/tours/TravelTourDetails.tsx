import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
// icons
import locationIcon from '@iconify/icons-carbon/location';
import calendarIcon from '@iconify/icons-carbon/calendar';
import timeIcon from '@iconify/icons-carbon/time';
import meterIcon from '@iconify/icons-carbon/meter';
import voicemailIcon from '@iconify/icons-carbon/voicemail';

import groupPresentationIcon from '@iconify/icons-carbon/group-presentation';

import cheveronDownIcon from '@iconify/icons-carbon/chevron-down';
// @mui
import {
  Typography,
  Stack,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { EachActivityProps } from '../../../@types/travel';
// utils
import { TextIconLabel, Iconify, IconButtonAnimate, HTMLToReact } from '../../../components';
import { Card } from '@mui/material';
import { alpha } from '@mui/material';
import { SupportContent } from '../../support';
import TravelTourGallery from './TravelTourGallery';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

type Props = {
  tour: EachActivityProps;
};

export default function TravelTourDetails({ tour }: Props) {
  const {
    location,
    duration,
    availableEnd,
    availableStart,
    best_time,
    trip_grade,
    max_group_size,
    tour_description,
    tour_excludes,
    tour_highlights,
    tour_includes,
    itinerary,
    gallery,
    enquiries,
    faqs,
  } = tour;

  const [expandAll, setExpandAll] = useState(false);

  return (
    <Stack spacing={5}>
      {/* -- Tour Overview -- */}
      <section id="tour-overview">
        <Typography variant="h3" sx={{ mb: 3 }}>
          Tour{' '}
          <Box component="span" color="primary.main">
            Overview
          </Box>
        </Typography>
        <Box
          sx={{
            display: 'grid',
            rowGap: 2.5,
            columnGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {enquiries && (
            <OverviewItem
              icon={<Iconify icon={voicemailIcon} />}
              label="People Interested"
              text={`${enquiries.length}`}
            />
          )}
          <OverviewItem
            icon={<Iconify icon={calendarIcon} />}
            label="Available"
            text={`${fDate(availableStart, 'dd/MM/yyyy')} - ${fDate(availableEnd, 'dd/MM/yyyy')}`}
          />
          <OverviewItem icon={<Iconify icon={locationIcon} />} label="Location" text={location} />
          <OverviewItem icon={<Iconify icon={timeIcon} />} label="Durations" text={duration} />
          <OverviewItem icon={<Iconify icon={meterIcon} />} label="Trip Grade" text={trip_grade} />
          <OverviewItem
            icon={<Iconify icon={groupPresentationIcon} />}
            label="Max group size"
            text={max_group_size}
          />
          <OverviewItem icon={<Iconify icon={timeIcon} />} label="Best Time" text={best_time} />
        </Box>
      </section>

      <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

      {/* -- Tour Description -- */}
      <section id="tour-description">
        <Typography variant="h3">
          Tour{' '}
          <Box component="span" color="primary.main">
            Description
          </Box>
        </Typography>
        <HTMLToReact html={tour_description} />
      </section>

      {/* -- Tour Highlights -- */}
      <section id="tour-highlights">
        <Typography variant="h3">
          Tour{' '}
          <Box component="span" color="primary.main">
            Highlights
          </Box>{' '}
        </Typography>
        <HTMLToReact html={tour_highlights} />
      </section>

      {/* -- Tour Includes -- */}
      <section>
        <Typography variant="h3" id="tour-includes">
          Tour{' '}
          <Box component="span" color="primary.main">
            Includes
          </Box>{' '}
        </Typography>

        <HTMLToReact html={tour_includes} />
      </section>
      <section>
        <Typography variant="h3" id="tour-excludes">
          Tour{' '}
          <Box component="span" color="primary.main">
            Excludes
          </Box>{' '}
        </Typography>

        <HTMLToReact html={tour_excludes} />
      </section>

      {/* -- Tour Program -- */}
      <div id="itinerary">
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              mb: 3,
            }}
          >
            <Typography variant="h3">
              Detailed{' '}
              <Box component="span" color="primary.main">
                Itinerary
              </Box>
            </Typography>{' '}
            <Button
              sx={{ color: 'common.black' }}
              variant="contained"
              onClick={() => setExpandAll(!expandAll)}
            >
              {' '}
              {!expandAll ? `Expand All` : 'Collapse All'}
            </Button>
          </Stack>
          {itinerary.map((content, index) => (
            <HighlightItem
              key={content.title}
              title={content.title}
              description={content.description}
              trek_distance={content.trek_distance}
              trek_duration={content.trek_duration}
              trek_meals={content.meals}
              day={content.day}
              trek_highest_altitude={content.highest_altitude}
              index={index}
              expandAll={expandAll}
              setExpandAll={setExpandAll}
            />
          ))}
        </Stack>
      </div>
      <section>
        <Typography variant="h3" id="gallery">
          Gallery{' '}
          <Box component="span" color="primary.main">
            Section
          </Box>{' '}
        </Typography>

        <TravelTourGallery gallery={gallery.map((photo) => `${ngrokapi}${photo.image}`)} />
      </section>
      <section>
        <Typography variant="h3" id="faqs">
          FAQs{' '}
          <Box component="span" color="primary.main">
            Section
          </Box>{' '}
        </Typography>

        <SupportContent contents={faqs} />
      </section>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type OverviewItemProp = {
  icon: ReactElement;
  label: string;
  text: string;
};

function OverviewItem({ icon, label, text = '-' }: OverviewItemProp) {
  return (
    <TextIconLabel
      spacing={1.5}
      alignItems="flex-start"
      icon={icon}
      value={
        <Stack spacing={0.5}>
          <Typography variant="body2">{label}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{text}</Typography>
        </Stack>
      }
      sx={{ '& svg': { width: 24, height: 24 } }}
    />
  );
}

// ----------------------------------------------------------------------

type HighlightItemProps = {
  title: string;
  description: string;
  trek_meals: string;
  trek_duration: string;
  trek_distance: string;
  trek_highest_altitude: string;
  index: number;
  day: number;
  expandAll: boolean;
  setExpandAll: Dispatch<SetStateAction<boolean>>;
};

function HighlightItem({
  title,
  description,
  index,
  expandAll,
  trek_distance,
  day,
  trek_duration,
  trek_highest_altitude,
  trek_meals,
  setExpandAll,
}: HighlightItemProps) {
  const [expanded, setExpanded] = useState<string | false>(`${0}`);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandAll(false);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.lighter, 0.2),
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Accordion
          disableGutters
          expanded={!expandAll ? expanded === `${index}` : true}
          onChange={handleChange(`${index}`)}
          sx={{
            borderBottom: '0 !important',
          }}
        >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            expandIcon={
              <IconButtonAnimate
                size="medium"
                sx={{ width: 1, height: 1 }}
                sxWrap={{
                  width: 32,
                  height: 32,
                  fontWeight: 800,
                }}
              >
                <Iconify icon={cheveronDownIcon} sx={{ color: 'common.black' }} />
              </IconButtonAnimate>
            }
          >
            <Typography variant="body1" fontWeight={800}>
              Day {day} : {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {trek_distance && (
                <Grid item xs={12} md={6}>
                  <TextIconLabel
                    alignItems="center"
                    icon={
                      <svg
                        width="36"
                        height="34"
                        viewBox="0 0 36 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.3337 5.33333C11.2541 5.33333 12.0003 4.58714 12.0003 3.66667C12.0003 2.74619 11.2541 2 10.3337 2C9.41318 2 8.66699 2.74619 8.66699 3.66667C8.66699 4.58714 9.41318 5.33333 10.3337 5.33333Z"
                          stroke="#FFC619"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 32L5.33333 25.3334M12 32V25.3334L7 20.3334L8.66667 10.3334L13.6667 17L18.6667 20.3334"
                          stroke="#FFC619"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.0005 20.3333L3.9555 18.3033C3.38316 17.9219 2.94282 17.3727 2.69486 16.7312C2.4469 16.0897 2.40346 15.3872 2.5705 14.72L3.03716 12.8583C3.21735 12.1374 3.63322 11.4975 4.21872 11.04C4.80423 10.5825 5.5258 10.3338 6.26883 10.3333H8.66716L15.3338 12L20.3338 8.66663M18.6672 17V32M17.0005 30.3333H20.3338"
                          stroke="#FFC619"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    value={`Trek Distance : ${trek_distance}`}
                    sx={{ typography: 'body1', gap: 1 }}
                  />
                </Grid>
              )}
              {trek_highest_altitude && (
                <Grid item xs={12} md={6}>
                  <TextIconLabel
                    alignItems="center"
                    icon={
                      <svg
                        width="36"
                        height="30"
                        viewBox="0 0 36 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.0051 12.9545C28.5222 12.9545 28.1176 12.7909 27.7915 12.4636C27.4642 12.1375 27.3006 11.733 27.3006 11.25V5.79545L25.7239 7.32954C25.4114 7.64204 25.0279 7.80568 24.5733 7.82045C24.1188 7.83409 23.721 7.67045 23.3801 7.32954C23.0676 7.01704 22.9114 6.61932 22.9114 6.13636C22.9114 5.65341 23.0676 5.25568 23.3801 4.94318L27.812 0.511363C28.1529 0.170454 28.5506 0 29.0051 0C29.4597 0 29.8574 0.170454 30.1983 0.511363L34.6301 4.94318C34.971 5.28409 35.1415 5.68182 35.1415 6.13636C35.1415 6.59091 34.971 6.98864 34.6301 7.32954C34.2892 7.67045 33.8841 7.84091 33.4148 7.84091C32.9466 7.84091 32.5421 7.67045 32.2012 7.32954L30.7097 5.83807V11.25C30.7097 11.733 30.546 12.1375 30.2188 12.4636C29.8926 12.7909 29.4881 12.9545 29.0051 12.9545ZM1.73241 30C1.02218 30 0.510817 29.6875 0.198317 29.0625C-0.114183 28.4375 -0.0573643 27.8409 0.368772 27.2727L7.18695 18.196C7.52786 17.7415 7.98241 17.5142 8.55059 17.5142C9.11877 17.5142 9.57332 17.7415 9.91423 18.196L16.221 26.5909H29.0051L20.4824 15.2557L16.221 20.8807L14.0904 18.0682L19.1188 11.3778C19.4597 10.9233 19.9142 10.696 20.4824 10.696C21.0506 10.696 21.5051 10.9233 21.846 11.3778L33.7779 27.2727C34.204 27.8409 34.2608 28.4375 33.9483 29.0625C33.6358 29.6875 33.1245 30 32.4142 30H1.73241Z"
                          fill="#FFC619"
                        />
                      </svg>
                    }
                    value={`Highest Altitude : ${trek_highest_altitude}`}
                    sx={{ typography: 'body1', gap: 1 }}
                  />
                </Grid>
              )}
              {trek_duration && (
                <Grid item xs={12} md={6}>
                  <TextIconLabel
                    alignItems="center"
                    icon={
                      <svg
                        width="36"
                        height="30"
                        viewBox="0 0 36 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.96429 15.7143H7.14286C7.40476 15.7143 7.65476 15.7795 7.89286 15.91C8.13095 16.0414 8.30952 16.2381 8.42857 16.5L10 19.6429L14.4286 10.7857C14.6905 10.2381 15.119 9.96429 15.7143 9.96429C16.3095 9.96429 16.7381 10.2381 17 10.7857L19.4643 15.7143H22.75C22.3929 13.2857 21.2857 11.25 19.4286 9.60714C17.5714 7.96429 15.381 7.14286 12.8571 7.14286C10.3333 7.14286 8.14286 7.96429 6.28571 9.60714C4.42857 11.25 3.32143 13.2857 2.96429 15.7143ZM12.8571 27.1429C15.381 27.1429 17.5714 26.3214 19.4286 24.6786C21.2857 23.0357 22.3929 21 22.75 18.5714H18.5714C18.3095 18.5714 18.0595 18.5062 17.8214 18.3757C17.5833 18.2443 17.4048 18.0476 17.2857 17.7857L15.7143 14.6429L11.2857 23.5C11.0238 24.0476 10.5952 24.3214 10 24.3214C9.40476 24.3214 8.97619 24.0476 8.71429 23.5L6.25 18.5714H2.96429C3.32143 21 4.42857 23.0357 6.28571 24.6786C8.14286 26.3214 10.3333 27.1429 12.8571 27.1429ZM12.8571 30C11.0952 30 9.43429 29.661 7.87429 28.9829C6.31524 28.3038 4.95238 27.381 3.78571 26.2143C2.61905 25.0476 1.69619 23.6848 1.01714 22.1257C0.339047 20.5657 0 18.9048 0 17.1429H2.85714C2.85714 19.9048 3.83333 22.2619 5.78571 24.2143C7.7381 26.1667 10.0952 27.1429 12.8571 27.1429C15.619 27.1429 17.9762 26.1667 19.9286 24.2143C21.881 22.2619 22.8571 19.9048 22.8571 17.1429H25.7143C25.7143 18.9048 25.3752 20.5657 24.6971 22.1257C24.0181 23.6848 23.0952 25.0476 21.9286 26.2143C20.7619 27.381 19.399 28.3038 17.84 28.9829C16.28 29.661 14.619 30 12.8571 30ZM0 17.1429C0 15.381 0.339047 13.72 1.01714 12.16C1.69619 10.601 2.61905 9.2381 3.78571 8.07143C4.95238 6.90476 6.31524 5.98238 7.87429 5.30429C9.43429 4.62524 11.0952 4.28571 12.8571 4.28571C14.3333 4.28571 15.75 4.52381 17.1071 5C18.4643 5.47619 19.7381 6.16667 20.9286 7.07143L21.9286 6.07143C22.1905 5.80952 22.5238 5.67857 22.9286 5.67857C23.3333 5.67857 23.6667 5.80952 23.9286 6.07143C24.1905 6.33333 24.3214 6.66667 24.3214 7.07143C24.3214 7.47619 24.1905 7.80952 23.9286 8.07143L22.9286 9.07143C23.8333 10.2619 24.5238 11.5357 25 12.8929C25.4762 14.25 25.7143 15.6667 25.7143 17.1429H22.8571C22.8571 14.381 21.881 12.0238 19.9286 10.0714C17.9762 8.11905 15.619 7.14286 12.8571 7.14286C10.0952 7.14286 7.7381 8.11905 5.78571 10.0714C3.83333 12.0238 2.85714 14.381 2.85714 17.1429H0ZM10 2.85714C9.59524 2.85714 9.25619 2.72 8.98286 2.44571C8.70857 2.17238 8.57143 1.83333 8.57143 1.42857C8.57143 1.02381 8.70857 0.684286 8.98286 0.41C9.25619 0.136667 9.59524 0 10 0H15.7143C16.119 0 16.4586 0.136667 16.7329 0.41C17.0062 0.684286 17.1429 1.02381 17.1429 1.42857C17.1429 1.83333 17.0062 2.17238 16.7329 2.44571C16.4586 2.72 16.119 2.85714 15.7143 2.85714H10ZM12.8571 27.1429C10.0952 27.1429 7.7381 26.1667 5.78571 24.2143C3.83333 22.2619 2.85714 19.9048 2.85714 17.1429C2.85714 14.381 3.83333 12.0238 5.78571 10.0714C7.7381 8.11905 10.0952 7.14286 12.8571 7.14286C15.619 7.14286 17.9762 8.11905 19.9286 10.0714C21.881 12.0238 22.8571 14.381 22.8571 17.1429C22.8571 19.9048 21.881 22.2619 19.9286 24.2143C17.9762 26.1667 15.619 27.1429 12.8571 27.1429Z"
                          fill="#FFC619"
                        />
                      </svg>
                    }
                    value={`Trek Duration : ${trek_duration}`}
                    sx={{ typography: 'body1', gap: 1 }}
                  />
                </Grid>
              )}
              {trek_meals && (
                <Grid item xs={12} md={6}>
                  <TextIconLabel
                    alignItems="center"
                    icon={
                      <svg
                        width="36"
                        height="32"
                        viewBox="0 0 36 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.28571 12.595V2.07143C5.28571 1.78727 5.3986 1.51475 5.59953 1.31381C5.80046 1.11288 6.07298 1 6.35714 1C6.6413 1 6.91383 1.11288 7.11476 1.31381C7.31569 1.51475 7.42857 1.78727 7.42857 2.07143V12.595C8.05552 12.3733 8.5983 11.9627 8.98208 11.4196C9.36587 10.8766 9.57178 10.2278 9.57143 9.56286V2.07143C9.57143 1.78727 9.68431 1.51475 9.88524 1.31381C10.0862 1.11288 10.3587 1 10.6429 1C10.927 1 11.1995 1.11288 11.4005 1.31381C11.6014 1.51475 11.7143 1.78727 11.7143 2.07143V9.56286C11.7145 10.7978 11.2881 11.995 10.5071 12.9517C9.72614 13.9084 8.6386 14.5659 7.42857 14.8129V29.9286C7.42857 30.2127 7.31569 30.4853 7.11476 30.6862C6.91383 30.8871 6.6413 31 6.35714 31C6.07298 31 5.80046 30.8871 5.59953 30.6862C5.3986 30.4853 5.28571 30.2127 5.28571 29.9286V14.8129C4.07568 14.5659 2.98815 13.9084 2.20717 12.9517C1.4262 11.995 0.999748 10.7978 1 9.56286V2.07143C1 1.78727 1.11288 1.51475 1.31381 1.31381C1.51475 1.11288 1.78727 1 2.07143 1C2.35559 1 2.62811 1.11288 2.82904 1.31381C3.02997 1.51475 3.14286 1.78727 3.14286 2.07143V9.56286C3.14251 10.2278 3.34842 10.8766 3.7322 11.4196C4.11599 11.9627 4.65876 12.3733 5.28571 12.595ZM19.2143 18.025C16.1736 17.3436 13.8571 13.8186 13.8571 9.57143C13.8571 4.83571 16.735 1 20.2857 1C23.8364 1 26.7143 4.83571 26.7143 9.57143C26.7143 13.8186 24.3979 17.3436 21.3571 18.025V29.9286C21.3571 30.2127 21.2443 30.4853 21.0433 30.6862C20.8424 30.8871 20.5699 31 20.2857 31C20.0016 31 19.729 30.8871 19.5281 30.6862C19.3272 30.4853 19.2143 30.2127 19.2143 29.9286V18.025ZM20.2857 16C22.4971 16 24.5714 13.2357 24.5714 9.57143C24.5714 5.90714 22.4971 3.14286 20.2857 3.14286C18.0743 3.14286 16 5.90714 16 9.57143C16 13.2357 18.0743 16 20.2857 16Z"
                          fill="#FFC619"
                          stroke="#FFC619"
                        />
                      </svg>
                    }
                    value={`Meals : ${trek_meals}`}
                    sx={{ typography: 'body1', gap: 1 }}
                  />
                </Grid>
              )}
            </Grid>
            <Typography>{description} </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Card>
  );
}
