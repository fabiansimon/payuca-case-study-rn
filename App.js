import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GarageScreen from './screens/GarageScreen';

import navigationTheme from './navigation/navigationTheme';
import IntroNavigation from './navigation/IntroNavigation';

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <IntroNavigation />
    </NavigationContainer>
    // <GarageScreen />
  );
}
