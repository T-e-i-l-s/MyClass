import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Platform,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styleSheet from "./styles";

export default function App({ navigation, route }) {
  const param = route.params;

  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const [inputTitle, setInputTitle] = useState("Пароль"); // Title of bottom input border
  const [underlayColor, setUnderlayColor] = useState(theme.additional); // Color of bottom input border

  const password = param.data.devMode.code; // Current password
  const [includedPassword, setIncludedPassword] = useState("");

  // Password verification function
  const checkPassword = () => {
    if (password == includedPassword) {
      // If password is correct

      // dev mode activation
      let result = param;
      result.data.devMode.active = !result.data.devMode.active;

      /*
      There are two Menu screens in this application
      It's important bacause of the gestures
      On android we use community library called "react-native-swipe-gestures"
      On the web we use "react-native-gesture-handler"
      */

      // Navigation to the correct screen
      navigation.navigate("Menu", result);
      // if (Platform.OS == "web") {
      //   navigation.navigate("MenuWeb", result);
      // } else {
      //   navigation.navigate("MenuAndroid", result);
      // }
    } else {
      // If password is incorrect

      setUnderlayColor("red");
      setInputTitle("Неверный пароль");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={route.params.theme == "dark" ? "light" : "dark"} />

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

      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        multiline={true}
        style={[styles.input, { borderBottomColor: underlayColor }]}
        placeholderTextColor={theme.text}
        cursorColor={theme.additional}
        secureTextEntry={true}
        onChangeText={(password) => {
          setIncludedPassword(password);
          setUnderlayColor(theme.additional);
          setInputTitle("Пароль");
        }}
      />

      <Text style={styles.button} onPress={checkPassword}>
        Войти
      </Text>
    </View>
  );
}
