import { StyleSheet } from "react-native";

export const colors = StyleSheet.create({
  white: "#ffffff",
  black: "#212121",
  orange: "#ff6c00",
  border: "#e8e8e8",
  backgroundGray: "#f6f6f6",
  blue: "#1b4371",
  placeholder: "#bdbdbd",
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  screenWrapper: {
    paddingBottom: 32,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.16,
    textAlign: "center",
    color: colors.black,
    fontFamily: "RobotoMedium",
  },
  accentTextWrapper: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  accentText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    color: colors.blue,
    fontFamily: "RobotoRegular",
  },
});
