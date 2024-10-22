import { View, ImageBackground, StyleSheet } from "react-native";

import { commonStyles } from "../styles/common";

const Profile = () => {
  return (
    <View style={commonStyles.container}>
      <ImageBackground
        source={require("../assets/images/sign-up-BG.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Profile;
