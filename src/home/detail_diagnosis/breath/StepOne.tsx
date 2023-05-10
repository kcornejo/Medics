import React, {useState, useEffect} from 'react';
import {Box, ScrollView, VStack, Text, Pressable} from 'native-base';
import {LogBox} from 'react-native';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
const StepOne = ({setVentana}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
    'Reporte Final',
  ];
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});
  const optionsTr = [
    {value: 'NoTOT', label: 'No. TOT'},
    {value: 'NoTQT', label: 'No. TQT'},
    {value: 'Canula Binasal', label: 'Canula Binasal'},
    {value: 'Mascarilla Simple', label: 'Mascarilla Simple'},
    {
      value: 'Mascarilla con reservorio RP',
      label: 'Mascarilla con reservorio RP',
    },
    {
      value: 'Mascarilla con reservorio NR',
      label: 'Mascarilla con reservorio NR',
    },
    {value: 'Aire Ambiente', label: 'Aire Ambiente'},
  ];
  const optionsVentilador = [
    {value: 'Avea', label: 'Avea'},
    {value: 'Bella Vista', label: 'Bella Vista'},
    {value: 'MindRay', label: 'MindRay'},
  ];
  const optionsModoVentilatorio = [
    {value: 'Volumen A/C', label: 'Volumen A/C'},
    {value: 'Volumen SIMV', label: 'Volumen SIMV'},
    {value: 'Presión A/C', label: 'Presión A/C'},
    {value: 'Presión SIMV', label: 'Presión SIMV'},
    {value: 'CPAP/PS', label: 'CPAP/PS'},
    {value: 'PSV', label: 'PSV'},
    {value: 'APRV', label: 'APRV'},
    {value: 'PRVC', label: 'PRVC'},
  ];
  const nextStep = () => {
    setVentana(2);
  };
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
            Seguimiento
          </Text>
          <Input
            placeholder="Dispositivos de TR"
            type="select"
            options={optionsTr}
            label="Dispositivos de TR"
            name="DispositivosTR"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          {formData['DispositivosTR'] == 'NoTOT' && (
            <Input
              placeholder="No. TOT"
              label="No. TOT"
              keyboardType="numeric"
              name="NoToT"
              errors={error}
              form={formData}
              setForm={setFormData}
            />
          )}
          <Text fontSize="md" bold my={3}>
            Parámetros Ventilatorios
          </Text>
          <Input
            placeholder="Ventilador"
            label="Ventilador"
            name="Ventilador"
            type="select"
            options={optionsVentilador}
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Modo Ventilatorio"
            label="Modo Ventilatorio"
            name="ModoVentilatorio"
            type="select"
            options={optionsModoVentilatorio}
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
              //setVentana(1);
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

export default StepOne;
