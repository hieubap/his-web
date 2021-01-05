const genCategories = (qty) => {
  const categories = [];

  for (let i = 0; i < qty; i++) {
    const obj = { key: `c_${i}`, name: '' };
    categories.push(obj);
  }

  return categories;
};

const calcTotal = (cKey, values) => {
  const total = Object.keys(values)
    .filter(key => key.split('-')[0] === cKey)
    .map(key => values[key] ? parseInt(values[key]) : 0)
    .reduce((res, next) => res + next, 0);

  return total || '';
};

const genFunc = (key, keys, setValues) => {
  return keys.reduce((res, nextKey) => ({
    ...res,
    [`${nextKey}-${key}`]: setValues(`${nextKey}-${key}`)
  }), {});
};

const ngay = {
  ngay1: '',
  ngay2: '',
  ngay3: '',
  ngay4: '',
  ngay5: '',
  ngay6: '',
  ngay7: '',
  ngay8: '',
  ngay9: '',
  ngay10: '',
  ngay11: '',
  ngay12: '',
  ngay13: '',
  ngay14: '',
};

export { genCategories, ngay, calcTotal, genFunc };
