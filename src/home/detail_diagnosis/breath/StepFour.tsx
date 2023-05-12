import React, {useState, useContext} from 'react';
import {Box, VStack, Text, Pressable, ScrollView} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import {AlertMedicsContext} from '../../../support/Context';
import {validationForm} from '../../../support/Support';
const StepFour = ({setVentana, setFormData, formData}) => {
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const opcionesMedicamento = [
    {value: 'Salbutamol', label: 'Salbutamol'},
    {value: 'Budesonida', label: 'Budesonida'},
    {value: 'Tropium', label: 'Tropium'},
    {value: 'Dexametasona', label: 'Dexametasona'},
    {value: 'Alpha Dornasa', label: 'Alpha Dornasa'},
    {value: 'Adrenalina Racemica', label: 'Adrenalina Racemica'},
    {value: 'Hipertonica', label: 'Hipertonica'},
  ];
  const opcionesTipo = [
    {value: 'Humeda', label: 'Humeda'},
    {value: 'Puff', label: 'Puff'},
  ];
  const opcionesFrecuencia = [
    {value: 'Cada 3 horas', label: 'Cada 3 horas'},
    {value: 'Cada 4 horas', label: 'Cada 4 horas'},
    {value: 'Cada 6 horas', label: 'Cada 6 horas'},
    {value: 'Cada 8 horas', label: 'Cada 8 horas'},
    {value: 'Cada 12 horas', label: 'Cada 12 horas'},
  ];
  const [error, setError] = useState({});
  const nextStep = () => {
    const validation = [
      {
        isRequired: true,
        obj: 'Tipo de Medicamento',
      },
      {
        isRequired: true,
        obj: 'Medicamentos',
      },
      {
        isRequired: true,
        obj: 'Horario',
      },
      {
        isRequired: true,
        obj: 'Reporte Final',
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
      <Steps labels={labels} currentPosition={3} />
      <Box alignItems="center">
        <ScrollView w={'85%'} alignContent={'center'}>
          <VStack
            alignItems={'center'}
            flex="1"
            justifyContent="flex-end"
            w="100%">
            <Text fontSize={'xl'} bold my={3}>
              Tratamientos
            </Text>
            <Input
              placeholder="Tipo de Medicamento"
              type="select"
              options={opcionesTipo}
              label="Tipo de Medicamento"
              name="Tipo de Medicamento"
              errors={error}
              form={formData}
              setForm={setFormData}
            />
            <Input
              placeholder="Medicamentos"
              type="select"
              options={opcionesMedicamento}
              label="Medicamentos"
              name="Medicamentos"
              errors={error}
              form={formData}
              setForm={setFormData}
            />
            <Input
              placeholder="Horario"
              type="select"
              options={opcionesFrecuencia}
              label="Horario"
              name="Horario"
              errors={error}
              form={formData}
              setForm={setFormData}
            />
            <Input
              placeholder="Reporte Final"
              type="textarea"
              label="Reporte Final"
              name="Reporte Final"
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
                nextStep();
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
              mt={4}
              mb={20}
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
        </ScrollView>
      </Box>
    </Box>
  );
};

export default StepFour;
