import React, {FC, useState} from 'react';
import {ListBedsSupport} from '../list_beds/ListBedsSupport';
import LinearGradient from 'react-native-linear-gradient';
import {Box, ScrollView, VStack} from 'native-base';
import Button from '../components/Button';
import StepFour from '../home/detail_diagnosis/breath/StepFour';
import AlertMedics from '../support/AlertMedics';
interface PropsIndex {
  setShowIndex: (option: number) => void;
}
export const Index: FC<PropsIndex> = ({setShowIndex}) => {
  const [patient, setPatient] = useState<any>({});
  const [nebu, setNebu] = useState(true);
  const functionClickIndex = function () {
    setNebu(!nebu);
  };
  return (
    <>
      <AlertMedics />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        {nebu === false ? (
          <StepFour
            idPerson={patient.id}
            setShowIndex={functionClickIndex}></StepFour>
        ) : (
          <Box h={'100%'} mx={'5%'}>
            <VStack h={'85%'} safeAreaTop>
              <ListBedsSupport
                setPatient={setPatient}
                functionClick={functionClickIndex}></ListBedsSupport>
            </VStack>
            <Box h={'15%'}>
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
