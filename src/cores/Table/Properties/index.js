import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import T from 'prop-types';
import { Button, Row, Col, Select, Input, Checkbox, InputNumber, Drawer, Form, Radio } from 'antd';
import { formItemLayout } from 'components/constanst';
import components from 'cores';
import { get } from 'lodash';
import TableControl from '../TableControl';
import { Main } from './styled';

const TableProperties = forwardRef((props, ref) => {
  const { state, fields, handleSubmit } = props;
  const [fieldName, setLocalValue] = useState('');
  const [categoriesQty, setCategoriesQty] = useState(0);
  const [dataFields, setDataFields] = useState('');
  const [type, setType] = useState('normal');
  const [cols, setLocalCols] = useState([]);
  const [rows, setLocalRows] = useState([]);
  const [defaultRows, setLocalRowsDefault] = useState([]);
  const [disabled, setLocalDisabled] = useState([]);
  const [focusObj, setFocusObj] = useState({});
  const [visible, setVisible] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    if (state.key) {
      setLocalValue(state.props.fieldName);
      setLocalCols(state.props.cols);
      setLocalRows(state.props.rows);
      setCategoriesQty(state.props.categoriesQty);
      setLocalRowsDefault(state.props.defaultRows);
      setLocalDisabled(state.props.disabled);
      setType(state.props.type);
      setDataFields(state.props.fields);

      if (state.props.gridData) {
        setType('gridData');
      }
    }
  }, [state]);

  useImperativeHandle(ref, () => ({
    fields: dataFields,
    fieldName,
    categoriesQty,
    cols,
    rows,
    defaultRows,
    disabled,
    type,
  }));

  const setFieldName = (value) => {
    setLocalValue(value);
  };

  const showDrawer = () => {
    setVisible(true);
  };
  
  const onClose = () => {
    setVisible(false);
  };

  const changeType = (e) => {
    setType(e.target.value);
  };
  
  const handleChangeColKey = (e) => {
    const { col } = tableRef.current;

    const currentCols = state.props.cols || [];
    const currentCol = currentCols.find(item => item.key === col.key) || {};
    const newCols = currentCols.map(item => item.key === currentCol.key ? currentCol : item);

    currentCol.colKey = e.target.value;
    setLocalCols(newCols);
    
  };

  const handleChangeRowKey = (e) => {
    const value = e.target.value;
    const { row } = tableRef.current;
    const currentRows = state.props.rows || [];
    const currentRow = currentRows.find(item => item.key === row.key) || {};
    const newRows = currentRows.map(item => item.key === currentRow.key ? {...currentRow, rowKey: value  } : item);
    setFocusObj({ ...focusObj, row: { ...currentRow, rowKey: value } });

    setLocalRows(newRows);

  };

  const handleChangeColComponent = (value) => {
    const { col } = tableRef.current;
    const currentCols = state.props.cols || [];
    const currentCol = currentCols.find(item => item.key === col.key) || {};
    currentCol.component = value;
    const newCols = currentCols.map(item => item.key === currentCol.key ? currentCol : item);

    setLocalCols(newCols);
  };

  const handleSetDefaultRows = (value) => {
    setLocalRowsDefault(value || 1);
  };

  const handleChangeDisabled = (e) => {
    setLocalDisabled(e.target.checked);
  };

  const handleChangeDataFields = (e) => {
    const value = e.target.value;
    setDataFields(value);
  };

  const submit = () => {
    handleSubmit();
  };

  const handleChangeColFixed = (e) => {
    const checked = e.target.checked;
    const { col } = tableRef.current;
    const currentCols = state.props.cols || [];
    const currentCol = currentCols.find(item => item.key === col.key) || {};
    const newCols = currentCols.map(item => item.key === currentCol.key ? {...currentCol, fixed: checked} : item);
    setFocusObj({ ...focusObj, col: { ...currentCol, fixed: checked } });

    setLocalCols(newCols);
  };

  const handleChangeColPlusBtn = (e) => {
    const checked = e.target.checked;
    const { col } = tableRef.current;
    const currentCols = state.props.cols || [];
    const currentCol = currentCols.find(item => item.key === col.key) || {};
    const newCols = currentCols.map(item => item.key === currentCol.key ? {...currentCol, plusBtn: checked} : item);
    setFocusObj({ ...focusObj, col: { ...currentCol, plusBtn: checked } });

    setLocalCols(newCols);
  };

  const handleChangeRowCopied = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = state.props.rows || [];
    const currentRow = currentRows.find(item => item.key === row.key) || {};
    const newRows = currentRows.map(item => item.key === currentRow.key ? {...currentRow, copied: checked } : item);
    setFocusObj({ ...focusObj, row: { ...currentRow, copied: checked } });

    setLocalRows(newRows);
  };

  const handleChangeRowFixed = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = state.props.rows || [];
    const currentRow = currentRows.find(item => item.key === row.key) || {};
    const newRows = currentRows.map(item => item.key === currentRow.key ? {...currentRow, fixed: checked } : item);
    setFocusObj({ ...focusObj, row: { ...currentRow, fixed: checked } });

    setLocalRows(newRows);
  };

  const handleChangeRowHeader = (e) => {
    const checked = e.target.checked;
    const { row } = tableRef.current;
    const currentRows = state.props.rows || [];
    const currentRow = currentRows.find(item => item.key === row.key) || {};
    const newRows = currentRows.map(item => item.key === currentRow.key ? {...currentRow, isHeader: checked } : item);
    setFocusObj({ ...focusObj, row: { ...currentRow, isHeader: checked } });

    setLocalRows(newRows);
  };

  const handleChangeCategoriesQty = (value) => {
    setCategoriesQty(value);
  };

  const handleChangeFocus = (out) => {
    setFocusObj(out)
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>{'Type: '}</Col>

        <Col span={16}>
          <Radio.Group value={type} onChange={changeType}>
            <Radio value={'normal'}>{'Normal'}</Radio>
            <Radio value={'gridData'}>{'Grid data'}</Radio>
            <Radio value={'insertRow'}>{'Insert row'}</Radio>
            <Radio value={'replicationRow'}>{'Replication row'}</Radio>
            <Radio value={'analytic'}>{'Analytic'}</Radio>
            <Radio value={'listRender'}>{'List render'}</Radio>
          </Radio.Group>
        </Col>

        <Col span={8}>{'Field name: '}</Col>
        <Col span={16}>
          <Select
            style={{ width: '100%' }}
            size={'small'}
            showSearch
            onSelect={setFieldName}
            value={fieldName}
          >
            {fields.map(item => (
              <Select.Option key={item} value={item}>
                <span title={item}>{item}</span>
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>{'Default row: '}</Col>
        <Col span={16}>
          <InputNumber value={defaultRows} onChange={handleSetDefaultRows} size={'small'} min={1} />
        </Col>

        <Col span={8}>{'Disabled: '}</Col>
        <Col span={16}>
          <Checkbox checked={disabled} onChange={handleChangeDisabled} />
        </Col>

        <Col span={24}>
          <Button size={'small'} block onClick={showDrawer}>{'advance'}</Button>
        </Col>

        <Drawer
          title="Table config"
          placement={'right'}
          closable={false}
          onClose={onClose}
          visible={visible}
          width={720}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <TableControl
                ref={tableRef}
                rows={state.props.rows}
                cols={state.props.cols}
                handleChangeFocus={handleChangeFocus}
              />
            </Col>

            <Col span={16}>
              <Form {...formItemLayout}>
                <Form.Item style={{ marginBottom: 0 }} label={'Categories quantity'}>
                  <InputNumber value={categoriesQty} size={'small'} onChange={handleChangeCategoriesQty} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Column key'}>
                  <Input value={get(focusObj, 'col.colKey', '')} size={'small'} onChange={handleChangeColKey} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Row key'}>
                  <Input value={get(focusObj, 'row.rowKey', '')} size={'small'} onChange={handleChangeRowKey} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Component type'}>
                  <Select
                    value={get(focusObj, 'col.component', '')}
                    size={'small'}
                    style={{ width: '100%' }}
                    onChange={handleChangeColComponent}
                  >
                    {Object.keys(components).map(item => (
                      <Select.Option key={item}>{item}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Fixed column'}>
                  <Checkbox onChange={handleChangeColFixed} checked={get(focusObj, 'col.fixed', false)} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Fixed row'}>
                  <Checkbox onChange={handleChangeRowFixed} checked={get(focusObj, 'row.fixed', false)} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Have plus btn'}>
                  <Checkbox onChange={handleChangeColPlusBtn} checked={get(focusObj, 'col.plusBtn', false)} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Row copied'}>
                  <Checkbox onChange={handleChangeRowCopied} checked={get(focusObj, 'row.copied', false)} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Row header'}>
                  <Checkbox onChange={handleChangeRowHeader} checked={get(focusObj, 'row.isHeader', false)} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }} label={'Fields'}>
                  <Input.TextArea rows={3} value={dataFields} size={'small'} onChange={handleChangeDataFields} />
                </Form.Item>
              </Form>
            </Col>

            <Col span={24} className={'action-footer'} style={{ marginTop: 15 }}>
              <Button
                icon={'save'}
                onClick={submit}
                style={{ marginRight: '6px' }}
                type={'primary'}
                className="action-item"
              >
                {'Save'}
              </Button>
              <Button onClick={onClose} className="action-item">
                {'Cancel'}
              </Button>
            </Col>
          </Row>
        </Drawer>

      </Row>
    </Main>
  );
});

TableProperties.defaultProps = {
  state: {},
};

TableProperties.propTypes = {
  state: T.shape({}),
};

export default TableProperties;
