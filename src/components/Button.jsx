import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../styles/common";

const Button = ({ title, buttonStyles, onPress, disable, loader }) => {
  return (
    <Pressable
      style={[
        styles.button,
        buttonStyles,
        disable && styles.disableBackgroundColor,
      ]}
      onPress={disable ? () => {} : onPress}
    >
      {loader ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <Text style={[styles.buttonText, disable && styles.disableTextColor]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    height: 51,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    color: colors.white,
    fontFamily: "RobotoRegular",
  },
  disableBackgroundColor: { backgroundColor: colors.backgroundGray },
  disableTextColor: { color: colors.placeholder },
});

export default Button;
