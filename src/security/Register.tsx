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
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'native-base';
import {AlertMedicsContext, LoadContext} from '../support/Context';
import {Input as InputKc} from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';
import {validationsObjV2} from '../support/Support';
import AlertMedics from '../support/AlertMedics';
import {register_firebase} from './Firebase';
import {Platform} from 'react-native';
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
      {
        isRequired: true,
        regex: /^[0-9a-zA-Z\.\-\$\@\*]{6,}$/,
        obj: 'repeatPassword',
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
      <Modal isOpen={visible} style={{flex: 1, width: '100%'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, width: '100%'}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, width: '100%'}}>
            <LinearGradient
              colors={['#ffff', '#CFFBFE']}
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading />
              <Box w={'100%'}>
                <AlertMedics />
              </Box>
              <Box alignItems="center" mt={10}>
                <Box mx={5}>
                  <VStack alignItems="center">
                    <LinearGradient
                      colors={['#C7E9E2', '#0591B1']}
                      style={{borderRadius: 100}}>
                      <Box p={2}>
                        <Image
                          source={require('../resources/Registro.png')}
                          size={'md'}
                          alt="Logo"
                          borderRadius={'100'}
                        />
                      </Box>
                    </LinearGradient>
                  </VStack>
                  <VStack alignItems={'center'}>
                    <Text bold fontSize="2xl" mb={10}>
                      Registro de Usuario
                    </Text>
                  </VStack>
                  <VStack alignItems={'center'}>
                    <InputKc
                      errors={errors}
                      form={formData}
                      setForm={setData}
                      label="Correo"
                      placeholder="Ingrese su Correo"
                      name="email"
                      help="Ingrese su Correo"
                    />
                  </VStack>

                  <VStack alignItems={'center'}>
                    <InputKc
                      errors={errors}
                      form={formData}
                      setForm={setData}
                      label="Contraseña"
                      placeholder="Ingrese su Contraseña"
                      name={'password'}
                      help="Ingrese su Contraseña"
                      type="password"
                    />
                  </VStack>
                  <VStack alignItems={'center'}>
                    <InputKc
                      errors={errors}
                      form={formData}
                      setForm={setData}
                      label="Repita su Contraseña"
                      placeholder="Repita su Contraseña"
                      name={'repeatPassword'}
                      help="Repita su Contraseña"
                      type="password"
                    />
                  </VStack>
                  <VStack alignItems={'center'}>
                    <Pressable
                      m={3}
                      w={'65%'}
                      onPress={() => {
                        register(formData);
                      }}>
                      {({isHovered, isFocused, isPressed}) => {
                        return (
                          <Box
                            style={{
                              transform: [
                                {
                                  scale: isPressed ? 0.9 : 1,
                                },
                              ],
                            }}
                            shadow={'5'}>
                            <LinearGradient
                              colors={['#ffff', '#0384C8']}
                              style={{flex: 1, borderRadius: 10}}>
                              <Text
                                m={'3'}
                                color="white"
                                fontWeight="bold"
                                fontSize="lg"
                                textAlign="center"
                                style={{
                                  textShadowColor: '#000',
                                  textShadowRadius: 1,
                                  textShadowOffset: {width: 1, height: 1},
                                }}>
                                Registrarse
                              </Text>
                            </LinearGradient>
                          </Box>
                        );
                      }}
                    </Pressable>
                    <Divider />
                    <Pressable
                      mt={3}
                      w={'50%'}
                      onPress={() => {
                        setVisible(!visible);
                      }}>
                      {({isHovered, isFocused, isPressed}) => {
                        return (
                          <Box
                            style={{
                              transform: [
                                {
                                  scale: isPressed ? 0.9 : 1,
                                },
                              ],
                            }}
                            shadow={'5'}>
                            <LinearGradient
                              colors={['#ffff', '#DC2626']}
                              style={{flex: 1, borderRadius: 10}}>
                              <Text
                                m={'3'}
                                color="white"
                                fontWeight="bold"
                                fontSize="lg"
                                textAlign="center"
                                style={{
                                  textShadowColor: '#000',
                                  textShadowRadius: 1,
                                  textShadowOffset: {width: 1, height: 1},
                                }}>
                                Regresar
                              </Text>
                            </LinearGradient>
                          </Box>
                        );
                      }}
                    </Pressable>
                  </VStack>
                </Box>
              </Box>
              <Modal.Body></Modal.Body>
            </LinearGradient>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
