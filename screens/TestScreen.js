// import React, { useRef } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Animated,
//   Image,
// } from 'react-native';

// import colors from '../config/colors';
// import ReaderTile from '../components/ReaderTile';
// import textStyle from '../config/textStyle';
// import ParkingSpaceTile from '../components/ParkingSpaceTile';
// import textStyle from '../config/textStyle';
// import colors from '../config/colors';
// import myGarage from '../data/myGarage';
// import routes from '../navigation/routes';
// import ReaderTile from '../components/ReaderTile';
// import ParkingSpaceTile from '../components/ParkingSpaceTile';
// import { updateReader } from '../utils/database';

// const HEADER_MAX_HEIGHT = 240;
// const HEADER_MIN_HEIGHT = 84;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// const readers = [
//   {
//     id: 0,
//     information: 'info',
//     location: 'location',
//     isOpen: false,
//     name: 'Back Door',
//   },
//   {
//     id: 1,
//     information: 'info',
//     location: 'location',
//     isOpen: true,
//     name: 'Front Door',
//   },
//   {
//     id: 2,
//     information: 'info',
//     location: 'location',
//     isOpen: false,
//     name: 'Back Door',
//   },
//   {
//     id: 3,
//     information: 'info',
//     location: 'location',
//     isOpen: true,
//     name: 'Front Door',
//   },
//   {
//     id: 4,
//     information: 'info',
//     location: 'location',
//     isOpen: false,
//     name: 'Back Door',
//   },
//   {
//     id: 5,
//     information: 'info',
//     location: 'location',
//     isOpen: true,
//     name: 'Front Door',
//   },
//   {
//     id: 6,
//     information: 'info',
//     location: 'location',
//     isOpen: false,
//     name: 'Back Door',
//   },
//   {
//     id: 7,
//     information: 'info',
//     location: 'location',
//     isOpen: true,
//     name: 'Front Door',
//   },
// ];

// // To get a longer look the the refreshIndicator
// const wait = (timeout) => {
//   return new Promise((resolve) => setTimeout(resolve, timeout));
// };

// function App() {
//   // Set the whole screen to loading
//   const [isLoading, setIsLoading] = useState(true);

//   // Set refreshIndicator
//   const [refreshing, setRefreshing] = useState(false);

//   // Update readers --> Should be done with redux
//   const [readers, setReaders] = useState([]);

//   // Set for Snackbar
//   const [visible, setVisible] = useState(false);

//   // load Reader
//   const [loadReader, setLoadReader] = useState(-1);

//   const onToggleSnackBar = () => setVisible(!visible);

//   const onDismissSnackBar = () => setVisible(false);

//   const scrollY = useRef(new Animated.Value(0)).current;

//   async function fetchGarageData() {
//     var readersTemp = [];
//     const db = firestore().collection('users').doc('wMDM68wLVShcQz6E8Vsd');

//     try {
//       const usersGarage = await db
//         .collection('user-garage')
//         .doc('06wy0CbQnzXAHVNjyzhr')
//         .get();

//       const userReader = await db
//         .collection('user-garage')
//         .doc('06wy0CbQnzXAHVNjyzhr')
//         .collection('readers')
//         .get();

//       userReader.docs.forEach((item) => {
//         readersTemp.push({
//           id: item.data()['id'],
//           isOpen: item.data()['is-open'],
//           name: item.data()['name'],
//           information: item.data()['information'],
//           location: item.data()['location'],
//         });
//       });

//       setReaders(readersTemp);

//       myGarage.title = usersGarage.data()['title'];
//       myGarage.address = usersGarage.data()['address'];
//       myGarage.location = usersGarage.data()['location'];
//       myGarage.validTimes = usersGarage.data()['times'];

//       setRefreshing(false);
//       setIsLoading(false);
//     } catch (error) {
//       onToggleSnackBar();
//       console.error(error);
//       setRefreshing(false);
//       setIsLoading(false);
//     }
//   }

//   async function openReader(id, index) {
//     setLoadReader(index);
//     await updateReader(id);
//     wait(1000).then(() => setLoadReader(-1));
//   }

//   useEffect(() => {
//     if (isLoading) fetchGarageData();
//   });

//   const titleTranslateY = scrollY.interpolate({
//     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//     outputRange: [0, 0, -8],
//     extrapolate: 'clamp',
//   });
//   const titleOpacity = scrollY.interpolate({
//     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//     outputRange: [0, 0, 1],
//     extrapolate: 'clamp',
//   });

