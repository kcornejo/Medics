import React from 'react';
import auth from '@react-native-firebase/auth';
const auth_firebase = async (email, password) => {
  let code = '999';
  let message = 'System error';
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      if (response.user.emailVerified) {
      } else {
        code = '001';
        message = '[correo-no-confirmado]';
      }
    })
    .catch(error => {
      if (error.message.toString().search('auth/user-not-found') >= 0) {
        code = '002';
        message = '[usuario-no-encontrado]';
      } else if (error.message.toString().search('auth/wrong-password') >= 0) {
        code = '002';
        message = '[usuario-no-encontrado]';
      } else {
        code = '003';
        message = `Error critico ${error.message}`;
      }
    });
  return {code, message};
};
const register_firebase = async (email, password) => {
  let code = '';
  let message = '';
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      code = '000';
      message = 'Usuario creado';
      response.user.sendEmailVerification();
    })
    .catch(error => {
      if (error.message.search('auth/email-already-in-use') >= 0) {
        code = '001';
        message = `Usuario registrado anteriormente.`;
      } else {
        code = '003';
        message = `Error critico ${error.message}`;
      }
    });
  return {code, message};
};
export {auth_firebase, register_firebase};
