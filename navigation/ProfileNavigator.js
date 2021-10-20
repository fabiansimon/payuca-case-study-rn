import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HelpScreen from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FAQScreen from '../screens/FAQScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={routes.HELP_SCREEN} component={HelpScreen} />
      <Stack.Screen name={routes.FAQ_SCREEN} component={FAQScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
