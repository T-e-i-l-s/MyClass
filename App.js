import Navigation from "./stackNavigator";
import { View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import { vexo } from "vexo-analytics"; // Analytic platform

// Connecting application with Vexo
// vexo("04e43c32-9288-4a2a-af12-27eef87ac681");

// Deployment Splash screen(to solve growth after start)
SplashScreen.preventAutoHideAsync();

let isReady = false; // Ready status

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#14110f",
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
        <StatusBar style="auto" />
        {fontsLoaded ? <Navigation /> : null}
      </View>
    </View>
  );
}
