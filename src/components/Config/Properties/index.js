import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { connect } from "react-redux";
import { Empty, Button, message, Row, Col } from "antd";
import { Main } from "./styled";
import CoresProps from "cores/Props";
import components from "cores";
import Descriptions from "../Description";

const Properties = forwardRef((props, ref) => {
  const {
    config,
    updateComponents,
    removeComponent,
    fillComponentResource,
    handleSubmit,
    component,
  } = props;
  const desRef = useRef(null);
  const configRef = useRef(null);
  const { fields, id } = config;
  const [state, setState] = useState({});
  const [desVisible, setDesVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      collectProps: () => {
        const advance = desRef.current;
        const info = configRef.current;
        return { ...advance, ...info, id, key: component.key };
      },
    };
  });

  useEffect(() => {
    if (component.key) {
      setState(component);
    } else {
      setState({});
    }
  }, [component]);

  const handleDelete = () => {
    removeComponent(component);
  };

  const handleCopy = () => {
    message.success("Component had copy!");
    fillComponentResource(component);
  };

  const handleShowDrawer = () => {
    setDesVisible(true);
  };

  const handleHideDrawer = () => {
    setDesVisible(false);
  };

  return (
    <Main>
      <div className={"properties-contain"}>
        {state.key ? (
          <div>
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <div className={"c-name-label"}>{"Component :"}</div>
              </Col>
              <Col span={16}>
                <div className={"component-name"}>
                  <span>
                    {components[state.type] ? components[state.type].name : ""}
                  </span>
                  <Button
                    title={"Write component description"}
                    onClick={handleShowDrawer}
                    icon={"edit"}
                    size={"small"}
                  />
                </div>
              </Col>
            </Row>

            {React.createElement(CoresProps[state.type], {
              ref: configRef,
              state,
              updateComponents,
              fields,
              handleSubmit,
            })}

            <Row gutter={[12]}>
              <Col span={12}>
                <Button
                  block
                  onClick={handleCopy}
                  icon={"copy"}
                  size={"small"}
                  type={"dashed"}
                >
                  {"Copy"}
                </Button>
              </Col>

              <Col span={12}>
                <Button
                  block
                  onClick={handleDelete}
                  icon={"delete"}
                  size={"small"}
                  type={"danger"}
                >
                  {"Remove"}
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <Empty />
        )}
      </div>

      <Descriptions
        ref={desRef}
        visible={desVisible}
        onClose={handleHideDrawer}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Main>
  );
});

const mapState = (state) => ({
  component: state.component,
  config: state.config,
});

const mapDispatch = ({
  config: { setContent, updateComponents, removeComponent },
  control: { fillComponentResource },
}) => ({
  setContent,
  updateComponents,
  removeComponent,
  fillComponentResource,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Properties
);
