import {HStack, VStack, Box, Pressable, Image, Text, Modal} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {Input as InputBase} from 'native-base';
import {searchPatient} from './Firebase';
import {list_patients} from '../history/Firebase';
import {BedUsed} from '../home/Firebase';
import DetailBed from './DetailBed';
const PrintButton: FC = ({
  bed_number,
  listBed,
  setModal,
  setPatient,
  setCargando,
}) => {
  return (
    <Pressable
      w={'30%'}
      mr={'3.33%'}
      mb={'5%'}
      onPress={() => {
        setModal(true);
        setCargando(true);
        BedUsed(bed_number).then(response => {
          response.forEach(item => {
            setPatient({id: item.id, ...item.data()});
          });
          setCargando(false);
        });
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
            bg={listBed.includes(bed_number) ? 'red.300' : 'green.300'}
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
const RowButtons = ({
  num_min,
  num_max,
  beds,
  setModal,
  setPatient,
  setCargando,
}) => {
  var row = [];
  for (var i = num_min; i <= num_max; i++) {
    row.push(
      <PrintButton
        bed_number={i}
        listBed={beds}
        key={'row_' + i}
        setModal={setModal}
        setPatient={setPatient}
        setCargando={setCargando}
      />,
    );
  }
  return row;
};
export const Index: FC<any> = ({setShowIndex}) => {
  const [buscador, setBuscador] = useState('');
  const [cargando, setCargando] = useState(false);
  const [cargandoDetail, setCargandoDetail] = useState(false);
  const [div, setDiv] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState({});
  useEffect(() => {
    setCargando(true);
    list_patients().then(response => {
      var beds_temp = [];
      response.forEach(item => {
        beds_temp.push(item.data().NoCama);
      });
      setBeds(beds_temp);
      setCargando(false);
    });
  }, [1]);
  const buscar = async (texto: string) => {
    const retorno = await searchPatient(texto);
    setCargando(false);
    var div_fun: any[] = [];
    retorno.forEach(items => {
      div_fun.push(items.data());
    });
    setDiv(div_fun);
  };
  return (
    <>
      <DetailBed
        modal={modal}
        setModal={setModal}
        patient={patient}
        cargandoDetail={cargandoDetail}
      />
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
        {buscador === '' && cargando === false ? (
          <>
            <HStack space={'3.33%'} w={'100%'} h={'13%'}>
              <RowButtons
                num_min={1}
                num_max={3}
                beds={beds}
                setModal={setModal}
                setPatient={setPatient}
                setCargando={setCargandoDetail}
              />
            </HStack>
            <HStack space={'3.33%'} w={'100%'} h={'13%'}>
              <RowButtons
                num_min={4}
                num_max={6}
                beds={beds}
                setModal={setModal}
                setPatient={setPatient}
                setCargando={setCargandoDetail}
              />
            </HStack>
            <HStack space={'3.33%'} w={'100%'} h={'13%'}>
              <RowButtons
                num_min={7}
                num_max={9}
                beds={beds}
                setModal={setModal}
                setPatient={setPatient}
                setCargando={setCargandoDetail}
              />
            </HStack>
            <HStack space={'3.33%'} w={'100%'} h={'13%'}>
              <RowButtons
                num_min={10}
                num_max={12}
                beds={beds}
                setModal={setModal}
                setPatient={setPatient}
                setCargando={setCargandoDetail}
              />
            </HStack>
            <HStack space={'3.33%'} w={'100%'} h={'13%'}>
              <RowButtons
                num_min={13}
                num_max={15}
                beds={beds}
                setModal={setModal}
                setPatient={setPatient}
                setCargando={setCargandoDetail}
              />
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
    </>
  );
};

export default Index;
