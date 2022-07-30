import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const muiTheme = responsiveFontSizes(createTheme());

export const theme = {
  ...muiTheme,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: [
            'Montserrat-Light',
            'sans-serif',
          ].join(','),
        },
        fontFamily: [
          'Montserrat-Light',
          'sans-serif',
        ].join(','),
        h1: {
          fontFamily: [
            'Montserrat-Light',
            'sans-serif',
          ].join(','),
        },
        h2: {
          fontFamily: [
            'Roboto',
            'sans-serif',
          ].join(','),
        },
      },
    },
  },
};
