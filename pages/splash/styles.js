import { StyleSheet } from "react-native"

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    color: theme.additional,
  },
  atributeText: {
    color: theme.text,
    fontFamily: 'semi',
    fontSize: 18,
    marginTop: 10,
  },
});