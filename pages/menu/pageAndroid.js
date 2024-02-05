import { StatusBar } from 'expo-status-bar'
import { View, Animated, Platform, Dimensions, TouchableHighlight, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styleSheet from './styles'
import React, { useRef, useState } from 'react'
import HomeworkScreen from './homework/page'
import ScheduleScreen from './schedule/page'
import HolidaysScreen from './holidays/page'
import GestureRecognizer from 'react-native-swipe-gestures'

let count = 0;
export default function App({navigation, route}) {

  const param = route.params

  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [screen, setScreen] = useState('homework')

  const [touchStartX, setTouchStartX] = useState()
  const [touchStartY, setTouchStartY] = useState()

  const [navBlockHeight,setBlockHeight] = useState(0)

  const pageOpacity = useRef(
    new Animated.Value(0)
  ).current

  const defaultIconSide = 1
  const currentIconSide = 1.15
  const iconAnimationDuration = 100
  const icon1Side = useRef(
    new Animated.Value(defaultIconSide)
  ).current
  const icon2Side = useRef(
    new Animated.Value(currentIconSide)
  ).current
  const icon3Side = useRef(
    new Animated.Value(defaultIconSide)
  ).current


  const openHolidays = () => {
    Animated.timing(icon1Side, {
      toValue: currentIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon3Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon2Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    setScreen('holidays')
  }

  const openSchedule = () => {
    Animated.timing(icon3Side, {
      toValue: currentIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon1Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon2Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    setScreen('schedule')
  }

  const openHomework = () => {
    Animated.timing(icon2Side, {
      toValue: currentIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon1Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(icon3Side, {
      toValue: defaultIconSide,
      duration: iconAnimationDuration,
      useNativeDriver: true
    }).start()
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

  const handleTouch = (event) => {
    const touchEndX = event.nativeEvent.locationX
    const touchEndY = event.nativeEvent.locationY
    if (Math.abs(touchEndY-touchStartY) < 70 && Math.abs(touchEndX-touchStartX) > 10) {
      if (touchEndX < touchStartX) {
        swipeLeft()
      } else {
        swipeRight()
      }
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
    gestureIsClickThreshold: 15,
    directionalOffsetThreshold: 15
  };

  return (
    <View style={styles.container}>

      <GestureRecognizer
      onTouchStart={(event) => {
        setTouchStartX(event.nativeEvent.locationX)
        setTouchStartY(event.nativeEvent.locationY)
      }}
      onTouchEnd={(event) => handleTouch(event)}
      style={{width: '100%', height: '100%'}}
      config={config}
      // onSwipeLeft={() => swipeLeft()}
      // onSwipeRight={() => swipeRight()}
      >
    
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
                <Animated.Image style={[styles.navIcon,{transform:[{scale:icon1Side}]}]} source={
                  screen == 'holidays' ? 
                  require('../../assets/icons/navigation/holidays1.png') : 
                  require('../../assets/icons/navigation/holidays0.png')
                }/>
              </TouchableHighlight>

              <TouchableHighlight 
              underlayColor={'rgba(255, 0, 255,0)'}
              onPress={openHomework}
              style={styles.navButton}>
                <Animated.Image style={[styles.navIcon,{transform:[{scale:icon2Side}]}]} source={
                  screen == 'homework' ? 
                  require('../../assets/icons/navigation/homework1.png') : 
                  require('../../assets/icons/navigation/homework0.png')
                }/>
              </TouchableHighlight>

              <TouchableHighlight 
              underlayColor={'rgba(255, 0, 255,0)'}
              onPress={openSchedule}
              style={styles.navButton}>
                <Animated.Image style={[styles.navIcon,{transform:[{scale:icon3Side}]}]} source={
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