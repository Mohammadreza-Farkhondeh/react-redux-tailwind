import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import AppLayout from './AppLayout';

import router from './routes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
        <RouterProvider router={router} />
        </AppLayout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
