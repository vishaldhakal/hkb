// next
// @mui
import { Stack, Typography, Box } from '@mui/material';
import { BlogProps } from '../../@types/blog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  categories: BlogProps['category'][];
};

export default function BlogSidebarCategories({ categories }: Props) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      {categories.map((category) => (
        <CategoryItem key={category.category_name} category={category} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------
type CategoryItemProps = {
  category: BlogProps['category'];
};

function CategoryItem({ category }: CategoryItemProps) {
  const { category_name } = category;

  return (
    <Stack key={category_name} direction="row" alignItems="center">
      <Box sx={{ width: 6, height: 6, mr: 2, bgcolor: 'primary.main', borderRadius: '50%' }} />

      {category_name}
    </Stack>
  );
}
