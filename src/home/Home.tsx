import React, {useContext} from 'react';
import {Pressable, Box, Text, HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AlertMedics from '../support/AlertMedics';
import NewPersonHome from './NewPersonHome';
import {UserContext} from '../support/Context';

const Home = ({setShowIndex}) => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <Box bgColor={'info.50'} w={'100%'} flex={1}>
        <AlertMedics />
        <>
          <Box mx={5} mt={10}>
            <VStack h={'100%'} space={'2%'}>
              <Box w={'100%'} h={'5%'} alignItems={'flex-end'}>
                <Box w={'20%'} alignItems={'center'}>
                  <Pressable
                    w="100%"
                    onPress={() => {
                      setUser({});
                    }}>
                    {({isHovered, isFocused, isPressed}) => {
                      return (
                        <Box
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.8 : 1,
                              },
                            ],
                          }}
                          h={'100%'}
                          alignItems={'center'}
                          rounded="2xl"
                          justifyContent={'center'}
                          shadow={3}
                          borderColor="coolGray.300">
                          <Icon name="sign-out" size={30} color="grey"></Icon>
                        </Box>
                      );
                    }}
                  </Pressable>
                </Box>
              </Box>
              <HStack space={'5%'} w={'100%'} h={'30%'}>
                <Pressable
                  w="47.5%"
                  onPress={() => {
                    setShowIndex(2);
                  }}>
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        borderTopLeftRadius={100}
                        h={'100%'}
                        alignItems={'center'}
                        rounded="2xl"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Icon name="plus" size={100} color="black"></Icon>
                        <Text fontSize="md" mt={5} textAlign="center">
                          Nuevo PX
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
                <Pressable w="47.5%">
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        borderTopRightRadius={100}
                        h={'100%'}
                        alignItems={'center'}
                        rounded="2xl"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Icon name="search" size={100} color="black"></Icon>
                        <Text fontSize="md" mt={5} textAlign="center">
                          Consulta PX
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
              </HStack>
              <HStack space={'5%'} h={'25%'}>
                <Pressable w="47.5%">
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        alignItems={'center'}
                        h={'100%'}
                        rounded="2xl"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <FontAwesome5 size={80} name={'fan'} solid />
                        <Text fontSize="md" mt={5} textAlign="center">
                          Neubolización
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
                <Pressable w="47.5%">
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        h={'100%'}
                        rounded="2xl"
                        shadow={3}
                        alignItems={'center'}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Icon size={70} color="black">
                          RX
                        </Icon>
                        <Text fontSize="md" mt={5} textAlign="center">
                          Radiografias
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
              </HStack>
              <HStack space={'5%'} h={'25%'}>
                <Pressable w="47.5%">
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        alignItems={'center'}
                        h={'100%'}
                        rounded="2xl"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Icon name={'book'} size={80} color="black"></Icon>
                        <Text fontSize="md" mt={5} textAlign="center">
                          Reporte Diario
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
                <Pressable w="47.5%">
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="5"
                        alignItems={'center'}
                        h={'100%'}
                        rounded="2xl"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Icon name={'cogs'} size={80} color="black"></Icon>
                        <Text fontSize="md" textAlign="center">
                          Conteo de Equipo
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
              </HStack>
            </VStack>
          </Box>
        </>
      </Box>
    </>
  );
};

export default Home;
