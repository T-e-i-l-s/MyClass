import { StyleSheet, Dimensions } from "react-native";

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

    image: {
      width: "75%",
      height: Dimensions.get("window").width * 0.75,
      resizeMode: "cover",
    },

    title: {
      width: "70%",
      color: theme.text,
      textAlign: "center",
      fontSize: 22,
      fontFamily: "semi",
      fontWeight: "600",
      marginTop: 10,
    },

    text: {
      width: "70%",
      color: theme.text,
      fontFamily: "regular",
      textAlign: "center",
      fontSize: 19,
      marginTop: 5,
    },

    button: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      color: theme.text2,
      fontSize: 21,
      fontFamily: "semi",
      textAlign: "center",
      padding: 30,
    },
  });
