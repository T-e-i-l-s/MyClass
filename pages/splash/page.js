import { Text, View, ActivityIndicator, Platform } from 'react-native';
import styleSheet from './styles'
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appConfig from '../../app.json'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../../keys/firebase.json'
import get from '../../firebase/get'

const db = initializeApp(firebaseConfig);

export default function App({navigation}) {
  
  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))
  const [isLoaded, setIsLoaded] = useState(false)

  const getData = async () => {
    let data = {}
    const homework = await get(db, "MyClass", "Homework")
    const schedule = await get(db, "MyClass", "Timetable")
    const onboarding = await get(db, "MyClass", "Onboarding")
    const devMode = await get(db, "MyClass", "DevMode")
    data["homework"] = homework
    data["schedule"] = schedule
    data["onboarding"] = onboarding
    const onbooardingStatus = await AsyncStorage.getItem(onboarding.id)
    data["devMode"] = {code: devMode.pinCode, active: false}
    if ( devMode.currentVersion != appConfig.expo.version) {
      data["onboarding"] = {
        cards: [
          {image: 'https://cdn-icons-png.flaticon.com/512/9028/9028936.png', title: 'Доступна новая версия', text: 'Приложение обновилось, скачайте новую версию'}
        ],
        id: "-1"
      }
      navigation.navigate('Onboarding', {"data":data})
    } else if ( onboarding['isRevealed'] && onbooardingStatus != 'shown') {
      navigation.navigate('Onboarding', {"data":data})
    } else {
      if ( Platform.OS =='web' ) {
        navigation.navigate('MenuWeb', {"data":data})
      } else {
        navigation.navigate('MenuAndroid', {"data":data})
      }
    }
  }

  if (!isLoaded) {
    getData()
    setIsLoaded(true)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <ActivityIndicator size={Platform.OS == 'web' ? 'large' : "big"} color={styles.indicator.color}/>
      <Text style={styles.atributeText}>Загружаюсь...</Text>
    </View>
  );
}