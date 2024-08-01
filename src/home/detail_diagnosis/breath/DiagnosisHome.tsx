import React, {useState, useEffect, useContext} from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import {getLastFeedback} from '../../Firebase';
import LinearGradient from 'react-native-linear-gradient';
import {LoadContext} from '../../../support/Context';
import Loading from '../../../support/Loading';
const DiagnosisHome = ({idPerson, setShowIndex}) => {
  const [ventana, setVentana] = useState(1);
  const [formData, setFormData] = useState({});
  const [load, setLoad] = useContext(LoadContext);
  useEffect(() => {
    setLoad(true);
    getLastFeedback(idPerson).then(data => {
      data.forEach(obj => {
        setFormData(obj.data());
        setLoad(false);
      });
    });
  }, [1]);

  return (
    <>
      <Loading />
      <LinearGradient
        colors={['#ffffff', '#b3e5fc']}
        style={{
          flex: 1,
        }}>
        {ventana == 1 && (
          <StepOne
            setVentana={setVentana}
            formData={formData}
            setShowIndex={setShowIndex}
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
            setFormData={setFormData}
            setShowIndex={setShowIndex}
            idPerson={idPerson}></StepThree>
        )}
        {ventana == 5 && <StepFive setVentana={setVentana}></StepFive>}
      </LinearGradient>
    </>
  );
};

export default DiagnosisHome;
