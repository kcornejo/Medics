import React, {useState, useEffect, useContext} from 'react';
import {Box, ScrollView, VStack, Text, Pressable} from 'native-base';
import {LogBox} from 'react-native';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import {validationForm} from '../../../support/Support';
import {AlertMedicsContext} from '../../../support/Context';
import Button from '../../../components/Button';
import {SelectSimple} from '../../../components/SelectSimple';
const StepOne = ({setVentana, setFormData, formData, setShowIndex}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [error, setError] = useState({});

  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const optionsTr = [
    {value: 'TOT', label: 'TOT'},
    {value: 'TQT', label: 'TQT'},
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
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        obj: 'DispositivosTR',
      },
      {
        isRequired: true,
        obj: 'Ventilador',
      },
      {
        isRequired: true,
        obj: 'ModoVentilatorio',
      },
    ];
    if (formData.DispositivosTR == 'NoTOT') {
      validation.push(
        {isRequired: true, obj: 'NoToT'},
        {isRequired: true, obj: 'NumeroFijacion'},
      );
    }
    if (
      formData.DispositivosTR?.toString().search('Mascarilla') >= 0 ||
      formData.DispositivosTR?.toString().search('Canula') >= 0
    ) {
      validation.push({isRequired: true, obj: 'Litros por Minuto'});
    }
    const success = () => {
      setVentana(2);
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
      <Steps labels={labels} currentPosition={0} />
      <ScrollView w={'100%'} alignContent={'center'}>
        <Box alignItems={'center'}>
          <VStack alignItems={'center'} flex="1" w="85%">
            <Text fontSize={'xl'} bold my={3}>
              Seguimiento
            </Text>
            <SelectSimple
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
              <>
                <SelectSimple
                  placeholder="No. TOT"
                  label="No. TOT"
                  keyboardType="numeric"
                  name="NoToT"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <SelectSimple
                  placeholder="Numero de Fijación"
                  label="Numero de Fijación"
                  keyboardType="numeric"
                  name="NumeroFijacion"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
              </>
            )}
            {formData.DispositivosTR?.toString().search('Mascarilla') >= 0 ||
              (formData.DispositivosTR?.toString().search('Canula') >= 0 && (
                <>
                  <Input
                    placeholder="Litros por Minuto"
                    label="Litros por Minuto"
                    keyboardType="numeric"
                    name="Litros por Minuto"
                    errors={error}
                    form={formData}
                    setForm={setFormData}
                  />
                </>
              ))}
            <Text fontSize="md" bold my={3}>
              Parámetros Ventilatorios
            </Text>
            <SelectSimple
              placeholder="Ventilador"
              label="Ventilador"
              name="Ventilador"
              type="select"
              options={optionsVentilador}
              errors={error}
              form={formData}
              setForm={setFormData}
            />
            <SelectSimple
              placeholder="Modo Ventilatorio"
              label="Modo Ventilatorio"
              name="ModoVentilatorio"
              type="select"
              options={optionsModoVentilatorio}
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
              mb={100}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setShowIndex(1);
              }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StepOne;
