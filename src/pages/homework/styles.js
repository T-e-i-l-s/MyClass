import { StyleSheet, StatusBar } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      paddingTop: StatusBar.currentHeight,
    },

    scrollContainer: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },

    currentDateBlock: {
      width: "95%",
    },

    currentWeekday: {
      fontSize: 23,
      fontFamily: "semi",
      color: theme.text,
      marginTop: 10,
    },

    currentDate: {
      fontSize: 18,
      fontFamily: "regular",
      color: theme.text,
      marginTop: 4,
    },

    archiveButton: {
      width: "95%",
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
    },

    archiveButtonTitle: {
      fontSize: 20,
      fontFamily: "regular",
      color: theme.text2,
    },

    title: {
      width: "95%",
      fontSize: 23,
      fontFamily: "semi",
      color: theme.text,
      marginTop: 10,
    },

    addButton: {
      borderRadius: 30,
      padding: 10,
      backgroundColor: theme.devColor,
      marginVertical: 10,
    },

    plusIcon: {
      width: 20,
      height: 20,
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
  });
