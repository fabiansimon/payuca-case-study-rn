import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './routes';
import LegalScreen from '../screens/LegalScreen';
import EmailScreen from '../screens/EmailScreen';

const Stack = createNativeStackNavigator();

const EmailNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.EMAIL_SCREEN} component={EmailScreen} />
      <Stack.Screen name={routes.LEGAL_SCREEN} component={LegalScreen} />
    </Stack.Navigator>
  );
};

export default EmailNavigator;
