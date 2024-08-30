import React, {useState} from 'react';
import Home from './home/Home';
import NewPersonHome from './home/NewPersonHome';
import ListBeds from './list_beds/Index';
import {Index as Nebulization} from './nebulization/Index';
import {Index as Daily} from './daily_report/Index';
import {Index as Tools} from './tools/Index';
const Main = () => {
  const [showIndex, setShowIndex] = useState<number>(1);
  return (
    <>
      {showIndex == 1 && <Home setShowIndex={setShowIndex} />}
      {showIndex == 2 && <NewPersonHome setShowIndex={setShowIndex} />}
      {showIndex == 3 && <ListBeds setShowIndex={setShowIndex} />}
      {showIndex == 4 && <Nebulization setShowIndex={setShowIndex} />}
      {showIndex == 5 && <Daily setShowIndex={setShowIndex} />}
      {showIndex == 6 && <Tools setShowIndex={setShowIndex} />}
    </>
  );
};

export default Main;
