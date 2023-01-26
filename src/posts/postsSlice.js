import { apiSlice } from "api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// Sort Comparer kicks in when state is changed via one of the CRUD functions
// For instance we used .setAll in getPosts query
// What that does is when this crud function is run, it fires up sortComparer function
// which takes two arguments, a and b
// and compares b.date string to see if it comes before a.date string
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// Returns a new enttity state object ike {ids: [], entities: {}}
const initialState = postsAdapter.getInitialState();

export const postsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    updatePost: builder.mutation({
      query: ({ initialPost }) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: { ...initialPost, date: new Date().toISOString() }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.id }
      ]

    }),

    addReactions: builder.mutation({
      query: ({ postId, name }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: { name },
      }),
      async onQueryStarted({ postId, name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsSlice.util.updateQueryData("getPosts", "getPosts", (draft) => {
            const post = draft.entities[postId];
            if (post) post.reactions[name]++;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useAddReactionsMutation } = postsSlice;
