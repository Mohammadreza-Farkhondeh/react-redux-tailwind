import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1', // Aqua Blue (Water)
      light: '#5eb8ff', // Light Blue
      dark: '#01579b', // Deep Blue
      contrastText: '#ffffff', // White text for contrast
    },
    secondary: {
      main: '#43a047', // Green (Environment)
      light: '#76d275', // Light Green
      dark: '#00701a', // Dark Green
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32', // Dark Green for success
      light: '#60ad5e',
      dark: '#005005',
    },
    warning: {
      main: '#f57f17', // Earthy Amber
      light: '#ffb04c',
      dark: '#bc5100',
    },
    error: {
      main: '#d32f2f', // Bright Red
      light: '#ff6659',
      dark: '#9a0007',
    },
    info: {
      main: '#0288d1', // Reinforce Aqua Blue for info
      light: '#5eb8ff',
      dark: '#01579b',
    },
    background: {
      default: '#f4f8fc', // Slightly tinted light blue for the dashboard
      paper: '#ffffff', // Pure white for cards and modals
    },
    text: {
      primary: '#1b262c', // Almost black for high readability
      secondary: '#4d4d4d', // Dark gray for secondary text
      disabled: '#9e9e9e', // Light gray for disabled elements
    },
    divider: '#e0e0e0', // Light gray for dividers
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#01579b', // Dark blue for emphasis
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#01579b',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#0288d1',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#1b262c',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#4d4d4d',
    },
    button: {
      textTransform: 'none', // Disable all-uppercase on buttons
      fontWeight: 500,
    },
  },
  spacing: 8, // Default spacing unit (8px grid)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
          textTransform: 'none', // Disable uppercase
          padding: '8px 16px', // Comfortable padding
        },
        containedPrimary: {
          backgroundColor: '#0288d1',
          '&:hover': {
            backgroundColor: '#01579b',
          },
        },
        containedSecondary: {
          backgroundColor: '#43a047',
          '&:hover': {
            backgroundColor: '#00701a',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Softer corners for cards
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0288d1', // Aqua Blue
          boxShadow: 'none', // Flat design
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'collapse', // Clean table design
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px', // Comfortable cell padding
          borderBottom: '1px solid #e0e0e0', // Light border
        },
        head: {
          fontWeight: 700,
          color: '#1b262c',
          backgroundColor: '#f4f8fc', // Subtle header background
        },
      },
    },
  },
});

export default theme;
