import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import routes from '../navigation/routes';
import textStyle from '../config/textStyle';
import BackArrowButton from '../components/BackArrowButton';

function LegalScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 16,
    height: '100%',
  },
});

export default LegalScreen;
