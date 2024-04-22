import {
  Animated,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import styleSheet from "./styles";
import GetProximity from "../../hooks/handlingDates/GetProximity";
import Animation from "../../hooks/animations/Animation";

export default function App({ navigation, route }) {
  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const homework = route.params.data.homework.tasks;

  // Animation values
  const pageOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      Animation(pageOpacity, 1, 500);
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style={route.params.data.theme == "dark" ? "light" : "dark"} />

      <Animated.ScrollView
        style={{ flex: 1, width: "100%", opacity: pageOpacity }}
        contentContainerStyle={{ width: "100%", alignItems: "center" }}
      >
        {/* Arrow */}
        <View style={styles.arrowBar}>
          <TouchableHighlight
            underlayColor={"rgba(255, 0, 255,0)"}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.arrowIcon}
              source={require("../../../assets/icons/arrow.png")}
            />
          </TouchableHighlight>
        </View>

        <Text style={styles.title}>Архив</Text>

        <FlatList
          scrollEnabled={Platform.OS == "web" ? true : false}
          style={{ width: "95%" }}
          data={homework}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return GetProximity(item.date) < 0 ? (
              <View>
                {/* Date indicator */}
                {index == 0 || item.date != homework[index - 1].date ? (
                  <Text style={[styles.homeworkDate]}>На {item.date}</Text>
                ) : null}

                {/* Task block */}
                <View
                  style={[
                    styles.homeworkBlock,
                    { marginBottom: index == homework.length - 1 ? 10 : 0 },
                  ]}
                >
                  {/* Task */}
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.task}>{item.homework}</Text>
                </View>
              </View>
            ) : null;
          }}
        />
      </Animated.ScrollView>
    </View>
  );
}
