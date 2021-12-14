import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Box } from '@mui/system';
import { useFetchCurrentUserQuery } from 'services/api';
import { authSelectors } from 'redux/auth';
import AppBar from './components/AppBar';
import HomePage from 'pages/HomePage';
import ContactsPage from 'pages/ContactsPage';
import SignUpPage from 'pages/SignUpPage';
import SignInPage from 'pages/SignInPage';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Alert from 'components/Alert';

function App() {
  const token = useSelector(authSelectors.selectToken);
  const { isFetching } = useFetchCurrentUserQuery(null, {
    skip: !token,
  });

  return (
    !isFetching && (
      <>
        <AppBar />

        <Box component="main">
          <Switch>
            <PublicRoute path="/" exact>
              <HomePage />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsPage />
            </PrivateRoute>

            <PublicRoute path="/register" restricted>
              <SignUpPage />
            </PublicRoute>

            <PublicRoute path="/login" restricted>
              <SignInPage />
            </PublicRoute>
          </Switch>
        </Box>

        <Alert />
      </>
    )
  );
}

export default App;
