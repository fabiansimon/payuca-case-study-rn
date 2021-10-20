import React from 'react';
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import textStyle from '../config/textStyle';

function ActionButton({ action, title }) {
  return (
    <TouchableHighlight
      style={{ margin: 4, borderRadius: 10 }}
      underlayColor={colors.textFieldBackground}
      onPress={() => console.log('tapped')}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            style={{ paddingRight: 20 }}
            name={action == 'leave' ? 'exit-to-app' : 'plus'}
            size={24}
            color={action == 'leave' ? colors.error : colors.blue}
          />
          <Text
            style={[
              textStyle.headline4,
              { color: action == 'leave' ? colors.error : colors.blue },
            ]}
          >
            {title}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={colors.mediumGrey}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    minHeight: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ActionButton;
