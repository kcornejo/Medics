import {HStack, VStack, Box, Pressable, Image, Text} from 'native-base';
import React, {FC, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {Input} from '../components/Input';
import {Input as InputBase} from 'native-base';
import {searchPatient} from './Firebase';
import {initialWindowMetrics} from 'react-native-safe-area-context';
const PrintButton: FC = ({bed_number}) => {
  return (
    <Pressable w={'30%'} mr={'3.33%'} mb={'5%'} onPress={() => {}}>
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
            bg={'green.300'}
            borderRadius={10}
            h={'100%'}
            alignItems={'center'}
            rounded="3xl"
            justifyContent={'center'}
            shadow={3}
            borderColor="coolGray.300">
            <Icon size={30} color="grey">
              {bed_number}
            </Icon>
          </Box>
        );
      }}
    </Pressable>
  );
};
const RowButtons = ({num_min, num_max}) => {
  var row = [];
  for (var i = num_min; i <= num_max; i++) {
    row.push(<PrintButton bed_number={i} key={'row_' + i} />);
  }
  return row;
};
export const Index: FC<any> = ({setShowIndex}) => {
  const [buscador, setBuscador] = useState('');
  const [cargando, setCargando] = useState(false);
  const [div, setDiv] = useState<any[]>([]);
  const buscar = async (texto: string) => {
    const retorno = await searchPatient(texto);
    setCargando(false);
    var div_fun: any[] = [];
    retorno.forEach(items => {
      div_fun.push(items.data());
    });
    console.log(div_fun);
    setDiv(div_fun);
  };
  return (
    <VStack h={'100%'} safeAreaTop mx={'5%'}>
      <Box w={'100%'} alignItems={'center'}>
        <InputBase
          my={'10%'}
          w={'92%'}
          style={{
            height: 40,
          }}
          borderRadius={10}
          placeholder="Ingrese paciente a buscar"
          onChangeText={value => {
            setBuscador(value);
            if (value !== '') {
              setCargando(true);
              buscar(value);
            } else {
              setCargando(false);
            }
          }}
        />
      </Box>
      {buscador === '' ? (
        <>
          <HStack space={'3.33%'} w={'100%'} h={'13%'}>
            <RowButtons num_min={1} num_max={3} />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'13%'}>
            <RowButtons num_min={4} num_max={6} />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'13%'}>
            <RowButtons num_min={7} num_max={9} />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'13%'}>
            <RowButtons num_min={10} num_max={12} />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'13%'}>
            <RowButtons num_min={13} num_max={15} />
          </HStack>
        </>
      ) : (
        <>
          {cargando ? (
            <Box w={'100%'} alignItems={'center'}>
              <Image
                source={require('../resources/loading.gif')}
                alt="Cargando..."
                size="2xl"
              />
            </Box>
          ) : (
            <>
              {div.map(function (object, i) {
                return (
                  <Box
                    w={'100%'}
                    borderRadius={'2xl'}
                    bg={object.Genero == 'Femenino' ? 'red.100' : 'blue.100'}
                    key={i}
                    p={2}>
                    <Text bold fontSize={'xl'}>
                      {object.Nombre}
                    </Text>
                    <Text>
                      <Text bold>Edad: </Text>
                      {object.Edad}
                    </Text>
                    <Text>
                      <Text bold>Diagnostico: </Text>
                      {object.Diagnostico}
                    </Text>
                  </Box>
                );
              })}
            </>
          )}
        </>
      )}
      <Box w={'97%'}>
        <Button
          color="info.600"
          boldText={false}
          w={'100%'}
          mb={100}
          text={'Inicio'}
          colorClick={'info.800'}
          onPress={() => {
            setShowIndex(1);
          }}
        />
      </Box>
    </VStack>
  );
};

export default Index;
