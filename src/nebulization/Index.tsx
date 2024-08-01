import React, {FC} from 'react';
import {ListBedsSupport} from '../list_beds/ListBedsSupport';
import LinearGradient from 'react-native-linear-gradient';
import {Box, ScrollView, VStack} from 'native-base';
import Button from '../components/Button';
import Loading from '../support/Loading';
interface PropsIndex {
  setShowIndex: (option: number) => void;
}
export const Index: FC<PropsIndex> = ({setShowIndex}) => {
  return (
    <>
      <Loading />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        <Box h={'100%'} mx={'5%'}>
          <VStack safeAreaTop mt="15%">
            <ScrollView w={'100%'} alignContent={'center'}>
              <Box h={'85%'}>
                <ListBedsSupport></ListBedsSupport>
              </Box>
            </ScrollView>
          </VStack>
          <Box h={'15%'} justifyContent={'flex-end'}>
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
        </Box>
      </LinearGradient>
    </>
  );
};
