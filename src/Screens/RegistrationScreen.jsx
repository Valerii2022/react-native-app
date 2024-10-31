import { useRef, useState } from "react";
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
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useDispatch } from "react-redux";

import { colors, commonStyles } from "../../styles/common";

import Button from "../components/Button";
import Input from "../components/Input";
import { registerDB } from "../utils/auth";
import { add } from "../redux/slices/userSlice";

const Registration = () => {
  const [uriImage, setUriImage] = useState(
    "http://www.caccd.com/Image/dummy.jpg"
  );
  const [facing, setFacing] = useState("back");
  const [camera, setCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loader, setLoader] = useState(false);

  const { name, email, password } = form;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cameraRef = useRef();

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (camera) {
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Нам потрібен Ваш дозвіл, щоб показати камеру
          </Text>
          <Button onPress={requestPermission} title="Надати доступ" />
        </View>
      );
    }
  }

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setMediaLibraryPermission(status === "granted");
  };

  const takePhoto = async () => {
    if (!camera) return;

    if (mediaLibraryPermission === null) {
      await requestMediaLibraryPermission();
    }

    if (mediaLibraryPermission) {
      const image = await camera?.current?.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(image.uri);
      setUriImage(image.uri);
    } else {
      alert("Доступ до медіатеки не надано");
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmitForm = async () => {
    if (name === "" || email === "" || password === "") {
      Alert.alert("Всі поля обов'язкові для заповнення!");
      return;
    }
    if (reg.test(email) === false) {
      Alert.alert("Невірний формат адреси електронної пошти!");
      return;
    }
    if (name.length < 4) {
      Alert.alert("Логін має бути довжиною мінімум 4 символи!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Пароль має бути довжиною мінімум 6 символів!");
      return;
    }
    setLoader(true);
    try {
      const response = await registerDB({ email, password, name });
      if (typeof response === "string") {
        Alert.alert(response);
        return;
      }
      dispatch(add(response));
      setForm({ name: "", email: "", password: "" });
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={-142}
      >
        <ImageBackground
          source={require("../../assets/images/sign-up-BG.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.formWrapper}>
            <View style={styles.imageWrapper}>
              {camera ? (
                <CameraView
                  ref={cameraRef}
                  style={styles.camera}
                  facing={facing}
                >
                  <Pressable
                    style={styles.flipBtn}
                    onPress={toggleCameraFacing}
                  >
                    <Text style={styles.text}>Flip</Text>
                  </Pressable>
                  <View style={styles.cameraWrapper}>
                    <Pressable onPress={takePhoto}>
                      <Image
                        source={require("../../assets/images/camera.jpg")}
                      />
                    </Pressable>
                  </View>
                </CameraView>
              ) : (
                <Image source={{ uri: uriImage }} style={styles.avatar} />
              )}
              <Pressable
                onPress={() => {
                  setCamera(!camera);
                }}
              >
                <Image
                  style={[styles.addButton, camera && styles.rotate]}
                  source={
                    camera
                      ? require("../../assets/images/delete.png")
                      : require("../../assets/images/add.png")
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
              loader={loader}
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
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  message: {
    textAlign: "center",
    fontFamily: "RobotoRegular",
    fontSize: 20,
    marginBottom: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flipBtn: { position: "absolute", top: 8, right: 8 },
  cameraWrapper: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: colors.placeholder,
    marginBottom: 32,
  },
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
    backgroundColor: colors.backgroundGray,
    borderRadius: 16,
  },
  avatar: { width: "100%", height: "100%", borderRadius: 16 },
  addButton: {
    position: "absolute",
    top: -32,
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
