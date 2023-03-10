// @mui
import { styled } from '@mui/material/styles';
import { Box, NoSsr, BoxProps } from '@mui/material';
// utils
import cssStyles from '../utils/cssStyles';

// ----------------------------------------------------------------------

interface BackgroundOverlayProps extends BoxProps {
  direction?: string;
  startColor?: string;
  midColor?: string;
  endColor?: string;
}

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'direction' && prop !== 'startColor' && prop !== 'endColor',
})<BackgroundOverlayProps>(({ direction, startColor, endColor, midColor, theme }) => ({
  bottom: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  ...cssStyles(theme).bgGradient({ direction, startColor, endColor, midColor }),
}));

// ----------------------------------------------------------------------

export default function BgOverlay({
  direction,
  startColor,
  midColor,
  endColor,
  ...other
}: BackgroundOverlayProps) {
  return (
    <NoSsr>
      <RootStyle
        direction={direction}
        startColor={startColor}
        midColor={midColor}
        endColor={endColor}
        {...other}
      />
    </NoSsr>
  );
}
