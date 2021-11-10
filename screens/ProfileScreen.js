import React, { useRef } from 'react';
import { Text } from 'react-native-paper';
import textStyle from '../config/textStyle';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';

import colors from '../config/colors';
import WhiteContainer from '../components/WhiteContainer';
import DetailsLabel from '../components/DetailsLabel';
import ActionButton from '../components/ActionButton';
import routes from '../navigation/routes';
import AnimatedHeader from '../components/AnimatedHeader';
import GearButton from '../components/GearButton';

function ProfileScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  return (
    <>
      <AnimatedHeader
        scrollY={scrollY}
        content={<Text style={textStyle.headline4}>Profile</Text>}
      />

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
});

export default ProfileScreen;
