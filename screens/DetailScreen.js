import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import BackArrowButton from '../components/BackArrowButton';
import colors from '../config/colors';
import textStyle from '../config/textStyle';
import WhiteContainer from '../components/WhiteContainer';
import DetailsLabel from '../components/DetailsLabel';

function DetailScreen({ navigation, route }) {
  return (
    <ScrollView style={{ backgroundColor: colors.screenBackground }}>
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
          <DetailsLabel icon="garage" label="Name" title={route.params.title} />
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
            title={route.params.validTimes.from.toDate('DD/MM/YYYY').toString()}
            lPosition="top"
          />
          <DetailsLabel
            icon="calendar"
            label="Valid until"
            title={route.params.validTimes.until.toDate().toString()}
            lPosition="top"
          />
        </WhiteContainer>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.screenBackground,
  },
});

export default DetailScreen;
