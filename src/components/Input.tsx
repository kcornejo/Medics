import React, {useState} from 'react';
import {
  FormControl,
  Input as InputBase,
  TextArea,
  Select,
  CheckIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
  key_in = '',
  selectedValue = null,
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
        <CheckIcon key={key_in + 'check'} mr={1} color={'green.800'} size={6} />
      )}
      {iconRight}
    </>
  );
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
  return (
    <>
      {type == 'date' ? (
        <DateTimePickerModal
          key={key_in + 'modal'}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={dateString}
        />
      ) : null}
      <FormControl
        isRequired={isRequired}
        isInvalid={name in errors}
        key={key_in + 'form'}>
        <FormControl.Label key={key_in + 'label'}>{label}</FormControl.Label>
        {(type == 'input' || type == 'date') && (
          <InputBase
            keyboardType={keyboardType}
            value={form[name]}
            InputRightElement={iconRightModified}
            iconLeft={iconLeft}
            borderRadius={10}
            key={key_in + 'input'}
            onFocus={showDatePicker}
            placeholder={placeholder}
            onChangeText={value => {
              setForm({...form, [name]: value});
            }}></InputBase>
        )}
        {type == 'select' && (
          <Select
            selectedValue={selectedValue === null ? form[name] : selectedValue}
            placeholder={placeholder}
            key={key_in + 'select'}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            dropdownOpenIcon={iconRightModifiedOpen}
            dropdownCloseIcon={iconRightModifiedClose}
            onValueChange={value => {
              setForm({...form, [name]: value});
            }}>
            {options.map(function (object, i) {
              const name_obj = object.label + '_' + i;
              return (
                <Select.Item
                  key={key_in + 'item' + name_obj}
                  label={object.label}
                  value={object.value}
                />
              );
            })}
          </Select>
        )}
        {type == 'textarea' && (
          <TextArea
            key={key_in + 'text_area'}
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
            key={key_in + 'password'}
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

export {Input};
