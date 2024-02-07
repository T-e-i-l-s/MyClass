import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native"

export default (theme) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.background,
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '95%',
  },

  themeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  themeIcon: {
    width: 30,
    height: 30,
  },

  navBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  navButton: {
    width: '33.3333333%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },

  navIcon: {
    width: 30,
    height: 30,
  },

  mainArea: { 
    width: '100%',
  }

})
