import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    addPost(state, action) {
      state.posts = [...state.posts, action.payload];
    },
    addUserPosts(state, action) {
      state.posts = action.payload;
    },
    removePosts(state, action) {
      state.posts = [];
    },
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const postsReducer = persistReducer(persistConfig, postsSlice.reducer);

export const { addPost, removePosts, addUserPosts } = postsSlice.actions;

export const getPosts = (state) => state.posts.posts;
