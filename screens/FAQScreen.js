import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

import textStyle from '../config/textStyle';
import BackArrowButton from '../components/BackArrowButton';

function FAQScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackArrowButton
          style={{ paddingTop: 25, paddingBottom: 5 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={textStyle.headline2}>
          How can I change my license plate and be happy about it?
        </Text>
        <Text style={[textStyle.body1, { paddingTop: 40 }]}>
          On March 11, the World Health Organization (WHO) declared the outbreak
          of coronavirus, known as COVID-19, to be a global pandemic. Since
          then, the outbreak has evolved rapidly with governments around the
          world taking swift action to slow the spread of COVID-19.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16 },
});

export default FAQScreen;
