import React, {
  memo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import T from "prop-types";
import { connect } from "react-redux";
import ConfigRender from "./ConfigRender";
import EditingRender from "./EditingRender";
import { get } from "lodash";

const Block = forwardRef((props, ref) => {
  const comRef = useRef(null);
  const [state, _setState] = useState({
    localValues: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    item,
    config,
    component,
    updateComponents,
    verticalLine,
    children,
    mode,
    focusComponent,
    values,
    valuesHIS,
    formChange,
    formId,
    fileTemplate,
    soCapKy,
  } = props;
  const itemProps = component.props || {};

  useEffect(() => {
    if (
      (itemProps && itemProps.disabled) ||
      ["title", "layout", "image", "barcode"].includes(component.type)
    ) {
      const valuesLocal =
        values.takeMe || values.patientDocument
          ? {
              ...values,
              [itemProps.fieldName]: valuesHIS[itemProps.fieldName],
            }
          : valuesHIS;

      if (itemProps.fromEMR && ["image", "barcode"].includes(component.type)) {
        valuesLocal[itemProps.fieldName] = values[itemProps.fieldName];
      }
      setState({
        localValues: valuesLocal,
      });
    } else {
      setState({
        localValues: values,
      });
    }
  }, [values, valuesHIS]);

  useImperativeHandle(ref, () => ({
    collect: () => {
      let data = {
        components:
          comRef.current && comRef.current.collectComponent
            ? comRef.current.collectComponent()
            : [],
        component: {
          ...component,
          value:
            comRef.current && comRef.current.collectValue
              ? comRef.current.collectValue()
              : "",
          props: {
            ...component.props,
            labelValue: null,
            defaultData:
              comRef.current && comRef.current.collectDefault
                ? comRef.current.collectDefault()
                : {},
            lines:
              comRef.current && comRef.current.collectLines
                ? comRef.current.collectLines()
                : [],
            label:
              comRef.current && comRef.current.collectLabel
                ? comRef.current.collectLabel()
                : "",
            checkList:
              comRef.current && comRef.current.collectCheckList
                ? comRef.current.collectCheckList()
                : [],
            ...(comRef.current?.collectProps
              ? comRef.current?.collectProps()
              : {} ?? {}),
          },
        },
        item,
      };
      return data;
    },
  }));

  const updateContent = (res) => {
    updateComponents(res);
  };

  return (
    <div>
      {mode === "editing" ? (
        <EditingRender
          component={component}
          item={item}
          mode={mode}
          formChange={formChange}
          itemProps={itemProps}
          formId={formId}
          values={state.localValues}
          valuesHIS={valuesHIS}
          template={fileTemplate[itemProps.fieldName] || {}}
          soCapKy={soCapKy}
        />
      ) : (
        <ConfigRender
          component={component}
          item={item}
          mode={mode}
          updateContent={updateContent}
          itemProps={itemProps}
          focusComponent={focusComponent}
          formId={formId}
          verticalLine={verticalLine}
          comRef={comRef}
          updateComponents={updateComponents}
          config={config}
        >
          {children}
        </ConfigRender>
      )}
    </div>
  );
});

Block.defaultProps = {
  focusing: false,
  item: {},
  component: {},
  formChange: {},
  valuesHIS: {},
  values: {},
  fileTemplate: {},
  updateComponents: () => {},
};

Block.propTypes = {
  focusing: T.bool,
  item: T.shape({}),
  component: T.shape({}),
  formChange: T.shape({}),
  values: T.shape({}),
  valuesHIS: T.shape({}),
  fileTemplate: T.shape({}),
  updateComponents: T.func,
};

const mapState = (state) => ({
  fileTemplate: get(state, "files.fileTemplate", {}),
  config: state.config,
  control: state.control,
});

const mapDispatch = ({ config: { focusBlock, focusComponent } }) => ({
  focusBlock,
  focusComponent,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  memo(Block)
);
