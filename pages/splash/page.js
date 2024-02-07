import { Text, View, ActivityIndicator, Platform } from 'react-native'
import styleSheet from './styles'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import appConfig from '../../app.json'
import loadData from '../../Hooks/loadData' // Data loading function


export default function App({navigation}) {
  
  const defaultTheme = require('../../themes/dark.json')
  const [styles, setStyles] = useState(styleSheet(defaultTheme))
  

  const getData = async () => {
    // Updating color theme
    const currentThemeName = await AsyncStorage.getItem('theme')
    if (currentThemeName == 'light') {
      setStyles(styleSheet(require('../../themes/light.json')))
    } else {
      setStyles(styleSheet(require('../../themes/dark.json')))
    }

    // Loading data
    let data = await loadData()

    // Has current onboarding shown or hasn't
    const onbooardingStatus = await AsyncStorage.getItem(data.onboarding.id)

    // Navigating to the correct screen
    if ( data.devMode.currentVersion != appConfig.expo.version) { // If version is outdated

      // Navigating to onboarding screen with warning "Доступна новая версия"
      data["onboarding"] = {
        cards: [
          {
            image: 'https://cdn-icons-png.flaticon.com/512/9028/9028936.png', 
            title: 'Доступна новая версия', 
            text: 'Приложение обновилось, скачайте новую версию'
          }
        ],
        id: "-1"
      }
      navigation.navigate('Onboarding', {"data":data, 'theme': currentThemeName})

    } else if ( onboarding['isRevealed'] && onbooardingStatus != 'shown') { // If current onboarding hasn't shown

      navigation.navigate('Onboarding', {"data":data, 'theme': currentThemeName})

    } else {

      /*
      There are two Menu screens in this application
      It's important bacause of the gestures
      On android we use community library called "react-native-swipe-gestures"
      On the web we use "react-native-gesture-handler"
      */

      if ( Platform.OS =='web' ) {
        navigation.navigate('MenuWeb', {"data":data, 'theme': themeName})
      } else {
        navigation.navigate('MenuAndroid', {"data":data, 'theme': themeName})
      }

    }
  }


  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      // When the page is displayed
      getData()
    })
    return focusHandler
  }, [navigation])


  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <ActivityIndicator size={Platform.OS == 'web' ? 'large' : "big"} color={styles.indicator.color}/>
      <Text style={styles.atributeText}>Загружаюсь...</Text>
    </View>
  )
  
}