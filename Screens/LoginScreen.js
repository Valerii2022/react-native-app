import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { commonStyles } from "../styles/common";

const LoginScreen = () => {
  const [secure, setSecure] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/sign-up-BG.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.formWrapper}>
            <Text style={[commonStyles.title, styles.title]}>Увійти</Text>
            <KeyboardAvoidingView
              style={styles.form}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                value={email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholder="Адреса електронної пошти"
                style={commonStyles.input}
                placeholderTextColor="#bdbdbd"
              />
              <View>
                <TextInput
                  value={password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  placeholder="Пароль"
                  secureTextEntry={secure}
                  style={commonStyles.input}
                  placeholderTextColor="#bdbdbd"
                />
                <Pressable
                  onPress={() => setSecure(!secure)}
                  style={styles.show}
                >
                  <Text style={[commonStyles.accentText]}>Показати</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={[commonStyles.button, styles.button]}
              onPress={() => {
                console.log(`Електронна пошта: ${email}, пароль: ${password}`);
                setForm({ email: "", password: "" });
              }}
            >
              <Text style={commonStyles.buttonText}>Увійти</Text>
            </TouchableOpacity>
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
      </View>
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
  show: {
    position: "absolute",
    height: 50,
    right: 0,
    top: 0,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 16,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
