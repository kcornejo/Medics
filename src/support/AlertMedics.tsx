import React, {useContext, useState} from 'react';
import {
  Collapse,
  Alert,
  HStack,
  VStack,
  Text,
  IconButton,
  Box,
  CloseIcon,
} from 'native-base';
import {AlertMedicsContext} from './Context';
const AlertMedics = () => {
  const [alerts, setAlerts] = useContext(AlertMedicsContext);
  return (
    <Collapse isOpen={alerts.show}>
      <Alert status={alerts.type} pt={5}>
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={3}
            alignItems="center"
            justifyContent="space-between">
            <HStack flexShrink={1} space={5} alignItems="center">
              <Alert.Icon />
              <Text
                fontSize="md"
                fontWeight="medium"
                _dark={{
                  color: 'coolGray.800',
                }}>
                {alerts.title !== undefined ? alerts.title : ''}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
              onPress={() => setAlerts({...alerts, show: false})}
            />
          </HStack>
          <Box
            ml={3}
            pl="6"
            _dark={{
              _text: {
                color: 'coolGray.600',
              },
            }}>
            {alerts.message !== undefined ? alerts.message : ''}
          </Box>
        </VStack>
      </Alert>
    </Collapse>
  );
};
export default AlertMedics;
