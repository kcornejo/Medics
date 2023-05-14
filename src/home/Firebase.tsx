import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const savePerson = async formData => {
  const firestore = firebase.firestore();
  const object = await firestore.collection('patient').add(formData);
  return object.id;
};
const saveFeedback = async (formData, idPerson) => {
  const firestore = firebase.firestore();
  await firestore
    .collection('patient')
    .doc(idPerson)
    .collection('feedback')
    .add(formData);
};
export {savePerson, saveFeedback};
