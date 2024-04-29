import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Platform,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import styleSheet from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

export default function App({ navigation, route }) {
  const param = route.params;

  const gradient1Opacity = useRef(new Animated.Value(0)).current;
  const gradient2Opacity = useRef(
    new Animated.Value(param.theme == "dark" ? 1 : 0.6)
  ).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const [gradient1Start, setGradient1Start] = useState(param.gradientStart);
  const [gradient1End, setGradient1End] = useState(param.gradientEnd);
  const [gradient2Start, setGradient2Start] = useState(param.gradientStart);
  const [gradient2End, setGradient2End] = useState(param.gradientEnd);

  const theme =
    param.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const flatListRef = useRef(); // Flatlist referense
  const [sliderPosition, setSliderPosition] = useState(0); // current card

  const cards = param.data.onboarding.cards;

  // Count number of current card function
  const savePosition = (x) => {
    setSliderPosition(Math.round(x / Dimensions.get("window").width));
  };

  // Open next card function
  const scrollToNext = () => {
    if (sliderPosition + 1 == cards.length) {
      // If last card has shown
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
      AsyncStorage.setItem(param.data.onboarding.id, "shown");
      setTimeout(() => {
        navigation.navigate("Menu", param);
      }, 500);
    } else {
      // If it wasn't last card
      if (Platform.OS == "web") {
        setGradient1Start(gradient2Start);
        setGradient1End(gradient2End);
        setGradient2Start([Math.random(), Math.random()]);
        setGradient2End([Math.random(), Math.random()]);
        gradient1Opacity["_value"] = param.theme == "dark" ? 1 : 0.6;
        gradient2Opacity["_value"] = 0;
        Animated.timing(gradient1Opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        Animated.timing(gradient2Opacity, {
          toValue: param.theme == "dark" ? 1 : 0.6,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
      flatListRef.current.scrollToIndex({
        animated: true,
        index: sliderPosition + 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: screenOpacity,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {screenWidth <= 500 && Platform.OS == "web" ? (
          <View style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Animated.View
              style={[styles.gradientContainer, { opacity: gradient1Opacity }]}
            >
              <LinearGradient
                start={gradient1Start}
                end={gradient1End}
                colors={[theme.background, theme.additional]}
                style={styles.gradient}
              ></LinearGradient>
            </Animated.View>

            <Animated.View
              style={[styles.gradientContainer, { opacity: gradient2Opacity }]}
            >
              <LinearGradient
                start={gradient2Start}
                end={gradient2End}
                colors={[theme.background, theme.additional]}
                style={styles.gradient}
              ></LinearGradient>
            </Animated.View>
          </View>
        ) : Platform.OS == "android" ? (
          <View style={{ position: "absolute", width: "100%", height: "100%" }}>
            <LinearGradient
              start={(0, 0)}
              end={[1, 1]}
              colors={[
                theme.background,
                param.theme == "dark"
                  ? theme.additional
                  : theme.additional + "75",
                theme.background,
              ]}
              style={styles.gradient}
            ></LinearGradient>
          </View>
        ) : null}

        <StatusBar style={route.params.theme == "dark" ? "light" : "dark"} />

        <View style={{ flexDirection: "row", width: "100%" }}>
          <FlatList
            style={{ width: "100%" }}
            onScroll={(e) => savePosition(e.nativeEvent.contentOffset.x)}
            horizontal={true}
            ref={flatListRef}
            snapToAlignment="center"
            snapToInterval={Dimensions.get("window").width}
            data={cards}
            scrollEnabled={Platform.OS == "web" ? false : true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  width: screenWidth > 500 ? 500 : screenWidth,
                  alignItems: "center",
                }}
              >
                {screenWidth <= 500 ? (
                  <Image style={styles.image} source={{ uri: item.image }} />
                ) : null}
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* Button */}
        <Text onPress={() => scrollToNext()} style={styles.button}>
          {sliderPosition + 1 == cards.length ? "На главную" : "Далее"}
        </Text>
      </Animated.View>
    </View>
  );
}
