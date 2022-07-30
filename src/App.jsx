import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { RouterSwitch } from './routes/RouterSwitch';
import { theme } from './styles/theme';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { ReloadListenerProvider } from './providers/ReloadListenerProvider';
import './index.css';

/**
 * Application root.
 *
 * @returns {App}
 */
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <ReloadListenerProvider>
          <SnackbarProvider>
            <RouterSwitch />
          </SnackbarProvider>
        </ReloadListenerProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
