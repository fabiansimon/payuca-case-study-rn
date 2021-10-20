import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';

function WhiteContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});
export default WhiteContainer;
