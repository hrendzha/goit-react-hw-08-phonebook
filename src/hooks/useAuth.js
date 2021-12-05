import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

export const useAuth = () => {
    const user = useSelector(authSelectors.selectCurrentUser);

    return useMemo(() => user, [user]);
};
