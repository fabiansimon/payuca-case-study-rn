import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Snackbar } from 'react-native-paper';

import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';

import textStyle from '../config/textStyle';
import colors from '../config/colors';
import myGarage from '../data/myGarage';
import routes from '../navigation/routes';
import GearButton from '../components/GearButton';
import ReaderTile from '../components/ReaderTile';
import ParkingSpaceTile from '../components/ParkingSpaceTile';
import CustomSnackbar from '../components/CustomSnackBar';

// To get a longer look the the refreshIndicator
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function GarageScreen({ navigation }) {
  // Set the whole screen to loading
  const [isLoading, setIsLoading] = useState(true);

  // Set refreshIndicator
  const [refreshing, setRefreshing] = useState(false);

  // Update readers --> Should be done with redux
  const [readers, setReaders] = useState([]);

  // // Set for Snackbar
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  async function updateReader(id) {
    const db = firestore().collection('users').doc('wMDM68wLVShcQz6E8Vsd');
    const readerData = await db
      .collection('user-garage')
      .doc('06wy0CbQnzXAHVNjyzhr')
      .collection('readers')
      .where('id', '==', id)
      .get();

    const readerId = readerData.docs[0].id;

    try {
      await db
        .collection('user-garage')
        .doc('06wy0CbQnzXAHVNjyzhr')
        .collection('readers')
        .doc(readerId)
        .update({
          'is-open': true,
        });

      console.log('finished');
    } catch (error) {
      onToggleSnackBar();
      console.error(error);
    }
  }

  async function fetchGarageData() {
    var readersTemp = [];
    const db = firestore().collection('users').doc('wMDM68wLVShcQz6E8Vsd');

    try {
      const usersGarage = await db
        .collection('user-garage')
        .doc('06wy0CbQnzXAHVNjyzhr')
        .get();

      const userReader = await db
        .collection('user-garage')
        .doc('06wy0CbQnzXAHVNjyzhr')
        .collection('readers')
        .get();

      userReader.docs.forEach((item) => {
        readersTemp.push({
          id: item.data()['id'],
          isOpen: item.data()['is-open'],
          name: item.data()['name'],
          information: item.data()['information'],
          location: item.data()['location'],
        });
      });

      setReaders(readersTemp);

      myGarage.title = usersGarage.data()['title'];
      myGarage.address = usersGarage.data()['address'];
      myGarage.location = usersGarage.data()['location'];
      myGarage.validTimes = usersGarage.data()['times'];

      setRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      onToggleSnackBar();
      console.error(error);
      setRefreshing(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading) fetchGarageData();
  });

  function aboveListContent() {
    return (
      <>
        <GearButton style={styles.gearButton} />
        <Text
          style={[textStyle.headline2, { paddingTop: 10, paddingBottom: 40 }]}
        >
          {myGarage.title}
        </Text>
        <Text style={[textStyle.headline4, { paddingBottom: 15 }]}>
          My parking space
        </Text>
        <ParkingSpaceTile
          level={myGarage.location.level}
          number={myGarage.location.number}
          onPress={() => navigation.navigate(routes.DETAIL_SCREEN, myGarage)}
        />
        <Text
          style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
        >
          Reader
        </Text>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  wait(1000).then(() => fetchGarageData());
                }}
              />
            }
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={aboveListContent}
            data={readers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <ReaderTile
                  position={
                    index === 0
                      ? 'top'
                      : index === readers.length - 1
                      ? 'bottom'
                      : 'center'
                  }
                  title={item.name}
                  onPress={() => updateReader(item.id)}
                  onSeeDetails={() =>
                    navigation.navigate(routes.READER_SCREEN, item)
                  }
                />
              );
            }}
          />

          <CustomSnackbar
            message="Sorry, something went wrong here"
            twoLine={1}
            type="error"
            onDismiss={onDismissSnackBar}
            visible={visible}
          />
          {/* <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Undo',
              onPress: () => {
                console.log('error');
              },
            }}
          >
            Hey there! I'm a Snackbar.
          </Snackbar> */}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  gearButton: {
    alignSelf: 'flex-end',
    paddingTop: 50,
  },
});

export default GarageScreen;
