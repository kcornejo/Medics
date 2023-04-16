import React, {useState} from 'react';
import {Pressable, ScrollView, Text, Box} from 'native-base';
import NewPerson from './home/NewPerson';
const Home = () => {
  const [ventana, setVentana] = useState(1);
  return (
    <ScrollView>
      {ventana == 1 && (
        <Box alignItems="center" mt="5%">
          <Pressable
            onPress={() => {
              setVentana(2);
            }}>
            <Text>Nuevo Paciente</Text>
          </Pressable>
        </Box>
      )}
      {ventana == 2 && <NewPerson></NewPerson>}
    </ScrollView>
  );
};

export default Home;
