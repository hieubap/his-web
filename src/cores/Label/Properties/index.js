import React, { useEffect, useImperativeHandle, forwardRef, useState } from "react";
import T from "prop-types";
import { Form, Input } from "antd";
import { formItemLayout } from "components/constanst";
import { Main } from "./styled";

const LabelProps = forwardRef((props, ref) => {
  const { state } = props;
 const [marginTop, setMarginTop] = useState(0);
 const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    if (state.key) {
      setMarginTop(state.props.marginTop);
      setMarginLeft(state.props.marginLeft);
    }
  }, [state]);

  useImperativeHandle(ref, () => ({
    marginTop,
    marginLeft,
  }));

  const handleChangeMarginTop = (e) => {
    const value = e.target.value;
    setMarginTop(value);
  };

  const handleChangeMarginLeft = (e) => {
    const value = e.target.value;
    setMarginLeft(value);
  };

  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item
          label={"Margin Top"}
          className={"props-form-item"}
        >
          <Input
            addonAfter={'px'}
            style={{ width: '50%' }}
            size={'small'}
            onChange={handleChangeMarginTop}
            value={marginTop}
          />
        </Form.Item>

        <Form.Item
          label={"Margin Left"}
          className={"props-form-item"}
        >
          <Input
            addonAfter={'px'}
            style={{ width: '50%' }}
            size={'small'}
            onChange={handleChangeMarginLeft}
            value={marginLeft}
          />
        </Form.Item>
      </Form>
    </Main>
  );
});


LabelProps.propTypes = {
  state: T.shape({}),
};

export default LabelProps;

