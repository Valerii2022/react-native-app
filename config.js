// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmw8epOp6GDvRSHLmeJ9o-s4UvYd2r4Hs",
  authDomain: "react-native-app-391cd.firebaseapp.com",
  projectId: "react-native-app-391cd",
  storageBucket: "react-native-app-391cd.appspot.com",
  messagingSenderId: "1010610065012",
  appId: "1:1010610065012:web:20d249c5af8796e775cb21",
  measurementId: "G-GXXMWDFFRJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
