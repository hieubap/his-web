import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { connect } from "react-redux";
import Grid from "./Grid";
import { FORM_WIDTH, FORM_HEIGHT } from "components/constanst";
import { fontSizes } from "components/EditorTool/Text/constants";
import { Main, Content } from "./styled";
import VerticalLine from "components/Config/VerticalLine";

const DocumentConfig = forwardRef((props, ref) => {
  const {
    config,
    addLine,
    removeLine,
    updateLine,
    focusLine,
    focusBlock,
    updateComponents,
    layoutType,
    setLayoutType,
    zoomValue,
  } = props;
  const gridRef = useRef(null);
  const verticalLineRef = useRef(null);
  const { line, lines, block, components } = config;
  const fontSize = config.props.fontSize
    ? fontSizes[config.props.fontSize]
    : "12";
  useEffect(() => {
    setLayoutType(config.props.layoutType || "default");
  }, [config.props.layoutType]);

  const layout = {
    width: layoutType === "default" ? FORM_WIDTH : FORM_HEIGHT,
    height: layoutType === "default" ? FORM_HEIGHT : FORM_WIDTH,
  };

  const handleCollect = () => {
    if (gridRef.current) {
      let collect = gridRef.current.collect();
      collect.components = collect.components.map((item) => {
        return item;
      });
      return collect;
    }

    return [];
  };

  useImperativeHandle(ref, () => ({
    collect: handleCollect,
  }));

  return (
    <Main fontSize={fontSize} layoutType={layoutType}>
      <div className="creation-contain">
        <VerticalLine ref={verticalLineRef} />

        <Content
          zoomValue={zoomValue}
          width={layout.width}
          height={layout.height}
          id="content"
        >
          <Grid
            verticalLine={verticalLineRef}
            ref={gridRef}
            width={layout.width}
            height={layout.height}
            addLine={addLine}
            removeLine={removeLine}
            line={line}
            block={block}
            lines={lines}
            updateLine={updateLine}
            focusLine={focusLine}
            focusBlock={focusBlock}
            components={components}
            updateComponents={updateComponents}
            mode={"config"}
            fontSize={fontSize}
          />
        </Content>
      </div>
    </Main>
  );
});

const mapState = (state) => ({
  config: state.config,
});

const mapDispatch = ({
  config: {
    addLine,
    removeLine,
    updateLine,
    focusLine,
    focusBlock,
    updateComponents,
  },
}) => ({
  addLine,
  removeLine,
  updateLine,
  focusLine,
  focusBlock,
  updateComponents,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  DocumentConfig
);
