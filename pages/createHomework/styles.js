import { StyleSheet, StatusBar, Dimensions } from "react-native"

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height - StatusBar.currentHeight,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: StatusBar.currentHeight,
  },

  arrowBar: {
    marginTop: 10,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 35,
    height: 35,
  },

  inputTitle: {
    width: '100%',
    fontSize: 15,
    fontFamily: 'semi',
    textAlign: 'left',
    color: theme.hiddenText,
    marginTop: 20
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: theme.additional,
    width: '100%',
    fontFamily: 'regular',
    color: theme.text,
    fontSize: 18,
    paddingVertical: 5
  },

  button: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: theme.additional,
    color: theme.text2,
    fontSize: 21,
    fontFamily: 'semi',
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 50,
    marginTop: 10,
    padding: 15,
  }

});