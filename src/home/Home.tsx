import React from 'react';
import {Pressable, ScrollView, Box, Text} from 'native-base';
import AlertMedics from '../support/AlertMedics';
import NewPersonHome from './NewPersonHome';
import Button from '../components/Button';
const Home = ({setShowIndex, showIndex}) => {
  return (
    <>
      <ScrollView bgColor={'info.50'} w={'100%'}>
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
      </ScrollView>
    </>
  );
};

export default Home;
