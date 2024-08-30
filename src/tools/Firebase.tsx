import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
const saveFollow = async (formData: any) => {
  const firestore = firebase.firestore();
  await firestore.collection('tools_follow').add(formData);
};
export {saveFollow};
