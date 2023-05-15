import React from 'react';
import {Pressable, ScrollView, Box, Text} from 'native-base';
import AlertMedics from '../support/AlertMedics';
import NewPersonHome from './NewPersonHome';
import Button from '../components/Button';
const Home = ({setShowIndex, showIndex}) => {
  return (
    <>
      <Box bgColor={'info.50'} w={'100%'} flex={1}>
        <AlertMedics />
        {showIndex == true && (
          <Box mx={5}>
            <Button
              color="emerald.300"
              boldText={false}
              mt={10}
              text={'Nuevo Paciente'}
              colorClick={'emerald.500'}
              onPress={() => {
                setShowIndex(false);
              }}
            />
          </Box>
        )}
        {showIndex == false && <NewPersonHome setShowIndex={setShowIndex} />}
      </Box>
    </>
  );
};

export default Home;
