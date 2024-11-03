import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config";

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

// // Функція для запису даних користувача у Firestore
// export const updateUserInFirestore = async (user) => {
//   try {
//     await setDoc(
//       doc(db, "users", user.uid),
//       {
//         email: user.email,
//         displayName: user.displayName || "Anonymous", // Якщо displayName недоступний
//         lastLogin: new Date().toISOString(), // Додати дату останнього логіну
//       },
//       { merge: true }
//     ); // merge: true - для оновлення існуючого документа або створення нового
//     console.log("User data saved to Firestore:", user.uid);
//   } catch (error) {
//     console.error("Error saving user data to Firestore:", error);
//   }
// };
