import { StyleSheet, Text, View } from "react-native";

export const commonStyles = StyleSheet.create({
  title: {
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.16,
    textAlign: "center",
    color: "#212121",
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    padding: 16,
  },
  button: {
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    height: 51,
    backgroundColor: "#ff6c00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    color: "#fff",
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
    color: "#1b4371",
  },
});