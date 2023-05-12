import {Box, Text, Pressable, VStack} from 'native-base';
import React, {useState, useContext, useEffect} from 'react';
import Steps from './Steps';
import {LogBox, Alert} from 'react-native';
import {Input} from '../components/Input';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {validationForm} from '../support/Support';
import {savePerson} from './Firebase';
const MoreInfoPerson = ({setVentana, formData, setFormData}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const labels = ['Información General', 'Información Específica'];
  const [load, setLoad] = useContext(LoadContext);
  const optionsGenero = [
    {value: 'Masculino', label: 'Masculino'},
    {value: 'Femenino', label: 'Femenino'},
  ];
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        obj: 'Edad',
      },
      {
        isRequired: true,
        obj: 'Peso',
      },
      {
        isRequired: true,
        obj: 'Talla',
      },
      {
        isRequired: true,
        obj: 'Genero',
      },
      {
        isRequired: true,
        obj: 'Diagnostico',
      },
    ];
    const success = async () => {
      setLoad(true);
      let formDataSave = formData;
      formDataSave['FechaIngreso'] = new Date();
      try {
        await savePerson(formData);
        Alert.alert(
          'Exito',
          'Paciente almacenado correctamente, desea realizar su seguimiento?',
          [
            {
              text: 'Si',
              onPress: () => {
                setVentana(5);
              },
            },
            {
              text: 'No',
              onPress: () => {
                setVentana(1);
              },
            },
          ],
        );
      } catch (e) {
        console.log(e.message);
      }
      setLoad(false);
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
    <Box safeAreaTop mt={3}>
      <Steps labels={labels} currentPosition={1} />
      <VStack alignItems={'center'} mx="10%">
        <Text fontSize={'xl'} bold my={3}>
          Nuevo Paciente
        </Text>
        <Input
          placeholder="Edad"
          label="Edad del Paciente"
          name="Edad"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          placeholder="Genero"
          label="Genero del Paciente"
          name="Genero"
          errors={error}
          type="select"
          options={optionsGenero}
          form={formData}
          setForm={setFormData}
        />
        <Input
          label="Peso del Paciente (Kgs)"
          name="Peso"
          keyboardType="numeric"
          placeholder="Peso del Paciente (Kgs)"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          placeholder="Talla (Cms)"
          label="Talla del Paciente"
          name="Talla"
          keyboardType="numeric"
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          type="textarea"
          placeholder="Diagnóstico del Paciente"
          label="Diagnóstico del Paciente"
          name="Diagnostico"
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
              Guardar
            </Text>
          </Box>
        </Pressable>
        <Pressable
          bg="info.600"
          w={'100%'}
          mt={3}
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
    </Box>
  );
};

export default MoreInfoPerson;
