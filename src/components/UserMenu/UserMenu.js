import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { useLogOutMutation } from 'services/api';
import s from './UserMenu.module.css';

export default function UserMenu() {
    const { name } = useAuth();

    const [logOut, { isLoading }] = useLogOutMutation();

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={s.userMenu}>
            <p className={s.userMail}>Welcome, {name}</p>
            <button type="button" onClick={handleLogOut}>
                Log Out
            </button>
        </div>
    );
}
