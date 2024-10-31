import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import utc from "dayjs/plugin/utc";

import { colors, commonStyles } from "../styles/common";

import { tempPosts } from "../assets/tempData/posts";

dayjs.extend(utc);

const Comments = ({ route }) => {
  const [comment, setComment] = useState("");

  const formatDateAndTime = (isoString) => {
    const date = dayjs.utc(isoString);
    const day = date.date();
    const month = date.format("MMMM");
    const year = date.year();
    const time = date.format("HH:mm");
    const formattedDate = `${day} ${month}, ${year}`;

    return { formattedDate, time };
  };

  const currentPost = tempPosts.find((post) => post.id === route.params.id);

  return (
    <KeyboardAvoidingView
      style={[commonStyles.container, styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.inner}>
            <Image style={styles.image} source={{ uri: currentPost.url }} />
            <View style={styles.commentsWrapper}>
              {currentPost &&
                currentPost.comments.map(
                  ({ id, comment, date, owner, avatar }) => {
                    const { formattedDate, time } = formatDateAndTime(date);
                    return (
                      <View
                        style={[owner ? styles.ownerComment : styles.comment]}
                        key={id}
                      >
                        <View>
                          <Image
                            style={styles.avatar}
                            source={{ uri: avatar }}
                          />
                        </View>
                        <View
                          style={[
                            styles.textContainer,
                            owner && styles.ownerTextContainer,
                          ]}
                        >
                          <Text style={styles.commentText}>{comment}</Text>
                          <View style={styles.dateWrapper}>
                            <Text style={styles.date}>{formattedDate}</Text>
                            <Text style={styles.date}>|</Text>
                            <Text style={styles.date}>{time}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                )}
            </View>
            <View style={styles.addCommentWrapper}>
              <TextInput
                style={styles.addCommentInput}
                placeholder="Коментувати..."
                value={comment}
                onChangeText={(value) => setComment(value)}
              />
              <Pressable style={styles.addCommentBtn}>
                <Image
                  source={require("../assets/images/arrow-up.png")}
                  style={{ width: 10, height: 14 }}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  inner: { paddingLeft: 16, paddingRight: 16 },
  image: {
    borderRadius: 8,
    marginBottom: 32,
    width: "100%",
    height: 240,
  },
  commentsWrapper: { gap: 24, marginBottom: 16 },
  avatar: { width: 28, height: 28, borderRadius: 100 },
  comment: { flexDirection: "row", gap: 16 },
  ownerComment: { flexDirection: "row-reverse", gap: 16 },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    gap: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  ownerTextContainer: { borderTopLeftRadius: 6, borderTopRightRadius: 0 },
  commentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    lineHeight: 18,
    color: colors.black,
  },
  dateWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 4,
  },
  date: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: colors.placeholder,
  },
  addCommentWrapper: {
    position: "relative",
    marginTop: 16,
    marginBottom: 40,
  },
  addCommentInput: {
    flex: 1,
    borderColor: colors.border,
    borderRadius: 100,
    backgroundColor: colors.backgroundGray,
    padding: 16,
    fontFamily: "RobotoMedium",
    fontSize: 16,
    color: colors.black,
    lineHeight: 19,
    height: 50,
  },
  addCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: colors.orange,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Comments;
