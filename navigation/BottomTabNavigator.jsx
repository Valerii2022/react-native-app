import React from "react";
import { Image, StyleSheet, View, Pressable, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../styles/common";

import Posts from "../Screens/PostsScreen";
import CreatePosts from "../Screens/CreatePostsScreen";
import Profile from "../Screens/ProfileScreen";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabStyles, styles.tabBottomStyles],
        tabBarItemStyle: { paddingTop: Platform.OS == "ios" && 10 },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={Posts}
        options={{
          headerStyle: styles.tabStyles,
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
            return (
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={styles.logoutIcon}
              >
                <Image source={require("../assets/images/log-out.png")} />
              </Pressable>
            );
          },
          tabBarIcon: () => (
            <View>
              <Image
                source={require("../assets/images/grid.png")}
                style={styles.icon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePosts}
        options={{
          tabBarStyle: { display: "none" },
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
            return (
              <Pressable
                onPress={() => navigation.navigate("Публікації")}
                style={styles.backIcon}
              >
                <Image source={require("../assets/images/back.png")} />
              </Pressable>
            );
          },
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <View style={styles.button}>
              <Image
                source={require("../assets/images/union.png")}
                style={styles.addIcon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.tabButton}>
              <Image
                source={require("../assets/images/user.png")}
                style={styles.icon}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyles: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBottomStyles: {
    height: Platform.OS == "ios" ? 84 : 64,
    paddingLeft: 80,
    paddingRight: 80,
  },
  button: {
    borderRadius: 20,
    width: 70,
    height: 40,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: { marginLeft: 10 },
  logoutIcon: { marginRight: 10 },
  addIcon: { width: 13, height: 13 },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TabNavigator;
