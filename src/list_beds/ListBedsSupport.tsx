import {HStack, Box, Pressable, VStack} from 'native-base';
import React, {FC, useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BedUsed} from '../home/Firebase';
import {list_patients} from '../history/Firebase';
import {LoadContext} from '../support/Context';
const PrintButton: FC = ({bed_number, listBed, setPatient, functionClick}) => {
  return (
    <Pressable
      w={'30%'}
      mr={'3.33%'}
      mb={'5%'}
      onPress={() => {
        if (listBed.includes(bed_number)) {
          BedUsed(bed_number).then(response => {
            response.forEach(item => {
              setPatient({id: item.id, ...item.data()});
              functionClick();
            });
          });
        }
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
const RowButtons = ({num_min, num_max, beds, setPatient, functionClick}) => {
  var row = [];
  for (var i = num_min; i <= num_max; i++) {
    row.push(
      <PrintButton
        bed_number={i}
        listBed={beds}
        key={'row_' + i}
        functionClick={functionClick}
        setPatient={setPatient}
      />,
    );
  }
  return row;
};
export const ListBedsSupport: FC<any> = ({setPatient, functionClick}) => {
  const [beds, setBeds] = useState<any[]>([]);
  const [load, setLoad] = useContext(LoadContext);
  useEffect(() => {
    setLoad(true);
    list_patients().then(response => {
      var beds_temp = [];
      response.forEach(item => {
        beds_temp.push(item.data().NoCama);
      });
      setBeds(beds_temp);
      setLoad(false);
    });
  }, [0]);
  return (
    <>
      <Box h={'100%'}>
        <VStack h={'100%'}>
          <HStack w={'100%'} h={'20%'}>
            <RowButtons
              num_min={1}
              num_max={3}
              beds={beds}
              setPatient={setPatient}
              functionClick={functionClick}
            />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'20%'}>
            <RowButtons
              num_min={4}
              num_max={6}
              beds={beds}
              setPatient={setPatient}
              functionClick={functionClick}
            />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'20%'}>
            <RowButtons
              num_min={7}
              num_max={9}
              beds={beds}
              functionClick={functionClick}
              setPatient={setPatient}
            />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'20%'}>
            <RowButtons
              num_min={10}
              num_max={12}
              functionClick={functionClick}
              beds={beds}
              setPatient={setPatient}
            />
          </HStack>
          <HStack space={'3.33%'} w={'100%'} h={'20%'}>
            <RowButtons
              num_min={13}
              num_max={15}
              functionClick={functionClick}
              beds={beds}
              setPatient={setPatient}
            />
          </HStack>
        </VStack>
      </Box>
    </>
  );
};
