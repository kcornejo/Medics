import React, {useState, useContext} from 'react';
import {
  FormControl,
  ScrollView,
  VStack,
  Input,
  Box,
  Pressable,
  Divider,
  Text,
} from 'native-base';
import {validationsObjV2} from '../support/Support';
import {AlertMedicsContext, LoadContext, UserContext} from '../support/Context';
import Register from './Register';
import AlertMedics from '../support/AlertMedics';
import {auth_firebase} from './Firebase';
const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const [user, setUser] = useContext(UserContext);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const check_credentials = async (data: {}) => {
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
      setLoad(true);
      try {
        const auth_ret = await auth_firebase(formData.email, formData.password);
        if (auth_ret.code == '001') {
          setAlerts({
            type: 'warning',
            title: 'Correo no confirmado',
            message: 'Por favor, ve a tu correo e ingresa al link enviado.',
            show: true,
          });
        } else if (auth_ret.code == '002') {
          setAlerts({
            type: 'error',
            title: 'Credenciales invalidas',
            message: 'Verifique sus credenciales',
            show: true,
          });
        } else if (auth_ret.code == '003') {
          setAlerts({
            type: 'error',
            title: 'Error de conexión',
            message: `Error de conexión: ${auth_ret.message}`,
            show: true,
          });
        } else {
          setUser({...user, email: formData.email, auth: true});
        }
      } catch (e) {
        console.log(e.message);
      }

      setLoad(false);
    }
  };
  return (
    <>
      <Register visible={visibleRegister} setVisible={setVisibleRegister} />
      <AlertMedics />
      <ScrollView bg="cyan.50">
        <Box alignItems="center">
          <Box w="100%" maxW={400} mt={10} mb={10}>
            <VStack alignItems={'center'}>
              <Text bold fontSize="2xl" mb={10}>
                Acceder
              </Text>
            </VStack>
            <VStack mx={10} alignItems={'center'}>
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
            <VStack mx={10} alignItems={'center'}>
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
            <VStack mx={10} alignItems={'center'}>
              <Pressable
                mb={3}
                w={'55%'}
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
                        textAlign="center">
                        Acceder
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
                  setData({});
                  setVisibleRegister(!visibleRegister);
                }}>
                {({isHovered, isFocused, isPressed}) => {
                  return (
                    <Box
                      bg={
                        isPressed
                          ? 'info.900'
                          : isHovered
                          ? 'info.900'
                          : 'info.600'
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
                        textAlign="center">
                        Registrarse
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default Login;
