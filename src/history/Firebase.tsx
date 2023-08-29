import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const list_patients = async () => {
  const firestore = firebase.firestore();
  const objects = await firestore
    .collection('patient')
    .where('Cerrado' , '==', false)
    .get();
  return objects;
};
export {list_patients};
