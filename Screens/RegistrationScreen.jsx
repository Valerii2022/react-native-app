import { useState } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config";

import { colors, commonStyles } from "../styles/common";

import Button from "../components/Button";
import Input from "../components/Input";

const Registration = () => {
  const [image, setImage] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = form;

  const navigation = useNavigation();

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const registerDB = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (update) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, update);
      } catch (error) {
        throw error;
      }
    }
  };

  const authStateChanged = async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
      onChange(user);
    });
  };

  const handleSubmitForm = () => {
    if (name === "" || email === "" || password === "") {
      Alert.alert("Всі поля обов'язкові для заповнення!");
      return;
    }
    if (reg.test(email) === false) {
      Alert.alert("Невірний формат адреси електронної пошти!");
      return;
    }
    if (name.length < 6) {
      Alert.alert("Логін має бути довжиною мінімум 6 символів!!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Пароль має бути довжиною мінімум 6 символів!!");
      return;
    }
    registerDB({ email, password });
    console.log(
      `Логін: ${name}, електронна пошта: ${email}, пароль:${password}`
    );
    setForm({ name: "", email: "", password: "" });
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-142}
      >
        <ImageBackground
          source={require("../assets/images/sign-up-BG.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.formWrapper}>
            <View style={styles.imageWrapper}>
              <Pressable onPress={() => setImage(!image)}>
                <Image
                  style={[styles.addButton, image && styles.rotate]}
                  source={
                    image
                      ? require("../assets/images/delete.png")
                      : require("../assets/images/add.png")
                  }
                />
              </Pressable>
            </View>
            <Text style={[commonStyles.title, styles.title]}>Реєстрація</Text>
            <View style={styles.form}>
              <Input
                inputValue={name}
                inputTitle="name"
                placeholder="Логін"
                handleInputChange={handleInputChange}
                isSecure={false}
              />
              <Input
                inputValue={email}
                inputTitle="email"
                placeholder="Адреса електронної пошти"
                handleInputChange={handleInputChange}
                isSecure={false}
              />
              <Input
                inputValue={password}
                inputTitle="password"
                placeholder="Пароль"
                handleInputChange={handleInputChange}
                isSecure={true}
              />
            </View>
            <Button
              title="Зареєструватися"
              onPress={handleSubmitForm}
              buttonStyles={styles.button}
            />
            <View style={commonStyles.accentTextWrapper}>
              <Text style={commonStyles.accentText}>Вже є акаунт?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={[commonStyles.accentText, styles.link]}>
                  Увійти
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  formWrapper: {
    marginTop: "auto",
    backgroundColor: colors.white,
    paddingBottom: 45,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageWrapper: {
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.backgroundGray,
  },
  addButton: {
    position: "absolute",
    top: 80,
    right: -12,
    width: 25,
    height: 25,
  },
  rotate: {
    transform: [{ rotate: "-45deg" }],
  },
  title: {
    marginBottom: 32,
  },
  form: {
    gap: 16,
    marginBottom: 43,
  },
  button: {
    marginBottom: 16,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default Registration;
