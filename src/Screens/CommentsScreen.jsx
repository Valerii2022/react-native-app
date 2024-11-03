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
  Alert,
} from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import utc from "dayjs/plugin/utc";

import { colors, commonStyles } from "../../styles/common";
import { updateDataInFirestore } from "../utils/firestore";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../redux/slices/userSlice";
import { addUserPosts, getPosts } from "../redux/slices/postsSlice";

dayjs.extend(utc);

const Comments = ({ route }) => {
  const user = useSelector(currentUser);
  const userPosts = useSelector(getPosts);
  const dispatch = useDispatch();

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

  const currentPost = userPosts
    ? userPosts.find((post) => post.id === route.params.id)
    : null;

  const addComment = async () => {
    if (!comment) {
      Alert.alert("Введіть коментар!");
      return;
    }
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newComment = {
      id,
      comment,
      date: new Date().toISOString(),
      owner: true,
      avatar: user.photoUrl,
    };
    const updatedPost = {
      ...currentPost,
      comments: [...currentPost.comments, newComment],
    };
    const posts = [
      ...userPosts.map((post) => {
        if (post.id === currentPost.id) {
          return updatedPost;
        } else {
          return post;
        }
      }),
    ];
    const success = await updateDataInFirestore(user.uid, posts);
    if (success) {
      dispatch(addUserPosts(posts));
      setComment("");
    } else {
      Alert.alert("Виникла помилка!");
    }
  };
  return (
    <KeyboardAvoidingView
      style={[commonStyles.container, styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.inner}>
            {currentPost && (
              <>
                <Image style={styles.image} source={{ uri: currentPost.url }} />
                <View style={styles.commentsWrapper}>
                  {currentPost.comments.map(
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
                  <Pressable style={styles.addCommentBtn} onPress={addComment}>
                    <Image
                      source={require("../../assets/images/arrow-up.png")}
                      style={{ width: 10, height: 14 }}
                    />
                  </Pressable>
                </View>
              </>
            )}
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
    backgroundColor: colors.border,
  },
  commentsWrapper: { gap: 24, marginBottom: 16 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: colors.border,
  },
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
