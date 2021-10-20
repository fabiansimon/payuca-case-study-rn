import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

import colors from '../config/colors';
import textStyle from '../config/textStyle';

function ParkingSpaceTile({ level, number, onPress }) {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 10,
      }}
    >
      <TouchableHighlight
        style={{ margin: 4, borderRadius: 10 }}
        underlayColor={colors.textFieldBackground}
        onPress={onPress}
      >
        <View style={styles.container}>
          <View>
            <Text style={[textStyle.subtitle2, { color: colors.darkGrey }]}>
              Number
            </Text>
            <Text style={[textStyle.headline2, { color: colors.black }]}>
              {number}
            </Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={[textStyle.subtitle2, { color: colors.darkGrey }]}>
              Level
            </Text>
            <Text style={[textStyle.headline2, { color: colors.black }]}>
              {level}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: '100%',
    marginHorizontal: 20,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGrey,
  },
  container: {
    padding: 12,
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ParkingSpaceTile;
