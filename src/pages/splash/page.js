import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import styleSheet from "./styles";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BarIndicator } from "react-native-indicators";
import appConfig from "../../../app.json";
import loadData from "../../hooks/handlingData/LoadData"; // Data loading function
import { LinearGradient } from "expo-linear-gradient";

// AsyncStorage.clear();
const screenWidth = Dimensions.get("window").width;

const gradientStart = [Math.random(), Math.random()];
const gradientEnd = [Math.random(), Math.random()];

export default function App({ navigation }) {
  const defaultTheme = require("../../../themes/dark.json");
  const [styles, setStyles] = useState(styleSheet(defaultTheme));
  const [theme, setTheme] = useState(defaultTheme);
  const [themeName, setThemeName] = useState(defaultTheme);

  const getData = async () => {
    // Updating color theme
    let currentThemeName = await AsyncStorage.getItem("theme");
    if (!currentThemeName) {
      currentThemeName = "dark";
    }

    setThemeName(currentThemeName);

    if (currentThemeName == "light") {
      setTheme(require("../../../themes/light.json"));
      setStyles(styleSheet(require("../../../themes/light.json")));
    } else {
      setTheme(require("../../../themes/dark.json"));
      setStyles(styleSheet(require("../../../themes/dark.json")));
    }

    // Loading user info color theme
    const username = await AsyncStorage.getItem("username");

    // Loading data
    let data = await loadData();

    // Has current onboarding shown or hasn't
    const onbooardingStatus = await AsyncStorage.getItem(data.onboarding.id);

    // Navigating to the correct screen
    if (data.devMode.currentVersion != appConfig.expo.version && 1 < 1) {
      // If version is outdated
      // Navigating to onboarding screen with warning "Доступна новая версия"
      data["onboarding"] = {
        cards: [
          {
            image: "https://cdn-icons-png.flaticon.com/512/9028/9028936.png",
            title: "Доступна новая версия",
            text: "Приложение обновилось, скачайте новую версию",
          },
        ],
        id: "-1",
      };
      navigation.navigate("Onboarding", {
        data: data,
        theme: currentThemeName,
        username: username,
        gradientStart: gradientStart,
        gradientEnd: gradientEnd,
      });
    } else if (
      (data.onboarding["isRevealed"] && onbooardingStatus != "shown") ||
      1 > 0
    ) {
      // If current onboarding hasn't shown
      navigation.navigate("Onboarding", {
        data: data,
        theme: currentThemeName,
        username: username,
        gradientStart: gradientStart,
        gradientEnd: gradientEnd,
      });
    } else {
      /*
      There are two Menu screens in this application
      It's important bacause of the gestures
      On android we use community library called "react-native-swipe-gestures"
      On the web we use "react-native-gesture-handler"
      */

      navigation.navigate("Menu", {
        data: data,
        theme: currentThemeName,
        username: username,
      });
    }
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getData();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screenWidth <= 500 ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: themeName == "dark" ? 1 : 0.6,
          }}
        >
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={[theme.background, theme.additional]}
            style={styles.gradient}
          ></LinearGradient>
        </View>
      ) : null}
      {/* <BarIndicator color={defaultTheme.additional} /> */}
      <ActivityIndicator
        size={Platform.OS == "web" ? "large" : "big"}
        color={styles.indicator.color}
      />
      <Text style={styles.atributeText}>Загружаюсь...</Text>
    </View>
  );
}
