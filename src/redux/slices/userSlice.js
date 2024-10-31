import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    add(state, action) {
      state.userInfo = action.payload;
    },
    remove(state) {
      state.userInfo = null;
    },
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);

export const { add, remove } = userSlice.actions;

export const currentUser = (state) => state.user.userInfo;
