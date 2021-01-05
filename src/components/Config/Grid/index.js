import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import T from "prop-types";
import moment from "moment";
import { Button, Row, Col } from "antd";
import { Main } from "./styled";
import Line from "../Line";
import { LINE_HEIGHT } from "components/constanst";
import { fontHeight } from "../../ContentEditable/constants";

const Grid = forwardRef((props, ref) => {
  const refArray = useRef([]);
  const {
    lines,
    values,
    valuesHIS,
    formId,
    verticalLine,
    updateComponents,
    width,
    mode,
    formChange,
    fontSize,
    components,
    soCapKy,
  } = props;
  const [localLines, setLocalLines] = useState([]);
  const [minHeight, setMinHeight] = useState(false);

  useEffect(() => {
    const fontKey = Object.keys(fontHeight).find(
      (key) => parseInt(key) === fontSize
    );
    const localMinHeight = fontKey ? fontHeight[`${fontKey}`].minHeight : 18;

    setMinHeight(localMinHeight);
  }, [fontSize]);

  useEffect(() => {
    setLocalLines(lines);
  }, [lines]);

  const combineData = () => {
    let data = {
      lines: localLines.map((line, index) => ({
        ...line,
        items: refArray.current[`line_${index}`].collect().items,
      })),
      components: localLines.reduce((res, next, index) => {
        return [
          ...res,
          ...refArray.current[`line_${index}`].collect().components,
        ];
      }, []),
    };
    return data;
  };

  useImperativeHandle(ref, () => ({
    collect: () => combineData(),
  }));

  const handleAddLine = () => {
    const key = moment().valueOf();
    const block = { width: width, parent: key, key: moment().valueOf() };
    const obj = { key: key, items: [block], height: LINE_HEIGHT };

    const newLines = [...localLines, obj];
    setLocalLines(newLines);
  };

  const insertLine = (index) => () => {
    const key = moment().valueOf();
    const block = { width: width, parent: key, key: moment().valueOf() };
    const obj = { key: key, items: [block], height: LINE_HEIGHT };
    const newLines = [...localLines];

    newLines.insert(index, obj);
    setLocalLines(newLines);
  };

  const handleRemoveLine = (line) => {
    const newLines = localLines.filter((item) => item.key !== line.key);

    setLocalLines(newLines);
  };

  return (
    <Main>
      {localLines.map((item, index) => (
        <Line
          ref={(ref) => {
            refArray.current[`line_${index}`] = ref;
          }}
          verticalLine={verticalLine}
          key={item.key}
          line={item}
          width={width}
          formId={formId}
          updateComponents={updateComponents}
          mode={mode}
          components={components.filter((c) => c.lineKey === item.key)}
          values={values}
          valuesHIS={valuesHIS}
          insertLine={insertLine(index)}
          formChange={formChange}
          minHeight={minHeight}
          removeLine={handleRemoveLine}
          soCapKy={soCapKy}
        />
      ))}

      {mode === "config" && (
        <div className={"action-line"}>
          <Row gutter={12}>
            <Col span={24}>
              <Button onClick={handleAddLine} icon={"plus"} size={"small"} />
            </Col>
          </Row>
        </div>
      )}
    </Main>
  );
});

Grid.defaultProps = {
  line: {},
  block: {},
  lines: [],
  addLine: () => {},
  removeLine: () => {},
  focusBlock: () => {},
};

Grid.propTypes = {
  line: T.shape({}),
  block: T.shape({}),
  lines: T.arrayOf(T.shape({})),
  addLine: T.func,
  removeLine: T.func,
  focusBlock: T.func,
};

export default memo(Grid);
