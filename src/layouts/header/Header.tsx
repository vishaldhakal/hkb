// next
// @mui
import { Stack, Button, AppBar, Container, IconButton } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// routes
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// components
import { Iconify, Logo } from '../../components';
//
import Phone from '@iconify/icons-carbon/phone';
import { NavMobile, NavDesktop } from '../nav';
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';
import Routes from '../../routes';
import Searchbar from '../Searchbar';
import { ActivitiesSearchProps } from '../../@types/travel';
import { NavItemProps } from '../../@types/layout';

// ----------------------------------------------------------------------

type Props = {
  transparent?: boolean;
  activities_search?: ActivitiesSearchProps[];
  navConfig?: NavItemProps[];
};

export default function Header({ transparent, activities_search, navConfig }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle transparent={transparent} scrolling={isScrolling}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { md: 2, xs: 0 },
            height: HEADER_DESKTOP_HEIGHT,
            py: 2,
          }}
        >
          <Logo onDark={transparent && !isScrolling} />

          {isDesktop && navConfig && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={transparent}
              navConfig={navConfig}
            />
          )}

          {!isDesktop && (
            <Stack direction="row" alignItems="center">
              <Searchbar activities_search={activities_search} />
              {navConfig && (
                <NavMobile
                  navConfig={navConfig}
                  sx={{
                    ml: 1,
                  }}
                />
              )}
            </Stack>
          )}
          {isDesktop && (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                height: 0.7,
              }}
            >
              <Searchbar activities_search={activities_search} />

              <Button
                variant={!isScrolling ? 'outlined' : 'contained'}
                size="small"
                sx={{
                  height: 1,
                  color: `${isScrolling ? 'common.black' : 'primary.main'}`,
                }}
                href={Routes.bookTrip.bookTripForm}
              >
                Plan Your Trip
              </Button>
              <IconButton color={!isScrolling ? 'inherit' : 'secondary'} href="tel:+977 9860617338">
                <Iconify icon={Phone} sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Stack>
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
