import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import colors from '../config/colors';
import PrimaryButton from '../components/PrimaryButton';
import textStyle from '../config/textStyle';
import routes from '../navigation/routes';

const size = Dimensions.get('screen');

function WelcomeScreen({ navigation }) {
  const image = require('../assets/payuca-logo.png');

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={image}></Image>
      <Text style={[textStyle.body1, styles.text]}>
        Welcome to your Access App.
      </Text>
      <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
        <PrimaryButton
          title={'Get started'}
          onPress={() => navigation.navigate(routes.EMAIL_NAVIGATOR)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    top: size.height * 0.45,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    color: colors.darkGrey,
    alignSelf: 'center',
    paddingBottom: 30,
  },
});

export default WelcomeScreen;
