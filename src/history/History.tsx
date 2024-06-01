import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Box, Text, HStack, Badge, Pressable} from 'native-base';
import {list_patients} from './Firebase';
import {LoadContext} from '../support/Context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DiagnosisHome from '../home/detail_diagnosis/breath/DiagnosisHome';
import AlertMedics from '../support/AlertMedics';
const History = ({setShowIndex, showIndex}) => {
  const [load, setLoad] = useContext(LoadContext);
  const [data, setData] = useState([]);
  const [idPerson, setIdPerson] = useState(null);
  useEffect(() => {
    setLoad(true);
    list_patients().then(list => {
      let listado = [];
      list.forEach(obj => {
        listado.push({
          Nombre: obj.get('Nombre'),
          Cama: obj.get('NoCama'),
          Genero: obj.get('Genero'),
          Id: obj.id,
        });
      });
      setData(listado);
      setLoad(false);
    });
  }, [1]);
  return (
    <Box flex={1} bg="white">
      <AlertMedics />
      {showIndex ? (
        <>
          <Text fontSize={'xl'} textAlign={'center'} bold mt={5}>
            Listado de Pacientes
          </Text>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <>
                <ListObj
                  item={item}
                  setIdPerson={setIdPerson}
                  setShowIndex={setShowIndex}
                />
              </>
            )}></FlatList>
        </>
      ) : (
        <DiagnosisHome idPerson={idPerson} setShowIndex={setShowIndex} />
      )}
    </Box>
  );
};
function ListObj({item, setShowIndex, setIdPerson}) {
  return (
    <Pressable
      onPress={() => {
        setIdPerson(item.Id);
        setShowIndex(false);
      }}>
      {({isHovered, isFocused, isPressed}) => {
        return (
          <Box
            m={3}
            rounded={'xl'}
            h={70}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            bg={
              item.Genero == 'Masculino'
                ? isPressed
                  ? 'info.400'
                  : 'info.200'
                : isPressed
                ? 'red.400'
                : 'red.200'
            }>
            <HStack h={'100%'} justifyContent={'center'} space={3}>
              <Box justifyContent={'center'} w={'10%'}>
                <FontAwesome5 size={50} name={'baby'} solid />
              </Box>
              <Box justifyContent={'center'} w={'50%'}>
                <Text fontSize={'xl'}>{item.Nombre}</Text>
              </Box>
              <Box justifyContent={'center'} w={'15%'}>
                <Badge rounded={'full'}>
                  <Text fontSize={'2xl'}>{item.Cama}</Text>
                </Badge>
              </Box>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
export default History;
