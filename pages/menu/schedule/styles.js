import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "flex-start",
    },

    daysRow: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
    },

    day: {
      alignItems: "center",
      justifyContent: "center",
      color: theme.text,
      fontSize: 18,
      fontFamily: "semi",
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 10,
    },

    emptyTitle: {
      fontSize: 18,
      fontFamily: "semi",
      color: theme.text,
      textAlign: "center",
      marginTop: 10,
    },

    lessonBlock: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: theme.main,
      borderRadius: 10,
    },

    indexBlock: {
      width: "10%",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      fontSize: 18,
      borderRightWidth: 2,
      borderRightColor: theme.border,
    },

    index: {
      fontSize: 18,
      textAlign: "center",
      fontFamily: "semi",
      color: theme.text,
    },

    subject: {
      width: "90%",
      padding: 10,
      fontSize: 18,
      fontFamily: "regular",
      fontWeight: "500",
      color: theme.text,
    },

    editButton: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },

    editIcon: {
      width: 27,
      height: 27,
    },

    addButton: {
      alignItems: "center",
      borderRadius: 30,
      padding: 10,
      backgroundColor: theme.devColor,
    },

    plusIcon: {
      width: 20,
      height: 20,
    },
  });
