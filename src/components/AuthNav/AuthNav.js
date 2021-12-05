import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export default function AuthNav() {
    return (
        <nav>
            <ul className={s.navigation}>
                <li className={s.navItem}>
                    <NavLink to="/register" activeClassName={s.activeNavLink}>
                        Registration
                    </NavLink>
                </li>
                <li className={s.navItem}>
                    <NavLink to="/login" activeClassName={s.activeNavLink}>
                        login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
