import {HStack, VStack, Box, Pressable, Image, Text, Modal} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {Input as InputBase} from 'native-base';
import {searchPatient} from './Firebase';
import {list_patients} from '../history/Firebase';
import {BedUsed} from '../home/Firebase';
import DiagnosisHome from '../home/detail_diagnosis/breath/DiagnosisHome';
const DetailBed = ({cargandoDetail, patient, setModal, modal}) => {
  const [follow, setFollow] = useState(false);
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
                    setModal(false);
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
