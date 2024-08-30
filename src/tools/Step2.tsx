import React, {FC, useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, ScrollView, Text, VStack} from 'native-base';
import Button from '../components/Button';
import AlertMedics from '../support/AlertMedics';
import {Input} from '../components/Input';
import {AlertMedicsContext, LoadContext, UserContext} from '../support/Context';
import {validationForm} from '../support/Support';
import Steps from '../home/Steps';
import {saveFollow} from './Firebase';
interface IndexTools {
  setShowIndex: React.Dispatch<number>;
  setFormData: React.Dispatch<any>;
  formData: object;
  setStep: React.Dispatch<number>;
}
export const Step2: FC<IndexTools> = ({
  setShowIndex,
  setFormData,
  formData,
  setStep,
}) => {
  const [error, setError] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const [user, setUser] = useContext(UserContext);
  const labels = ['Paso 1', 'Paso 2'];
  const nextStep = (formData: any) => {
    const validation = [
      {
        isRequired: true,
        obj: 'Sensor Drager En Uso',
      },
      {
        isRequired: true,
        obj: 'Sensor Drager Lavado',
      },
      {
        isRequired: true,
        obj: 'Sensor Drager Esterilizado',
      },
      {
        isRequired: true,
        obj: 'Piezas ISO En Uso',
      },
      {
        isRequired: true,
        obj: 'Piezas ISO Lavado',
      },
      {
        isRequired: true,
        obj: 'Piezas ISO Esterilizado',
      },
    ];
    const success = () => {
      setLoad(true);
      const dataSave = {
        ...formData,
        FechaHora: new Date(),
        Usuario: user.email,
      };
      saveFollow(dataSave).finally(function () {
        setLoad(false);
        setAlerts({
          show: true,
          type: 'info',
          title: 'Exito',
          message: 'Registro creado correctamente',
        });
        setShowIndex(1);
      });
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
    <>
      <AlertMedics />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        <Box h={'100%'} mx={'5%'} safeAreaTop>
          <VStack h={'70%'}>
            <Steps labels={labels} currentPosition={1} />
            <ScrollView w={'100%'} alignContent={'center'}>
              <Box h={'85%'}>
                <Text fontSize={'xl'} bold textAlign={'center'} mb={'5'}>
                  Sensores Drager
                </Text>
                <Input
                  placeholder="En Uso"
                  label="En Uso"
                  keyboardType="numeric"
                  name="Sensor Drager En Uso"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Lavado"
                  label="Lavado"
                  keyboardType="numeric"
                  name="Sensor Drager Lavado"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Esterilizado"
                  label="Esterilizado"
                  keyboardType="numeric"
                  name="Sensor Drager Esterilizado"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Text fontSize={'xl'} bold textAlign={'center'} mb={'5'}>
                  Piezas ISO
                </Text>
                <Input
                  placeholder="En Uso"
                  label="En Uso"
                  keyboardType="numeric"
                  name="Piezas ISO En Uso"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Lavado"
                  label="Lavado"
                  keyboardType="numeric"
                  name="Piezas ISO Lavado"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
                <Input
                  placeholder="Esterilizado"
                  label="Esterilizado"
                  keyboardType="numeric"
                  name="Piezas ISO Esterilizado"
                  errors={error}
                  form={formData}
                  setForm={setFormData}
                />
              </Box>
            </ScrollView>
          </VStack>
          <Box justifyContent={'flex-end'}>
            <Button
              color="emerald.500"
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
              text={'Atras'}
              colorClick={'info.800'}
              onPress={() => {
                setStep(1);
              }}
            />
          </Box>
        </Box>
      </LinearGradient>
    </>
  );
};
