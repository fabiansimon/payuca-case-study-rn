import React, { useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import BackArrowButton from '../components/BackArrowButton';
import colors from '../config/colors';
import textStyle from '../config/textStyle';
import DetailsLabel from '../components/DetailsLabel';
import Animated from 'react-native-reanimated';
import WhiteContainer from '../components/WhiteContainer';
import AnimatedHeader from '../components/AnimatedHeader';
import GearButton from '../components/GearButton';

function DetailScreen({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollY={scrollY}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
        content={
          <>
            <BackArrowButton onPress={() => navigation.goBack()} />
            <Text style={textStyle.headline4}>Detail</Text>
            <View style={{ width: 30 }} />
          </>
        }
      />
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
