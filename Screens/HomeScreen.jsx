import { StyleSheet, Image, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../styles/common";

import Posts from "./PostsScreen";
import Profile from "./ProfileScreen";
import CreatePosts from "./CreatePostsScreen";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          //   let iconName;

          //   if (route.name === "Profile") {
          //     iconName = focused
          //       ? "ios-information-circle"
          //       : "ios-information-circle-outline";
          //   } else if (route.name === "Settings") {
          //     iconName = focused ? "ios-list-box" : "ios-list";
          //   }
          return <Image source={require("../assets/images/log-out.png")} />;
          //   return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={Posts}
        options={{
          title: "Публікації",
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
          headerLeft: null,
          headerTitleAlign: "center",
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={styles.logOutBtn}
              >
                <Image source={require("../assets/images/log-out.png")} />
              </Pressable>
            );
          },
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePosts}
        options={{
          title: "Створити публікацію",
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
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <Pressable
                onPress={() => navigation.navigate("Posts")}
                style={styles.backBtn}
              >
                <Image source={require("../assets/images/back.png")} />
              </Pressable>
            );
          },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logOutBtn: {
    marginRight: 10,
  },
  backBtn: {
    marginLeft: 10,
  },
});

export default Home;
