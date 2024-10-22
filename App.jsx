import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, Pressable, Image } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors, commonStyles } from "./styles/common";

import Login from "./Screens/LoginScreen";
import Registration from "./Screens/RegistrationScreen";
import Home from "./Screens/HomeScreen";
import Comments from "./Screens/CommentsScreen";
import Map from "./Screens/MapScreen";

const MainStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={commonStyles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Comments"
            component={Comments}
            options={{
              title: "Коментарі",
              headerStyle: {
                backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontFamily: "RobotoMedium",
                fontWeight: "500",
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: 0.4,
              },
              headerTitleAlign: "center",
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <Pressable
                    onPress={() => navigation.navigate("Публікації")}
                    style={{ marginLeft: 10 }}
                  >
                    <Image source={require("./assets/images/back.png")} />
                  </Pressable>
                );
              },
            }}
          />
          <MainStack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Карта",
              headerStyle: {
                backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              },
              headerTintColor: colors.black,
              headerTitleStyle: {
                fontFamily: "RobotoMedium",
                fontWeight: "500",
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: 0.4,
              },
              headerTitleAlign: "center",
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <Pressable
                    onPress={() => navigation.navigate("Публікації")}
                    style={{ marginLeft: 10 }}
                  >
                    <Image source={require("./assets/images/back.png")} />
                  </Pressable>
                );
              },
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
