import { useState } from "react";
import {
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

import { commonStyles } from "../styles/common";

import Button from "../components/Button";
import Input from "../components/Input";

const RegistrationScreen = () => {
  const [image, setImage] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = form;

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmitForm = () => {
    console.log(
      `Логін: ${name}, електронна пошта: ${email}, пароль:${password}`
    );
    setForm({ name: "", email: "", password: "" });
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
              <Pressable>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#f6f6f6",
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

export default RegistrationScreen;
