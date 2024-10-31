import { doc, getDoc, setDoc } from "firebase/firestore";
// import { UserInfo } from 'firebase/auth';
import { db } from "../../config";

// Функція для додавання документа до колекції
export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Функція для отримання документа з колекції
export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (user) => {
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        displayName: user.displayName || "Anonymous", // Якщо displayName недоступний
        lastLogin: new Date().toISOString(), // Додати дату останнього логіну
      },
      { merge: true }
    ); // merge: true - для оновлення існуючого документа або створення нового
    console.log("User data saved to Firestore:", user.uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};
