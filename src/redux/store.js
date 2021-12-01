import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from 'services/contacts-api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        contactsApi.middleware,
    ],
});

setupListeners(store.dispatch);

export { store };
