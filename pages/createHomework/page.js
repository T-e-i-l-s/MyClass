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
  const [homework, setHomework] = useState(param.source.homework)
  const [date, setDate] = useState(param.source.date)

  const saveData = () => {
    let tasks = param.data.data.homework.tasks
    if ( param.edit ) {
      tasks[param.source.id] = {subject: subject, homework: homework, date: date}
    } else {
      tasks.unshift({subject: subject, homework: homework, date: date})
    }
    let result = param.data
    result.data.homework.tasks = tasks
    push(db, 'MyClass', 'Homework', 'tasks', tasks)
    if ( Platform.OS =='web' ) {
      navigation.navigate('MenuWeb', result)
    } else {
      navigation.navigate('MenuAndroid', result)
    }
  }

  return (
    <View style={styles.container}>

      <StatusBar style='auto'/>
      
      <ScrollView style={{width: '90%'}} showsVerticalScrollIndicator={false}>

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

        <Text style={styles.inputTitle}>Предмет</Text>
        <TextInput
        multiline={true}
        style={styles.input}
        placeholderTextColor={theme.text}
        cursorColor={theme.additional}
        onChangeText={(e) => setSubject(e)}
        defaultValue={subject}/>

        <Text style={styles.inputTitle}>Задание</Text>
        <TextInput
        multiline={true}
        style={styles.input}
        placeholderTextColor={theme.text}
        cursorColor={theme.additional}
        onChangeText={(e) => setHomework(e)}
        defaultValue={homework}/>

        <Text style={styles.inputTitle}>Дата</Text>
        <TextInput
        multiline={true}
        style={[styles.input,{marginBottom:200}]}
        placeholderTextColor={theme.text}
        cursorColor={theme.additional}
        onChangeText={(e) => setDate(e)}
        defaultValue={date}/>
      
      </ScrollView>

      <Text style={styles.button} onPress={saveData}>Сохранить</Text>

    </View>
  );
}