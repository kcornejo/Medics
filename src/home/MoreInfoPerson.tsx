import {Box, Text, Pressable, VStack, ScrollView} from 'native-base';
import React, {useState, useContext, useEffect} from 'react';
import Steps from './Steps';
import {LogBox, Alert} from 'react-native';
import {Input} from '../components/Input';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {validationForm} from '../support/Support';
import {savePerson} from './Firebase';
import Button from '../components/Button';
import {SelectSimple} from '../components/SelectSimple';
const MoreInfoPerson = ({setVentana, formData, setFormData, setIdPerson}) => {
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
        const id = await savePerson(formData);
        setIdPerson(id);
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
  const cambioVentana = step => {
    if (step === 0) {
      setVentana(2);
    }
  };
  return (
    <Box safeAreaTop mt={5}>
      <Steps labels={labels} currentPosition={1} onPress={cambioVentana} />
      <ScrollView w={'100%'} alignContent={'center'}>
        <Box alignItems={'center'}>
          <VStack alignItems={'center'} flex="1" w="85%">
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
            <SelectSimple
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

export default MoreInfoPerson;
