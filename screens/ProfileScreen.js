import React from 'react';
import { Text } from 'react-native-paper';
import textStyle from '../config/textStyle';
import { View, StyleSheet, ScrollView } from 'react-native';

import colors from '../config/colors';
import WhiteContainer from '../components/WhiteContainer';
import DetailsLabel from '../components/DetailsLabel';
import ActionButton from '../components/ActionButton';
import routes from '../navigation/routes';

function ProfileScreen({ navigation }) {
  return (
    <ScrollView
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
    </ScrollView>
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
