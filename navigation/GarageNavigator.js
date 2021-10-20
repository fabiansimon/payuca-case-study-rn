import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './routes';
import DetailScreen from '../screens/DetailScreen';
import ReaderDetailScreen from '../screens/ReaderDetailScreen';
import GarageScreen from '../screens/GarageScreen';

const Stack = createNativeStackNavigator();

const GarageNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.GARAGE_SCREEN} component={GarageScreen} />
      <Stack.Screen name={routes.DETAIL_SCREEN} component={DetailScreen} />
      <Stack.Screen
        name={routes.READER_SCREEN}
        component={ReaderDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default GarageNavigator;
