import React, { forwardRef } from 'react';
import T from 'prop-types';
import { connect } from "react-redux";
import { Main } from './styled';

const NameWrapper = forwardRef((props, ref) => {
  const { init, mode, component, form } = props;
  const itemProps = component.props;
  const fields = itemProps.fields || [];

  const value = form[itemProps.fieldName] || {};

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  return (
    <Main onClick={handleFocus}>
      {mode === 'editing' ? fields.map(item => (
        <React.Fragment>
          <span>{item.prefix}{' '}</span>
          <span
            key={item.key}
            style={{
              fontWeight: item.bold ? 'bold' : 'normal',
              fontStyle: item.italic ? 'italic' : 'normal',
              textDecoration: item.underline ? 'underline' : 'normal',
            }}
          >
            {value[item.name]}
          </span>
          <span>{' '}{item.suffix}</span>
        </React.Fragment>
      )) : (
        <div>{'Field wrapper'}</div>
      )}
    </Main>
  )
});

NameWrapper.defaultProps = {
  form: {},
};

NameWrapper.propTypes = {
  form: T.shape({})
};

const mapState = () => ({});

const mapDispatch = ({ component: { init } }) => ({
  init
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(NameWrapper);
