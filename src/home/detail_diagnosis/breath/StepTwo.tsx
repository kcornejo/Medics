import React, {useState, useContext} from 'react';
import {Box, ScrollView, VStack, Text, Pressable} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import {AlertMedicsContext} from '../../../support/Context';
import {validationForm} from '../../../support/Support';
import Button from '../../../components/Button';
const StepTwo = ({setVentana, setFormData, formData}) => {
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const nextStep = () => {
    const validation = [
      {
        isRequired: true,
        obj: 'PH',
      },
      {
        isRequired: true,
        obj: 'CO2',
      },
      {
        isRequired: true,
        obj: 'HCO3',
      },
      {
        isRequired: true,
        obj: 'PaO2',
      },
      {
        isRequired: true,
        obj: 'EB',
      },
      {
        isRequired: true,
        obj: 'Lactato',
      },
      {
        isRequired: true,
        obj: 'FiO2',
      },
      {
        isRequired: true,
        obj: 'Plaquetas',
      },
      {
        isRequired: true,
        obj: 'Hemoglobina',
      },
      {
        isRequired: true,
        obj: 'Interpretación de GSA',
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
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [error, setError] = useState({});
  const cambioVentana = step => {
    if (step < 1) {
      setVentana(step + 1);
    }
  };
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} onPress={cambioVentana} currentPosition={1} />
      <Box alignItems="center">
        <ScrollView w={'85%'} alignContent={'center'}>
          <VStack
            alignItems={'center'}
            flex="1"
            justifyContent="flex-end"
            w="100%">
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
              placeholder="HCO3"
              label="HCO3"
              keyboardType="numeric"
              name="HCO3"
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
              mb={200}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setVentana(1);
              }}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default StepTwo;
