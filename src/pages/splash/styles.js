import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },

    gradient: {
      width: "100%",
      height: "100%",
    },

    gradientContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },

    indicator: {
      width: 50,
      height: 50,
      color: theme.text2,
    },

    atributeText: {
      color: theme.text2,
      fontFamily: "semi",
      fontSize: 18,
      marginTop: 10,
    },
  });
