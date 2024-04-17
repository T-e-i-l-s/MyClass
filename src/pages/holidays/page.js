import { Text, View, FlatList, ScrollView, Dimensions } from "react-native";
import styleSheet from "./styles";
import GetCurrentWeekday from "../../hooks/handlingDates/GetCurrentWeekday";
import GetCurrentDate from "../../hooks/handlingDates/GetCurrentDate";

export default function App({ navigation, route }) {
  const param = route.params;

  const dates = param.data.holidays.dates;

  const dateNow = new Date();

  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const theme =
    param.theme == "dark"
      ? require("../../../themes/dark.json")
      : require("../../../themes/light.json");
  const styles = styleSheet(theme);

  const separator = (
    <View
      style={{
        width: Dimensions.get("window").width * 0.95,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 3,
          height: 15,
          backgroundColor: theme.additional,
          borderRadius: 10,
        }}
      />
    </View>
  );

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
        {/* Current date block */}
        <View style={styles.currentDateBlock}>
          <Text style={styles.currentWeekday}>{GetCurrentWeekday()}</Text>
          <Text
            style={styles.currentDate}
            onPress={() => {
              navigation.navigate("PasswordScreen", param);
            }}
          >
            {GetCurrentDate()}
          </Text>
        </View>

        {/* List of the holidays */}
        <FlatList
          ItemSeparatorComponent={separator}
          style={{ width: "95%", paddingBottom: 10 }}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={dates}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.block,
                {
                  marginTop: index == 0 ? 10 : 5,
                  backgroundColor:
                    index == 0 &&
                    item.day == dateNow.getDate() &&
                    item.month == dateNow.getMonth() + 1
                      ? theme.additional
                      : index == 0
                      ? theme.additional2
                      : theme.main,
                },
              ]}
            >
              {/* Date block */}
              <View style={styles.dateBlock}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.month}>{months[item.month - 1]}</Text>
              </View>
              {/* Vertical line */}
              <View style={styles.separator} />
              {/* Title */}
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
