import React, {useState} from 'react';
import {
  FormControl,
  ScrollView,
  VStack,
  Input,
  Box,
  Pressable,
  Text,
} from 'native-base';
import {validationsObjV2} from '../support/Support';
const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState({});
  const check_credentials = async (data: {}) => {
    setErrors(errors => {
      return {};
    });
    const validation = validationsObjV2(data, [
      {
        isRequired: true,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        obj: 'email',
      },
      {
        isRequired: true,
        regex: /^[0-9a-zA-Z\.\-\$\@\*]{6,}$/,
        obj: 'password',
        regexHelp:
          'Ingrese una clave segura y valida, caracteres permitidos: .,-,@,$',
      },
    ]);
    if (validation.error) {
      for (let i = 0; i < validation.list.length; i++) {
        setErrors(errors => {
          return {
            ...errors,
            [validation.list[i].obj]: validation.list[i].message,
          };
        });
      }
    } else {
    }
  };
  return (
    <ScrollView bg="info.100">
      <Box alignItems="center">
        <Box w="100%" maxW={400} mt={10}>
          <VStack mx={10} alignItems={'center'}>
            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                onChangeText={email => {
                  setData({...formData, email});
                }}></Input>
              {'email' in errors ? (
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Ingrese su correo
                </FormControl.HelperText>
              )}
            </FormControl>
          </VStack>
          <VStack mx={10} alignItems={'center'}>
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                onChangeText={password => {
                  setData({...formData, password});
                }}
                type="password"></Input>
              {'password' in errors ? (
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Ingrese su password
                </FormControl.HelperText>
              )}
            </FormControl>
          </VStack>
          <VStack mx={10} alignItems={'center'}>
            <Pressable
              onPress={() => {
                check_credentials(formData);
              }}>
              {({isHovered, isFocused, isPressed}) => {
                return (
                  <Box
                    bg={
                      isPressed
                        ? 'primary.900'
                        : isHovered
                        ? 'primary.900'
                        : 'primary.600'
                    }
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                    p="2"
                    mt="10"
                    rounded="8"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300">
                    <Text
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      alignContent="center">
                      Acceder
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Login;
