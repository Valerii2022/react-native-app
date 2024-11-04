import React, { useState, useRef } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { colors, commonStyles } from "../../styles/common";

import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../redux/slices/userSlice";
import { addPost, getPosts } from "../redux/slices/postsSlice";
import { writeDataToFirestore } from "../utils/firestore";

const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [uriImage, setUriImage] = useState("");
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [loader, setLoader] = useState(false);

  const user = useSelector(currentUser);
  const userPosts = useSelector(getPosts);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const camera = useRef();

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

  const handleCreatingPost = async () => {
    setLoader(true);
    let { coords } = await Location.getCurrentPositionAsync({});
    const result = await writeDataToFirestore(
      user.uid,
      title,
      uriImage,
      { latitude: coords.latitude, longitude: coords.longitude },
      location,
      userPosts
    );
    if (result) {
      dispatch(addPost(result));
      setTitle("");
      setLocation("");
      setUriImage("");
      navigation.navigate("Публікації");
    } else {
      Alert.alert("Сталась помилка!");
    }
    setLoader(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={commonStyles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View>
              <View style={styles.imageWrapper}>
                {uriImage ? (
                  <Image source={{ uri: uriImage }} style={styles.camera} />
                ) : (
                  <CameraView
                    ref={camera}
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
                )}
              </View>
              {uriImage ? (
                <Pressable onPress={() => setUriImage("")} style={styles.text}>
                  <Text>Редагувати фото</Text>
                </Pressable>
              ) : (
                <Text style={styles.text}>Завантажте</Text>
              )}

              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Назва..."
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                />
                <View style={styles.locationInputWrapper}>
                  <TextInput
                    style={[styles.input, styles.locationInput]}
                    placeholder="Місцевість..."
                    value={location}
                    onChangeText={(value) => setLocation(value)}
                  />
                  <Image
                    style={[styles.mapIcon, styles.icon]}
                    source={require("../../assets/images/map.png")}
                  />
                </View>
              </View>
              <Button
                title="Опублікувати"
                disable={!title || !location || !uriImage}
                onPress={handleCreatingPost}
                loader={loader}
              />
            </View>
            <Pressable
              style={styles.trashBtn}
              onPress={() => {
                setTitle("");
                setLocation("");
                setUriImage("");
              }}
            >
              <Image
                source={require("../../assets/images/trash.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  container: {
    justifyContent: "space-between",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    height: "100%",
  },
  imageWrapper: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: colors.backgroundGray,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  flipBtn: { position: "absolute", top: 16, right: 16 },
  cameraWrapper: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 60,
    height: 60,
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
  form: { gap: 16, marginBottom: 32 },
  locationInputWrapper: { position: "relative" },
  locationInput: { paddingLeft: 28 },
  mapIcon: {
    position: "absolute",
    left: 0,
    top: 13,
  },
  input: {
    height: 50,
    width: "100%",
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: colors.black,
  },
  trashBtn: {
    marginTop: 24,
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: { width: 24, height: 24 },
});

export default CreatePosts;
