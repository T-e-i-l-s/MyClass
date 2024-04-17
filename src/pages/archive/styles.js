import { StyleSheet, StatusBar, Dimensions } from "react-native";

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

    homeworkBlock: {
      width: "100%",
      backgroundColor: theme.main,
      padding: 10,
      marginTop: 10,
      borderRadius: 10,
    },

    editButton: {
      marginRight: 10,
      marginBottom: 4,
    },

    editIcon: {
      width: 27,
      height: 27,
    },

    subject: {
      fontSize: 18,
      fontFamily: "semi",
      color: theme.text,
    },

    task: {
      fontSize: 18,
      fontFamily: "regular",
      color: theme.text,
      marginTop: 4,
    },

    homeworkDate: {
      fontSize: 17,
      fontFamily: "regular",
      color: theme.hiddenText,
      marginTop: 10,
    },

    emptyTitle: {
      fontSize: 18,
      fontFamily: "semi",
      color: theme.text,
      textAlign: "center",
      marginTop: 10,
      paddingBottom: 10,
    },

    button: {
      position: "absolute",
      bottom: 20,
      width: "90%",
      backgroundColor: theme.additional,
      color: theme.text2,
      fontSize: 21,
      fontFamily: "semi",
      textAlign: "center",
      fontWeight: "600",
      borderRadius: 50,
      marginTop: 10,
      padding: 15,
    },
  });
