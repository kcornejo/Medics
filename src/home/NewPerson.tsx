import React, {useState, useContext} from 'react';
import {VStack, Pressable, Box, Text, ScrollView} from 'native-base';
import {Input} from '../components/Input';
import Steps from './Steps';
import {validationForm} from '../support/Support';
import {AlertMedicsContext} from '../support/Context';
const NewPerson = ({setVentana, formData, setFormData}) => {
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [error, setError] = useState({});
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        regex: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
        obj: 'Fecha',
        regexHelp: 'Ingrese una fecha valida.',
      },
      {
        isRequired: true,
        regex: /^[0-9]+/,
        obj: 'NoCama',
        regexHelp: 'Ingrese un número de cama valido.',
      },
      {
        isRequired: true,
        regex: /^[0-9]+/,
        obj: 'NoRegistro',
        regexHelp: 'Ingrese un número de registro valido.',
      },
      {
        isRequired: true,
        regex: /^[a-zA-Z]{3,}/,
        obj: 'Nombre',
        regexHelp: 'Ingrese un nombre de paciente valido.',
      },
    ];
    const success = () => {
      setVentana(3);
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
  const labels = ['Info General', 'Info Específica', 'Diagnóstico'];
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={0} />
      <ScrollView>
        <VStack
          alignItems={'center'}
          mx="10%"
          flex="1"
          justifyContent="flex-end"
          w="100%"
          maxW="300">
          <Text fontSize={'xl'} bold my={3}>
            Nuevo Paciente
          </Text>
          <Input
            placeholder="Fecha"
            type="date"
            label="Fecha"
            name="Fecha"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Número de Cama"
            label="Número de Cama"
            keyboardType="numeric"
            name="NoCama"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Número de Registro"
            label="Número de Registro"
            keyboardType="numeric"
            name="NoRegistro"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Nombre del Paciente"
            label="Nombre del Paciente"
            name="Nombre"
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
            mt={4}
            mb={20}
            shadow={3}
            rounded={'2xl'}
            borderWidth="0.1"
            onPress={() => {
              setVentana(1);
            }}>
            <Box p="2" borderColor="coolGray.300">
              <Text fontSize="xl" textAlign={'center'}>
                Inicio
              </Text>
            </Box>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default NewPerson;
