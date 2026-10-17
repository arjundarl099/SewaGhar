import { indexSlice } from "./indexSlice";

export const vendorServiceApi = indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendorServices: builder.query({
            query: () => ({
                url: '/vendor/service'
            }),
            providesTags: ['vendor services']
        }),
        createVendor: builder.mutation({
            query: (data) => ({
                url: '/vendor',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['vendor'],
        }),
    })
})

export const { useGetAllVendorServicesQuery, useCreateVendorMutation } = vendorServiceApi;