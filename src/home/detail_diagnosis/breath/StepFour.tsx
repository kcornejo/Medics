import React, {useState, useContext} from 'react';
import {
  Box,
  VStack,
  Text,
  Pressable,
  ScrollView,
  Divider,
  AddIcon,
  HStack,
  MinusIcon,
} from 'native-base';
import {Input} from '../../../components/Input';
import Steps from '../../Steps';
import {AlertMedicsContext, LoadContext} from '../../../support/Context';
import {validationForm} from '../../../support/Support';
import {saveFeedback} from '../../Firebase';
import Medicaments from './Medicaments';
import Button from '../../../components/Button';
const StepFour = ({
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
    'Tratamiento',
  ];
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(AlertMedicsContext);
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
  const [contadorMed, setContadorMed] = useState(1);
  const nextStep = () => {
    let validation = [
      {
        isRequired: true,
        obj: 'Tipo de Neubolizacion',
      },
      {
        isRequired: true,
        obj: 'Reporte Final',
      },
    ];
    for (let i = 0; i < contadorMed; i++) {
      validation.push(
        {isRequired: true, obj: 'Medicamento ' + (i + 1)},
        {isRequired: true, obj: 'Horario ' + (i + 1)},
      );
    }
    const success = async () => {
      //setLoad(true);
      let formDataSave = formData;
      formDataSave['FechaSeguimiento'] = new Date();
      let medicamentos = [];
      for (let i = 0; i < contadorMed; i++) {
        medicamentos.push({
          Medicamento: formDataSave['Medicamento ' + (i + 1)],
          Horario: formDataSave['Horario ' + (i + 1)],
        });
      }
      for (let i = 0; i < contadorMed; i++) {
        delete formDataSave['Medicamento ' + (i + 1)];
        delete formDataSave['Horario ' + (i + 1)];
      }
      formDataSave['Medicamentos'] = medicamentos;
      try {
        await saveFeedback(formDataSave, idPerson);
        setAlerts({
          show: true,
          type: 'info',
          title: 'Exito',
          message: 'Seguimiento creado correctamente',
        });
      } catch (e) {
        console.log(e.message);
      }
      //setLoad(false);
      setShowIndex(true);
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
  const cambioVentana = step => {
    if (step < 3) {
      setVentana(step + 1);
    }
  };
  return (
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} onPress={cambioVentana} currentPosition={3} />
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
              placeholder="Tipo de Neubolización"
              type="select"
              options={opcionesTipo}
              label="Tipo de Neubolización"
              name="Tipo de Neubolizacion"
              errors={error}
              form={formData}
              setForm={setFormData}
            />
            <HStack mb={1}>
              <Text fontSize={'md'} bold mt={2}>
                Listado de Medicamentos
              </Text>
              <HStack ml={10} alignItems={'center'}>
                <Pressable
                  onPress={() => {
                    if (contadorMed != 0) {
                      setContadorMed(contadorMed - 1);
                    }
                  }}>
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        bg={isPressed ? 'red.600' : 'red.400'}
                        shadow={3}
                        w={'8'}
                        ml={2}
                        rounded={'2xl'}
                        borderWidth="0.1"
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.9 : 1,
                            },
                          ],
                        }}>
                        <Box
                          p="2"
                          borderColor="coolGray.300"
                          alignItems={'center'}>
                          <MinusIcon size={5} />
                        </Box>
                      </Box>
                    );
                  }}
                </Pressable>
                <Pressable
                  onPress={() => {
                    setContadorMed(contadorMed + 1);
                  }}>
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        bg={isPressed ? 'success.600' : 'success.400'}
                        shadow={3}
                        w={'8'}
                        ml={2}
                        rounded={'2xl'}
                        borderWidth="0.1"
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.9 : 1,
                            },
                          ],
                        }}>
                        <Box
                          p="2"
                          borderColor="coolGray.300"
                          alignItems={'center'}>
                          <AddIcon size={5} />
                        </Box>
                      </Box>
                    );
                  }}
                </Pressable>
              </HStack>
            </HStack>
            <Medicaments
              number={contadorMed}
              formData={formData}
              setFormData={setFormData}
              error={error}
            />
            <Divider my={1} />
            <Text fontSize={'xl'} bold my={3}>
              Reporte Final
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
              mb={20}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setVentana(3);
              }}
            />
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default StepFour;
