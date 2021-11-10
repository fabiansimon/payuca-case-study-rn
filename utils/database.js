import firestore from '@react-native-firebase/firestore';

const db = firestore().collection('users').doc('wMDM68wLVShcQz6E8Vsd');

// Update Reader
export const updateReader = async (id) => {
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
  } catch (error) {
    console.error(error);
  }
};

export const fetchReaders = async () => {
  try {
    const userReader = await db
      .collection('user-garage')
      .doc('06wy0CbQnzXAHVNjyzhr')
      .collection('readers')
      .get();

    return userReader;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserGarage = async () => {
  try {
    const usersGarage = await db
      .collection('user-garage')
      .doc('06wy0CbQnzXAHVNjyzhr')
      .get();

    return usersGarage;
  } catch (error) {
    console.error(error);
  }
};
