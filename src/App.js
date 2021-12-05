import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { useFetchCurrentUserQuery } from 'services/api';
import { authSelectors } from 'redux/auth';
import AppBar from './components/AppBar';
import HomePage from 'pages/HomePage';
import ContactsPage from 'pages/ContactsPage';
import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
    const token = useSelector(authSelectors.selectToken);
    const { isFetching } = useFetchCurrentUserQuery(null, {
        skip: !token,
    });

    return (
        !isFetching && (
            <>
                <AppBar />

                <Switch>
                    <PublicRoute path="/" exact>
                        <HomePage />
                    </PublicRoute>

                    <PrivateRoute path="/contacts" redirectTo="/login">
                        <ContactsPage />
                    </PrivateRoute>

                    <PublicRoute path="/register" restricted>
                        <RegisterPage />
                    </PublicRoute>

                    <PublicRoute path="/login" restricted>
                        <LoginPage />
                    </PublicRoute>
                </Switch>
            </>
        )
    );
}

export default App;
