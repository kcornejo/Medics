import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const list_patients = async () => {
  const firestore = firebase.firestore();
  const objects = await firestore.collection('patient').get();
  return objects;
};
export {list_patients};
