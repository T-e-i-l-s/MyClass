import { Text, View, Image, Dimensions, FlatList, Platform } from 'react-native';
import { useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar'
import styleSheet from './styles'


export default function App({navigation, route}) {

  const param = route.params

  const theme = route.params.theme == 'dark' ? require('../../themes/dark.json') : require('../../themes/light.json')
  const styles = styleSheet(theme)

  const flatListRef = useRef() // Flatlist referense
  const [sliderPosition, setSliderPosition] = useState(0) // current card

  const cards = param.data.onboarding.cards


  // Count number of current card function
  const savePosition = (x) => {
    setSliderPosition(Math.round(x / Dimensions.get('window').width))
  }


  // Open next card function
  const scrollToNext = () => {
    if ( sliderPosition+1 == cards.length ) { // If last card has shown
      AsyncStorage.setItem(param.data.onboarding.id, "shown")
      /*
      There are two Menu screens in this application
      It's important bacause of the gestures
      On android we use community library called "react-native-swipe-gestures"
      On the web we use "react-native-gesture-handler"
      */
      if ( Platform.OS =='web' ) {
        navigation.navigate('MenuWeb', param)
      } else {
        navigation.navigate('MenuAndroid', param)
      }
    } else { // If it wasn't last card
      flatListRef.current.scrollToIndex({animated:true, index:sliderPosition+1})
    }
  }


  return (
    <View style={styles.container}>

      <StatusBar style={route.params.theme == 'dark' ? 'light' : 'dark'}/>

      <View style={{flexDirection: 'row', width: '100%'}}>

        <FlatList
        style={{width: '100%'}}
        onScroll={(e) => savePosition(e.nativeEvent.contentOffset.x)}
        horizontal={true}
        ref={flatListRef}
        snapToAlignment='center'
        snapToInterval={Dimensions.get('window').width}
        data={cards}
        scrollEnabled={Platform.OS == 'web' ? false : true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (

          <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
            <Image style={styles.image} source={{uri:item.image}}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          
        )}/>

      </View>

      {/* Button */}
      <Text onPress={() => scrollToNext()} style={styles.button}>
        {sliderPosition+1 == cards.length ? "На главную":"Далее"}
      </Text>
        
    </View>
  )
}