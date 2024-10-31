import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "isAuth",
  initialState: { isAuth: false },
  reducers: {
    authorized(state) {
      state.isAuth = true;
    },
    unauthorized(state) {
      state.isAuth = false;
    },
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

export const { authorized, unauthorized } = authSlice.actions;

export const currentAuth = (state) => state.isAuth.isAuth;
