import React, {useState, useContext} from 'react';
import {
  ScrollView,
  VStack,
  Box,
  Pressable,
  Divider,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'native-base';
import {Input as InputKc} from '../components/Input';
import {validationForm} from '../support/Support';
import {AlertMedicsContext, LoadContext, UserContext} from '../support/Context';
import Register from './Register';
import AlertMedics from '../support/AlertMedics';
import {auth_firebase} from './Firebase';
import {Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../support/Loading';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState({});
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  const [load, setLoad] = useContext(LoadContext);
  const [user, setUser] = useContext(UserContext);
  const [visibleRegister, setVisibleRegister] = useState(false);

  const check_credentials = async data => {
    const validation = [
      {
        isRequired: true,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        obj: 'email',
        regexHelp: 'Ingrese un correo válido.',
      },
      {
        isRequired: true,
        regex: /^[0-9a-zA-Z\.\-\$\@\*]{6,}$/,
        obj: 'password',
        regexHelp:
          'Ingrese una clave segura y válida, caracteres permitidos: .,-,@,$',
      },
    ];
    const success = async data => {
      setLoad(true);
      try {
        const auth_ret = await auth_firebase(formData.email, formData.password);
        if (auth_ret.code === '001') {
          setAlerts({
            type: 'warning',
            title: 'Correo no confirmado',
            message: 'Por favor, ve a tu correo e ingresa al link enviado.',
            show: true,
          });
        } else if (auth_ret.code === '002') {
          setAlerts({
            type: 'error',
            title: 'Credenciales inválidas',
            message: 'Verifique sus credenciales',
            show: true,
          });
        } else if (auth_ret.code === '003') {
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
    };
    validationForm(
      data,
      setErrors,
      setAlerts,
      errors,
      alerts,
      validation,
      success,
    );
  };
  return (
    <>
      <Register visible={visibleRegister} setVisible={setVisibleRegister} />
      <AlertMedics />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Loading />
          <LinearGradient
            colors={['#ffffff', '#b3e5fc']}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box alignItems="center" w="100%" style={{flex: 1}} safeAreaTop>
              <Box w="100%" mt={10} mb={10}>
                <VStack alignItems="center">
                  <LinearGradient
                    colors={['#C7E9E2', '#0591B1']}
                    style={{borderRadius: 100}}>
                    <Box p={2}>
                      <Image
                        source={require('../resources/Logo.png')}
                        size={'md'}
                        alt="Logo"
                        borderRadius={'100'}
                      />
                    </Box>
                  </LinearGradient>
                </VStack>
                <VStack alignItems="center">
                  <Text bold fontSize="2xl" mb={10}>
                    Acceder
                  </Text>
                </VStack>
                <VStack mx={10} alignItems="center">
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
                <VStack mx={10} alignItems={'center'}>
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
                <VStack mx={10} alignItems="center">
                  <Pressable
                    mb={3}
                    w={'60%'}
                    mt="12"
                    onPress={() => {
                      check_credentials(formData);
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
                            colors={['#ffff', '#79B4BB']}
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
                              Acceder
                            </Text>
                          </LinearGradient>
                        </Box>
                      );
                    }}
                  </Pressable>
                  <Divider />
                  <Pressable
                    mb={3}
                    w={'50%'}
                    mt="5"
                    onPress={() => {
                      setData({});
                      setVisibleRegister(!visibleRegister);
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
                </VStack>
              </Box>
            </Box>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
