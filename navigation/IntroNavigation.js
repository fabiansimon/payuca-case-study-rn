import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigator from './AppNavigator';
import EmailNavigator from './EmailNavigator';
import routes from './routes';

const Stack = createNativeStackNavigator();

const IntroNavigation = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={routes.EMAIL_NAVIGATOR} component={EmailNavigator} />
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default IntroNavigation;
