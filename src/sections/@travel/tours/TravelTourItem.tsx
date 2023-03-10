// icons
import timeIcon from '@iconify/icons-carbon/time';
import starReview from '@iconify/icons-carbon/star-review';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Card, Typography } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { EachActivityCardProps } from '../../../@types/travel';
// components
import { Image, Iconify, TextMaxLine, TextIconLabel } from '../../../components';
import { ngrokapi } from '../../../config';

// ----------------------------------------------------------------------

type Props = {
  activity: EachActivityCardProps;
  index?: number;
};

export default function TravelTourItem({ activity,index }: Props) {
  const { slug, price, duration, ratings, coverImg, activity_title, priceSale } = activity;

  return (
    <NextLink as={Routes.travel.tour(slug)} href={Routes.travel.tour('[slug]')} passHref>
      <Card
      component={'a'}
        sx={{
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1)',
          overflowY: 'hidden',
          textDecoration:'none',
        }}
        elevation={2}
      >
        <Image
          alt={slug}
          src={ngrokapi + coverImg}
          ratio="16/9"
          sx={{
            overflowX: 'visible',
            position: 'relative',
          }}
        />
        <Stack spacing={0.5} sx={{ px: 2.5, py: 1 }}>
          <TextMaxLine
            variant="h3"
            sx={{
              fontSize: '1.1rem !important',
              height: '50%',
              mt: 1,
            }}
            line={1}
          >
            { index && index+1} { index && ". "}  {activity_title}
            
          </TextMaxLine>

          <Stack justifyContent="space-between">
            <Typography variant="body2" paragraph sx={{ color: 'text.disabled',mb:0 }}>
              Starting from{' '}
              <Typography
                component="span"
                sx={{ fontWeight: 800 }}
                variant="h6"
                color="secondary.main"
              >
                {fCurrency(priceSale)}
              </Typography>
              {price > 0 && (
                <Typography
                  component="span"
                  sx={{ color: 'grey.500', textDecoration: 'line-through', ml: 1 }}
                >
                  <Typography component="span">{fCurrency(price)}</Typography>
                </Typography>
              )}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1 }}
            >
              <TextIconLabel
                icon={
                  <Iconify
                    icon={timeIcon}
                    color="primary.main"
                    sx={{ mr: 1, width: 20, height: 20 }}
                  />
                }
                value={duration}
                sx={{
                  typography: 'body3',
                  color: 'text.disabled',
                  alignItems: 'top',
                }}
              />
              <TextIconLabel
                icon={
                  <Iconify
                    icon={starReview}
                    color="primary.main"
                    sx={{ mr: 1, width: 20, height: 20 }}
                  />
                }
                value={ratings}
                sx={{
                  typography: 'body3',
                  color: 'text.disabled',
                  alignItems: 'top',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </NextLink>
  );
}
