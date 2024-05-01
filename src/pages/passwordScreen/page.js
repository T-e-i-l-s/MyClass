import { Text, View, TextInput, TouchableHighlight, Image } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styleSheet from "./styles";
import logEvent from "../../hooks/analytics/logEvent";

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

      logEvent("correct password");

      navigation.navigate("Menu", result);
    } else {
      // If password is incorrect
      logEvent("incorrect password");
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
