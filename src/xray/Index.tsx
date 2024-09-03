import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
interface PropsIndex {
  setShowIndex: (option: number) => void;
}
export const Index: React.FC<PropsIndex> = ({setShowIndex}) => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
    multiple: true,
  })
    .then(image => {
      console.log(image);
    })
    .finally(() => {
      setShowIndex(1);
    });
  return <></>;
};
