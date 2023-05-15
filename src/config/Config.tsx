import React, {useContext} from 'react';
import {ScrollView, Text, Pressable, Box, VStack} from 'native-base';
import {UserContext} from '../support/Context';
const Config = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <ScrollView bgColor={'info.50'} w={'100%'}>
      <VStack alignItems={'center'} mx="10%" mt={10}>
        <Text fontSize={'xl'}>Configuración</Text>
        <Pressable
          bg="info.600"
          mt="10"
          w={'100%'}
          shadow={3}
          rounded={'2xl'}
          borderWidth="0.1"
          onPress={() => {
            setUser({});
          }}>
          <Box p="2" borderColor="coolGray.300">
            <Text fontSize="xl" textAlign={'center'}>
              Cerrar Sesión
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};

export default Config;
