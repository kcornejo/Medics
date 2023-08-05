import React, {useEffect} from 'react';
import {Text, Box} from 'native-base';
import {Input} from '../../../components/Input';
import {SelectSimple} from '../../../components/SelectSimple';
const Medicaments = ({number = 0, error, formData, setFormData}) => {
  useEffect(() => {
    if (
      formData['Medicamentos'] !== undefined &&
      formData['Medicamentos'].length > 0
    ) {
      for (let i = 0; i < formData['Medicamentos'].length; i++) {
        setFormData(formData => {
          return {
            ...formData,
            [`Medicamento ${i + 1}`]: formData['Medicamentos'][i].Medicamento,
            [`Horario ${i + 1}`]: formData['Medicamentos'][i].Horario,
          };
        });
      }
    }
  }, [1]);
  const opcionesMedicamento = [
    {value: 'Salbutamol', label: 'Salbutamol'},
    {value: 'Budesonida', label: 'Budesonida'},
    {value: 'Tropium', label: 'Tropium'},
    {value: 'Dexametasona', label: 'Dexametasona'},
    {value: 'Alpha Dornasa', label: 'Alpha Dornasa'},
    {value: 'Adrenalina Racemica', label: 'Adrenalina Racemica'},
    {value: 'Hipertonica', label: 'Hipertonica'},
  ];
  const opcionesFrecuencia = [
    {value: 'Cada 3 horas', label: 'Cada 3 horas'},
    {value: 'Cada 4 horas', label: 'Cada 4 horas'},
    {value: 'Cada 6 horas', label: 'Cada 6 horas'},
    {value: 'Cada 8 horas', label: 'Cada 8 horas'},
    {value: 'Cada 12 horas', label: 'Cada 12 horas'},
  ];
  const opcionesTipo = [
    {value: 'Humeda', label: 'Humeda'},
    {value: 'Puff', label: 'Puff'},
  ];
  const retorno = [];

  for (let i = 0; i < number; i++) {
    const numero_muestra = i + 1;
    retorno.push(
      <Box flex={1} w="100%" key={'box' + i}>
        <Text key={'med_text' + i} fontSize={'md'} textAlign="center">
          Medicamento {numero_muestra}
        </Text>
        <SelectSimple
          placeholder="Tipo de Neubolización"
          type="select"
          options={opcionesTipo}
          label="Tipo de Neubolización"
          name={'Tipo de Neubolizacion ' + numero_muestra}
          errors={error}
          form={formData}
          setForm={setFormData}
        />

        <SelectSimple
          placeholder="Medicamento"
          type="select"
          key_in={'med_med' + numero_muestra}
          key={'med_med' + numero_muestra}
          options={opcionesMedicamento}
          label="Medicamento"
          name={'Medicamento ' + numero_muestra}
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        {formData['Tipo de Neubolizacion ' + numero_muestra] == 'Humeda' ? (
          <Input
            placeholder="Dosis"
            type="input"
            key_in={'med_dosis' + numero_muestra}
            key={'med_dosis' + numero_muestra}
            label="Dosis"
            name={'Dosis ' + numero_muestra}
            errors={error}
            form={formData}
            setForm={setFormData}
          />
        ) : null}
        {formData['Tipo de Neubolizacion ' + numero_muestra] == 'Puff' ? (
          <Input
            placeholder="Cantidad"
            type="input"
            key_in={'med_cantidad' + numero_muestra}
            key={'med_cantidad' + numero_muestra}
            label="Cantidad"
            name={'Cantidad ' + numero_muestra}
            errors={error}
            form={formData}
            setForm={setFormData}
          />
        ) : null}

        <SelectSimple
          placeholder="Horario"
          type="select"
          key_in={'med_hor' + numero_muestra}
          key={'med_hor' + numero_muestra}
          options={opcionesFrecuencia}
          label="Horario"
          name={'Horario ' + numero_muestra}
          errors={error}
          form={formData}
          setForm={setFormData}
        />
      </Box>,
    );
  }
  return retorno;
};

export default Medicaments;
