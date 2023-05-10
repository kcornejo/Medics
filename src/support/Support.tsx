import React from 'react';

const validationsObjV2 = (data: any, validations: any) => {
  let error = false;
  let list = [];
  for (let i = 0; i < validations.length; i++) {
    const isRequired = validations[i].isRequired;
    const regex = validations[i].regex;
    const obj = validations[i].obj;
    const regexHelp = validations[i].regexHelp;
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
