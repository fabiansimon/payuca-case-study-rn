import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import textStyle from '../config/textStyle';

function DetailsLabel({
  edit = false,
  icon,
  label,
  lPosition = 'top',
  title,
  twoLines = false,
  onPress = () => console.log('tapped'),
}) {
  return (
    <TouchableHighlight
      disabled={!edit}
      style={{ margin: 4, borderRadius: 10 }}
      underlayColor={colors.textFieldBackground}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && (
            <MaterialCommunityIcons
              style={{ paddingRight: 20 }}
              name={icon}
              size={24}
              color={colors.blue}
            />
          )}

          <View style={{ flex: 1 }}>
            {lPosition == 'bottom' ? (
              <View>
                <Text style={[textStyle.headline4, { color: colors.black }]}>
                  {title}
                </Text>
                {label && (
                  <Text
                    style={[textStyle.subtitle2, { color: colors.darkGrey }]}
                  >
                    {label}
                  </Text>
                )}
              </View>
            ) : (
              <View>
                {label && (
                  <Text
                    style={[textStyle.subtitle2, { color: colors.darkGrey }]}
                  >
                    {label}
                  </Text>
                )}
                <Text
                  numberOfLines={twoLines ? 2 : 1}
                  style={[textStyle.headline4, { color: colors.black }]}
                >
                  {title}
                </Text>
              </View>
            )}
          </View>
          {edit && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={colors.mediumGrey}
            />
          )}
        </View>
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

export default DetailsLabel;
