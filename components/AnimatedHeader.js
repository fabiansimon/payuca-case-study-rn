import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';

function AnimatedHeader({ content, scrollY, style }) {
  const HEADER_MAX_HEIGHT = 120; // max header height
  const HEADER_MIN_HEIGHT = 60; // min header height
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  // Animated Header Data
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        [styles.stickyHeader, style],
        {
          borderBottomColor: colors.lightGrey,
          borderBottomWidth: 1,
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        },
      ]}
    >
      {content}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
  },
});

export default AnimatedHeader;
