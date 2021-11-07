import React, { useState, useEffect } from 'react';
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
  // Code Input Hooks
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Email Input Hooks
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [email, setEmail] = useState('');

  // Checkbox State
  const [cb1, setcb1] = useState();
  const [cb2, setcb2] = useState();

  // Animate to next Screen
  const nextScreen = () => navigation.navigate(routes.APP_NAVIGATOR);

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
            onChangeText={(text) => {
              setEmail(text);
              let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
              if (reg.test(text) === false) {
                setEmailIsValid(false);
              } else {
                setEmailIsValid(true);
              }
            }}
            theme={{
              colors: { primary: emailIsValid ? colors.blue : colors.error },
            }}
            style={styles.textField}
            underlineColor={colors.darkGrey}
            autoCapitalize="none"
            placeholder="Enter your email"
            label="Email address"
            keyboardType="email-address"
          />
          {emailIsValid ? (
            <Text style={styles.errorText}></Text>
          ) : (
            <Text style={styles.errorText}>Invalid email address</Text>
          )}

          <CheckBoxTile
            onCheckPress={() => {
              setcb1(!cb1);
            }}
            style={{ paddingBottom: 16 }}
            isChecked={cb1}
            interactiveString={'terms & conditions'}
            onPress={() => navigation.navigate(routes.LEGAL_SCREEN)}
          />
          <CheckBoxTile
            onCheckPress={() => {
              setcb2(!cb2);
            }}
            style={{ paddingBottom: 16 }}
            isChecked={cb2}
            interactiveString={'privacy policy'}
            onPress={() => navigation.navigate(routes.LEGAL_SCREEN)}
          />

          <View style={styles.button}>
            <PrimaryButton
              onPress={() => {
                this.viewPager.setPage(1);
                this.myTextInput.focus();
              }}
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
            ref={(ref) => {
              this.myTextInput = ref;
            }}
            {...props}
            value={value}
            onChangeText={(text) => {
              setValue(text);
              if (value.length == 3) {
                nextScreen();
              }
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            placeholder="0"
            placeholderTextColor={colors.lightGrey}
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <Text style={[textStyle.code, styles.cellText]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            underlayColor={colors.lightBlue}
            onPress={() => nextScreen()}
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
  errorText: {
    marginBottom: 22,
    marginLeft: 12,
    color: colors.error,
    fontSize: 12,
  },
  notReceivedText: {
    color: colors.blue,
    alignSelf: 'center',
  },
  textField: {
    backgroundColor: colors.textFieldBackground,
    marginTop: 40,
    marginBottom: 3,
    height: 56,
  },
  pagerView: {
    flex: 1,
  },
  root: { padding: 20, minHeight: 300 },
  codeFieldRoot: {
    marginTop: 30,
    marginBottom: 30,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 50,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  cellText: {
    color: colors.black,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
  },
});

export default EmailScreen;
