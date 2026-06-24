import { createAsyncThunk } from "@reduxjs/toolkit";
import dbServices from "../../appwrite/database";

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await dbServices.getPosts();
      return response.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const fetchPostById = createAsyncThunk(
//   "post/fetchPostById",
//   async (id, thunkAPI) => {
//     try {
//       return await dbServices.getPostById(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      return await dbServices.createPost({ ...data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, data }, thunkAPI) => {
    try {
      return await dbServices.updatePost(id, ...data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      await dbServices.deletePost(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
