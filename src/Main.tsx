import React, {useState, useContext, useEffect} from 'react';
import Home from './home/Home';
import BarBottom from './components/BarBottom';
import History from './history/History';
import Config from './config/Config';
import NewPersonHome from './home/NewPersonHome';
const Main = () => {
  const [showIndex, setShowIndex] = useState(1);
  return (
    <>
      {showIndex == 1 && <Home setShowIndex={setShowIndex} />}
      {showIndex == 2 && <NewPersonHome setShowIndex={setShowIndex} />}
    </>
  );
};

export default Main;
