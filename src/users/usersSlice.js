import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "api/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            }
        })
    })
})

export const { useGetUsersQuery } = usersSlice