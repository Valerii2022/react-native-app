import { Image, Pressable, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../styles/common";

import Login from "../Screens/LoginScreen";
import Registration from "../Screens/RegistrationScreen";
import Comments from "../Screens/CommentsScreen";
import Map from "../Screens/MapScreen";
import TabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            title: "Коментарі",
            headerStyle: styles.headerStyles,
            headerTintColor: colors.black,
            headerTitleStyle: styles.titleStyles,
            headerTitleAlign: "center",
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <Pressable
                  onPress={() => navigation.navigate("Публікації")}
                  style={{ marginLeft: 10 }}
                >
                  <Image source={require("../assets/images/back.png")} />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: "Карта",
            headerStyle: styles.headerStyles,
            headerTintColor: colors.black,
            headerTitleStyle: styles.titleStyles,
            headerTitleAlign: "center",
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <Pressable
                  onPress={() => navigation.navigate("Публікації")}
                  style={{ marginLeft: 10 }}
                >
                  <Image source={require("../assets/images/back.png")} />
                </Pressable>
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyles: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  titleStyles: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
});

export default MainStack;
