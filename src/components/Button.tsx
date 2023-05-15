import React from 'react';
import {Pressable, Box, Text} from 'native-base';
const Button = ({
  onPress,
  text,
  color,
  colorClick,
  icon,
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
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default Button;
