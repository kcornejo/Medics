import React from 'react';
import {
  FormControl,
  CheckIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
const SelectSimple = ({
  placeholder = '',
  help = '',
  label = '',
  isRequired = true,
  name = '',
  errors = {},
  setForm = {},
  form = {},
  options = [],
  key_in = '',
  selectedValue = null,
}) => {
  const iconRightModifiedOpen = (
    <>
      {name in errors && <CloseIcon mr={1} color={'red.800'} size={5} />}
      {Object.keys(errors).length > 0 && !(name in errors) && (
        <CheckIcon key={key_in + 'check'} mr={1} color={'green.800'} size={6} />
      )}
      <ChevronUpIcon size={6} mr={2} key={key_in + 'up_icon'} />
    </>
  );
  const iconRightModifiedClose = (
    <>
      {name in errors && <CloseIcon mr={1} color={'red.800'} size={5} />}
      {Object.keys(errors).length > 0 && !(name in errors) && (
        <CheckIcon key={key_in + 'check'} mr={1} color={'green.800'} size={6} />
      )}
      <ChevronDownIcon size={6} mr={2} key={key_in + 'down_icon'} />
    </>
  );
  let options_complete = [];
  if (options[0] !== undefined && options[0].value !== undefined) {
    for (let i = 0; i < options.length; i++) {
      options_complete.push(options[i].value);
    }
  } else {
    options_complete = options;
  }
  return (
    <>
      <FormControl
        isRequired={isRequired}
        isInvalid={name in errors}
        key={key_in + 'form'}>
        <FormControl.Label key={key_in + 'label'}>{label}</FormControl.Label>
        <SelectDropdown
          data={options_complete}
          defaultButtonText={'[Seleccione una opción]'}
          defaultValue={form[name]}
          onSelect={(selectedItem, index) => {
            setForm({...form, [name]: selectedItem});
          }}
          buttonStyle={{
            width: '100%',
            height: 30,
            backgroundColor: '#FFF',
            borderRadius: 8,
            borderWidth: 0.3,
            borderColor: 'grey',
          }}
          buttonTextStyle={{
            fontSize: 12,
            textAlign: 'left',
          }}
        />
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

export {SelectSimple};
