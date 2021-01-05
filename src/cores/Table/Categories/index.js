import React, { useState, useEffect, useRef } from 'react';
import T from 'prop-types';
import moment from 'moment';
import InputPopup from 'cores/InputPopup';
import TextEdit from 'cores/TextEdit';
import { DatePicker } from 'antd';
import { Main, inputColWidth } from './styled';
import { genCategories, ngay, calcTotal, genFunc } from './constant';
import renderHTML from "react-render-html";

const CategoriesTable = (props) => {
  const { categoriesQty, mode, setDefaultData, defaultData, onChange, dataSource, template } = props;
  const [dataSrc, setDataSrc] = useState([]);
  const [categories, setCategories] = useState([]);
  const [localDate, setLocalDate] = useState(ngay);
  const [names, setNames] = useState({});
  const [localValues, setLocalValues] = useState({});
  const [defaultNames, setDefaultNames] = useState({});
  const [funcChangeNames, setFuncChangeNames] = useState({});
  const [funcChangeDate, setFuncChangeDate] = useState({});
  const [funcChangeValues, setFuncChangeValues] = useState({});
  const preValuesRef = useRef();
  const preNamesRef = useRef();
  const preDatesRef = useRef();
  const preDataSrcRef = useRef();
  const preFuncChangeValuesRef = useRef();

  const initValue = (obj) => {
    if (obj) {
      const dKeys = Object.keys(ngay);
      const dData = dKeys.reduce((res, nextKey) => {
        return {
          ...res,
          [nextKey]: obj['ngay'][nextKey] ? moment(obj['ngay'][nextKey]) : null
        }
      }, {});
      const availableKey = dKeys.filter(dKey => obj['ngay'][dKey]);
      const cData = obj['vatTu'] ? obj['vatTu'].reduce((res, nextItem) => ({
        ...res,
        ...dKeys.reduce((res, nextKey) => ({
          ...res,
          [`${nextItem['ten']}-${nextKey}`]: obj['ngay'][nextKey] ? nextItem[nextKey] : 0,
        }), {})
      }), {}) : {};

      genChangeValueFunc('', availableKey);
      setLocalDate(dData);
      setLocalValues(cData);
    }
  };

  useEffect(() => {
    const datesKey = Object.keys(ngay);
    const dateFunc = datesKey.reduce((res, key) => ({ ...res, [key]: setDate(key) }), {});

    setFuncChangeDate(dateFunc);
  }, []);

  useEffect(() => {
    if (dataSource.length < 1 && template && template.length) {
      setDataSrc(template || []);
    } else {
      setDataSrc(dataSource);
    }
  }, [template, dataSource]);

  useEffect(() => {
    initValue(dataSrc[0])
  }, [dataSrc]);

  useEffect(() => {
    preNamesRef.current = names;
    preDatesRef.current = localDate;
    preValuesRef.current = localValues;
    preDataSrcRef.current = dataSrc;
    preFuncChangeValuesRef.current = funcChangeValues;
  });

  const setValues = key => value => {
    const prevValues = preValuesRef.current;
    const preDates = preDatesRef.current;
    const preDataSrc = preDataSrcRef.current;
    const newValues = { ...prevValues, [key]: value };


    setLocalValues(newValues);
    // category keys
    const cKeys = Object.keys(defaultData);

    // date keys
    const dKeys = Object.keys(ngay);

    const outputC = cKeys.map(cK => {
      const obj = dKeys.reduce((res, next) => ({
        ...res,
        [next]: parseInt(newValues[Object.keys(newValues)
          .find(i => i.split('-')[1] === next && i.split('-')[0] === cK)] || null)
      }), {});

      return {
        ten: cK,
        tong: Object.keys(obj).reduce((res, next) => (obj[next] ? res + parseInt(obj[next]) : res), 0),
        name: defaultData[cK],
        ...obj,
      }
    });

    const outputD = dKeys.reduce((res, nextKey) => ({
      ...res,
      [nextKey]: preDates[nextKey] ? preDates[nextKey].toDate() : null
    }), {});


    const output = preDataSrc.map((item, index) => ({
      toSo: item.toSo || index + 1,
      vatTu: outputC,
      ngay: outputD,
    }));

    onChange(output);
  };

  const setFormKey = key => value => {
    const preNames = preNamesRef.current;
    const newNames = { ...preNames, [key]: value };

    setNames(newNames);
    setDefaultData(newNames);
  };

  const setDate = key => value => {
    const preDates = preDatesRef.current;
    const preDataSrc = preDataSrcRef.current;
    const prevValues = preValuesRef.current;
    const newDates = { ...preDates, [key]: value };
    const dKeys = Object.keys(ngay);
    const cKeys = Object.keys(defaultData);

    const outputD = dKeys.reduce((res, nextKey) => ({
      ...res,
      [nextKey]: newDates[nextKey] ? newDates[nextKey].toDate() : null
    }), {});

    const outputC = cKeys.map(cK => {
      const obj = dKeys.reduce((res, next) => ({
        ...res,
        [next]: parseInt(prevValues[Object.keys(prevValues)
          .find(i => i.split('-')[1] === next && i.split('-')[0] === cK)] || null)
      }), {});

      return {
        ten: cK,
        tong: Object.keys(obj).reduce((res, next) => (obj[next] ? res + parseInt(obj[next]) : res), 0),
        name: defaultData[cK],
        ...obj,
      }
    });

    setLocalDate(newDates);
    genChangeValueFunc(key);
    genValues(key);

    const output = preDataSrc.map((item, index) => ({
      toSo: item.toSo || index + 1,
      vatTu: outputC,
      ngay: outputD,
    }));

    onChange(output);
  };

  useEffect(() => {
    if (Object.keys(defaultData).length > 0) {
      // init categories from config
      // c = categories
      const c = Object.keys(defaultData).map(key => ({ key, name: defaultData[key] }));

      if (mode === 'config') {
        const func = Object.keys(defaultData).reduce((res, key) => ({
            ...res,
            [key]: setFormKey(key)
          }), {});

        setFuncChangeNames(func);
        setDefaultNames(defaultData);
        setNames(defaultData);
      }

      setCategories(c);
    } else {
      // generate categories from config
      // c = categories
      const c = genCategories(categoriesQty);
      const obj = c.reduce((res, next) => ({
          ...res,
          [next.key]: '',
        }), {});

      const func = c.reduce((res, next) => ({
          ...res,
          [next.key]: setFormKey(next.key)
        }), {});

      setFuncChangeNames(func);
      setNames(obj);
      setDefaultNames(obj);
      setCategories(c);
    }

  }, [defaultData]);

  const genValues = (dKey) => {
    const prevValues = preValuesRef.current;
    const categoriesKey = Object.keys(defaultData);

    categoriesKey.forEach(cKey => {
      prevValues[`${cKey}_${dKey}`] = 0;
    });

    setLocalValues(prevValues);
  };

  const genChangeValueFunc = (key, dKeys = []) => {
    const keys = Object.keys(defaultData);
    const preFuncChangeValues = preFuncChangeValuesRef.current;
    const funcObj = key ? genFunc(key, keys, setValues) : {};

    if (dKeys.length > 0) {
      const composeFunc = dKeys.reduce((res, nextK) => ({
        ...res,
        ...genFunc(nextK, keys, setValues)
      }), {});
      const newFunc = { ...preFuncChangeValues, ...funcObj, ...composeFunc };

      setFuncChangeValues(newFunc);

    } else {
      const newFunc = { ...preFuncChangeValues, ...funcObj };

      setFuncChangeValues(newFunc);
    }
  };

  return (
    <Main>
      {dataSrc.map(c => (
        <table key={c['toSo']}>
          <tbody>
            <tr>
              <td>
                <div className={'num-col'}>{'STT'}</div>
              </td>
              <td>
                <div className={'name-col'}>
                  <div style={{ textAlign: 'right' }}>{'Ngày'}</div>
                  <div>{'Loại vật tư'}</div>
                </div>
              </td>
              {Object.keys(localDate).map(key => (
                <td key={key} >
                  {mode === 'editing' && (
                    <div className={'number-col date-col'}>
                      <DatePicker
                        className={'categories-date-visible'}
                        allowClear={false}
                        value={localDate[key] || moment()}
                        onChange={funcChangeDate[key]}
                        format={'DD/MM/YYYY'}
                      />
                      <div className={'date-render'}>
                        {localDate[key] ? moment(localDate[key]).format('DD/MM') : '--/--'}
                      </div>
                    </div>
                  )}
                </td>
              ))}
              <td>
                <div className={'total-col'}>{'Tổng cộng'}</div>
              </td>
            </tr>

            {categories.map((item, index) => (
              <tr key={item.key}>
                <td style={{ textAlign: 'center' }}>
                  <div className={'num-col'}>
                    {index + 1}
                  </div>
                </td>

                <td>
                  <div className={'inside-col name-col'}>
                    {mode === 'config' ? (
                      <TextEdit
                        defaultValue={defaultNames[item.key]}
                        mode={mode}
                        onChange={funcChangeNames[item.key]}
                      />
                    ) : (
                      <span>{renderHTML(item.name)}</span>
                    )}
                  </div>
                </td>
                {Object.keys(ngay).map(key => (
                  <td key={key}>
                    <div className={'inside-col number-col'}>
                      {localDate[key] && item.name && (
                        <InputPopup
                          name={`${item.key}-${key}`}
                          width={inputColWidth}
                          value={localValues[`${item.key}-${key}`]}
                          onChange={funcChangeValues[`${item.key}-${key}`]}
                        />
                      )}
                    </div>
                  </td>
                ))}
                <td>
                  <div className={'total-col'}>{calcTotal(item.key, localValues)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </Main>
  )
};

CategoriesTable.defaultProps = {
  defaultData: {},
  dataSource: []
};

CategoriesTable.propTypes = {
  defaultData: T.shape({}),
  dataSource: T.array,
};

export default CategoriesTable;
