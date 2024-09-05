import React from 'react';
export const uniqid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};
const validationsObjV2 = (data: any, validations: any) => {
  let error = false;
  let list = [];
  for (let i = 0; i < validations.length; i++) {
    const isRequired = validations[i].isRequired;
    const regex = validations[i].regex;
    const obj = validations[i].obj;
    const regexHelp = validations[i].regexHelp;
    const minValue = validations[i].minValue;
    const maxValue = validations[i].maxValue;
    if (
      isRequired &&
      (data[obj] === undefined || data[obj].toString().trim() == '')
    ) {
      error = true;
      list.push({
        message: 'Campo obligatorio.',
        obj: obj,
      });
    }
    if (
      regex !== undefined &&
      regex != '' &&
      data[obj] !== undefined &&
      data[obj].toString().trim() != ''
    ) {
      if (!regex.test(data[obj])) {
        error = true;
        if (regexHelp !== undefined && regexHelp != '') {
          list.push({
            message: regexHelp,
            obj: obj,
          });
        } else {
          list.push({
            message: 'Campo invalido.',
            obj: obj,
          });
        }
      }
    }
    if (
      minValue !== undefined &&
      data[obj] !== undefined &&
      data[obj].toString().trim() != ''
    ) {
      if (parseInt(data[obj]) < minValue) {
        error = true;
        list.push({
          message: `El valor minimo es ${minValue}`,
          obj: obj,
        });
      }
    }
    if (
      maxValue !== undefined &&
      data[obj] !== undefined &&
      data[obj].toString().trim() != ''
    ) {
      if (parseInt(data[obj]) > maxValue) {
        error = true;
        list.push({
          message: `El valor máximo es ${maxValue}`,
          obj: obj,
        });
      }
    }
  }
  return {error, list};
};
const validationForm = (
  data,
  setError,
  setAlerts,
  error,
  alerts,
  validations,
  success,
) => {
  setAlerts({
    ...alerts,
    show: false,
  });
  setError(error => {
    return {};
  });
  const validation = validationsObjV2(data, validations);
  if (validation.error) {
    for (let i = 0; i < validation.list.length; i++) {
      setError(error => {
        return {
          ...error,
          [validation.list[i].obj]: validation.list[i].message,
        };
      });
    }
    setAlerts({
      show: true,
      type: 'error',
      title: 'Error',
      message: 'Por favor valida la información ingresada.',
    });
  } else {
    success(data);
  }
};
export {validationsObjV2, validationForm};
