import {Box, Text, Pressable, VStack} from 'native-base';
import React, {useState, useContext} from 'react';
import Steps from './Steps';
import {Input} from '../components/Input';
import {AlertMedicsContext} from '../support/Context';
import {validationForm} from '../support/Support';
const MoreInfoPerson = ({setVentana, formData, setFormData}) => {
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const labels = ['Info General', 'Info Específica', 'Diagnóstico'];
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        obj: 'Edad',
      },
      {
        isRequired: true,
        obj: 'Peso',
      },
      {
        isRequired: true,
        obj: 'Talla',
      },
    ];
    const success = () => {
      setVentana(4);
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
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={1} />
      <VStack alignItems={'center'} mx="10%">
        <Text fontSize={'xl'} bold my={3}>
          Nuevo Paciente
        </Text>
        <Input
          placeholder="Edad"
          label="Edad del Paciente"
          name="Edad"
          keyboardType="numeric"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          placeholder="Peso"
          label="Peso del Paciente"
          name="Peso"
          keyboardType="numeric"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          placeholder="Talla"
          label="Talla del Paciente"
          name="Talla"
          keyboardType="numeric"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Pressable
          bg="emerald.300"
          mt={5}
          w={'100%'}
          shadow={3}
          rounded={'2xl'}
          borderWidth="0.1"
          onPress={() => {
            nextStep(formData);
          }}>
          <Box p="2" borderColor="coolGray.300">
            <Text fontSize="xl" textAlign={'center'}>
              Continuar
            </Text>
          </Box>
        </Pressable>
        <Pressable
          bg="info.600"
          w={'100%'}
          mt={3}
          mb={20}
          shadow={3}
          rounded={'2xl'}
          borderWidth="0.1"
          onPress={() => {
            setVentana(2);
          }}>
          <Box p="2" borderColor="coolGray.300">
            <Text fontSize="xl" textAlign={'center'}>
              Regresar
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default MoreInfoPerson;
