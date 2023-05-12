import React, {useState} from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
const DiagnosisHome = () => {
  const [ventana, setVentana] = useState(1);
  const [formData, setFormData] = useState({});
  return (
    <>
      {ventana == 1 && (
        <StepOne
          setVentana={setVentana}
          formData={formData}
          setFormData={setFormData}></StepOne>
      )}
      {ventana == 2 && (
        <StepTwo
          setVentana={setVentana}
          formData={formData}
          setFormData={setFormData}></StepTwo>
      )}
      {ventana == 3 && (
        <StepThree
          setVentana={setVentana}
          formData={formData}
          setFormData={setFormData}></StepThree>
      )}
      {ventana == 4 && (
        <StepFour
          setVentana={setVentana}
          formData={formData}
          setFormData={setFormData}></StepFour>
      )}
      {ventana == 5 && <StepFive setVentana={setVentana}></StepFive>}
    </>
  );
};

export default DiagnosisHome;
