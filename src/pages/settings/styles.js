import { StyleSheet, StatusBar } from "react-native";

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
    },

    title: {
      width: "95%",
      fontSize: 23,
      fontFamily: "semi",
      color: theme.text,
      marginTop: 10,
    },

    authBlock: {
      width: "95%",
      alignItems: "flex-start",
      backgroundColor: theme.additional,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },

    authTitle: {
      fontSize: 18,
      fontFamily: "semi",
      color: theme.text2,
      textAlign: "left",
    },

    authText: {
      fontSize: 18,
      fontFamily: "regular",
      color: theme.text2,
      textAlign: "left",
      marginTop: 5,
    },

    authButton: {
      fontSize: 18,
      fontFamily: "regular",
      color: "#14110f",
      textAlign: "center",
      backgroundColor: "#E7E7E7",
      padding: 5,
      borderRadius: 10,
      marginTop: 5,
    },

    settingBlock: {
      flexDirection: "row",
      alignItems: "space-between",
      width: "95%",
      backgroundColor: theme.main,
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
    },

    settingTitle: {
      width: "50%",
      fontSize: 18,
      fontFamily: "semi",
      color: theme.text,
      textAlign: "left",
    },

    settingStatus: {
      width: "50%",
      fontSize: 18,
      fontFamily: "regular",
      color: theme.additional,
      textAlign: "right",
    },
  });
};
