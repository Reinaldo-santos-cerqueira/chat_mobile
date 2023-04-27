import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/pages/login';
import { Register } from './src/pages/register';
import { SetAvatar } from './src/pages/setAvatar';
import { Contacts } from './src/pages/contacts';
import { Message } from './src/pages/message';
import { AuthContext } from './src/context/ContextApi';
import { useState } from 'react';
import * as Notifications from 'expo-notifications';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [borderState, setBorderState] = useState(false)
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true
    })
  })
  return (
    <AuthContext.Provider
      value={{borderState, setBorderState}}
    >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetAvatar"
          component={SetAvatar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
