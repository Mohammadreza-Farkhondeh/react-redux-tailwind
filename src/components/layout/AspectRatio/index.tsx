import { Box, BoxProps } from '@mui/material';

interface AspectRatioProps extends BoxProps {
  ratio?: number;
}

export const AspectRatio = ({
  ratio = 16 / 9,
  children,
  ...props
}: AspectRatioProps) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      paddingTop: `${(1 / ratio) * 100}%`,
      '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
);
