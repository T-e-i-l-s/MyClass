import { StatusBar } from 'expo-status-bar'
import { Text, View, Animated, Platform, Dimensions, TouchableHighlight, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styleSheet from './styles'
import React, { useRef, useState } from 'react'
import HomeworkScreen from './homework/page'
import ScheduleScreen from './schedule/page'
import HolidaysScreen from './holidays/page'
import GestureRecognizer from 'react-native-swipe-gestures'

export default function App({navigation, route}) {

  const param = route.params

  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [screen, setScreen] = useState('homework')

  const [navBlockHeight,setBlockHeight] = useState(0)

  const pageOpacity = useRef(
    new Animated.Value(0)
  ).current

  const openHolidays = () => {
    setScreen('holidays')
  }

  const openSchedule = () => {
    setScreen('schedule')
  }

  const openHomework = () => {
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

            <View style={styles.navBar} onLayout={(event) => setBlockHeight(event.nativeEvent.layout.height)}>

              <TouchableHighlight 
              onLongPress={() => {navigation.navigate('PasswordScreen', param)}} 
              underlayColor={'rgba(255, 0, 255,0)'}
              onPress={openHolidays}
              style={styles.navButton}>
                <Image style={styles.navIcon} source={
                  screen == 'holidays' ? 
                  require('../../assets/icons/navigation/holidays1.png') : 
                  require('../../assets/icons/navigation/holidays0.png')
                }/>
              </TouchableHighlight>

              <TouchableHighlight 
              underlayColor={'rgba(255, 0, 255,0)'}
              onPress={openHomework}
              style={styles.navButton}>
                <Image style={styles.navIcon} source={
                  screen == 'homework' ? 
                  require('../../assets/icons/navigation/homework1.png') : 
                  require('../../assets/icons/navigation/homework0.png')
                }/>
              </TouchableHighlight>

              <TouchableHighlight 
              underlayColor={'rgba(255, 0, 255,0)'}
              onPress={openSchedule}
              style={styles.navButton}>
                <Image style={styles.navIcon} source={
                  screen == 'schedule' ? 
                  require('../../assets/icons/navigation/schedule1.png') : 
                  require('../../assets/icons/navigation/schedule0.png')
                }/>
              </TouchableHighlight>

            </View>
            
          </Animated.View>
    
        </SafeAreaView>
    
      </GestureRecognizer>
       
    </View>
  );
}