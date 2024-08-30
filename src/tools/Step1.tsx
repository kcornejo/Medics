import React, {FC, useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, ScrollView, Text, VStack} from 'native-base';
import Button from '../components/Button';
import Loading from '../support/Loading';
import AlertMedics from '../support/AlertMedics';
import {Input} from '../components/Input';
import {AlertMedicsContext} from '../support/Context';
import {validationForm} from '../support/Support';
import Steps from '../home/Steps';
interface IndexTools {
  setShowIndex: React.Dispatch<number>;
  setFormData: React.Dispatch<any>;
  formData: object;
  setStep: React.Dispatch<number>;
}
export const Step1: FC<IndexTools> = ({
  setShowIndex,
  setFormData,
  formData,
  setStep,
}) => {
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const labels = ['Paso 1', 'Paso 2'];
  const nextStep = (formData: any) => {
    const validation = [
      {
        isRequired: true,
        obj: 'Flujometros de 1L',
      },
      {
        isRequired: true,
        obj: 'Flujometros de 15L',
      },
      {
        isRequired: true,
        obj: 'Reguladores de Vacios',
      },
      {
        isRequired: true,
        obj: 'Pulmon Drager',
      },
      {
        isRequired: true,
        obj: 'Unidades Termicas',
      },
      {
        isRequired: true,
        obj: 'Sensor de Flujo',
      },
      {
        isRequired: true,
        obj: 'Percutor Pediatrico',
      },
      {
        isRequired: true,
        obj: 'Percutor de Adulto',
      },
      {
        isRequired: true,
        obj: 'Manometro',
      },
      {
        isRequired: true,
        obj: 'Llave de O2',
      },
    ];
    const success = () => {
      setStep(2);
    };
    validationForm(
      formData,
      setError,
      setAlerts,
      error,
      alerts,
      validation,
      success,
    );
  };
  return (
    <>
      <AlertMedics />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        <Box h={'100%'} mx={'5%'} safeAreaTop>
          <VStack h={'70%'}>
            <Steps labels={labels} currentPosition={0} />
            <ScrollView w={'100%'} alignContent={'center'}>
              <Box h={'85%'}>
                <Text fontSize={'xl'} bold textAlign={'center'} mb={'5'}>
                  Inventario
                </Text>
                <Input
                  placeholder="Flujometros de 1L"
                  label="Flujometros de 1L"
                  keyboardType="numeric"
                  name="Flujometros de 1L"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Flujometros de 15L"
                  label="Flujometros de 15L"
                  keyboardType="numeric"
                  name="Flujometros de 15L"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Reguladores de Vacios"
                  label="Reguladores de Vacios"
                  keyboardType="numeric"
                  name="Reguladores de Vacios"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Pulmon Drager"
                  label="Pulmon Drager"
                  keyboardType="numeric"
                  name="Pulmon Drager"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Unidades Termicas"
                  label="Unidades Termicas"
                  keyboardType="numeric"
                  name="Unidades Termicas"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Sensor de Flujo"
                  label="Sensor de Flujo"
                  keyboardType="numeric"
                  name="Sensor de Flujo"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Percutor Pediátrico"
                  label="Percutor Pediátrico"
                  keyboardType="numeric"
                  name="Percutor Pediatrico"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Percutor de Adulto"
                  label="Percutor de Adulto"
                  keyboardType="numeric"
                  name="Percutor de Adulto"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Manómetro"
                  label="Manómetro"
                  keyboardType="numeric"
                  name="Manometro"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Llave de O2"
                  label="Llave de O2"
                  keyboardType="numeric"
                  name="Llave de O2"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
              </Box>
            </ScrollView>
          </VStack>
          <Box justifyContent={'flex-end'}>
            <Button
              color="emerald.500"
              boldText={false}
              w={'100%'}
              text={'Siguiente'}
              colorClick={'emerald.600'}
              onPress={() => {
                nextStep(formData);
              }}
            />
            <Button
              color="info.600"
              boldText={false}
              w={'100%'}
              text={'Inicio'}
              colorClick={'info.800'}
              onPress={() => {
                setShowIndex(1);
              }}
            />
          </Box>
        </Box>
      </LinearGradient>
    </>
  );
};
