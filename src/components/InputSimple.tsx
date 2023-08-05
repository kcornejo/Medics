import React from 'react';
import {
  FormControl,
  Input as InputBase,
  CheckIcon,
  CloseIcon,
} from 'native-base';
const InputSimple = ({
  placeholder = '',
  iconRight,
  iconLeft,
  help = '',
  label = '',
  isRequired = true,
  name = '',
  errors = {},
  setForm = {},
  form = {},
  keyboardType = 'default',
  key_in = '',
}) => {
  const iconRightModified = (
    <>
      {name in errors && <CloseIcon mr={1} color={'red.800'} size={5} />}
      {Object.keys(errors).length > 0 && !(name in errors) && (
        <CheckIcon key={key_in + 'check'} mr={1} color={'green.800'} size={6} />
      )}
      {iconRight}
    </>
  );
  return (
    <>
      <FormControl
        isRequired={isRequired}
        isInvalid={name in errors}
        key={key_in + 'form'}>
        <FormControl.Label key={key_in + 'label'}>{label}</FormControl.Label>
        <InputBase
          keyboardType={keyboardType}
          value={form[name]}
          InputRightElement={iconRightModified}
          iconLeft={iconLeft}
          borderRadius={10}
          key={key_in + 'input'}
          placeholder={placeholder}
          onChangeText={value => {
            setForm({...form, [name]: value});
          }}></InputBase>

        {name in errors ? (
          <FormControl.ErrorMessage key={key_in + 'message'}>
            {errors[name]}
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText key={key_in + 'help'}>
            {help}
          </FormControl.HelperText>
        )}
      </FormControl>
    </>
  );
};

export {InputSimple};
