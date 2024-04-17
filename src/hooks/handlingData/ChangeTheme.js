
/*
Change theme
This function switches the theme

Input:
1) navigation - navigation object
2) currentTheme - current theme('dark' or 'light')
*/

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function (navigation, currentTheme) {

  if (currentTheme == 'dark') {
    AsyncStorage.setItem('theme', 'light').then(() => {
      navigation.navigate('Splash')
    })
  } else {
    AsyncStorage.setItem('theme', 'dark').then(() => {
      navigation.navigate('Splash')
    })
  }

}