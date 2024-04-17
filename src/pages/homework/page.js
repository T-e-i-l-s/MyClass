import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform,
  ScrollView,
  Linking,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { LinearGradient } from "expo-linear-gradient";
import firebaseConfig from "../../../keys/firebase.json";
import push from "../../hooks/firebase/push";
import styleSheet from "./styles";
import GetProximity from "../../hooks/handlingDates/GetProximity";
import DateToString from "../../hooks/handlingDates/DateToString";
import GetCurrentWeekday from "../../hooks/handlingDates/GetCurrentWeekday";
import GetCurrentDate from "../../hooks/handlingDates/GetCurrentDate";

const db = initializeApp(firebaseConfig);

export default function App({ route }) {
  const param = route.params;

  const navigation = useNavigation();

  const [homework, setHomework] = useState(param.data.homework.tasks);

  const devMode = param.data.devMode.active; // dev mode status

  const theme =
    param.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const [reloadFlatList, setReloadFlatList] = useState(0);

  // Delete task function
  const deleteData = (ind) => {
    let tasks = homework;
    tasks.splice(ind, 1);
    setHomework(tasks);
    setReloadFlatList(reloadFlatList + 1);
    let result = param.data;
    result.homework.tasks = homework;
    push(db, "MyClass", "Homework", "tasks", tasks);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Current date block */}
        <View style={styles.currentDateBlock}>
          <Text style={styles.currentWeekday}>{GetCurrentWeekday()}</Text>
          <Text style={styles.currentDate}>{GetCurrentDate()}</Text>
        </View>

        {/* Archive */}
        <LinearGradient
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 0.8 }}
          colors={["#6721ec", "#B85CDF"]}
          style={styles.archiveButton}
          onStartShouldSetResponder={() =>
            navigation.navigate("Archive", route.params)
          }
        >
          <Text style={styles.archiveButtonTitle}>Архив заданий</Text>
        </LinearGradient>

        {/* Archive */}
        {/* <LinearGradient
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 0.8 }}
          colors={["#6721ec", "#5C90DF"]}
          style={styles.archiveButton}
        >
          <Text style={styles.archiveButtonTitle}>Сравни ответы β</Text>
        </LinearGradient> */}

        {/* Archive */}
        <LinearGradient
          start={{ x: 0, y: 0.3 }}
          end={{ x: 1, y: 0.8 }}
          colors={["#6721ec", "#5CC9DF"]}
          style={styles.archiveButton}
          onStartShouldSetResponder={() =>
            Linking.openURL(
              "https://forms.yandex.com/u/65d7672e43f74f933aecbeff/"
            )
          }
        >
          <Text style={styles.archiveButtonTitle}>Сообщить об ошибке</Text>
        </LinearGradient>

        {/* Part title */}
        <Text style={styles.title}>Задания</Text>

        {/* Add new homework button */}
        {devMode ? (
          <TouchableHighlight
            underlayColor={"rgba(255, 0, 255,0)"}
            style={styles.addButton}
            onPress={() =>
              navigation.navigate("CreateHomework", {
                data: param.data,
                edit: false,
                source: { id: "", subject: "", homework: "", date: "" },
                theme: param.theme,
              })
            }
          >
            <Image
              style={styles.plusIcon}
              source={require("../../../assets/icons/plus.png")}
            />
          </TouchableHighlight>
        ) : null}

        {/* Empty page warning */}
        {homework.length == 0 && !devMode ? (
          <View
            style={{
              width: "60%",
              height: "100%",
              justifyContent: "center",
              marginTop: Platform.OS == "android" ? 0 : 10,
            }}
          >
            <Text style={styles.emptyTitle}>Здесь пока пусто</Text>
          </View>
        ) : null}

        <FlatList
          scrollEnabled={false}
          style={{ width: "95%" }}
          extraData={reloadFlatList}
          data={homework}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return GetProximity(item.date) >= 0 ? (
              <View>
                {/* Date indicator */}
                {index == 0 || item.date != homework[index - 1].date ? (
                  <Text
                    style={[
                      styles.homeworkDate,
                      { marginTop: index == 0 && devMode ? 0 : 10 },
                    ]}
                  >
                    На {DateToString(item.date)}
                  </Text>
                ) : null}

                {/* Task block */}
                <View
                  style={[
                    styles.homeworkBlock,
                    { marginBottom: index == homework.length - 1 ? 10 : 0 },
                  ]}
                >
                  {/* Dev buttons */}
                  {devMode ? (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableHighlight
                        underlayColor={"rgba(255, 0, 255,0)"}
                        style={styles.editButton}
                        onPress={() =>
                          navigation.navigate("CreateHomework", {
                            data: param.data,
                            edit: true,
                            source: {
                              id: index,
                              subject: item.subject,
                              homework: item.homework,
                              date: item.date,
                            },
                            theme: param.theme,
                          })
                        }
                      >
                        <Image
                          style={styles.editIcon}
                          source={require("../../../assets/icons/edit.png")}
                        />
                      </TouchableHighlight>

                      <TouchableHighlight
                        underlayColor={"rgba(255, 0, 255,0)"}
                        style={styles.editButton}
                        onPress={() => deleteData(index)}
                      >
                        <Image
                          style={styles.editIcon}
                          source={require("../../../assets/icons/delete.png")}
                        />
                      </TouchableHighlight>
                    </View>
                  ) : null}

                  {/* Task */}
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.task}>{item.homework}</Text>
                </View>
              </View>
            ) : null;
          }}
        />
      </ScrollView>
    </View>
  );
}
