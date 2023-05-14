import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Box, Text, HStack, Badge, Pressable} from 'native-base';
import {list_patients} from './Firebase';
import {LoadContext} from '../support/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import DiagnosisHome from '../home/detail_diagnosis/breath/DiagnosisHome';
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
    <>
      <Box flex={1}>
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
    </>
  );
};
function ListObj({item, setShowIndex, setIdPerson}) {
  return (
    <Pressable
      onPress={() => {
        setIdPerson(item.Id);
        setShowIndex(false);
      }}>
      <Box
        m={3}
        rounded={'xl'}
        h={70}
        bg={item.Genero == 'Masculino' ? 'info.200' : 'red.200'}>
        <HStack h={'100%'} justifyContent={'center'} space={3}>
          <Box justifyContent={'center'}>
            {item.Genero == 'Masculino' ? (
              <Icon name="male" size={50} />
            ) : (
              <Icon name="female" size={50} />
            )}
          </Box>
          <Box justifyContent={'center'}>
            <Text fontSize={'xl'}>{item.Nombre}</Text>
          </Box>
          <Box justifyContent={'center'} w={'50%'} alignItems={'flex-end'}>
            <Badge rounded={'full'}>
              <Text fontSize={'2xl'}>{item.Cama}</Text>
            </Badge>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
}
export default History;
