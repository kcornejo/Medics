import React, {useState, useContext, useEffect} from 'react';
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
import {LogBox} from 'react-native';
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
  const [contadorMed, setContadorMed] = useState(1);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    if (
      formData['Medicamentos'] !== undefined &&
      formData['Medicamentos'].length > 0
    ) {
      setContadorMed(formData['Medicamentos'].length);
    }
  }, []);
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(AlertMedicsContext);
  const [error, setError] = useState({});

  const nextStep = () => {
    let validation = [
      {
        isRequired: true,
        obj: 'Reporte Final',
      },
    ];
    for (let i = 0; i < contadorMed; i++) {
      validation.push(
        {isRequired: true, obj: 'Medicamento ' + (i + 1)},
        {isRequired: true, obj: 'Horario ' + (i + 1)},
        {isRequired: true, obj: 'Tipo de Neubolizacion ' + (i + 1)},
        {
          isRequired:
            formData['Tipo de Neubolizacion ' + (i + 1)] == 'Humeda'
              ? true
              : false,
          obj: 'Dosis ' + (i + 1),
        },
        {
          isRequired:
            formData['Tipo de Neubolizacion ' + (i + 1)] == 'Humeda'
              ? false
              : true,
          obj: 'Cantidad ' + (i + 1),
        },
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
    <Box safeAreaTop>
      <Steps labels={labels} currentPosition={3} onPress={cambioVentana} />
      <ScrollView w={'100%'} alignContent={'center'}>
        <Box alignItems={'center'}>
          <VStack alignItems={'center'} flex="1" w="85%">
            <Text fontSize={'xl'} bold my={3}>
              Tratamientos
            </Text>
            <HStack mb={1}>
              <Text fontSize={'md'} bold mt={2}>
                Listado de Medicamentos
              </Text>
              <HStack ml={10} alignItems={'center'}>
                {contadorMed > 0 ? (
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
                ) : null}
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
              mb={100}
              text={'Regresar'}
              colorClick={'info.800'}
              onPress={() => {
                setVentana(3);
              }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StepFour;
