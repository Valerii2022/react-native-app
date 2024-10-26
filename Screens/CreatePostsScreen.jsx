import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { colors, commonStyles } from "../styles/common";
import Button from "../components/Button";
import { useState } from "react";

const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[commonStyles.container, commonStyles.screenWrapper]}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.ImageWrapper}>
          <Pressable styles={styles.cameraWrapper}>
            <Image source={require("../assets/images/camera.jpg")} />
          </Pressable>
        </View>
        <Text style={styles.text}>Завантажте фото</Text>
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
              style={styles.mapIcon}
              source={require("../assets/images/map.png")}
            />
          </View>
        </View>
        <Button title="Опублікувати" disable={true} />
        <Pressable style={styles.trashBtn}>
          <Image source={require("../assets/images/trash.png")} />
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  ImageWrapper: {
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
  cameraWrapper: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: "100%",
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
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    // mardinBottom: 32,
  },
});

export default CreatePosts;
