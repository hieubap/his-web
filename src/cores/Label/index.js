import React, { useRef,  useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { connect } from 'react-redux';
import T from "prop-types";
import { Main } from "./styled";
import TextEdit from "cores/TextEdit";

const Label = forwardRef((props, ref) => {
  const { component, mode, init } = props;
  const mainRef = useRef(null);
  const [content, setContent] = useState('');
  
  useEffect(() => {
    setContent(component.value)
  }, [component]);

  useImperativeHandle(ref, () => ({
    collectValue: () => content,
  }));

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  return (
    <Main
      onClick={handleFocus}
      style={{
        marginTop: `${component.props.marginTop}px`,
        marginLeft: `${component.props.marginLeft}px`
      }}>
      <div ref={mainRef}>
        <TextEdit
          defaultValue={component.value}
          onChange={setContent}
          mode={mode}
        />
      </div>
    </Main>
  );
});

Label.defaultProps = {
  component: {},
  line: {},
  disabled: false,
  mode: "config"
};

Label.propTypes = {
  component: T.shape({}),
  line: T.shape({}),
  updateContent: T.func,
  disabled: T.bool,
  mode: T.string
};

const mapState = () => ({});

const mapDispatch = ({ component: { init } }) => ({
  init
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(Label);
