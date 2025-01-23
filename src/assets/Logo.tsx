import { Box } from '@mui/material';

const Logo = ({ width = 40, height = 40, color = 'primary', sx = {} }) => {
  return (
    <Box
      component="svg"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ display: 'inline-block', ...sx }}
    >
      <circle cx="50" cy="50" r="50" fill="currentColor" />

      <polygon points="50,20 70,70 30,70" fill="white" />

      <circle
        cx="50"
        cy="50"
        r="10"
        fill={color === 'primary' ? 'currentColor' : color}
      />
    </Box>
  );
};

export default Logo;
