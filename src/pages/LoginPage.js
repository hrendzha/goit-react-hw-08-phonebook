import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import s from 'components/ContactForm/ContactForm.module.css';
import { useLogInMutation } from 'services/api';

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

export default function RegisterPage() {
    const [logIn, { isLoading }] = useLogInMutation();
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async credentials => {
        try {
            await logIn(credentials).unwrap();
            history.push('/contacts');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form className={s.contactForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.fieldWrapper}>
                    <label className={s.field}>
                        <span className={s.label}>Email</span>
                        <input {...register('email')} />
                        <p>{errors.email?.message}</p>
                    </label>

                    <label className={s.field}>
                        <span className={s.label}>Password</span>
                        <input {...register('password')} type="password" />
                        <p>{errors.password?.message}</p>
                    </label>
                </div>

                <button type="submit">login</button>
            </form>
        </>
    );
}
