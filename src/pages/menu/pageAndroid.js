import { StatusBar } from "expo-status-bar";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import styleSheet from "./styles";
import Animation from "../../hooks/animations/Animation";
import Container from "./container";
import changeTheme from "../../hooks/handlingData/ChangeTheme";
import Tabs from "./tabs";

export default function App({ navigation, route }) {
  const param = route.params;

  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  // Current screen
  const [screen, setScreen] = useState("homework");

  // The screen to go to
  const [screenToOpen, setScreenToOpen] = useState("homework");

  // Gesture start x, y
  const [touchStartX, setTouchStartX] = useState();
  const [touchStartY, setTouchStartY] = useState();

  const [navBlockHeight, setBlockHeight] = useState(0);

  // Animation values
  const pageOpacity = useRef(new Animated.Value(0)).current;

  const containerOpacity = useRef(new Animated.Value(1)).current;

  const swipeRight = () => {
    if (screen == "settings") {
      setScreenToOpen("schedule");
    } else if (screen == "schedule") {
      setScreenToOpen("homework");
    } else if (screen == "homework") {
      setScreenToOpen("holidays");
    }
  };

  const swipeLeft = () => {
    if (screen == "holidays") {
      setScreenToOpen("homework");
    } else if (screen == "homework") {
      setScreenToOpen("schedule");
    } else if (screen == "schedule") {
      setScreenToOpen("settings");
    }
  };

  const handleTouch = (event) => {
    const touchEndX = event.nativeEvent.locationX;
    const touchEndY = event.nativeEvent.locationY;
    if (
      Math.abs(touchEndY - touchStartY) < 70 &&
      Math.abs(touchEndX - touchStartX) > 10
    ) {
      if (touchEndX < touchStartX) {
        swipeLeft();
      } else {
        swipeRight();
      }
    }
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      Animation(pageOpacity, 1, 1000);
    });
    const blurHandler = navigation.addListener("blur", () => {
      Animation(pageOpacity, 0, 1000);
    });
    return focusHandler, blurHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onTouchStart={(event) => {
          setTouchStartX(event.nativeEvent.locationX);
          setTouchStartY(event.nativeEvent.locationY);
        }}
        onTouchEnd={(event) => handleTouch(event)}
        style={{ width: "100%", height: "100%" }}
        config={{
          gestureIsClickThreshold: 15,
          directionalOffsetThreshold: 15,
        }}
      >
        <SafeAreaView
          style={{ width: "100%", backgroundColor: theme.background }}
        >
          <StatusBar style={route.params.theme == "dark" ? "light" : "dark"} />

          <Animated.View
            style={{ opacity: pageOpacity, width: "100%", height: "100%" }}
          >
            <Animated.View style={{ opacity: containerOpacity }}>
              <Container
                navigation={navigation}
                route={route}
                styles={styles}
                screen={screen}
                navBlockHeight={navBlockHeight}
                changeTheme={() => changeTheme(navigation, param.theme)}
              />
            </Animated.View>

            <View
              onLayout={(event) =>
                setBlockHeight(event.nativeEvent.layout.height)
              }
            >
              <Tabs
                navigation={navigation}
                route={route}
                screen={screen}
                setScreen={setScreen}
                containerOpacity={containerOpacity}
                screenToOpen={screenToOpen}
                setScreenToOpen={setScreenToOpen}
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      </GestureRecognizer>
    </View>
  );
}
