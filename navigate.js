import Splash from './pages/splash/page' // Splash page
import Onboarding from './pages/onboarding/page' // Splash page
import MenuWeb from './pages/menu/pageWeb' // Splash page
import MenuAndroid from './pages/menu/pageAndroid' // Splash page
import CreateHomework from './pages/createHomework/page' // Splash page
import CreateLesson from './pages/createLesson/page' // Splash page
import PasswordScreen from './pages/passwordScreen/page' // Splash page

import { createNativeStackNavigator } from '@react-navigation/native-stack' // Stack navigator library
import { NavigationContainer } from '@react-navigation/native' // Native navigator library

const Stack = createNativeStackNavigator() // Running navigator

// Handling navigate requests
export default function Navigate () {
  // Navigation structure
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Splash screen */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        {/* Onboard screen */}
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        {/* Main menu */}
        <Stack.Screen
          name="MenuAndroid"
          component={MenuAndroid}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        <Stack.Screen
          name="MenuWeb"
          component={MenuWeb}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        {/* Create homework screen */}
        <Stack.Screen
          name="CreateHomework"
          component={CreateHomework}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        {/* Create homework screen */}
        <Stack.Screen
          name="CreateLesson"
          component={CreateLesson}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
        {/* Create homework screen */}
        <Stack.Screen
          name="PasswordScreen"
          component={PasswordScreen}
          options={{headerShown: false, animation: 'none', headerMode: 'float'}}
          initialParams={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
