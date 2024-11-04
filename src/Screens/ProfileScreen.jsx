import { useRef, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { colors, commonStyles } from "../../styles/common";

import PostItem from "../components/PostItem";
import { currentUser } from "../redux/slices/userSlice";
import { logoutDB } from "../utils/auth";
import { getPosts } from "../redux/slices/postsSlice";
import Camera from "../components/Camera";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  const posts = useSelector(getPosts);

  const [camera, setCamera] = useState(false);
  const [uriImage, setUriImage] = useState(
    user?.photoUrl || "http://www.caccd.com/Image/dummy.jpg"
  );

  return (
    <ScrollView style={commonStyles.container}>
      <ImageBackground
        source={require("../../assets/images/sign-up-BG.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.contentWrapper}>
          <Pressable
            onPress={() => {
              logoutDB(dispatch);
              navigation.navigate("Login");
            }}
          >
            <Image
              style={styles.logOutBtn}
              source={require("../../assets/images/log-out.png")}
            />
          </Pressable>
          <Pressable
            onPress={() => setCamera(!camera)}
            style={styles.imageWrapper}
          >
            {camera ? (
              <Camera
                setUriImage={setUriImage}
                setCamera={setCamera}
                camera={camera}
                uid={user.uid}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: uriImage,
                }}
              />
            )}
            <Pressable>
              <Image
                style={styles.addButton}
                source={require("../../assets/images/delete.png")}
              />
            </Pressable>
          </Pressable>
          <Text style={[commonStyles.title, styles.title]}>
            {user?.displayName}
          </Text>
          <View style={styles.postWrapper}>
            {posts &&
              posts.map((item) => {
                return <PostItem uid={user?.uid} post={item} key={item.id} />;
              })}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  contentWrapper: {
    marginTop: 150,
    flex: 1,
    backgroundColor: colors.white,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 22,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logOutBtn: { marginBottom: 46, marginLeft: "auto", width: 24, height: 24 },
  imageWrapper: {
    width: 120,
    height: 120,
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    position: "absolute",
  },
  avatar: {
    width: "100%",
    height: "100%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.border,
  },
  addButton: {
    position: "absolute",
    top: -40,
    right: -14,
    width: 25,
    height: 25,
    transform: [{ rotate: "-45deg" }],
  },
  title: {
    marginBottom: 32,
  },
  postWrapper: { gap: 32, paddingBottom: 32 },
});

export default Profile;
