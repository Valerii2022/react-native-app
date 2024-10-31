// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqlTGaS4N2BIXXeKGacQA17unkju3As1c", // з GoogleCloud API
  authDomain: "react-native-app-a320c.firebaseapp.com",
  databaseURL: "<https://react-native-app-a320c.firebaseio.com>",
  projectId: "react-native-app-a320c",
  storageBucket: "react-native-app-a320c.appspot.com",
  appId: "",
  messagingSenderId: "1050114982861",
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

// Ініціалізація Auth з AsyncStorage для роботи редакс персистора
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
