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

  const compareDates = (hw1, hw2) => {
    const date1 = hw1.date
    const date2 = hw2.date
    const homeworkDate1 = date1.split('.')
    const homeworkDate2 = date2.split('.')
    const unixTime1 = new Date(
      parseInt(homeworkDate1[2]), 
      parseInt(homeworkDate1[1] - 1), 
      parseInt(homeworkDate1[0]))
    const unixTime2 = new Date(
      parseInt(homeworkDate2[2]), 
      parseInt(homeworkDate2[1] - 1), 
      parseInt(homeworkDate2[0]))

    if (unixTime1 > unixTime2 || unixTime1 == 'Invalid Date' || unixTime2 == 'Date') {
      return -1
    } else if (unixTime1 == unixTime2) {
      return 0
    } else {
      return 1
    }
  }

  const getData = async () => {
    let data = {}
    const homework = await get(db, "MyClass", "Homework")
    const schedule = await get(db, "MyClass", "Timetable")
    const onboarding = await get(db, "MyClass", "Onboarding")
    const holidays = await get(db, "MyClass", "Holidays")
    const devMode = await get(db, "MyClass", "DevMode")
    data["homework"] = homework
    data["homework"].tasks = (data["homework"].tasks).sort(compareDates)
    data["schedule"] = schedule
    data["onboarding"] = onboarding
    const onbooardingStatus = await AsyncStorage.getItem(onboarding.id)
    data["holidays"] = holidays
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