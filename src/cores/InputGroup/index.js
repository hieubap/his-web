import React, { forwardRef } from 'react';
import T from 'prop-types';
import { sum } from 'lodash';
import { Main } from './styled';
import { connect } from "react-redux";

const subValue = (value = '', rule, index, rules) => {
  let listIndex = [];
  if (index > 0) {
    for(let i = 0; i <= index - 1; i++) {
      listIndex.push(i);
    }
  }
  
  const position = index > 0 ? sum(listIndex.map(i => rules[i].length)) : 0;
  
  return value ? `${value}`.substr(position, rule.length) : '';
};

const InputGroup = forwardRef((props, ref) => {
  const { init, component, mode, form } = props;
  const itemProps = component.props || {};
  const itemRules = itemProps.rule || '';
  const rules = itemRules.split('_');
  
  const handleFocus = () => {
    if (mode === 'config')  {
      init(component);
    }
  };
  
  return (
    <Main onClick={handleFocus} width={itemProps.width} height={itemProps.height}>
      {rules.map((rule, index) => (
        <span className={'box-input'} key={index}>
          {subValue(form[itemProps.fieldName || ''] || '', rule, index, rules)}
        </span>
      ))}
    </Main>
  );
});

InputGroup.defaultProps = {
  component: {},
  form: {},
};

InputGroup.propTypes = {
  component: T.shape({}),
  form: T.shape({}),
};

const mapState = () => ({});

const mapDispatch = ({ component: { init } }) => ({
  init
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(InputGroup);
