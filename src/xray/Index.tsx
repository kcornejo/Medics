import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertMedics from '../support/AlertMedics';
import {Box, HStack, Pressable, Text, VStack, ScrollView} from 'native-base';
import Button from '../components/Button';
import {ImageDetail} from './ImageDetail';
import {ImageObject} from '../support/Interfaces';
import {ListBedsSupport} from '../list_beds/ListBedsSupport';
import {saveXray} from './Firebase';
import {AlertMedicsContext, LoadContext} from '../support/Context';
interface PropsIndex {
  setShowIndex: (option: number) => void;
}

export const Index: React.FC<PropsIndex> = ({setShowIndex}) => {
  const [load, setLoad] = React.useContext(LoadContext);
  const [alerts, setAlerts] = React.useContext(AlertMedicsContext);
  const [patient, setPatient] = React.useState<any>({});
  const [xray, setXRay] = React.useState(true);
  const functionClickIndex = function () {
    setXRay(!xray);
  };
  const [listImage, setListImage] = React.useState<ImageObject[]>([]);
  const addImage = (location: string) => {
    setListImage(prevResult => [...prevResult, {url: location}]);
  };
  const cleanTmp = async () => {
    await ImagePicker.clean()
      .then(() => {})
      .finally(() => {})
      .catch(e => {
        console.error(e);
      });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(images => {
        for (let i = 0; i < images.length; i++) {
          addImage(images[i].path);
        }
      })
      .finally(() => {});
  };
  const openGalery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      addImage(image.path.toString());
    });
  };
  const save = async () => {
    setLoad(true);
    await saveXray(listImage, patient.id).catch(() => {
      setLoad(false);
    });
    await cleanTmp().catch(() => {
      setLoad(false);
    });
    setLoad(false);
    setAlerts({
      show: true,
      type: 'info',
      title: 'Exito',
      message: 'Imagenes cargadas correctamente',
    });
    setShowIndex(1);
  };
  return (
    <>
      <AlertMedics />
      <LinearGradient colors={['#ffffff', '#b3e5fc']}>
        {xray ? (
          <Box h={'100%'} mx={'5%'}>
            <VStack safeAreaTop mt="15%">
              <ScrollView w={'100%'} alignContent={'center'}>
                <Box h={'85%'}>
                  <ListBedsSupport
                    setPatient={setPatient}
                    functionClick={functionClickIndex}></ListBedsSupport>
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
        ) : (
          <Box h={'100%'} mx={'5%'} safeAreaTop>
            <Box h={'10%'}>
              <HStack h="100%" w="100%">
                <Box w="50%"></Box>
                <Box w="50%">
                  <Pressable
                    w="100%"
                    alignItems={'flex-end'}
                    onPress={() => {
                      setXRay(!xray);
                    }}>
                    {({isHovered, isFocused, isPressed}) => {
                      return (
                        <Box
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.8 : 1,
                              },
                            ],
                          }}
                          bg={'muted.200'}
                          w={'10'}
                          h={'10'}
                          alignItems={'center'}
                          rounded="3xl"
                          justifyContent={'center'}
                          shadow={3}
                          borderColor="coolGray.300">
                          <Icon name="remove" size={30} color="grey"></Icon>
                        </Box>
                      );
                    }}
                  </Pressable>
                </Box>
              </HStack>
            </Box>
            <VStack h={'60%'} bg={'trueGray.100'} rounded={'lg'}>
              {listImage.length === 0 ? (
                <Box w={'100%'} h="100%" justifyContent={'center'}>
                  <Box alignItems={'center'}>
                    <Icon name="photo" size={100} color="grey"></Icon>
                    <Text color={'grey'}>Sin imagenes</Text>
                  </Box>
                </Box>
              ) : (
                <ScrollView w={'100%'} alignContent={'center'}>
                  <ImageDetail list={listImage} setList={setListImage} />
                </ScrollView>
              )}
            </VStack>
            <Box h={'15%'}>
              <HStack h="100%" w="100%">
                <Box w="50%" alignItems={'center'}>
                  <Button
                    color="info.600"
                    boldText={false}
                    w={'90%'}
                    mb={5}
                    icon="photo"
                    text={''}
                    colorClick={'info.800'}
                    colorIcon={'white'}
                    onPress={() => {
                      openGalery();
                    }}
                  />
                </Box>
                <Box w="50%" alignItems={'center'}>
                  <Button
                    color="info.600"
                    boldText={false}
                    w={'90%'}
                    icon="camera"
                    text={''}
                    colorClick={'info.800'}
                    colorIcon={'white'}
                    onPress={() => {
                      openCamera();
                    }}
                  />
                </Box>
              </HStack>
            </Box>
            <Box h={'15%'}>
              <Box w="100%" alignItems={'center'}>
                <Button
                  color="success.600"
                  boldText={false}
                  w={'95%'}
                  icon="save"
                  text={''}
                  colorClick={'success.800'}
                  colorIcon={'white'}
                  onPress={() => {
                    save();
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </LinearGradient>
    </>
  );
};
