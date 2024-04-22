import { StyleSheet, Linking, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import strings from "../values/strings.json";

export default function reportError({ theme }) {
  const styles = createStyles(theme);
  return (
    <LinearGradient
      start={{ x: 0, y: 0.3 }}
      end={{ x: 1, y: 0.8 }}
      colors={["#6721ec", "#5CC9DF"]}
      style={styles.button}
      onStartShouldSetResponder={() => Linking.openURL(strings.reportError)}
    >
      <Text style={styles.buttonTitle}>Сообщить об ошибке</Text>
    </LinearGradient>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    button: {
      width: "95%",
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
    },

    buttonTitle: {
      fontSize: 20,
      fontFamily: "regular",
      color: theme.text2,
    },
  });
}
