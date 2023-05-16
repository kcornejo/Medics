import {FlatList, Box} from 'native-base';
import React from 'react';
import {Input} from './Input';
const FormFlatList = ({data}) => {
  return (
    <Box mb={10}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <Input
              placeholder={item.placeholder}
              type={item.date}
              label={item.label}
              name={item.name}
              errors={item.error}
              form={item.formData}
              setForm={item.setFormData}
              keyboardType={item.keyboardType}
            />
          );
        }}
      />
    </Box>
  );
};

export default FormFlatList;
