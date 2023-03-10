import { Stack } from '@mui/material';
import React from 'react';
import { TeamMemberPropsHBHB } from '../../../@types/team';
import { Image, SocialsButton, TextMaxLine } from '../../../components';
import { ngrokapi } from '../../../config';
import Routes from '../../../routes';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';

type Props = {
  members: TeamMemberPropsHBHB;
};

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

const OtherMembers = ({ members }: Props) => {
  const { id, name, photo, role, facebook, instagram, linkedin, twitter } = members;
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={name}
        src={ngrokapi + photo}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack>
        <NextLink passHref href={Routes.about.team_single(id)}>
          <TextMaxLine variant="subtitle2" asLink>
            {name}
          </TextMaxLine>
        </NextLink>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {role}
          <DotStyle />
          <SocialsButton initialColor links={{ facebook, instagram, linkedin, twitter }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OtherMembers;
