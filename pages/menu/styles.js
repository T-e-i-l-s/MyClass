import { StyleSheet } from "react-native";

export default (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      height: "100%",
      // alignItems: 'center',
      // justifyContent: 'flex-start'
    },

    topBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "95%",
    },

    themeButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },

    themeIcon: {
      width: 30,
      height: 30,
    },

    navBar: {
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
    },

    navButton: {
      width: "25%",
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
    },

    navIcon: {
      width: 30,
      height: 30,
    },

    mainArea: {
      width: "100%",
    },
  });
};
