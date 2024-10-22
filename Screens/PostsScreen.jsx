import { Text, View } from "react-native";

import { commonStyles } from "../styles/common";

const Posts = () => {
  return (
    <View style={[commonStyles.container, commonStyles.screenWrapper]}>
      <Text>Natali Romanova</Text>
      <Text>email@example.com</Text>
    </View>
  );
};

export default Posts;
