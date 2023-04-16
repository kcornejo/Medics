import React, {useContext} from 'react';
import {Modal} from 'native-base';
import {LoadContext} from './Context';
const Loading = () => {
  const [load, setLoad] = useContext(LoadContext);
  return <Modal isOpen={load}>Cargando...</Modal>;
};

export default Loading;
