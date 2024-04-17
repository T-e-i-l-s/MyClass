import { Text, View, TextInput, TouchableHighlight, Image } from "react-native";
import styleSheet from "./styles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../keys/firebase.json";
import push from "../../hooks/firebase/push";

const db = initializeApp(firebaseConfig);

export default function App({ navigation, route }) {
  const param = route.params;

  const theme =
    route.params.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const [subject, setSubject] = useState(param.source.subject);

  // Data updating function
  const saveData = () => {
    // Updating timetable
    let timetable = param.data.schedule[param.source.day];
    if (param.edit) {
      timetable[param.source.id] = subject;
    } else {
      timetable.push(subject);
    }

    // Saving updates
    let result = param.data;
    result.schedule[param.source.day] = timetable;

    // Push updated homework list to firebase
    push(db, "MyClass", "Timetable", param.source.day, timetable);

    navigation.navigate("Menu", result);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={route.params.theme == "dark" ? "light" : "dark"} />

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

      {/* Lesson input */}
      <Text style={styles.inputTitle}>Урок</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholderTextColor={theme.text}
        cursorColor={theme.additional}
        onChangeText={(e) => setSubject(e)}
        defaultValue={subject}
      />

      {/* Save button */}
      <Text style={styles.button} onPress={saveData}>
        Сохранить
      </Text>
    </View>
  );
}
