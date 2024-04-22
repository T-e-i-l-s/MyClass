import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";

import darkThemeColors from "./themes/dark.json";
import lightThemeColors from "./themes/light.json";

import HomeworkScreen from "./src/pages/homework/page";
import HolidaysScreen from "./src/pages/holidays/page";
import ScheduleScreen from "./src/pages/schedule/page";
import SettingsScreen from "./src/pages/settings/page";

const Tab = createBottomTabNavigator();

function CustomTabBarButton({ icon0, icon1, props, theme }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          theme == "dark"
            ? darkThemeColors.background
            : lightThemeColors.background,
      }}
      onStartShouldSetResponder={() => props.onPress()}
    >
      <Image
        source={props.accessibilityState.selected ? icon1 : icon0}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
}

export default function ({ route }) {
  const param = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Задания"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Праздники"
        component={HolidaysScreen}
        options={{
          headerShown: false,
          animation: "none",
          headerMode: "float",
          tabBarButton: (props) => (
            <CustomTabBarButton
              icon0={require("./assets/icons/navigation/holidays0.png")}
              icon1={require("./assets/icons/navigation/holidays1.png")}
              props={props}
              theme={route.params.theme}
            />
          ),
        }}
        initialParams={param}
      />
      <Tab.Screen
        name="Задания"
        component={HomeworkScreen}
        options={{
          headerShown: false,
          animation: "none",
          headerMode: "float",
          tabBarButton: (props) => (
            <CustomTabBarButton
              icon0={require("./assets/icons/navigation/homework0.png")}
              icon1={require("./assets/icons/navigation/homework1.png")}
              props={props}
              theme={route.params.theme}
            />
          ),
        }}
        initialParams={param}
      />
      <Tab.Screen
        name="Расписание"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          animation: "none",
          headerMode: "float",
          tabBarButton: (props) => (
            <CustomTabBarButton
              icon0={require("./assets/icons/navigation/schedule0.png")}
              icon1={require("./assets/icons/navigation/schedule1.png")}
              props={props}
              theme={route.params.theme}
            />
          ),
        }}
        initialParams={param}
      />
      <Tab.Screen
        name="Профиль"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animation: "none",
          headerMode: "float",
          tabBarButton: (props) => (
            <CustomTabBarButton
              icon0={require("./assets/icons/navigation/settings0.png")}
              icon1={require("./assets/icons/navigation/settings1.png")}
              props={props}
              theme={route.params.theme}
            />
          ),
        }}
        initialParams={param}
      />
    </Tab.Navigator>
  );
}
