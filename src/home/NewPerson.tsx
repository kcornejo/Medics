import React, {useState, useContext, useEffect} from 'react';
import {
  VStack,
  Box,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'native-base';
import {Input} from '../components/Input';
import Steps from './Steps';
import {validationForm} from '../support/Support';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import Button from '../components/Button';
import {LogBox, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BedUsed, getListBed} from './Firebase';
import {OptionsSelect} from '../support/Interfaces';
const NewPerson = ({setVentana, formData, setFormData, setShowIndex}) => {
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [error, setError] = useState({});
  const [beds, setBeds] = useState<OptionsSelect[]>([]);
  const nextStep = formData => {
    const validation = [
      {
        isRequired: true,
        regex: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
        obj: 'Fecha',
        regexHelp: 'Ingrese una fecha valida.',
      },
      {
        isRequired: true,
        regex: /^[0-9]{1,2}$/,
        obj: 'NoCama',
        regexHelp: 'Ingrese un número de cama valido.',
        minValue: 1,
        maxValue: 15,
      },
      {
        isRequired: true,
        regex: /^[0-9]+/,
        obj: 'NoRegistro',
        regexHelp: 'Ingrese un número de registro valido.',
      },
      {
        isRequired: true,
        regex: /^[a-zA-Z]{3,}/,
        obj: 'Nombre',
        regexHelp: 'Ingrese un nombre de paciente valido.',
      },
    ];
    const success = () => {
      setVentana(3);
    };
    BedUsed(parseInt(formData.NoCama)).then(response => {
      const bedUsed = response.size > 0 ? true : false;
      if (!bedUsed) {
        validationForm(
          formData,
          setError,
          setAlerts,
          error,
          alerts,
          validation,
          success,
        );
      } else {
        setAlerts({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'Cama en uso.',
        });
      }
    });
  };
  const labels = ['Información General', 'Información Específica'];
  const [load, setLoad] = useContext(LoadContext);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoad(true);
    getListBed(false)
      .then(function (list) {
        let bedList: OptionsSelect[] = [];
        for (let i = 1; i <= 12; i++) {
          bedList.push({value: i, label: `Cama ${i}`});
        }
        list.forEach(document => {
          const data = document.data();
          bedList = bedList.filter(bed => bed.value != data.NoCama);
        });
        setBeds(bedList);
      })
      .finally(function () {
        setLoad(false);
      });
  }, [1]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <LinearGradient
        colors={['#ffffff', '#b3e5fc']}
        style={{
          flex: 1,
        }}>
        <Box safeAreaTop mt={5}>
          <Steps labels={labels} currentPosition={0} />
          <ScrollView w={'100%'} alignContent={'center'}>
            <Box alignItems={'center'}>
              <VStack alignItems="center">
                <LinearGradient
                  colors={['#C7E9E2', '#0591B1']}
                  style={{borderRadius: 100}}>
                  <Box p={2}>
                    <Image
                      source={require('../resources/Registro.png')}
                      size={'md'}
                      alt="Logo"
                      borderRadius={'100'}
                    />
                  </Box>
                </LinearGradient>
              </VStack>
              <VStack alignItems={'center'} flex="1" w="85%">
                <Text fontSize={'xl'} bold my={3}>
                  Nuevo Paciente
                </Text>
                <Input
                  placeholder="Fecha"
                  type="date"
                  label="Fecha"
                  name="Fecha"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Número de Cama"
                  label="Número de Cama"
                  keyboardType="numeric"
                  name="NoCama"
                  errors={error}
                  form={formData}
                  type="select"
                  options={beds}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Número de Registro"
                  label="Número de Registro"
                  keyboardType="numeric"
                  name="NoRegistro"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Nombre del Paciente"
                  label="Nombre del Paciente"
                  name="Nombre"
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
                  text={'Inicio'}
                  colorClick={'info.800'}
                  onPress={() => {
                    setShowIndex(1);
                  }}
                />
              </VStack>
            </Box>
          </ScrollView>
        </Box>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default NewPerson;
