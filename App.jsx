import { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, Text } from "react-native";
import { useFonts } from "expo-font";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { colors, commonStyles } from "./styles/common";

import { persistor, store } from "./src/redux/store.js";
import MainStack from "./src/navigation/MainStackNavigator";
import { authStateChanged } from "./src/utils/auth.js";

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ marginTop: 300, flex: 1 }}>
        <ActivityIndicator color={colors.orange} size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AuthListener />
      </PersistGate>
    </Provider>
  );
};

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <View style={commonStyles.container}>
      <MainStack />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
