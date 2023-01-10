import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        }),
    endpoints: () => ({})
})
export const booksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllBooks: build.query({
            query: (args) => {
                return `books/getAll`
            },
            providesTags: ['Books']
        }),
        getBookById: build.query({
            query: (id) => {
                return `books/${id}`
            },
            providesTags: ['Books']
        }),
        getVariations: build.query({
            query: () => {
                return `books/variations`
            },
        }),
        createBook: build.mutation({
            query: (body={} ) => ({
                url: `books/create`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: build.mutation({
            query: (body= {} ) => ({
                url: `books/update`,
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ['Books']
        })
    })
})
export default api

export const {
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useGetVariationsQuery,
    useCreateBookMutation,
    useUpdateBookMutation
} = booksApi;
