import { Text, View, TextInput, TouchableHighlight, Image, ScrollView } from 'react-native'
import styleSheet from './styles'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../../keys/firebase.json'
import push from '../../firebase/push'

const db = initializeApp(firebaseConfig);

export default function App({navigation, route}) {
  
  const param = route.params
  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [subject, setSubject] = useState(param.source.subject)

  const saveData = () => {
    let timetable = param.data.data.schedule[param.source.day]
    if ( param.edit ) {
      timetable[param.source.id] = subject
    } else {
      timetable.push(subject)
    }
    let result = param.data
    result.data.schedule[param.source.day] = timetable
    push(db, 'MyClass', 'Timetable', param.source.day, timetable)
    if ( Platform.OS =='web' ) {
      navigation.navigate('MenuWeb', result)
    } else {
      navigation.navigate('MenuAndroid', result)
    }
  }

  return (
    <View style={styles.container}>

      <StatusBar style='auto'/>

      <View style={styles.arrowBar}>
        <TouchableHighlight 
        underlayColor={'rgba(255, 0, 255,0)'}
        onPress={() => {
          if ( Platform.OS =='web' ) {
            navigation.navigate('MenuWeb', param.data)
          } else {
            navigation.navigate('MenuAndroid', param.data)
          }
        }}>
          <Image style={styles.arrowIcon} source={require('../../assets/icons/arrow.png')}/>
        </TouchableHighlight>
      </View>

      <Text style={styles.inputTitle}>Урок</Text>
      <TextInput
      multiline={true}
      style={styles.input}
      placeholderTextColor={theme.text}
      cursorColor={theme.additional}
      onChangeText={(e) => setSubject(e)}
      defaultValue={subject}/>
      
      <Text style={styles.button} onPress={saveData}>Сохранить</Text>

    </View>
  );
}