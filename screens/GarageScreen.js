import React, { useRef, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  ActivityIndicator,
  Animated,
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
import { updateReader, fetchReaders, fetchUserGarage } from '../utils/database';

// To get a longer look the the refreshIndicator
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function GarageScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  const HEADER_MAX_HEIGHT = 120; // max header height
  const HEADER_MIN_HEIGHT = 60; // min header height
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  // Set the whole screen to loading
  const [isLoading, setIsLoading] = useState(true);

  // Set refreshIndicator
  const [refreshing, setRefreshing] = useState(false);

  // Update readers --> Should be done with redux
  const [readers, setReaders] = useState([]);

  // Setters for Snackbar
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // Fetch init Garage Data
  async function fetchGarageData() {
    var readersTemp = [];

    try {
      const usersGarage = await fetchUserGarage();

      const userReader = await fetchReaders();

      userReader.docs.forEach((item) => {
        readersTemp.push({
          id: item.data()['id'],
          isOpen: item.data()['is-open'],
          name: item.data()['name'],
          information: item.data()['information'],
          location: item.data()['location'],
          isLoading: false,
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

  // Update Reader with an additional second to finish animation
  async function openReader(id) {
    const index = readers.findIndex((reader) => reader.id == id);
    let newReaders = [...readers];
    newReaders[index] = {
      id: newReaders[index].id,
      isOpen: newReaders[index].isOpen,
      isLoading: true,
      name: newReaders[index].name,
      information: newReaders[index].information,
      location: newReaders[index].location,
    };

    setReaders(newReaders);

    console.log('newReaders: ' + newReaders);
    console.log('updatedReader: ' + newReaders[index]);

    await updateReader(id);

    let finishedReaders = [...readers];
    finishedReaders[index] = {
      id: newReaders[index].id,
      isOpen: true,
      isLoading: false,
      name: newReaders[index].name,
      information: newReaders[index].information,
      location: newReaders[index].location,
    };

    wait(500).then(() => setReaders(finishedReaders));
  }

  // Fetch Data when opening App
  useEffect(() => {
    if (isLoading) fetchGarageData();
  });

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

  function aboveListContent() {
    return (
      <>
        <Text
          style={[textStyle.headline2, { paddingTop: 100, paddingBottom: 40 }]}
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
          <GearButton style={styles.gearButton} />
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
            <View />
            <Text
              style={{ marginHorizontal: 20 }}
              numberOfLines={1}
              style={textStyle.headline4}
            >
              {myGarage.title.length < 40
                ? `${myGarage.title}`
                : `${myGarage.title.substring(0, 37)}...`}
            </Text>
            <GearButton style={{ paddingLeft: 20 }} />
          </Animated.View>
          <Animated.FlatList
            contentContainerStyle={{ paddingTop: 88 }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  wait(1000).then(() => fetchGarageData());
                }}
              />
            }
            contentContainerStyle={{ paddingBottom: 10 }}
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={aboveListContent}
            data={readers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <ReaderTile
                  isLoading={item.isLoading}
                  isOpen={item.isOpen}
                  position={
                    index === 0
                      ? 'top'
                      : index === readers.length - 1
                      ? 'bottom'
                      : 'center'
                  }
                  title={item.name}
                  onPress={() => openReader(item.id)}
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
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  gearButton: {
    position: 'absolute',
    right: 30,
    top: 50,
  },
  stickyHeader: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: 0,
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
  },
});

export default GarageScreen;
