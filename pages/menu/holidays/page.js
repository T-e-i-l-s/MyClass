import { Text, View, FlatList } from 'react-native';
import styleSheet from './styles'
import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function App(route) {

  const navigation = useNavigation()

  const dates = route.data.data.holidays.dates

  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]

  const [theme, setTheme] = useState(
    route.data.theme == 'dark' ? require('../../../themes/dark.json') : require('../../../themes/light.json')
  )
  const [styles, setStyles] = useState(styleSheet(theme))

  return (
    <View style={styles.container}>
      
      <View style={{width: '95%', height: '100%'}}>
        <FlatList
        ItemSeparatorComponent={
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{
              width: 3,
              height: 15,
              backgroundColor: theme.additional,
              borderRadius: 10
            }}/>
          </View>
        }
        style={{width: '100%'}}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={dates}
        renderItem={({item, index}) => (
          <View style={[styles.block, {marginTop: index == 0 ? 10 : 5}]}>
            <View style={styles.dateBlock}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.month}>{months[item.month-1]}</Text>
            </View>
            <View style={styles.separator}/>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}/>
      </View>

    </View>
  );
}