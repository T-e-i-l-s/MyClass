import { View, Animated, TouchableHighlight } from "react-native";
import React, { useRef } from "react";
import styleSheet from "./styles";
import Animation from "../../hooks/animations/Animation";

export default function App({
  navigation,
  route,
  screen,
  setScreen,
  containerOpacity,
  screenToOpen,
  setScreenToOpen,
}) {
  const param = route.params;

  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  // Nav icons animation config
  const defaultIconSide = 1;
  const currentIconSide = 1.15;
  const iconAnimationDuration = 100;

  // Page opacity animation config
  const containerOpacityAnimation = 100;

  // Animation values
  const icon1Side = useRef(new Animated.Value(defaultIconSide)).current;

  const icon2Side = useRef(new Animated.Value(currentIconSide)).current;

  const icon3Side = useRef(new Animated.Value(defaultIconSide)).current;

  const icon4Side = useRef(new Animated.Value(defaultIconSide)).current;

  const openHolidays = () => {
    if (screen == "holidays") {
      return;
    }
    setScreenToOpen("holidays");
    Animation(containerOpacity, 0, containerOpacityAnimation);
    Animation(icon1Side, currentIconSide, iconAnimationDuration);
    Animation(icon2Side, defaultIconSide, iconAnimationDuration);
    Animation(icon3Side, defaultIconSide, iconAnimationDuration);
    Animation(icon4Side, defaultIconSide, iconAnimationDuration);
    setTimeout(() => {
      setScreen("holidays");
      Animation(containerOpacity, 1, containerOpacityAnimation);
    }, containerOpacityAnimation);
  };

  const openSchedule = () => {
    if (screen == "schedule") {
      return;
    }
    setScreenToOpen("schedule");
    Animation(containerOpacity, 0, containerOpacityAnimation);
    Animation(icon1Side, defaultIconSide, iconAnimationDuration);
    Animation(icon2Side, defaultIconSide, iconAnimationDuration);
    Animation(icon3Side, currentIconSide, iconAnimationDuration);
    Animation(icon4Side, defaultIconSide, iconAnimationDuration);
    setTimeout(() => {
      setScreen("schedule");
      Animation(containerOpacity, 1, containerOpacityAnimation);
    }, containerOpacityAnimation);
  };

  const openHomework = () => {
    if (screen == "homework") {
      return;
    }
    setScreenToOpen("homework");
    Animation(containerOpacity, 0, containerOpacityAnimation);
    Animation(icon1Side, defaultIconSide, iconAnimationDuration);
    Animation(icon2Side, currentIconSide, iconAnimationDuration);
    Animation(icon3Side, defaultIconSide, iconAnimationDuration);
    Animation(icon4Side, defaultIconSide, iconAnimationDuration);
    setTimeout(() => {
      setScreen("homework");
      Animation(containerOpacity, 1, containerOpacityAnimation);
    }, containerOpacityAnimation);
  };

  const openSettings = () => {
    if (screen == "settings") {
      return;
    }
    setScreenToOpen("settings");
    Animation(containerOpacity, 0, containerOpacityAnimation);
    Animation(icon1Side, defaultIconSide, iconAnimationDuration);
    Animation(icon2Side, defaultIconSide, iconAnimationDuration);
    Animation(icon3Side, defaultIconSide, iconAnimationDuration);
    Animation(icon4Side, currentIconSide, iconAnimationDuration);
    setTimeout(() => {
      setScreen("settings");
      Animation(containerOpacity, 1, containerOpacityAnimation);
    }, containerOpacityAnimation);
  };

  React.useEffect(() => {
    if (screenToOpen != screen) {
      if (screenToOpen == "homework") {
        openHomework();
      } else if (screenToOpen == "schedule") {
        openSchedule();
      } else if (screenToOpen == "holidays") {
        openHolidays();
      } else {
        openSettings();
      }
    }
  });

  return (
    <View style={styles.navBar}>
      <TouchableHighlight
        onLongPress={() => {
          navigation.navigate("PasswordScreen", param);
        }}
        underlayColor={"rgba(255, 0, 255,0)"}
        onPress={openHolidays}
        style={styles.navButton}
      >
        <Animated.Image
          style={[styles.navIcon, { transform: [{ scale: icon1Side }] }]}
          source={
            screen == "holidays"
              ? require("../../../assets/icons/navigation/holidays1.png")
              : require("../../../assets/icons/navigation/holidays0.png")
          }
        />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"rgba(255, 0, 255,0)"}
        onPress={openHomework}
        style={styles.navButton}
      >
        <Animated.Image
          style={[styles.navIcon, { transform: [{ scale: icon2Side }] }]}
          source={
            screen == "homework"
              ? require("../../../assets/icons/navigation/homework1.png")
              : require("../../../assets/icons/navigation/homework0.png")
          }
        />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"rgba(255, 0, 255,0)"}
        onPress={openSchedule}
        style={styles.navButton}
      >
        <Animated.Image
          style={[styles.navIcon, { transform: [{ scale: icon3Side }] }]}
          source={
            screen == "schedule"
              ? require("../../../assets/icons/navigation/schedule1.png")
              : require("../../../assets/icons/navigation/schedule0.png")
          }
        />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={"rgba(255, 0, 255,0)"}
        onPress={openSettings}
        style={styles.navButton}
      >
        <Animated.Image
          style={[styles.navIcon, { transform: [{ scale: icon4Side }] }]}
          source={
            screen == "settings"
              ? require("../../../assets/icons/navigation/settings1.png")
              : require("../../../assets/icons/navigation/settings0.png")
          }
        />
      </TouchableHighlight>
    </View>
  );
}
