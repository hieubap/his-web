import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import { Main } from "./styled";
import CheckBox from "cores/CheckBox";
import { connect } from "react-redux";
import { checkComponentDisable } from "utils/editor-utils";

const Groups = forwardRef((props, ref) => {
  const { component, mode, formChange, form, init, blockWidth } = props;

  const mainRef = useRef(null);
  const itemProps = component.props || {};
  const [state, _setState] = useState({
    disable: false,
    itemFocused: {},
    values: [],
    localCheckList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    let disable = checkComponentDisable(
      props.auth,
      props.patient,
      itemProps,
      mode,
      props.signStatus,
      props
    );
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [props.mode, props.signStatus, itemProps.disabled, props.fileDataHIS, props.patient]);

  useImperativeHandle(ref, () => ({
    collectCheckList: () => {
      let newLocalCheckList = state.localCheckList.map((item) => {
        item.label = item.labelValue;
        console.log(item.label, item.labelValue);
        // item.label = item.labelValue;
        return item;
      });
      console.log(newLocalCheckList);
      return newLocalCheckList;
    },
  }));

  const handleFocusItem = (item) => () => {
    setState({
      itemFocused: item,
    });
  };

  useEffect(() => {
    setState({
      localCheckList: itemProps.checkList,
    });
  }, [itemProps]);

  useEffect(() => {
    setState({
      values: form[itemProps.fieldName] || [],
    });
  }, [form]);

  const handleBlueItem = () => {
    setState({
      itemFocused: {},
    });
  };

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (state.disable) {
      return;
    }
    if (itemProps.type === "onlyOne") {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        if (state.values.includes(value)) {
          setState({
            values: [],
          });
          itemProps.fieldName && formChange[itemProps.fieldName]([]);
        } else {
          setState({
            values: [value],
          });
          formChange[itemProps.fieldName]([value]);
        }
      }
    } else {
      if (itemProps.fieldName && formChange[itemProps.fieldName]) {
        if (state.values.includes(value)) {
          const newList = state.values.filter((item) => item !== value);
          setState({
            values: newList,
          });
          itemProps.fieldName && formChange[itemProps.fieldName](newList);
        } else {
          let newList = [...(state.values || []), value];
          setState({
            values: newList,
          });
          if (itemProps.fieldName && formChange[itemProps.fieldName])
            formChange[itemProps.fieldName](newList);
        }
      }
    }
  };

  const handleUpdateData = (data) => {
    const newList = state.localCheckList.map((item) =>
      item.key === data.key ? data : item
    );
    setState({
      localCheckList: newList,
    });
  };

  return (
    <Main ref={mainRef} onClick={handleFocus}>
      {state.localCheckList?.length > 0 ? (
        state.localCheckList.map((item) => {
          let x = itemProps.checkList.find((item2) => item2.key == item.key);
          return (
            <div
              key={item.key}
              onClick={handleFocusItem(item)}
              onBlur={handleBlueItem}
              className={`${
                state.itemFocused.key === item.key ? "check-item-focused" : ""
              } check-item`}
            >
              <CheckBox
                handleUpdateData={handleUpdateData}
                handleOnChange={handleOnChange}
                item={item}
                checked={
                  state.values.length
                    ? state.values.includes(item.value)
                    : [`${state.values}`].includes(item.value)
                }
                mode={mode}
                direction={itemProps.direction}
                width={x?.width}
                note={x?.note}
                disabled={state.disable}
                blockWidth={blockWidth}
              />
            </div>
          );
        })
      ) : (
        <span>{"groups"}</span>
      )}
    </Main>
  );
});

// direction: rtl: right to left or ltr: left to right

Groups.defaultProps = {
  form: {},
  component: {
    props: {
      checkList: [],
      direction: "ltr",
    },
  },
  line: {},
  disabled: false,
  mode: "config",
};

Groups.propTypes = {
  form: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  updateContent: T.func,
  disabled: T.bool,
  mode: T.string,
};

const mapState = (state) => ({
  signStatus: state.files.signStatus || {},
  auth: state.auth.auth,
  patient: state.patient.patient,
  fileDataHIS: state.files.fileDataHIS,
});

const mapDispatch = ({ component: { init } }) => ({
  init,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Groups
);
