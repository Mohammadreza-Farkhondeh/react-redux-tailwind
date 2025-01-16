import { store } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes';
import theme from './styles/theme';
import AppLayout from './AppLayout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
