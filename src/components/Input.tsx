import React, {useState} from 'react';
import {
  FormControl,
  Input as InputBase,
  TextArea,
  Select,
  CheckIcon,
  CloseIcon,
} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PasswordType from './PasswordType';
const Input = ({
  placeholder = '',
  iconRight,
  iconLeft,
  type = 'input',
  help = '',
  label = '',
  isRequired = true,
  name = '',
  errors = {},
  setForm = {},
  form = {},
  options = [],
  startDate = new Date(),
  keyboardType = 'default',
  isFocused = false,
}) => {
  const [dateString, setDateString] = useState(startDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    if (type == 'date') {
      setDatePickerVisibility(true);
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = dateR => {
    setForm({
      ...form,
      [name]:
        ('0' + dateR.getDate()).slice('-2') +
        '/' +
        ('0' + (dateR.getMonth() + 1)).slice('-2') +
        '/' +
        dateR.getFullYear(),
    });
    setDateString(dateR);
    hideDatePicker();
  };
  const iconRightModified = (
    <>
      {name in errors && <CloseIcon mr={1} color={'red.800'} size={5} />}
      {Object.keys(errors).length > 0 && !(name in errors) && (
        <CheckIcon mr={1} color={'green.800'} size={6} />
      )}
      {iconRight}
    </>
  );
  return (
    <>
      {type == 'date' ? (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={dateString}
        />
      ) : null}
      <FormControl isRequired={isRequired} isInvalid={name in errors}>
        <FormControl.Label>{label}</FormControl.Label>
        {(type == 'input' || type == 'date') && (
          <InputBase
            keyboardType={keyboardType}
            value={form[name]}
            InputRightElement={iconRightModified}
            iconLeft={iconLeft}
            borderRadius={10}
            onFocus={showDatePicker}
            placeholder={placeholder}
            onChangeText={value => {
              setForm({...form, [name]: value});
            }}></InputBase>
        )}
        {type == 'select' && (
          <Select
            selectedValue={form[name]}
            placeholder={placeholder}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            InputRightElement={iconRightModified}
            onValueChange={value => {
              setForm({...form, [name]: value});
            }}>
            {options.map(function (object, i) {
              const name_obj = object.label + '_' + i;
              return (
                <Select.Item
                  label={object.label}
                  value={object.value}
                  key={name_obj}
                />
              );
            })}
          </Select>
        )}
        {type == 'textarea' && (
          <TextArea
            keyboardType={keyboardType}
            value={form[name]}
            iconRight={iconRight}
            iconLeft={iconLeft}
            InputRightElement={iconRightModified}
            borderRadius={10}
            placeholder={placeholder}
            onChangeText={value => {
              setForm({...form, [name]: value});
            }}
          />
        )}
        {type == 'password' && (
          <PasswordType
            keyboardType={keyboardType}
            value={form[name]}
            iconRight={iconRightModified}
            iconLeft={iconLeft}
            borderRadius={10}
            placeholder={placeholder}
            setValue={value => {
              setForm({...form, [name]: value});
            }}
          />
        )}

        {name in errors ? (
          <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>{help}</FormControl.HelperText>
        )}
      </FormControl>
    </>
  );
};

export {Input};
