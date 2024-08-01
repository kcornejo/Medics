import React, {useState, useEffect, useRef, useContext} from 'react';
import {Box, VStack, Text, Pressable, ScrollView} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import Button from '../../../components/Button';
import {saveFeedback} from '../../Firebase';
import {AlertMedicsContext, LoadContext} from '../../../support/Context';
import {validationForm} from '../../../support/Support';
const StepThree = ({
  setVentana,
  setFormData,
  formData,
  idPerson,
  setShowIndex,
}) => {
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
  ];
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const scrollRef = useRef(null);
  const cambioVentana = step => {
    if (step < 2) {
      setVentana(step + 1);
    }
  };
  const nextStep = () => {
    let validation = [];
    const success = async () => {
      setLoad(true);
      let formDataSave = formData;
      formDataSave['FechaSeguimiento'] = new Date();
      try {
        await saveFeedback(formDataSave, idPerson);
        setLoad(false);
        setAlerts({
          show: true,
          type: 'info',
          title: 'Exito',
          message: 'Seguimiento creado correctamente',
        });
      } catch (e) {
        console.log(e.message);
      }

      setShowIndex(1);
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
    <Box safeAreaTop mt={5}>
      <Steps labels={labels} currentPosition={2} onPress={cambioVentana} />
      <ScrollView w={'100%'} alignContent={'center'}>
        <Box alignItems={'center'}>
          <VStack alignItems={'center'} flex="1" w="85%">
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
              keyboardType="default"
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
              text={'Guardar'}
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
                setVentana(2);
              }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StepThree;
