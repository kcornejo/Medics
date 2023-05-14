import React, {useState, useContext, useEffect} from 'react';
import Home from './home/Home';
import BarBottom from './components/BarBottom';
import History from './history/History';
import Config from './config/Config';
const Main = () => {
  const [ventana, setVentana] = useState(2);
  const [showIndex, setShowIndex] = useState(true);
  return (
    <>
      {ventana == 1 && (
        <History showIndex={showIndex} setShowIndex={setShowIndex} />
      )}
      {ventana == 2 && (
        <Home showIndex={showIndex} setShowIndex={setShowIndex} />
      )}
      {ventana == 3 && <Config />}
      <BarBottom setOption={setVentana} setShowIndex={setShowIndex} />
    </>
  );
};

export default Main;
