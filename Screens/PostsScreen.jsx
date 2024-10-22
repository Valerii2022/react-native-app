import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import { colors, commonStyles } from "../styles/common";
import { useNavigation } from "@react-navigation/native";
import { tempPosts } from "../assets/tempData/posts";

const Posts = () => {
  const navigation = useNavigation();

  return (
    <View style={[commonStyles.container]}>
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
            tempPosts.map(({ id, url, title, comments, map }) => {
              return (
                <View style={styles.post} key={id}>
                  <Image
                    source={require("../assets/images/nature.jpg")}
                    style={styles.postImage}
                  />
                  <Text style={styles.posttitle}>{title}</Text>
                  <View style={styles.detailsWrapper}>
                    <Pressable
                      style={styles.postDetails}
                      onPress={() => navigation.navigate("Comments")}
                    >
                      <Image
                        source={
                          comments.length === 0
                            ? require("../assets/images/message.png")
                            : require("../assets/images/message-orange.png")
                        }
                      />
                      <Text
                        style={[
                          styles.comments,
                          comments.length === 0 && styles.commentsEmpty,
                        ]}
                      >
                        {comments.length}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.postDetails}
                      onPress={() => navigation.navigate("Map")}
                    >
                      <Image source={require("../assets/images/map.png")} />
                      <Text style={styles.map}>{map}</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 100, paddingTop: 32 },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
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
  post: { gap: 8 },
  postImage: { height: 240, width: "100%", borderRadius: 8 },
  detailsWrapper: { flexDirection: "row", justifyContent: "space-between" },
  postDetails: { flexDirection: "row", gap: 6, alignItems: "center" },
  comments: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: colors.black,
  },
  commentsEmpty: { color: colors.placeholder },
  map: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    textAlign: "right",
    color: colors.black,
    textDecorationLine: "underline",
  },
});

export default Posts;
