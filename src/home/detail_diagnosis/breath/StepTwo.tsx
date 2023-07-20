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
        isRequired: false,
        obj: 'PH',
      },
      {
        isRequired: false,
        obj: 'CO2',
      },
      {
        isRequired: false,
        obj: 'HCO3',
      },
      {
        isRequired: false,
        obj: 'PaO2',
      },
      {
        isRequired: false,
        obj: 'EB',
      },
      {
        isRequired: false,
        obj: 'Lactato',
      },
      {
        isRequired: false,
        obj: 'FiO2',
      },
      {
        isRequired: false,
        obj: 'Plaquetas',
      },
      {
        isRequired: false,
        obj: 'Hemoglobina',
      },
      {
        isRequired: false,
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
    <Box safeAreaTop>
      <Steps labels={labels} currentPosition={1} onPress={cambioVentana} />
      <ScrollView w={'100%'} alignContent={'center'}>
        <Box alignItems={'center'}>
          <VStack alignItems={'center'} flex="1" w="85%">
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
              isRequired={false}
            />
            <Input
              placeholder="CO2"
              label="CO2"
              keyboardType="numeric"
              name="CO2"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="HCO3"
              label="HCO3"
              keyboardType="numeric"
              name="HCO3"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="PaO2"
              label="PaO2"
              keyboardType="numeric"
              name="PaO2"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="EB"
              label="EB"
              keyboardType="numeric"
              name="EB"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Lactato"
              label="Lactato"
              keyboardType="numeric"
              name="Lactato"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="FiO2"
              label="FiO2"
              keyboardType="numeric"
              name="FiO2"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Plaquetas"
              label="Plaquetas"
              keyboardType="numeric"
              name="Plaquetas"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Hemoglobina"
              label="Hemoglobina"
              keyboardType="numeric"
              name="Hemoglobina"
              errors={error}
              form={formData}
              setForm={setFormData}
              isRequired={false}
            />
            <Input
              placeholder="Interpretación de GSA"
              label="Interpretación de GSA"
              keyboardType="default"
              name="Interpretación de GSA"
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
                nextStep(formData);
              }}
            />
            <Button
              color="info.600"
              boldText={false}
              w={'100%'}
              mb={100}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setVentana(1);
              }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StepTwo;
