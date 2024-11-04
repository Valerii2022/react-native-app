import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { colors } from "../../styles/common";
import { useRef, useState } from "react";
import { updateUserInFirestore } from "../utils/firestore";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";

const Camera = ({ setUriImage, camera, setCamera, uid }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const cameraRef = useRef();

  const dispatch = useDispatch();

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
    if (!cameraRef) return;

    if (mediaLibraryPermission === null) {
      await requestMediaLibraryPermission();
    }
    if (mediaLibraryPermission) {
      const image = await cameraRef?.current?.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(image.uri);
      if (uid) {
        const success = await updateUserInFirestore(uid, image.uri);
        if (success) {
          setUriImage(image.uri);
          dispatch(updateUser(image.uri));
          setCamera(false);
        } else {
          Alert.alert("Помилка завантаження фото");
        }
      } else {
        setUriImage(image.uri);
        setCamera(false);
      }
    } else {
      alert("Доступ до медіатеки не надано");
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
      <Pressable style={styles.flipBtn} onPress={toggleCameraFacing}>
        <Text style={styles.text}>Flip</Text>
      </Pressable>
      <View style={styles.cameraWrapper}>
        <Pressable onPress={takePhoto}>
          <Image source={require("../../assets/images/camera.jpg")} />
        </Pressable>
      </View>
    </CameraView>
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
});

export default Camera;
