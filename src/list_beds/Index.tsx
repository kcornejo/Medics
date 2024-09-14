import {VStack, Box, Image, Text, ScrollView} from 'native-base';
import React, {FC, useState} from 'react';
import Button from '../components/Button';
import {Input as InputBase} from 'native-base';
import {searchPatient} from './Firebase';
import LinearGradient from 'react-native-linear-gradient';
import DetailBed from './DetailBed';
import {ListBedsSupport} from './ListBedsSupport';
export const Index: FC<any> = ({setShowIndex}) => {
  const [buscador, setBuscador] = useState('');
  const [cargando, setCargando] = useState(false);
  const [cargandoDetail, setCargandoDetail] = useState(false);
  const [div, setDiv] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState({});
  const buscar = async (texto: string) => {
    const retorno = await searchPatient(texto);
    setCargando(false);
    var div_fun: any[] = [];
    retorno.forEach(items => {
      div_fun.push(items.data());
    });
    setDiv(div_fun);
  };
  const functionClick = function () {
    setModal(true);
  };
  return (
    <>
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        <DetailBed
          modal={modal}
          setModal={setModal}
          patient={patient}
          cargandoDetail={cargandoDetail}
          setPatient={setPatient}
        />
        <Box h={'100%'} mx={'5%'}>
          <VStack safeAreaTop>
            <Box w={'100%'} h={'20%'} alignItems={'center'}>
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
            <Box h="65%">
              {buscador === '' && cargando === false ? (
                <ListBedsSupport
                  setPatient={setPatient}
                  functionClick={functionClick}></ListBedsSupport>
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
                    <ScrollView w={'100%'} alignContent={'center'}>
                      {div.map(function (object, i) {
                        return (
                          <Box
                            my={'1'}
                            w={'100%'}
                            borderRadius={'2xl'}
                            bg={
                              object.Genero == 'Femenino'
                                ? 'red.100'
                                : 'blue.100'
                            }
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
                    </ScrollView>
                  )}
                </>
              )}
            </Box>
            <Box h={'15%'}>
              <Button
                color="info.600"
                boldText={false}
                w={'100%'}
                mb={5}
                text={'Inicio'}
                colorClick={'info.800'}
                onPress={() => {
                  setShowIndex(1);
                }}
              />
            </Box>
          </VStack>
        </Box>
      </LinearGradient>
    </>
  );
};

export default Index;
