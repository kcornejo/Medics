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
import {Input as InputKc} from '../components/Input';
import {validationForm} from '../support/Support';
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
    const validation = [
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
    ];
    const success = async data => {
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
      <ScrollView bg="cyan.50">
        <Box alignItems="center">
          <Box w="100%" maxW={400} mt={10} mb={10}>
            <VStack alignItems={'center'}>
              <Text bold fontSize="2xl" mb={10}>
                Acceder
              </Text>
            </VStack>
            <VStack mx={10} alignItems={'center'}>
              <InputKc
                errors={errors}
                form={formData}
                setForm={setData}
                label="Correo"
                placeholder="Ingrese su Correo"
                name={'email'}
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
