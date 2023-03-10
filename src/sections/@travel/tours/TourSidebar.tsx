import { Box, Tab, Tabs, Drawer } from '@mui/material';
// hooks
import { useResponsive } from '../../../hooks';
// utils
import { DRAWER_WIDTH } from '../../../config';
// components
import { Scrollbar } from '../../../components';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type SupportSidebarProps = {
  sidebarConfig: {
    name: string;
    id: string;
  }[];
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
  topic: string;
  onClick: (value: string) => void;
  onChangeTopic: (event: React.SyntheticEvent, newValue: string) => void;
};

export default function TourSidebar({
  topic,
  sidebarConfig,
  onChangeTopic,
  isOpenSidebar,
  onClick,
  onCloseSidebar,
}: SupportSidebarProps) {
  const isDesktop = useResponsive('up', 'md');

  const renderContent = (
    <Scrollbar>
      <Tabs
        value={topic}
        onChange={onChangeTopic}
        orientation="vertical"
        sx={{
          pl: { xs: 2.5, md: 0 },
        }}
      >
        {sidebarConfig.map((topic) => (
          <Tab
            key={topic.name}
            value={topic.name}
            label={topic.name}
            onClick={() => onClick(topic.id)}
            sx={{
              height: 56,
              typography: 'body2',
              justifyContent: 'center',
              alignSelf: 'start',
              '&.Mui-selected': { typography: 'subtitle2' },
            }}
          />
        ))}
      </Tabs>
    </Scrollbar>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: 1,
              position: 'unset',
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
          <Box flex={1} />
          <Stack direction="row">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                borderRadius: '0 !important',
                py: 2,
              }}
            >
              Make an enquiry
            </Button>
            <Button
              sx={{
                borderRadius: '0 !important',
                py: 2,
              }}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Plan this Trip
            </Button>
          </Stack>
        </Drawer>
      )}
    </>
  );
}
