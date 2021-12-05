import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Contact'],
    endpoints: builder => ({
        // user endpoints
        register: builder.mutation({
            query: credentials => ({
                url: '/users/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        logIn: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
        }),
        fetchCurrentUser: builder.query({
            query: () => ({
                url: '/users/current',
            }),
        }),

        // contacts endpoints
        fetchContacts: builder.query({
            query: () => `/contacts`,
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Contact', id })),
                          { type: 'Contact', id: 'LIST' },
                      ]
                    : [{ type: 'Contact', id: 'LIST' }],
        }),
        addContact: builder.mutation({
            query: contactData => ({
                url: '/contacts',
                method: 'POST',
                body: contactData,
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
        }),
        deleteContact: builder.mutation({
            query: contactId => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLogInMutation,
    useLogOutMutation,
    useFetchCurrentUserQuery,

    useFetchContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
} = api;
