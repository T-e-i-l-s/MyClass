import Page from './navigate'
import { View, StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { vexo } from 'vexo-analytics'
vexo('04e43c32-9288-4a2a-af12-27eef87ac681')

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
    },600)
  }

  return (
    <View style={{flex:1, width:'100%', height: '100%', backgroundColor: '#14110f'}}>
      <StatusBar style='auto'/>
      {
        fontsLoaded ? (
          <Page/>
        ): null
      }
    </View>
  )
}