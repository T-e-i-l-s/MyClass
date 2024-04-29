/*
Change theme
This function switches the theme

Input:
1) navigation - navigation object
2) currentTheme - current theme('dark' or 'light')
*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import logEvent from "../analytics/logEvent";

export default function (navigation, currentTheme) {
  if (currentTheme == "dark") {
    logEvent("from dark to light theme");
    AsyncStorage.setItem("theme", "light").then(() => {
      navigation.navigate("Splash");
    });
  } else {
    logEvent("from light to dark theme");
    AsyncStorage.setItem("theme", "dark").then(() => {
      navigation.navigate("Splash");
    });
  }
}
