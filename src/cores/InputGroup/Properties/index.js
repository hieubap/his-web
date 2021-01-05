import React, { useEffect, useState,useImperativeHandle, forwardRef } from 'react';
import T from 'prop-types';
import { Form, Checkbox, Input, Select } from 'antd';
import { Main } from './styled';
import { formItemLayout, tailFormItemLayout } from 'components/constanst';

const ComponentProps = forwardRef(( props, ref) => {
  const { state, fields } = props
  const [fieldName, setFieldName] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [rule, setRule] = useState('');
  
  useImperativeHandle(ref, () => ({
    height,
    width,
    fieldName,
    disabled,
    rule
  }));

  useEffect(() => {
    if (state.key) {
      setFieldName(state.props.fieldName);
      setHeight(state.props.width);
      setWidth(state.props.height);
      setDisabled(state.props.disabled);
      setRule(state.props.rule);
    }
  }, [state]);
  const changeDisabled = (e) => {
    setDisabled(e.target.checked)
  }
  const changeRule = (e) => {
    setRule(e.target.value)
  }
  const changeWidth = (e) => {
    setWidth(e.target.value)
  }
  const changeHeight = (e) => {
    setHeight(e.target.value)
  }
  const changeFiledName = (value) => {
    setFieldName(value);
  };
  
  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item label={'Field name'} className={'props-form-item'}>
          <Select
            style={{ width: '100%' }}
            size={'small'}
            showSearch
            onSelect={changeFiledName}
            value={fieldName}
          >
            {fields.map(item => (
              <Select.Option key={item} value={item}>
                <span title={item}>{item}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={"Width (px)"} className={"props-form-item"}>
            <Input size={'small'} width={width} onChange={changeWidth}/>
        </Form.Item>
        <Form.Item label={"Height (px)"} className={"props-form-item"}>
          
            <Input size={'small'} width={height} onChange={changeHeight}/>
          
        </Form.Item>
        <Form.Item {...tailFormItemLayout} label={'Disabled'} className={'props-form-item'}>
          
            <Checkbox checked={disabled} onChange={changeDisabled}/>
          
        </Form.Item>
        
        <Form.Item label={'Rules'} className={'props-form-item'}>
          
            <Input size={'small'} value={rule} onChange={changeRule}/>
          
        </Form.Item>
      </Form>
    </Main>
  )
});

ComponentProps.defaultProps = {
  component: {}
};

ComponentProps.propTypes = {
  component: T.shape({})
};

export default ComponentProps
