import React, { useRef } from 'react';
import { Text } from 'react-native-paper';
import textStyle from '../config/textStyle';
import { View, StyleSheet, ScrollView } from 'react-native';

import colors from '../config/colors';
import WhiteContainer from '../components/WhiteContainer';
import DetailsLabel from '../components/DetailsLabel';
import ActionButton from '../components/ActionButton';
import routes from '../navigation/routes';
import Animated from 'react-native-reanimated';

function ProfileScreen({ navigation }) {
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
    <>
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
        <Text style={textStyle.headline4}>Profile</Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        style={{ backgroundColor: colors.screenBackground }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={textStyle.headline2}>Profile</Text>
          {/* Wrong headline in Figma? */}
          <Text
            style={[textStyle.headline4, { paddingTop: 40, paddingBottom: 15 }]}
          >
            Personal details
          </Text>
          <WhiteContainer>
            <DetailsLabel icon="account" label="Name" title="John Smith" />
            <DetailsLabel icon="email" label="Email" title="js@personal.com" />
            <DetailsLabel
              icon="phone"
              label="Phone Number"
              title="+43 664 186 5358"
            />
          </WhiteContainer>
          <Text
            style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
          >
            License plate
          </Text>
          <WhiteContainer>
            <DetailsLabel edit={true} icon="car" title="W123123" />
          </WhiteContainer>
          <Text
            style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
          >
            {'Help & Support'}
          </Text>

          <WhiteContainer>
            <DetailsLabel
              edit={true}
              icon="help-circle"
              onPress={() => navigation.navigate(routes.HELP_SCREEN)}
              title="Help Center"
            />
            <DetailsLabel
              edit={true}
              icon="shield-search"
              title="Privacy Policy"
            />
            <DetailsLabel
              edit={true}
              icon="text-box-check"
              // onPress={() => navigation.navigate(routes.LEGAL_SCREEN)}
              title={'Terms & Conditions'}
            />
          </WhiteContainer>
          <WhiteContainer style={{ marginTop: 20 }}>
            <ActionButton action="leave" title="Log out" />
          </WhiteContainer>
          <Text
            style={[
              textStyle.subtitle1,
              {
                paddingTop: 33,
                color: colors.mediumGrey,
                alignSelf: 'center',
                paddingBottom: 20,
              },
            ]}
          >
            Version 10.00.1
          </Text>
        </View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenBackground,
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 80,
  },
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

export default ProfileScreen;
