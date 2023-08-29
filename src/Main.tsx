import React, {useState} from 'react';
import Home from './home/Home';
import NewPersonHome from './home/NewPersonHome';
import ListBeds from './list_beds/Index';
const Main = () => {
  const [showIndex, setShowIndex] = useState<number>(1);
  return (
    <>
      {showIndex == 1 && <Home setShowIndex={setShowIndex} />}
      {showIndex == 2 && <NewPersonHome setShowIndex={setShowIndex} />}
      {showIndex == 3 && <ListBeds setShowIndex={setShowIndex} />}
    </>
  );
};

export default Main;
