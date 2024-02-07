
/*
There are two Menu screens in this application
It's important bacause of the gestures
On android we use community library called "react-native-swipe-gestures"
On the web we use "react-native-gesture-handler"
*/

import Splash from './pages/splash/page'
import Onboarding from './pages/onboarding/page'
import MenuAndroid from './pages/menu/pageAndroid'
import MenuWeb from './pages/menu/pageWeb'
import CreateHomework from './pages/createHomework/page'
import CreateLesson from './pages/createLesson/page'
import PasswordScreen from './pages/passwordScreen/page'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function Navigate () {
  return (
    <NavigationContainer>
      
      <Stack.Navigator>

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="MenuAndroid"
          component={MenuAndroid}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="MenuWeb"
          component={MenuWeb}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="CreateHomework"
          component={CreateHomework}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="CreateLesson"
          component={CreateLesson}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="PasswordScreen"
          component={PasswordScreen}
          options={{
            headerShown: false, 
            animation: 'none', 
            headerMode: 'float'
          }}
          initialParams={{}}
        />

      </Stack.Navigator>

    </NavigationContainer>
  )
}
