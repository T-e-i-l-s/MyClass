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
const screenHeight = Dimensions.get("window").height;

export default function App({ navigation }) {
  const defaultTheme = require("../../../themes/dark.json");
  const [styles, setStyles] = useState(styleSheet(defaultTheme));
  const [theme, setTheme] = useState(defaultTheme);

  const gradientHeight = useRef(new Animated.Value(screenHeight * 0.9)).current;

  const getData = async () => {
    // Updating color theme
    let currentThemeName = await AsyncStorage.getItem("theme");
    if (!currentThemeName) {
      currentThemeName = "dark";
    }
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
    if (data.devMode.currentVersion != appConfig.expo.version) {
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
        gradientPosition: gradientHeight["_value"],
      });
    } else if (data.onboarding["isRevealed"] && onbooardingStatus != "shown") {
      // If current onboarding hasn't shown

      navigation.navigate("Onboarding", {
        data: data,
        theme: currentThemeName,
        username: username,
        gradientPosition: gradientHeight,
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
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientHeight, {
          toValue: screenHeight * 0.8,
          duration: 3000, // Продолжительность анимации в миллисекундах
          useNativeDriver: true, // Важно для анимации градиента
        }),
        Animated.timing(gradientHeight, {
          toValue: screenHeight * 0.9,
          duration: 3000, // Продолжительность анимации в миллисекундах
          useNativeDriver: true, // Важно для анимации градиента
        }),
      ])
    ).start();
    const focusHandler = navigation.addListener("focus", () => {
      // When the page is displayed
      getData();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screenWidth <= 500 ? (
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            height: gradientHeight,
            width: "100%",
          }}
        >
          <LinearGradient
            colors={[theme.background, theme.additional]}
            style={styles.gradient}
          ></LinearGradient>
        </Animated.View>
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
