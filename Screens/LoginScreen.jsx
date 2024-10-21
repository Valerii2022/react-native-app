import { useState } from "react";
import {
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

import { commonStyles } from "../styles/common";
import Button from "../components/Button";

import Input from "../components/Input";

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmitForm = () => {
    console.log(`Електронна пошта: ${email}, пароль: ${password}`);
    setForm({ email: "", password: "" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
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
              <Pressable>
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

export default LoginScreen;