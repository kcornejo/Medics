import React, {useState, useContext} from 'react';
import {VStack, Pressable, Box, Text, ScrollView} from 'native-base';
import {Input} from '../components/Input';
import Steps from './Steps';
import {validationForm} from '../support/Support';
import {AlertMedicsContext} from '../support/Context';
import Button from '../components/Button';
const NewPerson = ({setVentana, formData, setFormData, setShowIndex}) => {
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
  const labels = ['Información General', 'Información Específica'];
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={0} />
      <Box alignItems="center">
        <ScrollView w={'85%'} alignContent={'center'}>
          <VStack
            alignItems={'center'}
            flex="1"
            justifyContent="flex-end"
            w="100%">
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
            <Button
              color="emerald.300"
              boldText={false}
              w={'100%'}
              text={'Continuar'}
              colorClick={'emerald.600'}
              onPress={() => {
                nextStep(formData);
              }}
            />
            <Button
              color="info.600"
              boldText={false}
              w={'100%'}
              mb={20}
              text={'Inicio'}
              colorClick={'info.800'}
              onPress={() => {
                setShowIndex(true);
              }}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default NewPerson;
