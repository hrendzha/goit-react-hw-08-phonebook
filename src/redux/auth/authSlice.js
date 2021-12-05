import { createSlice } from '@reduxjs/toolkit';
import { api } from 'services/api';

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addMatcher(
                api.endpoints.logIn.matchFulfilled,
                (state, { payload: { user, token } }) => {
                    state.user = user;
                    state.token = token;
                },
            )
            .addMatcher(
                api.endpoints.register.matchFulfilled,
                (state, { payload: { user, token } }) => {
                    state.user = user;
                    state.token = token;
                },
            )
            .addMatcher(
                api.endpoints.logOut.matchFulfilled,
                state => (state = initialState),
            )
            .addMatcher(
                api.endpoints.fetchCurrentUser.matchFulfilled,
                (state, { payload: currentUser }) => {
                    state.user = currentUser;
                },
            );
    },
});

export default authSlice.reducer;
