import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../config/colors';
import textStyle from '../config/textStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CustomSnackbar({
  close = true,
  message,
  type,
  twoLine,
  visible,
  onDismiss,
}) {
  const getType = () => {
    switch (type) {
      case 'confirmation':
        return 0;

      case 'error':
        return 1;

      case 'warning':
        return 2;

      case 'premission':
        return 3;

      default:
        return 0;
    }
  };

  const typeInt = getType();

  const backgroundColor = [
    colors.confirmation,
    colors.error,
    colors.warning,
    colors.darkGrey,
  ];

  const icon = ['check-circle', 'alert-circle', 'alert', 'timer-sand'];

  return (
    visible && (
      <SafeAreaView>
        <View
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor[typeInt],
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name={icon[typeInt]}
              size={24}
              color={typeInt == 2 ? colors.black : colors.white}
            />
            <Text
              style={[
                textStyle.body2,
                {
                  paddingLeft: 10,
                  color: typeInt == 2 ? colors.black : colors.white,
                },
              ]}
              numberOfLines={twoLine ? 2 : 1}
            >
              {message}
            </Text>
          </View>

          {close && (
            <TouchableOpacity onPress={onDismiss}>
              <MaterialCommunityIcons
                style={styles.closeIcon}
                name="close"
                size={24}
                color={typeInt == 2 ? colors.black : colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    right: 0,
  },
  container: {
    marginHorizontal: 16,
    paddingHorizontal: 22,
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
});

export default CustomSnackbar;
