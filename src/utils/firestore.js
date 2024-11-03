import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUserPosts = async (userId) => {
  const docRef = doc(db, "posts", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().posts;
  } else {
    return null;
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const writeDataToFirestore = async (
  uid,
  title,
  uriImage,
  coordinates,
  location,
  userPosts,
  comments = [],
  likes = 0
) => {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const post = {
    title,
    url: uriImage,
    location: coordinates,
    map: location,
    likes,
    comments,
    id,
  };
  try {
    await setDoc(doc(db, "posts", uid), {
      posts: [...userPosts, post],
    });
    return post;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const updateDataInFirestore = async (uid, posts) => {
  try {
    await setDoc(doc(db, "posts", uid), { posts: posts });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const updateUserInFirestore = async (uid, photoUrl) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        photoUrl: photoUrl,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    return null;
  }
};
