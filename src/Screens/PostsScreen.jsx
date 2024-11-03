import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import { colors } from "../../styles/common";

import { currentUser } from "../redux/slices/userSlice";
import { getPosts } from "../redux/slices/postsSlice";
import PostItem from "../components/PostItem";

const Posts = () => {
  const user = useSelector(currentUser);
  const posts = useSelector(getPosts);

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.nameWrapper}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/avatar.jpg")}
            />
          </View>
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.postWrapper}>
          {posts &&
            posts.map((item) => {
              return <PostItem post={item} key={item.id} />;
            })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: { width: 60, height: 60 },
  scrollContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  nameWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
  },
  name: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    color: colors.black,
  },
  email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    color: colors.black,
  },
  postWrapper: { gap: 32, paddingBottom: 64 },
});

export default Posts;