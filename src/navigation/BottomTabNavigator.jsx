import React from "react";
import { Image, StyleSheet, View, Pressable, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../../styles/common";

import Posts from "../Screens/PostsScreen";
import CreatePosts from "../Screens/CreatePostsScreen";
import Profile from "../Screens/ProfileScreen";
import { logoutDB } from "../utils/auth";
import { useDispatch } from "react-redux";

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Tabs.Navigator
      initialRouteName="Публікації"
      screenOptions={(navigation) => ({
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabStyles, styles.tabBottomStyles],
        tabBarItemStyle: { paddingTop: Platform.OS == "ios" && 10 },
      })}
    >
      <Tabs.Screen
        name="Публікації"
        component={Posts}
        options={({ navigation }) => ({
          headerStyle: styles.tabStyles,
          headerTintColor: colors.black,
          headerTitleStyle: styles.headerTitleStyles,
          headerLeft: null,
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  logoutDB(dispatch);
                  navigation.navigate("Login");
                }}
                style={styles.logoutIcon}
              >
                <Image
                  source={require("../../assets/images/log-out.png")}
                  style={{ width: 24, height: 24 }}
                />
              </Pressable>
            );
          },
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/grid.png")}
              style={styles.icon}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePosts}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerStyle: styles.headerStyles,
          headerTintColor: colors.black,
          headerTitleStyle: styles.headerTitleStyles,
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.backIcon}
              >
                <Image
                  source={require("../../assets/images/back.png")}
                  style={{ width: 24, height: 24 }}
                />
              </Pressable>
            );
          },
          headerTitleAlign: "center",
          tabBarIcon: () => {
            const index = navigation.getState()?.index;
            return (
              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate(
                    index === 0 ? "Створити публікацію" : "Профіль"
                  )
                }
              >
                <Image
                  source={
                    index === 0
                      ? require("../../assets/images/union.png")
                      : require("../../assets/images/user-white.png")
                  }
                  style={styles.icon}
                />
              </Pressable>
            );
          },
        })}
      />
      <Tabs.Screen
        name="Профіль"
        component={Profile}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: () => {
            const index = navigation.getState()?.index;
            return (
              <Pressable
                style={styles.tabButton}
                onPress={() =>
                  navigation.navigate(
                    index === 2 ? "Створити публікацію" : "Профіль"
                  )
                }
              >
                <Image
                  source={
                    index === 2
                      ? require("../../assets/images/union-dark.png")
                      : require("../../assets/images/user.png")
                  }
                  style={styles.icon}
                />
              </Pressable>
            );
          },
        })}
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
  icon: {
    width: 40,
    height: 40,
  },
  headerTitleStyles: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  headerStyles: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default TabNavigator;
