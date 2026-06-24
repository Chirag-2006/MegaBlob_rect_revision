import { createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, fetchPosts, updatePost } from "./postThunk";

const initialState = {
  //   selectedPost: null,
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH POSTS
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH SINGLE POST
      //   .addCase(fetchPostById.fulfilled, (state, action) => {
      //     state.selectedPost = action.payload;
      //   })

      // CREATE POST
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      // UPDATE POST
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.$id === action.payload.$id ? action.payload : post,
        );
      })

      // DELETE POST
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.$id !== action.payload);
      });
  },
});

export default postSlice.reducer;
