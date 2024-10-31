import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../styles/common";

const PostItem = ({ post, isLiked }) => {
  const { id, url, title, comments, map, likes, location } = post;

  const navigation = useNavigation();

  return (
    <View style={styles.post}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.postImage}
      />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.detailsWrapper}>
        <View style={styles.postDetailsWrapper}>
          <Pressable
            style={styles.postDetails}
            onPress={() => navigation.navigate("Comments", { id })}
          >
            <Image
              source={
                comments.length === 0
                  ? require("../../assets/images/message.png")
                  : require("../../assets/images/message-orange.png")
              }
              style={styles.icon}
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
          {isLiked && (
            <View style={styles.postDetails}>
              <Image
                source={
                  likes > 0
                    ? require("../../assets/images/like.png")
                    : require("../../assets/images/no-likes.png")
                }
                style={styles.icon}
              />
              <Text
                style={[styles.comments, likes === 0 && styles.commentsEmpty]}
              >
                {likes}
              </Text>
            </View>
          )}
        </View>
        <Pressable
          style={styles.postDetails}
          onPress={() => navigation.navigate("Map", { id })}
        >
          <Image
            source={require("../../assets/images/map.png")}
            style={styles.icon}
          />
          <Text style={styles.map}>{map}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: { gap: 8 },
  postImage: { height: 240, width: "100%", borderRadius: 8 },
  postTitle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "RobotoMedium",
  },
  detailsWrapper: { flexDirection: "row", justifyContent: "space-between" },
  postDetailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
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
  icon: { width: 24, height: 24 },
});

export default PostItem;
