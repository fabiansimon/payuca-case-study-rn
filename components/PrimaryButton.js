import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import textStyle from '../config/textStyle';

function PrimaryButton({ icon, title, onPress, isInactive }) {
  return (
    <TouchableHighlight
      style={[styles.container, { opacity: isInactive ? 0.2 : 1 }]}
      underlayColor={colors.blueActive}
      onPress={onPress}
      disabled={isInactive}
    >
      <>
        {icon && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size={20}
            color={colors.white}
          />
        )}

        <Text style={[textStyle.headline4, { color: colors.white }]}>
          {title}
        </Text>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  icon: {
    paddingRight: 10,
    color: colors.white,
  },
});

export default PrimaryButton;
