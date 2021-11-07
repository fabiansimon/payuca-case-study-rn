import React, { useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import BackArrowButton from '../components/BackArrowButton';
import colors from '../config/colors';
import textStyle from '../config/textStyle';
import DetailsLabel from '../components/DetailsLabel';
import Animated from 'react-native-reanimated';
import WhiteContainer from '../components/WhiteContainer';

function DetailScreen({ navigation, route }) {
  const HEADER_MAX_HEIGHT = 120; // max header height
  const HEADER_MIN_HEIGHT = 60; // min header height
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

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
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            borderBottomColor: colors.lightGrey,
            borderBottomWidth: 1,
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        <BackArrowButton onPress={() => navigation.goBack()} />
        <Text style={textStyle.headline4}>Details</Text>
        <View width={25} />
      </Animated.View>
      <Animated.ScrollView
        style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingTop: 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <BackArrowButton
          style={{ paddingTop: 25, paddingBottom: 5 }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            textStyle.headline2,
            { color: colors.black, paddingBottom: 40 },
          ]}
        >
          Details
        </Text>
        <Text
          style={[
            textStyle.headline3,
            { color: colors.black, paddingBottom: 15 },
          ]}
        >
          Garage details
        </Text>
        <WhiteContainer>
          <DetailsLabel
            icon="garage"
            label="Name"
            title={route.params.title}
            twoLines={true}
          />
          <DetailsLabel
            icon="pin"
            label="Address"
            title={route.params.address}
          />
        </WhiteContainer>
        <Text
          style={[
            textStyle.headline3,
            { color: colors.black, paddingTop: 30, paddingBottom: 15 },
          ]}
        >
          Garage details
        </Text>
        <WhiteContainer>
          <DetailsLabel
            icon="calendar-today"
            label="Valid from"
            title={route.params.validTimes.from}
            lPosition="top"
          />
          <DetailsLabel
            icon="calendar"
            label="Valid until"
            title={route.params.validTimes.until}
            lPosition="top"
          />
        </WhiteContainer>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 30,
    backgroundColor: colors.screenBackground,
  },
  stickyHeader: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    zIndex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    top: 0,
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
  },
});

export default DetailScreen;
