// @mui
import { Stack, Typography, Avatar } from '@mui/material';
// @types
import { HBAuthorProps } from '../../@types/blog';
//

// ----------------------------------------------------------------------

type Props = {
  author: HBAuthorProps;
};

export default function BlogAuthorInfo({ author }: Props) {
  const { name, role, about, picture } = author;

  return (
    <Stack direction="row" spacing={{ xs: 3, md: 4 }} sx={{ py: 8 }}>
      <Avatar src={picture} sx={{ width: 96, height: 96 }} />

      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              {role}
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {about}
        </Typography>
      </Stack>
    </Stack>
  );
}
