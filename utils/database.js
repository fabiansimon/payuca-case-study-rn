import firestore from '@react-native-firebase/firestore';


// Update Reader
export const updateReader = async (id) => {
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
  } catch (error) {
    console.error(error);
  }
};
