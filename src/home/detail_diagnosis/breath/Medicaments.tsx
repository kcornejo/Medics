import React from 'react';
import {Text} from 'native-base';
import {Input} from '../../../components/Input';
const Medicaments = ({number = 0, error, formData, setFormData}) => {
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
  const retorno = [];
  for (let i = 0; i < number; i++) {
    const numero_muestra = i + 1;
    retorno.push(
      <>
        <Text key={'med_text' + i} fontSize={'md'}>
          Medicamento {numero_muestra}
        </Text>
        <Input
          placeholder="Medicamento"
          type="select"
          key={'med_med' + numero_muestra}
          options={opcionesMedicamento}
          label="Medicamento"
          name={'Medicamento ' + numero_muestra}
          errors={error}
          form={formData}
          setForm={setFormData}
        />
        <Input
          placeholder="Horario"
          type="select"
          key={'med_hor' + numero_muestra}
          options={opcionesFrecuencia}
          label="Horario"
          name={'Horario ' + numero_muestra}
          errors={error}
          form={formData}
          setForm={setFormData}
        />
      </>,
    );
  }
  return retorno;
};

export default Medicaments;