//   function aboveListContent() {
//     return (
//       <>
//         <Text
//           style={[textStyle.headline2, { paddingTop: 10, paddingBottom: 40 }]}
//         >
//           Meine Garage
//         </Text>
//         <Text style={[textStyle.headline4, { paddingBottom: 15 }]}>
//           My parking space
//         </Text>
//         <ParkingSpaceTile
//           level={myGarage.location.level}
//           number={myGarage.location.number}
//           onPress={() => navigation.navigate(routes.DETAIL_SCREEN, myGarage)}
//         />
//         <Text
//           style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
//         >
//           Reader
//         </Text>
//       </>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.stickyHeader,
//           {
//             opacity: titleOpacity,
//             transform: [{ translateY: titleTranslateY }],
//           },
//         ]}
//       >
//         <Text style={[textStyle.headline3, { paddingBottom: 10 }]}>Hello</Text>
//       </Animated.View>
//       <Animated.FlatList
//         contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         style={{ paddingHorizontal: 16 }}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={aboveListContent}
//         data={readers}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item, index }) => {
//           return (
//             <ReaderTile
//               //   isLoading={loadReader == index ? true : false}
//               isOpen={item.isOpen}
//               position={
//                 index === 0
//                   ? 'top'
//                   : index === readers.length - 1
//                   ? 'bottom'
//                   : 'center'
//               }
//               title={item.name}
//               onPress={() => openReader(item.id, index)}
//               onSeeDetails={() =>
//                 navigation.navigate(routes.READER_SCREEN, item)
//               }
//             />
//           );
//         }}
//       />
//       <CustomSnackbar
//         message="Sorry, something went wrong here"
//         twoLine={1}
//         type="error"
//         onDismiss={onDismissSnackBar}
//         visible={visible}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.screenBackground,
//   },
//   stickyHeader: {
//     zIndex: 1,
//     position: 'absolute',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     top: 0,
//     width: '100%',
//     height: 100,
//     backgroundColor: colors.white,
//   },
// });

// export default App;

// // import React, { useRef } from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import { FlatList } from 'react-native-gesture-handler';

// // import GearButton from '../components/GearButton';
// // import ParkingSpaceTile from '../components/ParkingSpaceTile';
// // import colors from '../config/colors';
// // import ReaderTile from '../components/ReaderTile';
// // import textStyle from '../config/textStyle';
// // import Animated from 'react-native-reanimated';

// // function TestScreen() {
// //   const HEADER_MAX_HEIGHT = 240; // max header height
// //   const HEADER_MIN_HEIGHT = 84; // min header height
// //   const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// //   const scrollY = useRef(new Animated.Value(0)).current; // our animated value

// //   const readers = [
// //     {
// //       id: 0,
// //       information: 'info',
// //       isOpen: false,
// //       location: 'location',
// //       name: 'back door',
// //     },
// //     {
// //       id: 1,
// //       information: 'info',
// //       isOpen: true,
// //       location: 'location',
// //       name: 'front door',
// //     },
// //   ];

// //   const headerTranslateY = scrollY.interpolate({
// //     inputRange: [0, HEADER_SCROLL_DISTANCE],
// //     outputRange: [0, -HEADER_SCROLL_DISTANCE],
// //     extrapolate: 'clamp',
// //   });

// //   // change header title size from 1 to 0.9
// //   const titleScale = scrollY.interpolate({
// //     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
// //     outputRange: [1, 1, 0.9],
// //     extrapolate: 'clamp',
// //   });
// //   // change header title y-axis
// //   const titleTranslateY = scrollY.interpolate({
// //     inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
// //     outputRange: [0, 0, -8],
// //     extrapolate: 'clamp',
// //   });

// //   function aboveListContent() {
// //     return (
// //       <>
// //         <Animated.View
// //           style={[
// //             styles.topBar,
// //             {
// //               transform: [
// //                 { scale: titleScale },
// //                 { translateY: titleTranslateY },
// //               ],
// //             },
// //           ]}
// //         >
// //           <Text style={styles.title}>Management</Text>
// //         </Animated.View>

// //         <GearButton style={styles.gearButton} />
// //         <Text
// //           style={[textStyle.headline2, { paddingTop: 10, paddingBottom: 40 }]}
// //         >
// //           {myGarage.title}
// //         </Text>
// //         <Text style={[textStyle.headline4, { paddingBottom: 15 }]}>
// //           My parking space
// //         </Text>
// //         <ParkingSpaceTile
// //           level={myGarage.location.level}
// //           number={myGarage.location.number}
// //           onPress={() => navigation.navigate(routes.DETAIL_SCREEN, myGarage)}
// //         />
// //         <Text
// //           style={[textStyle.headline4, { paddingTop: 30, paddingBottom: 15 }]}
// //         >
// //           Reader
// //         </Text>
// //       </>
// //     );
// //   }

// //   return (
// //     <Animated.View style={styles.container}>
// //       <Animated.FlatList
// //         scrollEventThrottle={16} //
// //         style={{ paddingHorizontal: 16 }}
// //         onScroll={Animated.event(
// //           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
// //           { useNativeDriver: true }
// //         )}
// //         showsVerticalScrollIndicator={false}
// //         ListHeaderComponent={aboveListContent}
// //         data={readers}
// //         keyExtractor={(item) => item.id.toString()}
// //         renderItem={({ item, index }) => {
// //           return (
// //             <ReaderTile
// //               isOpen={item.isOpen}
// //               position={
// //                 index === 0
// //                   ? 'top'
// //                   : index === readers.length - 1
// //                   ? 'bottom'
// //                   : 'center'
// //               }
// //               title={item.name}
// //               onPress={() => console.log('a')}
// //               onSeeDetails={() =>
// //                 navigation.navigate(routes.READER_SCREEN, item)
// //               }
// //             />
// //           );
// //         }}
// //       />
// //     </Animated.View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     zIndex: 1,
// //     flex: 1,
// //     backgroundColor: colors.screenBackground,
// //   },
// //   gearButton: {
// //     alignSelf: 'flex-end',
// //     paddingTop: 50,
// //   },
// // });

// // export default TestScreen;
