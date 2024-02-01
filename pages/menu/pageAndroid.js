import { StatusBar } from 'expo-status-bar'
import { Text, View, Animated, Platform, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styleSheet from './styles'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import HomeworkScreen from './homework/page'
import ScheduleScreen from './schedule/page'
import HolidaysScreen from './holidays/page'
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App({navigation, route}) {

  const param = route.params

  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [screen, setScreen] = useState('homework')

  const [leftTitleColor, setLeftTitleColor] = useState(theme.hiddenText)
  const [centerTitleColor, setCenterTitleColor] = useState(theme.text)
  const [rightTitleColor, setRightTitleColor] = useState(theme.hiddenText)

  const [navBlockHeight,setBlockHeight] = useState(0)

  const pageOpacity = useRef(
    new Animated.Value(0)
  ).current
  const leftNavIndicatorOpacity = useRef(
    new Animated.Value(0)
  ).current
  const centerNavIndicatorOpacity = useRef(
    new Animated.Value(1)
  ).current
  const rightNavIndicatorOpacity = useRef(
    new Animated.Value(0)
  ).current

  const openHolidays = () => {
    Animated.timing(leftNavIndicatorOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(rightNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(centerNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    setLeftTitleColor(theme.text)
    setRightTitleColor(theme.hiddenText)
    setCenterTitleColor(theme.hiddenText)
    setScreen('holidays')
  }

  const openSchedule = () => {
    Animated.timing(leftNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(rightNavIndicatorOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(centerNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    setLeftTitleColor(theme.hiddenText)
    setRightTitleColor(theme.text)
    setCenterTitleColor(theme.hiddenText)
    setScreen('schedule')
  }

  const openHomework = () => {
    Animated.timing(leftNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(rightNavIndicatorOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    Animated.timing(centerNavIndicatorOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
    setLeftTitleColor(theme.hiddenText)
    setRightTitleColor(theme.hiddenText)
    setCenterTitleColor(theme.text)
    setScreen('homework')
  }

  const swipeRight = () => {
    if ( screen == 'schedule' ) {
      openHomework()
    } else if ( screen == 'homework' ) {
      openHolidays()
    }
  }

  const swipeLeft = () => {
    if ( screen == 'holidays' ) {
      openHomework()
    } else if ( screen == 'homework' ) {
      openSchedule()
    }
  }
  
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      Animated.timing(pageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
    })
    return focusHandler
  }, [navigation])

  
  const config = {
    gestureIsClickThreshold: 45,
    directionalOffsetThreshold: 45
  };

  return (
    <View style={styles.container}>

      <GestureRecognizer
      style={{width: '100%', height: '100%'}}
      config={config}
      onSwipeLeft={() => swipeLeft()}
      onSwipeRight={() => swipeRight()}>
    
        <SafeAreaView style={{width: '100%', backgroundColor: theme.background}}>
    
          <StatusBar style='auto'/>
    
          <Animated.View style={{opacity: pageOpacity, width: '100%', height: '100%'}}>
    
            <View style={styles.navBar} onLayout={(event) => setBlockHeight(event.nativeEvent.layout.height)}>
              <Text 
              // onLongPress={() => {navigation.navigate('PasswordScreen', param)}} 
              onPress={openHolidays} 
              style={[styles.navButton,{color:leftTitleColor}]}>
                Праздники
              </Text>
              <Text 
              onLongPress={() => {navigation.navigate('PasswordScreen', param)}} 
              onPress={openHomework} 
              style={[styles.navButton,{color:centerTitleColor}]}>
                Задания
              </Text>
              <Text 
              onLongPress={() => AsyncStorage.clear()} 
              onPress={openSchedule} 
              style={[styles.navButton,{color:rightTitleColor}]}>
                Расписание
              </Text>
            </View>
    
            <View style={styles.navIndicatorRow}>
             
              <Animated.View style={
                [styles.navIndicator, 
                {opacity: leftNavIndicatorOpacity}]
              }>
                <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                colors={styles.navIndicator.gradientColors} 
                style={{
                  height: '100%',
                  width: '100%'
                }}/>
              </Animated.View>
    
              <Animated.View style={
                [styles.navIndicator, 
                {opacity: centerNavIndicatorOpacity}]
              }>
                <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                colors={styles.navIndicator.gradientColors} 
                style={{
                  height: '100%',
                  width: '100%'
                }}/>
              </Animated.View>
    
              <Animated.View style={
                [styles.navIndicator, 
                {opacity: rightNavIndicatorOpacity}]
              }>
                <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                colors={styles.navIndicator.gradientColors} 
                style={{
                  height: '100%',
                  width: '100%'
                }}/>
              </Animated.View>
    
            </View>
    
            <View 
            style={[
              styles.mainArea,
              {
                height: Platform.OS == 'android' ? Dimensions.get('window').height - navBlockHeight - 2 : 'auto'
              }
            ]}>
    
                {
                  screen == 'homework' ? (
                    <HomeworkScreen data={param}/>
                  ) : screen == 'holidays' ? (
                    <HolidaysScreen data={param}/>
                  ) : (
                    <ScheduleScreen data={param}/>
                  )
                }
    
            </View>
            
          </Animated.View>
    
        </SafeAreaView>
    
      </GestureRecognizer>
       
    </View>
  );
}