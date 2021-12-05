import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import s from './MainNav.module.css';

export default function MainNav() {
    const user = useAuth();

    return (
        <nav>
            <ul className={s.navigation}>
                <li className={s.navItem}>
                    <NavLink to="/" exact activeClassName={s.activeNavLink}>
                        Home
                    </NavLink>
                </li>
                {user && (
                    <li className={s.navItem}>
                        <NavLink
                            to="/contacts"
                            activeClassName={s.activeNavLink}
                        >
                            Contacts
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}
