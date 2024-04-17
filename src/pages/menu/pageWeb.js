import { StatusBar } from "expo-status-bar";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import Container from "./container";
import Animation from "../../hooks/animations/Animation";
import styleSheet from "./styles";
import Tabs from "./tabs";
// import { Swipeable } from "react-native-gesture-handler";

export default function App({ navigation, route }) {
  const param = route.params;

  const [theme, setTheme] = useState(
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json")
  );
  const [styles, setStyles] = useState(styleSheet(theme));

  // Current screen
  const [screen, setScreen] = useState("homework");

  // The screen to go to
  const [screenToOpen, setScreenToOpen] = useState("homework");

  const [navBlockHeight, setBlockHeight] = useState(0);
  const [webPageHeight, setWebPageHeight] = useState(0);

  // Animation values
  const pageOpacity = useRef(new Animated.Value(0)).current;

  const containerOpacity = useRef(new Animated.Value(1)).current;

  const swipeLeft = () => {
    if (screen == "schedule") {
      setScreenToOpen("homework");
    } else if (screen == "homework") {
      setScreenToOpen("holidays");
    }
  };

  const swipeRight = () => {
    if (screen == "holidays") {
      setScreenToOpen("homework");
    } else if (screen == "homework") {
      setScreenToOpen("schedule");
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
      {/* <GestureHandlerRootView style={{ width: "100%" }}> */}
      {/* <Swipeable
        containerStyle={{
          width: "100%",
          paddingBottom: Math.max(
            0,
            Dimensions.get("window").height - webPageHeight
          ),
        }}
        dragOffsetFromLeftEdge={110}
        dragOffsetFromRightEdge={110}
        onSwipeableWillClose={(dir) => {
          if (dir == "left") {
            swipeLeft();
          } else {
            swipeRight();
          }
        }}
      > */}
      <SafeAreaView
        onLayout={(event) => setWebPageHeight(event.nativeEvent.layout.height)}
        style={{ width: "100%", backgroundColor: theme.background }}
      >
        <StatusBar style="auto" />

        <Animated.View
          style={{ opacity: pageOpacity, width: "100%", height: "100%" }}
        >
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
        </Animated.View>
      </SafeAreaView>
      {/* </Swipeable> */}
      {/* </GestureHandlerRootView> */}
    </View>
  );
}
