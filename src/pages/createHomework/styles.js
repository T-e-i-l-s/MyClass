import { StyleSheet, StatusBar, Dimensions } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: Dimensions.get("window").height - StatusBar.currentHeight,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: StatusBar.currentHeight,
    },

    arrowBar: {
      marginTop: 10,
      width: "95%",
      alignItems: "flex-start",
      justifyContent: "center",
    },

    arrowIcon: {
      width: 35,
      height: 35,
    },

    inputTitle: {
      width: "100%",
      fontSize: 15,
      fontFamily: "semi",
      textAlign: "left",
      color: theme.hiddenText,
      marginTop: 20,
    },

    input: {
      width: "100%",
      fontSize: 18,
      color: theme.text,
      fontFamily: "regular",
      textAlign: "left",
      fontWeight: "500",
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: theme.additional,
      outlineStyle: "none",
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
