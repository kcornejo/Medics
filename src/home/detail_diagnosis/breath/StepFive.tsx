import React, {useState, useEffect, useRef} from 'react';
import {Box, VStack, Text, Pressable, ScrollView} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
const StepFive = ({setVentana}) => {
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
    'Reporte Final',
  ];
  const opcionesMedicamento = [
    {value: 'Salbutamol', label: 'Salbutamol'},
    {value: 'Budesonida', label: 'Budesonida'},
    {value: 'Tropium', label: 'Tropium'},
    {value: 'Dexametasona', label: 'Dexametasona'},
    {value: 'Alpha Dornasa', label: 'Alpha Dornasa'},
    {value: 'Adrenalina Racemica', label: 'Adrenalina Racemica'},
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
  const [formData, setFormData] = useState({});
  const scrollRef = useRef(null);
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={4} />
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
                //setVentana(5);
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
                setVentana(4);
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

export default StepFive;
