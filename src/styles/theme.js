import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const muiTheme = responsiveFontSizes(createTheme());
const fontFamily = 'Montserrat-Light, sanf-serif';

export const theme = {
  ...muiTheme,
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily,
        },
        shrink: {
          backgroundColor: '#FFFFFF',
          padding: '0 0.5em',
          borderRadius: '3px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontFamily,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily,
        },
        h1: {
          fontFamily,
        },
        h2: {
          fontFamily,
        },
      },
    },
  },
};
