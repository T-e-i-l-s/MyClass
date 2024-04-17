import { Animated, Text, View, TouchableHighlight, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import DropDownPicker from "react-native-dropdown-picker";
import styleSheet from "./styles";
import Animation from "../../hooks/animations/Animation";
import firebaseConfig from "../../../keys/firebase.json";
import push from "../../hooks/firebase/push";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = initializeApp(firebaseConfig);

export default function App({ navigation, route }) {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const [pickedValue, setPickedValue] = useState(null);

  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const [items, setItems] = useState(route.params.data.students);

  // Animation values
  const pageOpacity = useRef(new Animated.Value(0)).current;

  // Save user info function
  const saveUser = async () => {
    if (pickedValue) {
      // Push new user to firebase
      await push(db, "MyClass", "Users", pickedValue, {
        registration_date: new Date(),
      });
      await AsyncStorage.setItem("userName", pickedValue);
      route.params["userName"] = pickedValue;
      navigation.navigate("Menu", route.params);
    }
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      Animation(pageOpacity, 1, 500);
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style={route.params.data.theme == "dark" ? "light" : "dark"} />

      {/* Arrow */}
      <View style={styles.arrowBar}>
        <TouchableHighlight
          underlayColor={"rgba(255, 0, 255,0)"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.arrowIcon}
            source={require("../../../assets/icons/arrow.png")}
          />
        </TouchableHighlight>
      </View>

      <DropDownPicker
        open={isDropDownOpened}
        value={pickedValue}
        items={items.list}
        setOpen={setIsDropDownOpened}
        setValue={setPickedValue}
        setItems={setItems}
        style={{
          backgroundColor: theme.main,
          borderWidth: 1,
          borderColor: theme.border,
        }}
        containerStyle={{ width: "95%", borderRadius: 10 }}
        textStyle={{ color: theme.text, fontFamily: "regular", fontSize: 18 }}
        dropDownContainerStyle={{
          backgroundColor: theme.main,
          borderWidth: 1,
          borderColor: theme.border,
        }}
        maxHeight={300}
        placeholder="Выбери свое имя"
        theme={route.params.theme.toUpperCase()}
      />

      <Text
        style={[
          styles.button,
          {
            backgroundColor: !pickedValue
              ? theme.additional2
              : theme.additional,
          },
        ]}
        onPress={() => saveUser()}
      >
        Сохранить
      </Text>
    </View>
  );
}
