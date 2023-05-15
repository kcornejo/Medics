import React, {useState, useEffect, useRef} from 'react';
import {Box, VStack, Text, Pressable, ScrollView} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import Button from '../../../components/Button';
const StepThree = ({setVentana, setFormData, formData}) => {
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [error, setError] = useState({});
  const scrollRef = useRef(null);
  const cambioVentana = step => {
    if (step < 2) {
      setVentana(step + 1);
    }
  };
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} onPress={cambioVentana} currentPosition={2} />
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
            <Button
              color="emerald.300"
              boldText={false}
              w={'100%'}
              text={'Continuar'}
              colorClick={'emerald.600'}
              onPress={() => {
                setVentana(4);
              }}
            />
            <Button
              color="info.600"
              boldText={false}
              w={'100%'}
              mb={200}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setVentana(2);
              }}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default StepThree;
