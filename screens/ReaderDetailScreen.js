import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import colors from '../config/colors';
import textStyle from '../config/textStyle';
import BackArrowButton from '../components/BackArrowButton';
import Animated from 'react-native-reanimated';
import AnimatedHeader from '../components/AnimatedHeader';

function ReaderDetailScreen({ navigation, route }) {
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
            <Text style={textStyle.headline4}>{route.params.name}</Text>
            <View style={{ width: 20 }} />
          </>
        }
      />
      <Animated.ScrollView
        style={{ paddingHorizontal: 16 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.container}>
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
            {route.params.name}
          </Text>
          <Text
            style={[
              textStyle.headline3,
              { color: colors.black, paddingBottom: 10 },
            ]}
          >
            Location
          </Text>

          <Text
            style={[
              textStyle.body1,
              {
                color: route.params.location ? colors.black : colors.mediumGrey,
              },
            ]}
          >
            {route.params.location
              ? route.params.location
              : 'No information available.'}
          </Text>
          <Text
            style={[
              textStyle.headline3,
              { color: colors.black, paddingBottom: 10, paddingTop: 32 },
            ]}
          >
            Information
          </Text>
          <Text
            style={[
              textStyle.body1,
              {
                color: route.params.location ? colors.black : colors.mediumGrey,
              },
            ]}
          >
            {route.params.information
              ? route.params.information
              : 'No information available.'}
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 30,
    backgroundColor: colors.white,
  },
});

export default ReaderDetailScreen;
