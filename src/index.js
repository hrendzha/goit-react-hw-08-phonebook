import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { store, persistor } from './redux/store';
import './index.css';
import App from './App';

Sentry.init({
  dsn: 'https://ad22794192764bddaac27564f3d96e67@o1089773.ingest.sentry.io/6105215',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
});

const theme = createTheme({
  components: {
    // Name of the component
    MuiListItem: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          position: 'relative',
          width: 'auto',
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Sentry.ErrorBoundary showDialog>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </Sentry.ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
