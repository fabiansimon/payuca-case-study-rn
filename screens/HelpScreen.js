import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';

import colors from '../config/colors';
import textStyle from '../config/textStyle';
import WhiteContainer from '../components/WhiteContainer';
import DetailsLabel from '../components/DetailsLabel';
import routes from '../navigation/routes';
import BackArrowButton from '../components/BackArrowButton';
import AnimatedHeader from '../components/AnimatedHeader';
import Animated from 'react-native-reanimated';

function HelpScreen({ navigation }) {
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
            <Text style={textStyle.headline4}>Hi, how can we help you?</Text>
            <View style={{ width: 10 }} />
          </>
        }
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 16 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <SafeAreaView>
          <BackArrowButton
            style={{ paddingTop: 25, paddingBottom: 5 }}
            onPress={() => navigation.goBack()}
          />
          <Text style={textStyle.headline2}>Hi, how can we help you?</Text>
          <Text
            style={[textStyle.headline4, { paddingTop: 40, paddingBottom: 15 }]}
          >
            Get help
          </Text>
          <WhiteContainer style={{ marginBottom: 10 }}>
            <DetailsLabel
              edit={true}
              icon="email"
              label="Send suggestions or report issues to payuca@support.com"
              lPosition="bottom"
              title="Email us"
            />
            <DetailsLabel
              edit={true}
              icon="face-agent"
              label="24h emergency hotline*"
              lPosition="bottom"
              title="Call us"
            />
          </WhiteContainer>
          <Text
            style={[
              textStyle.subtitle2,
              { color: colors.darkGrey, marginHorizontal: 12 },
            ]}
          >
            *Calls from Austria are free of charge. Calls from Germany cost
            0,19€/min.
          </Text>
          <Text
            style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
          >
            Get help
          </Text>
          <WhiteContainer>
            <DetailsLabel
              edit={true}
              onPress={() => navigation.navigate(routes.FAQ_SCREEN)}
              title="How can I change my license plate and be happy about it?"
              twoLines={true}
            />
            <DetailsLabel
              edit={true}
              onPress={() => navigation.navigate(routes.FAQ_SCREEN)}
              title="How can I change my license plate and be happy about it?"
              twoLines={true}
            />
            <DetailsLabel
              edit={true}
              onPress={() => navigation.navigate(routes.FAQ_SCREEN)}
              title="How can I change my license plate and be happy about it?"
              twoLines={true}
            />
          </WhiteContainer>
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenBackground,
    height: '100%',
    width: '100%',
  },
});

export default HelpScreen;
