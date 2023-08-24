import React, {useState, useContext, useEffect} from 'react';
import Home from './home/Home';
import BarBottom from './components/BarBottom';
import History from './history/History';
import Config from './config/Config';
const Main = () => {
  const [showIndex, setShowIndex] = useState(true);
  return (
    <>
      <Home showIndex={showIndex} setShowIndex={setShowIndex} />
    </>
  );
};

export default Main;
