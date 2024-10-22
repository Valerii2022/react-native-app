import { Text, View } from "react-native";

import { commonStyles } from "../styles/common";

const CreatePosts = () => {
  return (
    <View style={[commonStyles.container, commonStyles.screenWrapper]}>
      <Text>Завантажте фото</Text>
    </View>
  );
};

export default CreatePosts;
