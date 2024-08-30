import React, {FC, useState} from 'react';
import {Step1} from './Step1';
import {Step2} from './Step2';
interface IndexTools {
  setShowIndex: React.Dispatch<number>;
}
export const Index: FC<IndexTools> = ({setShowIndex}) => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  return (
    <>
      {step == 1 ? (
        <Step1
          setShowIndex={setShowIndex}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      ) : (
        <Step2
          setShowIndex={setShowIndex}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
    </>
  );
};
