import { Text, View, Image, Dimensions, FlatList, Platform } from 'react-native';
import { useRef, useState } from 'react'
import styleSheet from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation, route}) {

  const param = route.params

  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const flatListRef = useRef()
  const [sliderPosition, setSliderPosition] = useState(0)

  const cards = param.data.onboarding.cards

  const savePosition = (e) => {
    setSliderPosition(Math.round(e / Dimensions.get('window').width))
  }

  return (
    <View style={styles.container}>
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
      <Text 
      onPress={() => {
        if ( sliderPosition+1 == cards.length ) {
          AsyncStorage.setItem(param.data.onboarding.id, "shown")
          if ( Platform.OS =='web' ) {
            navigation.navigate('MenuWeb', param)
          } else {
            navigation.navigate('MenuAndroid', param)
          }
        } else {
          flatListRef.current.scrollToIndex({animated:true, index:sliderPosition+1})
        }
      }}  
      style={styles.button}>
        {sliderPosition+1 == cards.length ? "На главную":"Далее"}
      </Text>
    </View>
  );
}