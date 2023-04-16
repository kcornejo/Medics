import React, {useState, useContext} from 'react';
import {
  Modal,
  Box,
  VStack,
  FormControl,
  Input,
  Pressable,
  Text,
  Divider,
  ScrollView,
} from 'native-base';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {validationsObjV2} from '../support/Support';
import AlertMedics from '../support/AlertMedics';
import {register_firebase} from './Firebase';
import Loading from '../support/Loading';
export default function Register({visible = false, setVisible = {}}) {
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const register = async data => {
    setAlerts({
      ...alerts,
      show: false,
    });
    setErrors(errors => {
      return {};
    });
    const validation = validationsObjV2(data, [
      {
        isRequired: true,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        obj: 'email',
        regexHelp: 'Ingrese un correo valido.',
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
      setAlerts({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'Por favor valida la información ingresada.',
      });
    } else {
      if (data.password != data.repeatPassword) {
        setAlerts({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'Las contraseñas no coinciden.',
        });
        setErrors(errors => {
          return {
            ...errors,
            repeatPassword: 'Las contraseñas no coinciden',
          };
        });
      } else {
        setLoad(true);
        const register = await register_firebase(data.email, data.password);
        if (register.code != '000') {
          setAlerts({
            show: true,
            type: 'error',
            title: 'Error en creación',
            message: `${register.message}`,
          });
        } else {
          setAlerts({
            show: true,
            type: 'info',
            title: 'Usuario',
            message: 'Usuario creado correctamente, por favor revise su correo',
          });
          setVisible(!visible);
          setData({});
        }
        setLoad(false);
      }
    }
  };
  return (
    <>
      <Modal isOpen={visible} bgColor={'cyan.100'} size={'full'} w={'100%'}>
        <Loading />
        <Box w={'100%'}>
          <AlertMedics />
        </Box>
        <Box alignItems="center" mt={10}>
          <Box w="100%">
            <VStack alignItems={'center'}>
              <Text bold fontSize="2xl" mb={10}>
                Registro de Usuario
              </Text>
            </VStack>
            <ScrollView>
              <VStack alignItems={'center'}>
                <FormControl isRequired isInvalid={'email' in errors}>
                  <FormControl.Label>Correo</FormControl.Label>
                  <Input
                    value={formData.email}
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

              <VStack alignItems={'center'}>
                <FormControl isRequired isInvalid={'password' in errors}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    value={formData.password}
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
              <VStack alignItems={'center'}>
                <FormControl isRequired isInvalid={'repeatPassword' in errors}>
                  <FormControl.Label>Repita su password</FormControl.Label>
                  <Input
                    value={formData.repeatPassword}
                    type="password"
                    onChangeText={repeatPassword => {
                      setData({...formData, repeatPassword});
                    }}></Input>
                  {'repeatPassword' in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.repeatPassword}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText>
                      Repita su password
                    </FormControl.HelperText>
                  )}
                </FormControl>
              </VStack>
              <VStack alignItems={'center'}>
                <Pressable
                  mb={3}
                  w={'55%'}
                  onPress={() => {
                    register(formData);
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
                          textAlign={'center'}>
                          Registrarse
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
                <Divider />
                <Pressable
                  mb={3}
                  w={'50%'}
                  onPress={() => {
                    setVisible(!visible);
                  }}>
                  {({isHovered, isFocused, isPressed}) => {
                    return (
                      <Box
                        bg={
                          isPressed
                            ? 'error.900'
                            : isHovered
                            ? 'error.900'
                            : 'error.600'
                        }
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                        p="2"
                        mt="5"
                        rounded="8"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300">
                        <Text
                          color="white"
                          fontWeight="bold"
                          fontSize="lg"
                          textAlign={'center'}>
                          Regresar
                        </Text>
                      </Box>
                    );
                  }}
                </Pressable>
              </VStack>
            </ScrollView>
          </Box>
        </Box>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}
