import {Box, Text, Pressable, VStack} from 'native-base';
import React, {useState, useContext} from 'react';
import Steps from './Steps';
import {Input} from '../components/Input';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {validationForm} from '../support/Support';
import {savePerson} from './Firebase';
import {Alert} from 'react-native';
const Diagnosis = ({setVentana, formData, setFormData}) => {
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const labels = ['Info General', 'Info Específica', 'Diagnóstico'];
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        obj: 'Diagnostico',
      },
    ];
    const success = async () => {
      setLoad(true);
      let formDataSave = formData;
      formDataSave['FechaIngreso'] = new Date();
      try {
        await savePerson(formData);
        Alert.alert(
          'Exito',
          'Paciente almacenado correctamente, desea realizar su seguimiento?',
          [
            {
              text: 'Si',
              onPress: () => {
                setVentana(5);
              },
            },
            {
              text: 'No',
              onPress: () => {
                setVentana(1);
              },
            },
          ],
        );
      } catch (e) {
        console.log(e.message);
      }
      setLoad(false);
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
      <Steps labels={labels} currentPosition={2} />
      <VStack alignItems={'center'} mx="10%">
        <Text fontSize={'xl'} bold my={3}>
          Nuevo Paciente
        </Text>
        <Input
          type="textarea"
          placeholder="Diagnóstico del Paciente"
          label="Diagnóstico del Paciente"
          name="Diagnostico"
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
              Guardar
            </Text>
          </Box>
        </Pressable>
        <Pressable
          bg="info.600"
          w={'100%'}
          mt={3}
          shadow={3}
          rounded={'2xl'}
          borderWidth="0.1"
          onPress={() => {
            setVentana(3);
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

export default Diagnosis;
