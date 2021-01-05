import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { connect } from "react-redux";
import T from "prop-types";
import Grid from "components/Config/Grid";
import { fontSizes } from "components/EditorTool/Text/constants";
import { Main } from "./styled";

const Layout = forwardRef((props, ref) => {
  const {
    component,
    block,
    updateContent,
    mode,
    init,
    updateComponents,
    formId,
    form,
    formChange,
    verticalLine,
    valuesHIS,
  } = props;

  const [state, _setState] = useState({
    localLines: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const itemProps = component.props || {};
  const gridRef = useRef(null);
  let components = [];
  let fontSize = 12;

  useEffect(() => {
    setState({
      localLines: itemProps.lines || [],
    });
  }, [component]);

  useImperativeHandle(ref, () => ({
    collectComponent: () => gridRef.current.collect().components,
    collectLines: () => gridRef.current.collect().lines,
  }));

  if (mode === "config") {
    components = props.configComponents;
    fontSize = props.configProps.fontSize
      ? fontSizes[props.configProps.fontSize]
      : 12;
  } else {
    const formX = props.listFiles.find((item) => item.id === formId);
    if (formX) {
      components = formX.components;
      fontSize =
        formX.config && formX.config.fontSize
          ? fontSizes[formX.config.fontSize]
          : 12;
    }
  }

  const addLine = (res) => {
    const defaultLines = component.props.lines || [];
    const lines = [...defaultLines, res];
    updateContent({ ...component, props: { ...component.props, lines } });
  };

  const updateLine = (res) => {
    const defaultLines = component.props.lines || [];
    const lines = defaultLines.map((line) =>
      line.key === res.key ? res : line
    );
    updateContent({ ...component, props: { ...component.props, lines } });
  };

  const removeLine = (res) => {
    const defaultLines = component.props.lines || [];
    const lines = defaultLines.filter((line) => line.key !== res.key);
    updateContent({ ...component, props: { ...component.props, lines } });
  };

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };
  const onMouseMove = () => {
    setState({
      hover: true,
    });
  };
  const onMouseLeave = () => {
    setState({
      hover: false,
    });
  };

  return (
    <Main
      itemProps={itemProps}
      mode={mode}
      className={state.hover ? "active" : ""}
    >
      {mode == "config" && (
        <div>
          <div
            onClick={handleFocus}
            className={"mark-focus"}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          />
        </div>
      )}
      <Grid
        ref={gridRef}
        lines={state.localLines}
        verticalLine={verticalLine}
        components={components || []}
        mode={mode}
        width={!!itemProps.border ? block.width - 6 : block.width}
        addLine={addLine}
        updateComponents={updateComponents}
        updateLine={updateLine}
        removeLine={removeLine}
        formId={formId}
        values={form}
        valuesHIS={valuesHIS}
        formChange={formChange}
        fontSize={fontSize}
      />
    </Main>
  );
});

Layout.defaultProps = {
  component: {},
  form: {},
  formChange: {},
};

Layout.propTypes = {
  files: T.shape({}),
  form: T.shape({}),
  formChange: T.shape({}),
};

const mapState = (state) => ({
  listFiles: state.files.list || [],
  configComponents: state.config.components,
  configProps: state.config.props,
});

const mapDispatch = ({
  config: { updateComponents },
  component: { init },
}) => ({ updateComponents, init });

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Layout
);
