import React, {useState, useEffect} from 'react';
import {Pressable, ScrollView, Text, Box, VStack} from 'native-base';
import NewPerson from './NewPerson';
import MoreInfoPerson from './MoreInfoPerson';
import Diagnosis from './Diagnosis';
import AlertMedics from '../support/AlertMedics';
import DiagnosisHome from './detail_diagnosis/breath/DiagnosisHome';
const Home = ({ventanaPadre}) => {
  const [ventana, setVentana] = useState(5);
  const [formData, setFormData] = useState({});
  return (
    <>
      <ScrollView bgColor={'info.50'} w={'100%'}>
        <AlertMedics />
        {ventana == 1 && (
          <VStack alignItems={'center'} mx="10%">
            <Pressable
              bg="emerald.300"
              mt="10"
              w={'100%'}
              shadow={3}
              rounded={'2xl'}
              borderWidth="0.1"
              onPress={() => {
                setVentana(2);
              }}>
              <Box p="2" borderColor="coolGray.300">
                <Text fontSize="xl" textAlign={'center'}>
                  Nuevo Paciente
                </Text>
              </Box>
            </Pressable>
          </VStack>
        )}
        {ventana == 2 && (
          <NewPerson
            setVentana={setVentana}
            formData={formData}
            setFormData={setFormData}></NewPerson>
        )}
        {ventana == 3 && (
          <MoreInfoPerson
            setVentana={setVentana}
            formData={formData}
            setFormData={setFormData}></MoreInfoPerson>
        )}
        {ventana == 4 && (
          <Diagnosis
            setVentana={setVentana}
            formData={formData}
            setFormData={setFormData}></Diagnosis>
        )}
        {ventana == 5 && <DiagnosisHome />}
      </ScrollView>
    </>
  );
};

export default Home;
