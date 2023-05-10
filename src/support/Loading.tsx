import React, {useContext} from 'react';
import {Image, Modal} from 'native-base';
import {LoadContext} from './Context';
const Loading = () => {
  const [load, setLoad] = useContext(LoadContext);
  return (
    <Modal isOpen={load}>
      <Image
        source={require('../resources/loading.gif')}
        alt="Cargando..."
        size="2xl"
      />
    </Modal>
  );
};

export default Loading;
