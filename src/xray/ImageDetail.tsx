import {FC} from 'react';
import {ImageDetailInterface} from '../support/Interfaces';
import {Box, HStack, Image, VStack, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ImageCompleteInterface {
  uri: string;
  i: number;
}

export const ImageDetail: FC<ImageDetailInterface> = ({list, setList}) => {
  let list_print = [];

  const ImageComplete: FC<ImageCompleteInterface> = ({uri, i}) => {
    return (
      <Box w="50%" alignItems={'center'}>
        <Pressable
          position={'absolute'}
          w="100%"
          alignItems={'flex-end'}
          zIndex={1}
          onPress={() => {
            let new_list_print = list.filter((_, index) => index !== i);
            setList(new_list_print);
          }}>
          {({isHovered, isFocused, isPressed}) => {
            return (
              <Box mr="15%">
                <Icon name="remove" size={25} color="black"></Icon>
              </Box>
            );
          }}
        </Pressable>
        <Image source={{uri: uri}} alt="Cargando..." size={'xl'} />
      </Box>
    );
  };
  for (let i = 0; i < list.length; i++) {
    let img = <ImageComplete uri={list[i].url} i={i} />;
    if (i < list.length - 1) {
      i++;
      img = (
        <HStack>
          {img}
          <ImageComplete uri={list[i].url} i={i} />
        </HStack>
      );
    }
    list_print.push(img);
  }
  return <VStack space={10}>{list_print}</VStack>;
};
