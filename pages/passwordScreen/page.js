import { Text, View, TextInput, TouchableHighlight, Image, Platform } from 'react-native'
import styleSheet from './styles'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

export default function App({navigation, route}) {
  
  const param = route.params
  const [theme, setTheme] = useState(require('../../themes/dark.json'))
  const [styles, setStyles] = useState(styleSheet(theme))

  const [underlayColor, setUnderlayColor] = useState(theme.additional)
  const [inputTitle, setInputTitle] = useState("Пароль")

  const password = param.data.devMode.code
  const [inclusedPassword, setIncludedPassword] = useState("")

  const checkPassword = () => {
    if ( password == inclusedPassword ) {
      let result = param
      result.data.devMode.active = !result.data.devMode.active
      if ( Platform.OS =='web' ) {
        navigation.navigate('MenuWeb', result)
      } else {
        navigation.navigate('MenuAndroid', result)
      }
    } else {
      setUnderlayColor('red')
      setInputTitle('Неверный пароль')
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
            navigation.navigate('MenuWeb', param)
          } else {
            navigation.navigate('MenuAndroid', param)
          }
        }}>
          <Image style={styles.arrowIcon} source={require('../../assets/icons/arrow.png')}/>
        </TouchableHighlight>
      </View>

      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
      multiline={true}
      style={[styles.input, {borderBottomColor: underlayColor}]}
      placeholderTextColor={theme.text}
      cursorColor={theme.additional}
      onChangeText={(e) => {
        setIncludedPassword(e)
        setUnderlayColor(theme.additional)
        setInputTitle('Пароль')
      }}/>
      
      <Text style={styles.button} onPress={checkPassword}>Войти</Text>

    </View>
  );
}