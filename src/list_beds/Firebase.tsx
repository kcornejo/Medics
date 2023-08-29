import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const searchPatient = async (buscador: string) => {
  const firestore = firebase.firestore();
  return await firestore
    .collection('patient')
    .where('Nombre', '>=', buscador)
    .where('Nombre', '<', buscador + '\uf8ff')
    .get();
};
export {searchPatient};
