import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import textStyle from '../config/textStyle';
import PrimaryButton from './PrimaryButton';
import { ActivityIndicator } from 'react-native-paper';

function ReaderTile({
  divider = true,
  isLoading = false,
  isOpen = false,
  onSeeDetails,
  permission = true,
  position = 'single',
  title,
  onPress,
}) {
  return (
    <View
      style={[
        styles.container,
        {
          borderTopWidth:
            (divider && position == 'bottom') || (position == 'center' && 0.5),
          borderBottomWidth:
            (divider && position == 'top') || (position == 'center' && 0.5),
          borderTopLeftRadius:
            position == 'top' || position == 'single' ? 10 : 0,
          borderTopRightRadius:
            position == 'top' || position == 'single' ? 10 : 0,
          borderBottomLeftRadius:
            position == 'bottom' || position == 'single' ? 10 : 0,
          borderBottomRightRadius:
            position == 'bottom' || position == 'single' ? 10 : 0,
          opacity: !permission ? 0.2 : 1,
        },
      ]}
    >
      <View style={{ justifyContent: 'space-around' }}>
        <Text style={[textStyle.headline4, { color: colors.black }]}>
          {title}
        </Text>
        <TouchableOpacity onPress={onSeeDetails}>
          <Text style={[textStyle.body2, { color: colors.blue }]}>
            See details
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          style={{ paddingRight: 22 }}
          size={34}
          color={colors.blue}
        />
      ) : (
        <>
          {isOpen ? (
            <MaterialCommunityIcons
              style={{ alignSelf: 'center', paddingRight: 13 }}
              name="check-circle"
              size={35}
              color={colors.confirmation}
            />
          ) : (
            <PrimaryButton title="Open" onPress={onPress} />
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
    height: 76,
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
});

export default ReaderTile;
