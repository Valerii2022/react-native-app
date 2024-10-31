import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../config";
import { add, remove } from "../redux/slices/userSlice";

export const registerDB = async ({ email, password, name }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: name });
    return { uid: user.uid, email: user.email, name };
  } catch (error) {
    return error.code;
  }
};

export const loginDB = async ({ email, password, dispatch }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const currentUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    };
    dispatch(add(currentUser));
    return currentUser;
  } catch (error) {
    return error.code;
  }
};

export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(remove());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        add({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        })
      );
    } else {
      dispatch(remove());
    }
  });
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
