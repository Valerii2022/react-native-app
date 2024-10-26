import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { colors, commonStyles } from "../styles/common";
import { useState } from "react";

const Input = ({
  inputValue,
  inputTitle,
  placeholder,
  handleInputChange,
  isSecure,
}) => {
  const [visible, setVisible] = useState(isSecure);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  return (
    <View>
      <TextInput
        value={inputValue}
        secureTextEntry={visible}
        onChangeText={(value) => handleInputChange(inputTitle, value)}
        placeholder={placeholder}
        style={[styles.input, isFocused && styles.focused]}
        placeholderTextColor={colors.placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isSecure && (
        <Pressable onPress={() => setVisible(!visible)} style={styles.show}>
          <Text style={[commonStyles.accentText]}>Показати</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.backgroundGray,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    padding: 16,
    color: colors.black,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    fontFamily: "RobotoRegular",
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
  show: {
    position: "absolute",
    height: 50,
    right: 0,
    top: 0,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Input;
