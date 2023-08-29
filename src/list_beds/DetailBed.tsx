import { Box, Image, Text, Modal} from 'native-base';
import React, {useState} from 'react';
import Button from '../components/Button';
import DiagnosisHome from '../home/detail_diagnosis/breath/DiagnosisHome';
import { closedBed } from './Firebase';
import { Alert } from 'react-native';
const DetailBed = ({cargandoDetail, patient, setModal, modal,setPatient}) => {
  const [follow, setFollow] = useState(false);
  const closed_bed = async(id: string) => {
    Alert.alert(
      'Cerrar Caso',
      'Estas seguro que deseas cerrar el caso?',
      [
        {
          text: 'Si',
          onPress: async () => {
            await closedBed(id);
            setModal(false)
            setPatient({})
          },
        },
        {
          text: 'No',
        },
      ],
    );
    
  }
  return (
    <Modal isOpen={modal} bg="white" w={'100%'} h={'100%'}>
      {cargandoDetail ? (
        <Box w={'100%'} alignItems={'center'}>
          <Image
            source={require('../resources/loading.gif')}
            alt="Cargando..."
            size="2xl"
          />
        </Box>
      ) : (
        <>
          <Box w={'95%'} h={'100%'}>
            {follow ? (
              <DiagnosisHome
                idPerson={patient.id}
                setShowIndex={value => {
                  setFollow(!value);
                }}
              />
            ) : (
              <>
                <Box
                  safeAreaTop
                  mt={'10%'}
                  bg={
                    'Genero' in patient
                      ? patient.Genero == 'Masculino'
                        ? 'blue.200'
                        : 'red.200'
                      : 'white'
                  }
                  p={5}
                  borderRadius={'3xl'}>
                  <Text fontSize={'xl'} bold>
                    Nombre: {'Nombre' in patient ? patient.Nombre : ''}
                  </Text>
                  <Text fontSize={'md'}>
                    Edad: {'Edad' in patient ? patient.Edad : ''}
                  </Text>
                  <Text fontSize={'md'}>
                    Peso: {'Peso' in patient ? patient.Peso : ''}
                  </Text>
                  <Text fontSize={'md'}>
                    Diagnostico:
                    {'Diagnostico' in patient ? patient.Diagnostico : ''}
                  </Text>
                </Box>
                <Button
                  color="success.400"
                  boldText={false}
                  w={'100%'}
                  text={'Continuar'}
                  colorClick={'success.800'}
                  onPress={() => {
                    setFollow(true);
                  }}
                />
                <Button
                  color="red.400"
                  boldText={false}
                  w={'100%'}
                  text={'Cerrar Caso'}
                  colorClick={'red.800'}
                  onPress={() => {
                    closed_bed(patient.id)
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
                    setModal(false);
                    setPatient({})
                  }}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Modal>
  );
};
export default DetailBed;
