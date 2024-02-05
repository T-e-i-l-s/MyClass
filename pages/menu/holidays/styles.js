import { StyleSheet } from "react-native"

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  block: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.main,
    borderRadius: 10,
    marginVertical: 5
  },

  dateBlock: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  separator: {
    width: 2,
    height: '100%',
    backgroundColor: theme.border
  },  

  day: {
    width: '100%',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'semi',
    color: theme.text,
  },

  month: {
    width: '100%',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'regular',
    color: theme.text,
  },

  title: {
    width: '70%',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'semi',
    color: theme.text,
    padding: 20,
  },
});