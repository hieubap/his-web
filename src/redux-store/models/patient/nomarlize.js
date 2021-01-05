export const convertDataPatient = (data) => {
  const insuranceNumber = insuranceNumberConvert(data && data.insuranceNumber);
  const patientDocument = patientDocumentConvert(data && data.patientDocument);
  return {
    ...data,
    patientDocument,
    insuranceNumber
  }
};

export function insuranceNumberConvert(data){
  const rule = [2, 1, 2, 9];
  let insuranceNumber = [];
  let count = 0;
  
  rule.forEach((item)=> {
    const values = data ? data.split('') : [];
     const start = count;
     count = count + item;
     const end = item + start;
    const value = values && values.slice(start, end).toString().replace(/,/g, '');
    insuranceNumber.push(value)
  });
  
  return insuranceNumber
}

export function patientDocumentConvert(data){

  const values = data && data.split('');
  return values
}