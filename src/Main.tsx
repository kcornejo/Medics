import React, {useState, useContext} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  Box,
  VStack,
  HStack,
  Center,
} from 'native-base';
import Home from './home/Home';
import {UserContext} from './support/Context';
import BarBottom from './components/BarBottom';
import History from './history/History';
import Config from './config/Config';
const Main = () => {
  const [ventana, setVentana] = useState(2);
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      {ventana == 1 && <History />}
      {ventana == 2 && <Home ventanaPadre={ventana} />}
      {ventana == 3 && <Config />}
      <BarBottom setOption={setVentana} />
    </>
  );
};

export default Main;
