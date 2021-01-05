import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import T from "prop-types";
import Grid from "components/Config/Grid";
import { convert } from "./constants";
import { fontSizes } from "components/EditorTool/Text/constants";
import { Main } from "./styled";
import { connect } from "react-redux";

const File = forwardRef((props, ref) => {
  const {
    file,
    fileData,
    fileDataHIS,
    jsonTemplate,
    onSaveForm,
    mode,
    fileTemplate,
  } = props;
  const prevCountRef = useRef({});

  const [state, _setState] = useState({
    values: {},
    formChange: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    prevCountRef.current = state.values;
  });

  const history = useHistory();
  const fontSize = file.config ? fontSizes[file.config.fontSize] : 12;

  const handleSubmit = (fileOnShow, tenPhieu) => {
    return new Promise((resolve, reject) => {
      const data = convert({ ...state.values });
      data.api = file.api;
      data.fileId = file.id;
      data.formId = file.id;
      if (fileOnShow?.recordId) {
        data.recordId = fileOnShow.recordId;
      }
      data.tenPhieu = tenPhieu;
      onSaveForm(data)
        .then((s) => {
          resolve(s);
          history.push(
            `${history.location.pathname}?files=${s?.formId}&nbHsBaId=${s?.id}`
          );
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  useImperativeHandle(ref, () => ({
    values: state.values,
    handleSubmit,
  }));

  const setFormKey = (key) => (value) => {
    const newForm = { ...prevCountRef.current, [key]: value };
    setState({
      values: newForm,
    });
  };

  useEffect(() => {
    if (jsonTemplate) {
      const obj = jsonTemplate.reduce(
        (res, key) => ({
          ...res,
          [key]: setFormKey(key),
        }),
        {}
      );
      obj.setMultiData = (data) => {
        const newForm = { ...prevCountRef.current, ...data };
        setState({
          values: newForm,
        });
      };
      setState({ formChange: obj });
    }
  }, [jsonTemplate]);

  useEffect(() => {
    if (!fileData?.patientDocument && fileDataHIS?.patientDocument) {
      setState({
        values: fileDataHIS,
      });
    } else {
      setState({
        values: fileData,
      });
    }
  }, [fileData, fileDataHIS]);

  state.formChange.getAllData = () => {
    return state.values;
  };
  return (
    <Main fontSize={fontSize}>
      <Grid
        fileTemplate={fileTemplate}
        formChange={state.formChange}
        values={props.defaultData}
        valuesHIS={fileDataHIS}
        formId={file.id}
        lines={file.layout}
        components={file.components}
        mode={mode || "editing"}
        fontSize={fontSize}
        soCapKy={props.soCapKy}
      />
    </Main>
  );
});

export default connect(
  (state) => {
    const fileData = state.files.fileData || {};
    const fileDataHIS = state.files.fileDataHIS;
    return {
      fileTemplate: state.files.fileTemplate,
      fileData,
      fileDataHIS,
      soCapKy: fileData?.soCapKy,
      defaultData:
        !fileData?.patientDocument && fileDataHIS?.patientDocument
          ? fileDataHIS
          : fileData || {},
      jsonTemplate: state.files.jsonTemplate,
      file: state.files.file,
      patient: state.patient.patient,
    };
  },
  ({ files: { onSaveForm } }) => ({
    onSaveForm,
  }),
  null,
  { forwardRef: true }
)(File);
