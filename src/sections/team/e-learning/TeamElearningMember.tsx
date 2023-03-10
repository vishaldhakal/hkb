// @mui
import { Typography, Card, Box, Stack } from '@mui/material';
// @types
import { TeamMemberPropsHBHB } from '../../../@types/team';
// components
import { Image, SocialsButton, HTMLToReact, TextMaxLine } from '../../../components';
import { ngrokapi } from '../../../config';
import NextLink from 'next/link';
import Routes from '../../../routes';
// ----------------------------------------------------------------------

type Props = {
  member: TeamMemberPropsHBHB;
  short?: boolean;
};

export default function TeamElearningMember({ member, short }: Props) {
  const { name, role, photo, facebook, instagram, linkedin, twitter, id, about, email } = member;

  return (
    <NextLink href={Routes.about.team_single(id)}>
      <Card
        sx={{
          boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          minHeight: 240,
        }}
      >
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Image
            src={ngrokapi + photo}
            alt={name}
            sx={{
              height: 240,
              minWidth: 240,
            }}
          />
          {!short && (
            <Stack spacing={0.5} sx={{ textAlign: 'left', pt: { md: 3, xs: 1 }, pb: 2, px: 2 }}>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body3" sx={{ color: 'text.disabled' }}>
                {role}
              </Typography>
              <SocialsButton
                initialColor
                links={{ facebook, instagram, linkedin, twitter, email }}
              />
              <TextMaxLine line={3}>
                <HTMLToReact html={about} />
              </TextMaxLine>
            </Stack>
          )}
        </Box>
      </Card>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

/* function Shape() {
  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 8,
        zIndex: 9,
        position: 'absolute',
        color: 'background.paper',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="32" viewBox="0 0 1080 32">
        <path fill="currentColor" d="M1080 32L0 0h1080v32z" />
      </svg>
    </Box>
  );
} */
