import { StyleSheet, Dimensions } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
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
      bottom: 20,
      width: "75%",
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
