import { Text, View, Image, StyleSheet, ScrollView } from "react-native";

import { colors } from "../styles/common";

import { tempPosts } from "../assets/tempData/posts";
import PostItem from "../components/PostItem";

const Posts = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.nameWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={require("../assets/images/avatar.jpg")} />
        </View>
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.postWrapper}>
        {tempPosts.length > 0 &&
          tempPosts.map((item) => {
            return <PostItem post={item} key={item.id} isLiked={false} />;
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 100,
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
  postWrapper: { gap: 32 },
});

export default Posts;
