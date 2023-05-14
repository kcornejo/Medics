import React from 'react';
import {Pressable, ScrollView, Box, Text} from 'native-base';
import AlertMedics from '../support/AlertMedics';
import NewPersonHome from './NewPersonHome';
const Home = ({setShowIndex, showIndex}) => {
  return (
    <>
      <ScrollView bgColor={'info.50'} w={'100%'}>
        <AlertMedics />
        {showIndex == true && (
          <Pressable
            bg="emerald.300"
            mt="10"
            w={'100%'}
            shadow={3}
            rounded={'2xl'}
            borderWidth="0.1"
            onPress={() => {
              setShowIndex(false);
            }}>
            <Box p="2" borderColor="coolGray.300">
              <Text fontSize="xl" textAlign={'center'}>
                Nuevo Paciente
              </Text>
            </Box>
          </Pressable>
        )}
        {showIndex == false && <NewPersonHome setShowIndex={setShowIndex} />}
      </ScrollView>
    </>
  );
};

export default Home;
