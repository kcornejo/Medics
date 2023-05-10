import React, {useState} from 'react';
import {Box, ScrollView, VStack, Text, Pressable} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
const StepTwo = ({setVentana}) => {
  const nextStep = () => {
    setVentana(3);
  };
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
    'Reporte Final',
  ];
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={1} />
      <ScrollView>
        <VStack
          alignItems={'center'}
          mx="10%"
          flex="1"
          justifyContent="flex-end"
          w="100%"
          maxW="300">
          <Text fontSize={'xl'} bold my={3}>
            Gases Arteriales
          </Text>
          <Input
            placeholder="PH"
            label="PH"
            keyboardType="numeric"
            name="PH"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="CO2"
            label="CO2"
            keyboardType="numeric"
            name="CO2"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="HC03"
            label="HC03"
            keyboardType="numeric"
            name="HC03"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="PaO2"
            label="PaO2"
            keyboardType="numeric"
            name="PaO2"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="EB"
            label="EB"
            keyboardType="numeric"
            name="EB"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Lactato"
            label="Lactato"
            keyboardType="numeric"
            name="Lactato"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="FiO2"
            label="FiO2"
            keyboardType="numeric"
            name="FiO2"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Plaquetas"
            label="Plaquetas"
            keyboardType="numeric"
            name="Plaquetas"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Hemoglobina"
            label="Hemoglobina"
            keyboardType="numeric"
            name="Hemoglobina"
            errors={error}
            form={formData}
            setForm={setFormData}
          />
          <Input
            placeholder="Interpretación de GSA"
            label="Interpretación de GSA"
            keyboardType="numeric"
            name="Interpretación de GSA"
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
                Regresar
              </Text>
            </Box>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default StepTwo;
