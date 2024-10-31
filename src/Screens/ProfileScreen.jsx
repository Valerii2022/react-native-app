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

import { tempPosts } from "../../assets/tempData/posts";
import PostItem from "../components/PostItem";
import { currentUser } from "../redux/slices/userSlice";
import { logoutDB } from "../utils/auth";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

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
          <View style={styles.imageWrapper}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/avatar.jpg")}
            />
            <Pressable>
              <Image
                style={styles.addButton}
                source={require("../../assets/images/delete.png")}
              />
            </Pressable>
          </View>
          <Text style={[commonStyles.title, styles.title]}>{user?.name}</Text>
          <View style={styles.postWrapper}>
            {tempPosts.length > 0 &&
              tempPosts.map((item) => {
                return <PostItem post={item} key={item.id} isLiked={true} />;
              })}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
