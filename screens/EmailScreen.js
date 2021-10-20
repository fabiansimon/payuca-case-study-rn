import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import BackArrowButton from '../components/BackArrowButton';
import colors from '../config/colors';
import CheckBoxTile from '../components/CheckBoxTile';
import textStyle from '../config/textStyle';
import PrimaryButton from '../components/PrimaryButton';
import routes from '../navigation/routes';

const CELL_COUNT = 4;

function EmailScreen({ navigation }) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <PagerView
        scrollEnabled={false}
        style={styles.pagerView}
        initialPage={0}
        ref={(viewPager) => {
          this.viewPager = viewPager;
        }}
      >
        <View style={styles.emailView}>
          <Text
            style={[
              textStyle.headline2,
              { color: colors.black, paddingTop: 20 },
            ]}
          >
            Enter your email
          </Text>
          <Text
            style={[textStyle.body1, { color: colors.black, paddingTop: 10 }]}
          >
            If you were invited via email, use that address.
          </Text>
          <TextInput
            theme={{ colors: { primary: colors.blue } }}
            style={styles.textField}
            underlineColor={colors.darkGrey}
            autoCapitalize="none"
            placeholder="Enter your email"
            label="Email address"
            keyboardType="email-address"
          />
          <CheckBoxTile
            style={{ paddingBottom: 16 }}
            isChecked={true}
            interactiveString={'terms & conditions'}
            onPress={() => navigation.navigate(routes.LEGAL_SCREEN)}
          />

          <CheckBoxTile
            isChecked={false}
            interactiveString={'privacy policy'}
          />
          <View style={styles.button}>
            <PrimaryButton
              onPress={() => this.viewPager.setPage(1)}
              title={'Verify email'}
            />
          </View>
        </View>

        <View style={styles.confirmationView}>
          <BackArrowButton
            style={{ paddingTop: 25, paddingBottom: 5 }}
            onPress={() => this.viewPager.setPage(0)}
          />
          <Text style={[textStyle.headline2, { color: colors.black }]}>
            Verification code
          </Text>
          <Text
            style={[textStyle.body1, { color: colors.black, paddingTop: 10 }]}
          >
            An email Verification code has been sent to personal@mail.com
          </Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <TouchableOpacity
            underlayColor={colors.lightBlue}
            onPress={() => navigation.navigate(routes.APP_NAVIGATOR)}
          >
            <Text style={[textStyle.headline4, styles.notReceivedText]}>
              Did not receive a code by email
            </Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 50,
  },
  codeContainer: {
    alignSelf: 'center',
    backgroundColor: colors.lightBlue,
    marginVertical: 40,
    height: 84,
    width: 260,
  },
  container: {
    height: '100%',
    marginHorizontal: 16,
  },
  confirmationView: { paddingHorizontal: 16, paddingTop: 20 },
  emailView: {
    paddingHorizontal: 16,
    paddingTop: 46,
  },
  notReceivedText: {
    color: colors.blue,
    alignSelf: 'center',
  },
  textField: {
    backgroundColor: colors.textFieldBackground,
    marginTop: 40,
    marginBottom: 22,
    height: 56,
  },
  pagerView: {
    flex: 1,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    fontSize: 24,
    backgroundColor: colors.error,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGrey,
  },
  focusCell: {
    borderBottomWidth: 2,
    borderBottomColor: colors.blue,
  },
});

export default EmailScreen;
