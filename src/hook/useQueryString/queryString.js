const setQueryStringWithoutPageReload = (qsValue) => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qsValue;
  window.history.pushState({ path: newurl }, "", newurl);
};

export const getQueryStringValue = (
  key,
  queryString = window.location.search
) => {
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(key);
  if (!value) {
    const values = paramsToObject(urlParams.entries());
    key = key?.toLowerCase().createUniqueText();
    return values[
      Object.keys(values).find(
        (item) => item?.toLowerCase().createUniqueText() == key
      )
    ];
  }
  return value;
};

const paramsToObject = (entries) => {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
};

export const setQueryStringValue = (
  key,
  value,
  queryString = window.location.search
) => {
  const urlParams = new URLSearchParams(queryString);
  const values = paramsToObject(urlParams.entries());
  values[key] = value;
  const newQsValue = Object.keys(values)
    .filter((item) => values[item])
    .map((item) => item + "=" + values[item])
    .join("&");
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};
