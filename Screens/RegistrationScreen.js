import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { commonStyles } from "../styles/common";

const RegistrationScreen = () => {
  const [secure, setSecure] = useState(true);
  const [image, setImage] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/sign-up-BG.png")}
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
                    ? require("../assets/delete.png")
                    : require("../assets/add.png")
                }
              />
            </Pressable>
          </View>
          <Text style={[commonStyles.title, styles.title]}>Реєстрація</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Логін"
              style={commonStyles.input}
              placeholderTextColor="#bdbdbd"
            />
            <TextInput
              placeholder="Адреса електронної пошти"
              style={commonStyles.input}
              placeholderTextColor="#bdbdbd"
            />
            <View>
              <TextInput
                placeholder="Пароль"
                secureTextEntry={secure}
                style={commonStyles.input}
                placeholderTextColor="#bdbdbd"
              />
              <Pressable onPress={() => setSecure(!secure)}>
                <Text style={[commonStyles.accentText, styles.show]}>
                  Показати
                </Text>
              </Pressable>
            </View>
          </View>
          <TouchableOpacity style={[commonStyles.button, styles.button]}>
            <Text style={commonStyles.buttonText}>Зареєструватися</Text>
          </TouchableOpacity>
          <View style={commonStyles.accentTextWrapper}>
            <Text style={commonStyles.accentText}>Вже є акаунт?</Text>
            <Pressable>
              <Text style={commonStyles.accentText}>Увійти</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    marginBottom: 33,
  },
  form: {
    gap: 16,
    marginBottom: 43,
  },
  show: {
    position: "absolute",
    height: 50,
    right: 0,
    top: -50,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 16,
  },
});

export default RegistrationScreen;
