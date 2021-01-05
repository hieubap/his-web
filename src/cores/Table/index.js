import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { connect } from "react-redux";
import T from "prop-types";
import { Button, Popover } from "antd";
import { Main } from "./styled";
import Actions from "./Actions";
import ModalCustom from "./modalCustom";
import { isEmpty } from "lodash";
import { composeRender } from "./constants";

const Table = forwardRef((props, ref) => {
  const {
    component,
    updateContent,
    mode,
    init,
    updateComponents,
    files,
    formId,
    form,
    formChange,
    verticalLine,
    valuesHIS,
    template,
  } = props;
  const [state, _setState] = useState({
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refArray = useRef([]);
  const [colSelected, setColSelected] = useState([]);
  const [onFocus, setOnFocus] = useState(false);
  const [type, setType] = useState();
  const [defaultData, setDefaultData] = useState({});
  const [localComponents, setLocalComponents] = useState([]);
  const itemProps = component.props || {};
  const refContainer = useRef(null);

  const collectComponent = () => {
    let list = [];

    itemProps.rows.forEach((row, index) =>
      itemProps.cols.forEach((col, idx) => {
        const obj = refArray.current[`block_${index}_${idx}`]
          ? refArray.current[`block_${index}_${idx}`].collect()
          : {};
        const cList = obj.components || [];

        list = [...list, ...cList, obj.component];
      })
    );

    return list.filter((item) => !!item);
  };

  const collectDefault = () => {
    return defaultData;
  };

  useImperativeHandle(ref, () => ({
    collectComponent: () => collectComponent(),
    collectDefault: () => collectDefault(),
  }));

  useEffect(() => {
    setDefaultData(itemProps.defaultData || {});
  }, [itemProps]);

  useEffect(() => {
    if (mode === "config") {
      setLocalComponents(props.configComponents);
    } else {
      const formX = files.list.find((item) => item.id === formId);
      if (formX) {
        setLocalComponents(formX.components);
      }
    }
  }, [props.configComponents]);

  useEffect(() => {
    const type = props.configType;
    setType(type);
  }, []);

  const handleUpdateColBox = (res) => {
    updateContent({
      ...component,
      ...res,
    });
    setColSelected([]);
    setState({
      visible: false,
    });
  };

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
      setOnFocus(true);
    }
  };

  const handleOnChange = (value) => {
    if (formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](value);
    }
  };

  const handleSelectCol = (key) => {
    const newList = [...colSelected, key];
    setColSelected(newList);
  };

  const handleDeselect = (key) => {
    const newList = colSelected.filter((item) => item !== key);
    setColSelected(newList);
  };

  const handleColClick = (key) => () => {
    if (colSelected.includes(key)) {
      handleDeselect(key);
    } else {
      handleSelectCol(key);
    }
  };
  const handleDeleteRow = (row) => {
    setState({
      visible: false,
    });
    let props = component.props;
    props.rows = props.rows.filter((item, index) => {
      return row != item.key;
    });
    console.log(props);
    updateContent({
      ...component,
    });
    setColSelected([]);
  };
  const handleDeleteCol = (col) => {
    setState({
      visible: false,
    });
    let props = component.props;
    props.cols = props.cols.filter((item, index) => {
      return col != item.key;
    });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onAddRow = (isBefore, row) => {
    setState({
      visible: false,
    });
    let props = component.props;
    let rowKeys = props.rows.map((item) => item.key);
    let newKey = Array.from(Array(rowKeys.length + 1).keys()).find((item) => {
      return !rowKeys.includes(item);
    });
    let index = props.rows.findIndex((item) => item.key == row);
    if (isBefore) index = Math.max(0, index);
    else index = Math.min(props.rows.length, index + 1);
    props.rows.splice(index, 0, { key: newKey });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onAddCol = (isBefore, col) => {
    setState({
      visible: false,
    });
    let props = component.props;
    let colKeys = props.cols.map((item) => item.key);
    let newKey = Array.from(Array(colKeys.length + 1).keys()).find((item) => {
      return !colKeys.includes(item);
    });
    let index = props.cols.findIndex((item) => item.key == col);
    if (isBefore) index = Math.max(0, index);
    else index = Math.min(props.cols.length, index + 1);
    props.cols.splice(index, 0, { key: newKey });
    updateContent({
      ...component,
    });
    setColSelected([]);
  };

  const onColResize = (col1, col2) => {
    updateContent({
      ...component,
    });
    setColSelected([]);
  };
  return (
    <div ref={refContainer}>
      {type === "Table" && (
        <ModalCustom component={component} forwardedRef={refContainer} />
      )}

      {!isEmpty(itemProps.rows) && !isEmpty(itemProps.cols) && (
        <Main mode={mode}>
          {mode === "config" && (
            <>
              <div className={"table-tool"}>
                <Popover
                  visible={state.visible}
                  content={
                    <Actions
                      colSelected={colSelected}
                      rows={itemProps.rows}
                      cols={itemProps.cols}
                      itemProps={itemProps}
                      handleUpdateColBox={handleUpdateColBox}
                      handleDeleteRow={handleDeleteRow}
                      handleDeleteCol={handleDeleteCol}
                      onAddRow={onAddRow}
                      onAddCol={onAddCol}
                    />
                  }
                  onVisibleChange={() => {
                    setState({
                      visible: false,
                    });
                  }}
                  title="Thao tác"
                >
                  <Button
                    icon={"setting"}
                    onClick={() => {
                      setState({
                        visible: true,
                      });
                    }}
                    size={"small"}
                  />
                </Popover>
              </div>
              <div className={"table-bar"} onClick={handleFocus} />
            </>
          )}
          {composeRender(itemProps.type, {
            ...itemProps,
            component,
            localComponents,
            components: localComponents,
            mode,
            formId,
            form,
            formChange,
            verticalLine,
            dataSource: form[itemProps.fieldName] || [],
            onChange: handleOnChange,
            handleColClick,
            refArray,
            colSelected,
            valuesHIS,
            updateContent,
            updateComponents,
            setDefaultData,
            template,
            onColResize,
          })}
        </Main>
      )}
    </div>
  );
});

Table.defaultProps = {
  component: {},
  files: {},
  form: {},
};

Table.propTypes = {
  component: T.shape({}),
  form: T.shape({}),
};

const mapState = (state) => ({
  files: state.files,
  configComponents: state.config.components,
  configType: state.config.type,
});

const mapDispatch = ({
  config: { updateComponents },
  component: { init },
}) => ({ updateComponents, init });

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Table
);
