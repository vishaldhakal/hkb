// next
import { useRouter } from 'next/router';
// @mui
import { Typography, Chip, Box } from '@mui/material';
import { BlogProps } from '../../@types/blog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  tags: BlogProps['tags'];
};

export default function BlogSidebarPopularTags({ tags }: Props) {
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Popular Tags
      </Typography>

      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.tag_name} sx={{ m: 0.5 }} onClick={() => onClick('#')} />
      ))}
    </Box>
  );
}
