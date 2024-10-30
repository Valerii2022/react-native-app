import { useState } from "react";
import {
  Alert,
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

import { commonStyles } from "../styles/common";
import Button from "../components/Button";

import Input from "../components/Input";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const loginDB = async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitForm = () => {
    if (email === "" || password === "") {
      Alert.alert("Всі поля обов'язкові для заповнення!");
      return;
    }
    loginDB({ email, password });
    console.log(`Електронна пошта: ${email}, пароль: ${password}`);
    setForm({ email: "", password: "" });
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-208}
      >
        <ImageBackground
          source={require("../assets/images/sign-up-BG.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.formWrapper}>
            <Text style={[commonStyles.title, styles.title]}>Увійти</Text>
            <View style={styles.form}>
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
              title="Увійти"
              onPress={handleSubmitForm}
              buttonStyles={styles.button}
            />
            <View style={commonStyles.accentTextWrapper}>
              <Text style={commonStyles.accentText}>Немає акаунту?</Text>
              <Pressable onPress={() => navigation.navigate("Registration")}>
                <Text style={[commonStyles.accentText, styles.link]}>
                  Зареєструватися
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
    backgroundColor: "#fff",
    paddingBottom: 111,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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

export default Login;
