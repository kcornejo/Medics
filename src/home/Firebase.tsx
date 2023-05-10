import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const savePerson = async formData => {
  const firestore = firebase.firestore();
  await firestore.collection('patient').add(formData);
};

export {savePerson};
