import React, {FC, useContext, useState} from 'react';
import {ListBedsSupport} from '../list_beds/ListBedsSupport';
import LinearGradient from 'react-native-linear-gradient';
import {Box, ScrollView, VStack, Text} from 'native-base';
import Button from '../components/Button';
import AlertMedics from '../support/AlertMedics';
import {Input} from '../components/Input';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {validationForm} from '../support/Support';
import {saveDailyReport} from './Firebase';
interface PropsIndex {
  setShowIndex: (option: number) => void;
}
export const Index: FC<PropsIndex> = ({setShowIndex}) => {
  const [load, setLoad] = useContext(LoadContext);
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [patient, setPatient] = useState<any>({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [nebu, setNebu] = useState(true);
  const functionClickIndex = function () {
    setNebu(!nebu);
  };
  const nextStep = formData => {
    let validation = [];
    const success = async () => {
      setLoad(true);
      try {
        await saveDailyReport(formData, patient.id);
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
    <>
      <AlertMedics />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        {nebu === false ? (
          <Box alignItems={'center'} h="100%" safeAreaTop>
            <VStack alignItems={'center'} flex="1" w="85%">
              <Text fontSize={'xl'} bold my={3}>
                Reporte Diario
              </Text>
              <Input
                placeholder="Reporte..."
                label="Reporte"
                keyboardType="default"
                name="Reporte"
                errors={error}
                form={formData}
                setForm={setFormData}
                isRequired={true}
                type="textarea"
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
                onPress={functionClickIndex}
              />
            </VStack>
          </Box>
        ) : (
          <Box h={'100%'} mx={'5%'}>
            <VStack safeAreaTop mt="15%">
              <ScrollView w={'100%'} alignContent={'center'}>
                <Box h={'85%'}>
                  <ListBedsSupport
                    setPatient={setPatient}
                    functionClick={functionClickIndex}></ListBedsSupport>
                </Box>
              </ScrollView>
            </VStack>
            <Box h={'15%'} justifyContent={'flex-end'}>
              <Button
                color="info.600"
                boldText={false}
                w={'100%'}
                mb={5}
                text={'Inicio'}
                colorClick={'info.800'}
                onPress={() => {
                  setShowIndex(1);
                }}
              />
            </Box>
          </Box>
        )}
      </LinearGradient>
    </>
  );
};
