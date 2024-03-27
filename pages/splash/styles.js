import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    indicator: {
      width: 50,
      height: 50,
      color: theme.additional,
    },
    atributeText: {
      color: theme.text,
      fontFamily: "semi",
      fontSize: 18,
      marginTop: 10,
    },
  });
