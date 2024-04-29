/*
There are two Menu screens in this application
It's important bacause of the gestures
On android we use community library called "react-native-swipe-gestures"
On the web we use "react-native-gesture-handler"
*/

import Splash from "./src/pages/splash/page";
import Onboarding from "./src/pages/onboarding/page";
import TabNavigator from "./tabNavigator";
import CreateHomework from "./src/pages/createHomework/page";
import CreateLesson from "./src/pages/createLesson/page";
import PasswordScreen from "./src/pages/passwordScreen/page";
import Archive from "./src/pages/archive/page";
import Login from "./src/pages/login/page";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { PostHogProvider } from "posthog-react-native";

const Stack = createNativeStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <PostHogProvider
        apiKey="phc_dKFNxH621TPVP3J2DDZtzN76T2Ae5cC9WBNU4iUcg78"
        options={{
          host: "https://eu.i.posthog.com",
        }}
      >
        <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="Menu"
            component={TabNavigator}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="Archive"
            component={Archive}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="CreateHomework"
            component={CreateHomework}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="CreateLesson"
            component={CreateLesson}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />

          <Stack.Screen
            name="PasswordScreen"
            component={PasswordScreen}
            options={{
              headerShown: false,
              animation: "none",
              headerMode: "float",
            }}
            initialParams={{}}
          />
        </Stack.Navigator>
      </PostHogProvider>
    </NavigationContainer>
  );
}
