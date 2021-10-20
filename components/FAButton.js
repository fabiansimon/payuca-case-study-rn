import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function FAButton({ icon, onPress, isInactive }) {
  return (
    <TouchableHighlight
      style={[styles.container, { opacity: isInactive ? 0.2 : 1 }]}
      underlayColor={colors.blueActive}
      onPress={onPress}
      disabled={isInactive}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={22} color={colors.white} />
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 48,
    borderRadius: 50,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

export default FAButton;
