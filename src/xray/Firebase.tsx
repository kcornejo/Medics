import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {uniqid} from '../support/Support';
import {ImageObject} from '../support/Interfaces';
export const saveXray = async (listImage: ImageObject[], idPerson: string) => {
  let identifier = '';
  for (let i = 0; i < listImage.length; i++) {
    identifier = uniqid();
    await storage()
      .ref(`/xray/${idPerson}/${identifier}.png`)
      .putFile(listImage[i].url);
  }
};
