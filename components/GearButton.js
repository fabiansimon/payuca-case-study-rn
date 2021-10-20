import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function GearButton({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        style={style}
        name="cog"
        size={24}
        color={colors.black}
      />
    </TouchableOpacity>
  );
}

export default GearButton;
