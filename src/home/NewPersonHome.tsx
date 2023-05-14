import React, {useState} from 'react';
import NewPerson from './NewPerson';
import MoreInfoPerson from './MoreInfoPerson';
import DiagnosisHome from './detail_diagnosis/breath/DiagnosisHome';
const NewPersonHome = ({setShowIndex}) => {
  const [ventana, setVentana] = useState(2);
  const [formData, setFormData] = useState({});
  const [idPerson, setIdPerson] = useState(null);
  return (
    <>
      {ventana == 2 && (
        <NewPerson
          setVentana={setVentana}
          formData={formData}
          setShowIndex={setShowIndex}
          setFormData={setFormData}></NewPerson>
      )}
      {ventana == 3 && (
        <MoreInfoPerson
          setVentana={setVentana}
          formData={formData}
          setFormData={setFormData}
          setIdPerson={setIdPerson}></MoreInfoPerson>
      )}
      {ventana == 5 && (
        <DiagnosisHome idPerson={idPerson} setShowIndex={setShowIndex} />
      )}
    </>
  );
};

export default NewPersonHome;
