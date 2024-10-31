import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    add(state, action) {
      state.user.userInfo = action.payload;
    },
    remove(state) {
      state.user = null;
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
