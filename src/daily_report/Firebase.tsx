import React from 'react';
import {firebase} from '@react-native-firebase/firestore';

const saveDailyReport = async (formData, idPerson) => {
  const firestore = firebase.firestore();
  await firestore
    .collection('patient')
    .doc(idPerson)
    .collection('feedback_dailyReport')
    .add(formData);
};
export {saveDailyReport};
