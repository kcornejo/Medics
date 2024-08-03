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
import {AlertMedicsContext, LoadContext} from '../../../support/Context';
import {LogBox} from 'react-native';
import {validationForm} from '../../../support/Support';
import {saveFeedbackMedicine, getLastFeedbackMedicine} from '../../Firebase';
import Medicaments from './Medicaments';
import Button from '../../../components/Button';
const StepFour = ({idPerson, setShowIndex}) => {
  const [load, setLoad] = useContext(LoadContext);
  const [contadorMed, setContadorMed] = useState(1);
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoad(true);
    getLastFeedbackMedicine(idPerson).then(data => {
      data.forEach(obj => {
        let dataQuery = obj.data();
        const medicamentos = dataQuery.Medicamentos;
        let newFormData = {};
        for (let i = 0; i < medicamentos.length; i++) {
          newFormData['Medicamento ' + (i + 1)] =
            medicamentos[i]['Medicamento'];
          newFormData['Horario ' + (i + 1)] = medicamentos[i]['Horario'];
          newFormData['Dosis ' + (i + 1)] = medicamentos[i]['Dosis'];
          newFormData['Tipo de Neubolizacion ' + (i + 1)] =
            medicamentos[i]['TipoNeubolizacion'];
          newFormData['Cantidad ' + (i + 1)] = medicamentos[i]['Cantidad'];
        }
        setFormData(newFormData);
        setContadorMed(medicamentos.length);
      });
      setLoad(false);
    });
  }, []);
  const labels = [
    'Parametros Ventilatorios',
    'Gases Arteriales',
    'Signos Vitales',
    'Tratamiento',
  ];

  const nextStep = formData => {
    let validation = [];
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
      setLoad(true);
      let formDataSave = formData;
      formDataSave['FechaSeguimiento'] = new Date();
      let medicamentos = [];
      for (let i = 0; i < contadorMed; i++) {
        medicamentos.push({
          Medicamento: formDataSave['Medicamento ' + (i + 1)],
          Horario: formDataSave['Horario ' + (i + 1)],
          Dosis:
            formDataSave['Dosis ' + (i + 1)] !== undefined
              ? formDataSave['Dosis ' + (i + 1)]
              : '',
          Cantidad:
            formDataSave['Cantidad ' + (i + 1)] !== undefined
              ? formDataSave['Cantidad ' + (i + 1)]
              : '',
          TipoNeubolizacion: formDataSave['Tipo de Neubolizacion ' + (i + 1)],
        });
      }
      const DataSave = {
        Medicamentos: medicamentos,
        FechaSeguimiento: new Date(),
      };
      try {
        await saveFeedbackMedicine(DataSave, idPerson);

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
    <Box safeAreaTop mt={5} h="100%">
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
                setShowIndex(true);
              }}
            />
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default StepFour;
