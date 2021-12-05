import * as React from 'react';
import s from './AppBar.module.css';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import MainNav from 'components/MainNav';
import { useAuth } from 'hooks/useAuth';

const AppBar = () => {
    const user = useAuth();

    return (
        <header className={s.header}>
            <MainNav />
            {user ? <UserMenu /> : <AuthNav />}
        </header>
    );
};

export default AppBar;
