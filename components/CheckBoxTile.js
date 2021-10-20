import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import textStyle from '../config/textStyle';

function CheckBoxTile({ interactiveString, onPress, enabled = true, style }) {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableHighlight
        underlayColor={colors.lightBlue}
        onPress={() => setSelection(!isSelected)}
      >
        <View style={isSelected ? styles.activeBox : styles.inactiveBox}>
          <MaterialCommunityIcons name="check" size={20} color="white" />
        </View>
      </TouchableHighlight>
      <Text
        style={[textStyle.body2, { color: colors.darkGrey, paddingLeft: 16 }]}
      >
        I have read and accept the{' '}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[textStyle.body2, { color: colors.blue }]}>
          {interactiveString}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  activeBox: {
    backgroundColor: colors.blue,
    borderRadius: 3,
    height: 20,
    width: 20,
  },
  inactiveBox: {
    borderColor: colors.darkGrey,
    borderRadius: 3,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
});

export default CheckBoxTile;
