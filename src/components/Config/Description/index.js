import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import { Drawer, Button } from "antd";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Main } from "./styled";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";

const Descriptions = forwardRef((props, ref) => {
  const { visible, onClose, handleSubmit } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.state.props) {
      const contentBlock = convertFromHTML(props.state.props.description || "");
      const contentState = ContentState.createFromBlockArray(contentBlock);
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
  }, [props.state]);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState(props.config.props || {});
  }, [props.config.props]);

  useImperativeHandle(ref, () => {
    return {
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
  });

  const handleSave = () => {
    handleSubmit({
      name: state.name || "",
      value: state.value || "",
      api: state.api || "",
      apiTieuChi: state.apiTieuChi || "",
      tenTieuChi: state.tenTieuChi || "",
    });
  };

  const handleUpdateComponent = (currentState) => {
    setEditorState(currentState);
  };

  return (
    <Main>
      <Drawer
        title="Component description"
        placement={"right"}
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleUpdateComponent}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editor_ClassName"
        />

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    </Main>
  );
});

Descriptions.defaultProps = {
  visible: false,
};

Descriptions.propTypes = {
  visible: T.bool,
  handleSubmit: T.func,
  onClose: T.func,
};

const mapState = (state) => ({
  config: state.config,
});
export default connect(mapState, null, null, { forwardRef: true })(
  Descriptions
);
