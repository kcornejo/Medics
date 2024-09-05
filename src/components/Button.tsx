import React from 'react';
import {Pressable, Box, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const Button = ({
  onPress,
  text,
  color,
  colorClick,
  icon = '',
  colorIcon = 'grey',
  sizeIcon = 30,
  w,
  mb = 0,
  mt = 0,
  colorText = 'black',
  boldText = false,
}) => {
  return (
    <Pressable mt={mt} mb={mb} w={w} onPress={onPress}>
      {({isHovered, isFocused, isPressed}) => {
        return (
          <Box
            bg={isPressed ? colorClick : isHovered ? colorClick : color}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            p="2"
            mt="5"
            rounded="2xl"
            shadow={3}
            borderWidth="1"
            borderColor="coolGray.300">
            <Text
              color={colorText}
              fontWeight={boldText ? 'bold' : 'normal'}
              fontSize="xl"
              textAlign="center">
              {text}
              {icon != '' ? (
                <Icon name={icon} size={sizeIcon} color={colorIcon}></Icon>
              ) : (
                <></>
              )}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default Button;
