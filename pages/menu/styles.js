import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native"

export default (theme) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.background,
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },

  navBar: {
    flexDirection: 'row',
    width: '100%',
  },

  navButton: {
    width: '50%',
    fontSize: 18,
    fontFamily: 'regular',
    textAlign: 'center',
    padding: 10
  },

  navIndicatorRow: {
    flexDirection: 'row',
    width: '100%',
  },
  
  navIndicator: {
    alignItems: 'center',
    width: '50%',
    paddingHorizontal:'5%',
    height: 2,
    gradientColors: [
      theme.background, 
      theme.additional, 
      theme.background
    ]
  },

  mainArea: { 
    width: '100%',
  }

})
