import Page from './navigate'
import { View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

let flag = false

export default function App() {

  const [fontsLoaded] = useFonts({
    'regular': require('./assets/fonts/onest.ttf'),
    'semi': require('./assets/fonts/onest-semi.ttf'),
  })

  if ( !flag ) {
    flag = true
    setTimeout(() => {
      SplashScreen.hideAsync()
    },700)
  }

  return (
    <View style={{flex:1, width:'100%', height: '100%', backgroundColor: '#14110f'}}>
      {
        fontsLoaded ? (
          <Page/>
        ): null
      }
    </View>
  )
}