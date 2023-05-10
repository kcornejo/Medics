import React, {useState} from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const DiagnosisHome = () => {
  const [ventana, setVentana] = useState(1);

  return (
    <>
      {ventana == 1 && <StepOne setVentana={setVentana}></StepOne>}
      {ventana == 2 && <StepTwo setVentana={setVentana}></StepTwo>}
      {ventana == 3 && <StepThree setVentana={setVentana}></StepThree>}
    </>
  );
};

export default DiagnosisHome;
