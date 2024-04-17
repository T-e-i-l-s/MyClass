import { View, ScrollView, Text, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styleSheet from "./styles";
import changeTheme from "../../hooks/handlingData/ChangeTheme";

export default function App({ route }) {
  const param = route.params;

  const navigation = useNavigation();

  const theme =
    param.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Настройки</Text>

        {param.data.userName == undefined ? (
          <LinearGradient
            start={{ x: 0, y: 0.6 }}
            end={{ x: 1, y: 0.8 }}
            colors={["#6721ec", "#8345EF", "#9768E9"]}
            style={styles.authBlock}
          >
            <Text style={styles.authTitle}>Введи свои данные</Text>
            <Text style={styles.authText}>
              Это поможет расширить функционал приложения в будущем
            </Text>
            <Text
              style={styles.authButton}
              onPress={() => navigation.navigate("Login", route.params)}
            >
              Ввести
            </Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            start={{ x: 0, y: 0.6 }}
            end={{ x: 1, y: 0.8 }}
            colors={["#6721ec", "#8345EF", "#9768E9"]}
            style={styles.authBlock}
          >
            <Text style={styles.authTitle}>{param.data.userName}</Text>
          </LinearGradient>
        )}

        <View
          style={styles.settingBlock}
          onStartShouldSetResponder={() => {
            changeTheme(navigation, param.theme);
          }}
        >
          <Text style={styles.settingTitle}>Тема</Text>
          <Text style={styles.settingStatus}>
            {param.theme == "dark" ? "Темная" : "Светлая"}
          </Text>
        </View>

        <View
          style={styles.settingBlock}
          onStartShouldSetResponder={() => {
            Linking.openURL(
              "https://forms.yandex.com/u/65d7672e43f74f933aecbeff/"
            );
          }}
        >
          <Text style={[styles.settingTitle, { width: "100%" }]}>
            Сообщить об ошибке
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
