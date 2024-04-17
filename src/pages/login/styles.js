import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: Dimensions.get("window").height - StatusBar.currentHeight,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
    },

    arrowBar: {
      width: "95%",
      position: "absolute",
      top: Platform.OS == "web" ? 10 : StatusBar.currentHeight + 10,
      alignItems: "flex-start",
      justifyContent: "center",
    },

    arrowIcon: {
      width: 35,
      height: 35,
    },

    title: {
      width: "95%",
      fontSize: 23,
      fontFamily: "semi",
      color: theme.text,
      marginTop: 10,
    },

    button: {
      position: "absolute",
      bottom: 20,
      width: "95%",
      backgroundColor: theme.additional,
      color: theme.text2,
      fontSize: 21,
      fontFamily: "semi",
      textAlign: "center",
      borderRadius: 50,
      marginTop: 10,
      padding: 15,
    },
  });
