import React, {useState, useEffect, useRef} from 'react';
import {Box, VStack, Text, Pressable, ScrollView} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
const StepThree = ({setVentana, setFormData, formData}) => {
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [error, setError] = useState({});
  const scrollRef = useRef(null);
  const scrollToInitial = () => {
    //scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    //scrollRef.current.scrollTo({x: 5, y: 5, animated: true});
    //console.log('aca');
  };
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={2} />
      <Box alignItems="center">
        <ScrollView w={'85%'} alignContent={'center'}>
          <VStack
            alignItems={'center'}
            flex="1"
            justifyContent="flex-end"
            w="100%">
            <Text fontSize={'xl'} bold my={3}>
              Signos Vitales
            </Text>
            <Input
              placeholder="Frecuencia Cardíaca"
              label="Frecuencia Cardíaca"
              keyboardType="numeric"
              name="Frecuencia Cardíaca"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="SatO2"
              label="SatO2"
              keyboardType="numeric"
              name="SatO2"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Frecuencia Respiratoria"
              label="Frecuencia Respiratoria"
              keyboardType="numeric"
              name="Frecuencia Respiratoria"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Temperatura"
              label="Temperatura"
              keyboardType="numeric"
              name="Temperatura"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Presión Arterial"
              label="Presión Arterial"
              keyboardType="numeric"
              name="Presión Arterial"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="CO2 por Capnógrafo"
              label="CO2 por Capnógrafo"
              keyboardType="numeric"
              name="CO2 por Capnógrafo"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />

            <Pressable
              bg="emerald.300"
              mt={5}
              w={'100%'}
              shadow={3}
              rounded={'2xl'}
              borderWidth="0.1"
              onPress={() => {
                setVentana(4);
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
                setVentana(2);
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

export default StepThree;
