import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import styleSheet from "./styles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../keys/firebase.json";
import push from "../../firebase/push";
import CompareDates from "../../Hooks//HandlingDates/Compare";

const db = initializeApp(firebaseConfig);

export default function App({ navigation, route }) {
  const param = route.params;

  const theme =
    route.params.data.theme == "dark"
      ? require("../../themes/dark.json")
      : require("../../themes/light.json");
  const styles = styleSheet(theme);

  const [subject, setSubject] = useState(param.source.subject);
  const [homework, setHomework] = useState(param.source.homework);
  const [date, setDate] = useState(param.source.date);

  // Data updating function
  const saveData = () => {
    // Updating homework list
    let tasks = param.data.data.homework.tasks;
    if (param.edit) {
      tasks[param.source.id] = {
        subject: subject,
        homework: homework,
        date: date,
      };
    } else {
      tasks.unshift({ subject: subject, homework: homework, date: date });
    }
    tasks.sort(CompareDates);

    // Saving updates
    let result = param.data;
    result.data.homework.tasks = tasks;

    // Push updated homework list to firebase
    push(db, "MyClass", "Homework", "tasks", tasks);

    // Navigationg to correct screen
    if (Platform.OS == "web") {
      navigation.navigate("MenuWeb", result);
    } else {
      navigation.navigate("MenuAndroid", result);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={route.params.data.theme == "dark" ? "light" : "dark"} />

      <ScrollView style={{ width: "95%" }} showsVerticalScrollIndicator={false}>
        {/* Arrow */}
        <View style={styles.arrowBar}>
          <TouchableHighlight
            underlayColor={"rgba(255, 0, 255,0)"}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.arrowIcon}
              source={require("../../assets/icons/arrow.png")}
            />
          </TouchableHighlight>
        </View>

        {/* Subject input */}
        <Text style={styles.inputTitle}>Предмет</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholderTextColor={theme.text}
          cursorColor={theme.additional}
          onChangeText={(e) => setSubject(e)}
          defaultValue={subject}
        />

        {/* Task input */}
        <Text style={styles.inputTitle}>Задание</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholderTextColor={theme.text}
          cursorColor={theme.additional}
          onChangeText={(e) => setHomework(e)}
          defaultValue={homework}
        />

        {/* Date input */}
        <Text style={styles.inputTitle}>Дата</Text>
        <TextInput
          multiline={true}
          style={[styles.input, { marginBottom: 200 }]}
          placeholderTextColor={theme.text}
          cursorColor={theme.additional}
          onChangeText={(e) => setDate(e)}
          defaultValue={date}
        />
      </ScrollView>

      {/* Save button */}
      <Text style={styles.button} onPress={saveData}>
        Сохранить
      </Text>
    </View>
  );
}
