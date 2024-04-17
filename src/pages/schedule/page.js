import {
  Animated,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native";
import styleSheet from "./styles";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../../keys/firebase.json";
import push from "../../hooks/firebase/push";
import Animation from "../../hooks/animations/Animation";

const db = initializeApp(firebaseConfig);

export default function App({ route }) {
  const param = route.params;

  const navigation = useNavigation();

  const theme =
    param.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const [styles, setStyles] = useState(styleSheet(theme));

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [day, setDay] = useState(
    new Date().getDay() == 0 ? 1 : new Date().getDay()
  );
  const [dayName, setDayName] = useState(days[day - 1]);

  const schedule = param.data.schedule;
  const devMode = param.data.devMode.active;

  const [currentSchedule, setCurrentSchedule] = useState(
    schedule[days[day - 1]]
  );

  const [reloadFlatList, setReloadFlatList] = useState(0); // Flatlist extra data

  const всякаяДичь = ["Дичь1", "Дичь2", "Дичь3"];

  const scheduleOpacity = useRef(new Animated.Value(1)).current;

  // Change current schedule
  const changeDay = (num) => {
    if (num == day) {
      return;
    }
    setDay(num);
    setDayName(days[num - 1]);
    const duration = 150;
    Animation(scheduleOpacity, 0, duration);
    setTimeout(() => {
      setCurrentSchedule(schedule[days[num - 1]]);
      Animation(scheduleOpacity, 1, duration);
    }, duration);
  };

  // Delete lesson function
  const deleteData = (ind) => {
    let timetable = currentSchedule;
    timetable.splice(ind, 1);
    setCurrentSchedule(timetable);
    setReloadFlatList(reloadFlatList + 1);
    let result = param.data;
    result.schedule[dayName] = timetable;
    push(db, "MyClass", "Timetable", dayName, currentSchedule);
  };

  return (
    <View style={styles.container}>
      {/* Days list */}
      <View style={styles.daysRow}>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
          horizontal={true}
          data={["пн", "вт", "ср", "чт", "пт", "сб"]}
          renderItem={({ item, index }) => (
            <View onStartShouldSetResponder={() => changeDay(index + 1)}>
              <Text
                style={[
                  styles.day,
                  {
                    backgroundColor:
                      index + 1 == day ? theme.additional : theme.main,
                    color: day - 1 == index ? theme.text2 : theme.text,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Current schedule */}
      <Animated.View
        style={{ width: "95%", opacity: scheduleOpacity, alignItems: "center" }}
      >
        {/* Empty page warning */}
        {currentSchedule.length == 0 && !devMode ? (
          <View style={{ width: "60%" }}>
            <Text style={styles.emptyTitle}>Здесь пока пусто</Text>
          </View>
        ) : null}

        {/* Lessons list */}
        <FlatList
          extraData={reloadFlatList}
          style={{ width: "100%" }}
          data={currentSchedule}
          renderItem={({ item, index }) => (
            <View style={[styles.lessonBlock, { marginBottom: 10 }]}>
              {/* Index */}
              <View style={styles.indexBlock}>
                <Text style={styles.index}>{index + 1}</Text>
              </View>

              {/* Subject name */}
              <Text
                style={[styles.subject, { width: devMode ? "70%" : "90%" }]}
              >
                {item}
              </Text>

              {/* DevMode buttons */}
              {devMode ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: "20%",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Edit  button */}
                  <TouchableHighlight
                    underlayColor={"rgba(255, 0, 255,0)"}
                    style={styles.editButton}
                    onPress={() =>
                      navigation.navigate("CreateLesson", {
                        data: param.data,
                        edit: true,
                        source: { id: index, subject: item, day: dayName },
                        theme: param.theme,
                      })
                    }
                  >
                    <Image
                      style={styles.editIcon}
                      source={require("../../../assets/icons/edit.png")}
                    />
                  </TouchableHighlight>
                  {/* Delete button */}
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
            </View>
          )}
        />

        {/* Add button */}
        {devMode ? (
          <TouchableHighlight
            underlayColor={"rgba(255, 0, 255,0)"}
            style={styles.addButton}
            onPress={() =>
              navigation.navigate("CreateLesson", {
                data: param.data,
                edit: false,
                source: { id: "", subject: "", day: dayName },
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
      </Animated.View>
    </View>
  );
}
