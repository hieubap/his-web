import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import { Avatar } from "antd";
import { Main } from "./styled";
import BarcodeCom from "react-barcode";
import { connect } from "react-redux";

const Barcode = forwardRef((props, ref) => {
  const { mode, component, form, init, focusing } = props;
  const label = mode == "config" ? "Label" : "";
  const [state, _setState] = useState({
    barcode: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const itemProps = component.props || {};
  useImperativeHandle(ref, () => ({
    collectLabel: () => {
      return itemProps.label;
    },
  }));
  useEffect(() => {
    if (form && form[itemProps.fieldName]) {
      setState({
        barcode: form[itemProps.fieldName],
      });
    }
  }, [component, form]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      barcodeWidth={itemProps.width}
      barcodeHeight={itemProps.height}
      contentAlign={itemProps.contentAlign}
    >
      <div className={"barcode-component"}>
        <div className={"barcode-container"}>
          <div className="barcode-area">
            <div className="barcode-wrapper">
              {mode === "config" ? (
                <BarcodeCom
                  id={"barcode"}
                  fontSize={14}
                  width={1}
                  value={itemProps.fieldName || "Barcode Component"}
                  displayValue={false}
                  margin={0}
                />
              ) : (
                mode === "editing" && (
                  <BarcodeCom
                    id={"barcode"}
                    fontSize={14}
                    width={1}
                    value={state.barcode}
                    displayValue={false}
                    margin={0}
                  />
                )
              )}
            </div>
          </div>
          {!itemProps.noLabel && (
            <div className="barcode-label">{`${
              itemProps.label ? itemProps.label + " " : label
            }${state.barcode || ""}`}</div>
          )}
        </div>
      </div>
    </Main>
  );
});

Barcode.defaultProps = {
  component: {},
  mode: "editing",
};

Barcode.propTypes = {
  component: T.shape({}),
  mode: T.oneOf(["config", "editing"]),
};

const mapState = () => ({});

const mapDispatch = ({ component: { init } }) => ({
  init,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Barcode
);
