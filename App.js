import Navigation from "./stackNavigator";
import { View, StatusBar, Platform } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import dark from "./themes/dark.json";
import light from "./themes/light.json";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Holidays from "./src/pages/holidays/page";
// import { vexo } from "vexo-analytics"; // Analytic platform

// Connecting application with Vexo
// vexo("04e43c32-9288-4a2a-af12-27eef87ac681");

// Deployment Splash screen(to solve growth after start)
SplashScreen.preventAutoHideAsync();

let isReady = false; // Ready status
const currentThemeName = "dark"; // await AsyncStorage.getItem("theme");

export default function App() {
  // Loading fonts
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/onest.ttf"),
    semi: require("./assets/fonts/onest-semi.ttf"),
  });

  // Handling ready status
  if (!isReady) {
    isReady = true;
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 600);
  }

  return Platform.OS == "web" ? (
    <View
      style={{
        flex: 1,
        backgroundColor:
          currentThemeName == "dark" ? dark.background : light.background,
        alignItems: "center",
      }}
    >
      {/* <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      > */}
      <View
        style={{
          width: "100%",
          height: "100%",
          maxWidth: 500,
        }}
      >
        <StatusBar style={currentThemeName} />
        {fontsLoaded ? <Navigation /> : null}
      </View>
      {/* </SafeAreaView> */}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor:
          currentThemeName == "dark" ? dark.background : light.background,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          maxWidth: 500,
        }}
      >
        <StatusBar style={currentThemeName} />
        {fontsLoaded ? <Navigation /> : null}
      </View>
    </View>
  );
}
