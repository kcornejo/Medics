import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const savePerson = async formData => {
  const firestore = firebase.firestore();
  formData.NoCama = parseInt(formData.NoCama);
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
const getLastFeedback = async (idPerson: string) => {
  const firestore = firebase.firestore();
  return await firestore
    .collection('patient')
    .doc(idPerson)
    .collection('feedback')
    .orderBy('FechaSeguimiento', 'desc')
    .limit(1)
    .get();
};
const BedUsed = async (bed: number) => {
  const firestore = firebase.firestore();
  return await firestore
    .collection('patient')
    .where('NoCama', '==', bed)
    .where('Cerrado', '==', false)
    .get();
};
const getListBed = async (cerrado: boolean) => {
  const firestore = firebase.firestore();
  return await firestore
    .collection('patient')
    .where('Cerrado', '==', cerrado)
    .get();
};
export {savePerson, saveFeedback, getLastFeedback, BedUsed, getListBed};
