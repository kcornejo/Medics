import React from 'react';
import {Box, HStack, Pressable, Center, Text} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
const BarBottom = ({setOption, setShowIndex}) => {
  const setOptionDelete = option => {
    setOption(option);
    setShowIndex(true);
  };
  return (
    <Box width="100%" alignSelf="center">
      <HStack bg="emerald.500" alignItems="center" shadow={6}>
        <Pressable py={4} flex={1} onPress={() => setOptionDelete(1)}>
          <Center>
            <Icon name="book" size={30} color="white" />
            <Text color="white" bold fontSize="12">
              Historial
            </Text>
          </Center>
        </Pressable>
        <Pressable flex={1} onPress={() => setOptionDelete(2)}>
          <Center>
            <Icon name="home" size={30} color="white" />
            <Text color="white" fontSize="12" bold>
              Inicio
            </Text>
          </Center>
        </Pressable>
        <Pressable flex={1} onPress={() => setOptionDelete(3)}>
          <Center>
            <Icon name="gear" size={30} color="white" />
            <Text color="white" fontSize="12" bold>
              Configuración
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default BarBottom;
