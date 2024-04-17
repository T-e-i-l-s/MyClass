import { View, Platform, Dimensions } from "react-native";
import React from "react";
import HomeworkScreen from "./homework/page";
import ScheduleScreen from "./schedule/page";
import HolidaysScreen from "./holidays/page";
import SettingsScreen from "./settings/page";

export default function ({
  route,
  styles,
  screen,
  navBlockHeight,
  changeTheme,
}) {
  const param = route.params;

  return (
    <View>
      {/* <View 
      style={styles.topBar}
      onStartShouldSetResponder={() => changeTheme()}>
        <TouchableHighlight 
        onPress={() => changeTheme()} 
        underlayColor={'rgba(255, 0, 255,0)'}
        style={styles.themeButton}>
          <Animated.Image style={styles.themeIcon} source={
            param.theme == 'dark' ? 
            require('../../assets/icons/dark.png') :
            require('../../assets/icons/light.png')
          }/>
        </TouchableHighlight>
      </View>   */}

      <View
        style={[
          styles.mainArea,
          {
            height:
              Platform.OS == "android"
                ? Dimensions.get("window").height - navBlockHeight - 2
                : "auto",
          },
        ]}
      >
        {screen == "homework" ? (
          <HomeworkScreen data={param} />
        ) : screen == "holidays" ? (
          <HolidaysScreen data={param} />
        ) : screen == "schedule" ? (
          <ScheduleScreen data={param} />
        ) : (
          <SettingsScreen data={param} />
        )}
      </View>
    </View>
  );
}
