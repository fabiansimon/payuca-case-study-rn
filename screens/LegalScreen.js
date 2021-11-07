import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import routes from '../navigation/routes';
import textStyle from '../config/textStyle';
import BackArrowButton from '../components/BackArrowButton';
import colors from '../config/colors';
import Animated from 'react-native-reanimated';
import GearButton from '../components/GearButton';

function LegalScreen({ navigation }) {
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
        <BackArrowButton
          style={[styles.backButton]}
          onPress={() => navigation.goBack()}
        />
        <Text style={textStyle.headline4}>Terms & Conditions</Text>
        <GearButton />
      </Animated.View>
      <Animated.ScrollView
        style={{ paddingHorizontal: 16, paddingTop: 20 }}
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
        <Text style={textStyle.headline2}>{'Terms & Conditions'}</Text>
        <Text
          style={[textStyle.headline3, { paddingBottom: 10, paddingTop: 40 }]}
        >
          1. Geltungsbereich
        </Text>
        <Text style={[textStyle.body1]}>
          Die vorliegende Datenschutzerklärung erläutert die Art, den Umfang und
          den Zweck der Erhebung und Verwendung personenbezogener Daten durch
          die PAYUCA GmbH (im Folgenden „PAYUCA“) bei dem Besuch unserer
          Website, der Nutzung unserer Online-Anwendungen, mobilen Plattformen
          und Apps, die einen Link zu dieser Datenschutzerklärung enthalten,
          sowie wie Sie gegebenenfalls die Erfassung solcher Daten unterbinden
          können. Die personenbezogenen Daten werden sorgfältig behandelt und
          gemäß den gesetzlichen Datenschutzbestimmungen erhoben, verarbeitet
          und verwendet, um die Nutzung unserer Website und unser Online-Angebot
          zu optimieren.
        </Text>
        <Text
          style={[textStyle.headline3, { paddingBottom: 10, paddingTop: 40 }]}
        >
          2. Zweck der Datenerhebung und -verwendung
        </Text>
        <Text style={[textStyle.body1]}>
          Die vorliegende Datenschutzerklärung erläutert die Art, den Umfang und
          den Zweck der Erhebung und Verwendung personenbezogener Daten durch
          die PAYUCA GmbH (im Folgenden „PAYUCA“) bei dem Besuch unserer
          Website, der Nutzung unserer Online-Anwendungen, mobilen Plattformen
          und Apps, die einen Link zu dieser Datenschutzerklärung enthalten,
          sowie wie Sie gegebenenfalls die Erfassung solcher Daten unterbinden
          können. Die personenbezogenen Daten werden sorgfältig behandelt und
          gemäß den gesetzlichen Datenschutzbestimmungen erhoben, verarbeitet
          und verwendet, um die Nutzung unserer Website und unser Online-Angebot
          zu optimieren.
        </Text>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 40,
    height: '100%',
  },
  stickyHeader: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    top: 0,
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
  },
});

export default LegalScreen;
