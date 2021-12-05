import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from 'hooks/useAuth';

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
    redirectTo: PropTypes.string,
};

export default function PrivateRoute({
    children,
    redirectTo = '/',
    ...routeProps
}) {
    const user = useAuth();

    return (
        <Route {...routeProps}>
            {user ? children : <Redirect to={redirectTo} />}
        </Route>
    );
}
