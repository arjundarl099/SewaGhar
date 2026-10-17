import { indexSlice } from "./indexSlice";
export const registerApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['user'],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['user'],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/auth/update/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['user'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),

        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/auth/users',
            }),
            providesTags: ['user']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user'],
        }),
        getMe: builder.query({
            query: () => ({
                url: '/auth/me',
            }),
            providesTags: ['user'],
        }),
    }),
});
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetMeQuery,
    useUpdateUserMutation
} = registerApi;