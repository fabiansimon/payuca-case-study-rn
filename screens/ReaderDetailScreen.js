import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import colors from '../config/colors';
import textStyle from '../config/textStyle';
import routes from '../navigation/routes';
import BackArrowButton from '../components/BackArrowButton';

function ReaderDetailScreen({ navigation, route }) {
  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
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
            { color: route.params.location ? colors.black : colors.mediumGrey },
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
            { color: route.params.location ? colors.black : colors.mediumGrey },
          ]}
        >
          {route.params.information
            ? route.params.information
            : 'No information available.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
});

export default ReaderDetailScreen;
