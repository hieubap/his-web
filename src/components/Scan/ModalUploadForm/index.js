import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Main } from "./styled";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Spin,
  Select,
  Upload,
  Icon,
  Empty,
  Checkbox,
  Radio,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import stringUtils from "mainam-react-native-string-utils";
const ModalAddForm = (props, ref) => {
  const { t } = useTranslation();
  const refCallback = useRef(null);

  const { getFieldDecorator } = props.form;

  const [state, _setState] = useState({
    file: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (props.needResetPatient) props.clearPatient();
  }, []);
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      let patient = null;
      if (item.maHoSo) {
        patient = {};
        patient.maHoSo = item.maHoSo;
        patient.gioiTinh = item.gioiTinh === 1 ? "Nam" : "Nữ";
        patient.tenNb = item.tenNb;
        patient.diaChi = item.diaChi;
        patient.ngaySinh = item.ngaySinh;
        item.patientHistory = patient;
      }

      let file = [];
      if (item?.duongDan) {
        file.push({
          nameImage: item.duongDan,
        });
      }
      setState({
        id: item.id,
        show: true,
        maHoSo: item?.patientHistory?.maHoSo,
        patient: patient,
        file: file,
        maBieuMau: item?.maBieuMau || "",
        tenBieuMau: item?.tenBieuMau || "",
        active: item.active === false ? false : true,
        isPdf: 1,
        ngayThucHien: item.ngayThucHien
          ? new Date(item.ngayThucHien)
          : new Date(),
        moTa: item.moTa || "",
      });
      props.form.resetFields();
      refCallback.current = callback;
    },
  }));

  const handleSubmit = () => {};

  const onChange = (type) => (e) => {
    if (type === "active") {
      setState({ [type]: !!e?.target?.checked });
    } else {
      if (type == "ngayThucHien") {
        setState({
          [type]: e._d,
        });
      } else setState({ [type]: e?.target?.value || "" });
    }
    return;
  };
  const submitSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.maHoSo) {
      props.getRecordTypeByPatientDocument(state.maHoSo);
      props.searchPatient({ timKiem: state.maHoSo });
    }
  };
  const handleChangeImage = (info) => {
    if (state.isPdf == 1) {
      setState({
        file: [
          {
            nameImage: info.file.name,
            file: info.file.originFileObj,
          },
        ],
      });
    } else {
      let file = state.file || [];
      if (file.find((item) => item.file.uid == info.file.uid)) {
        return;
      }
      file.push({
        nameImage: info.file.name,
        file: info.file.originFileObj,
      });
      setState({
        file: [...file],
      });
    }
  };

  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          if (state.id) {
            props
              .updateScanFile({
                id: state.id,
                active: state.active,
                ngayThucHien: state.ngayThucHien,
                moTa: state.moTa,
              })
              .then((s) => {
                setState({ show: false });
                if (refCallback.current)
                  refCallback.current(state.id, { active: state.active });
              });
          } else
            props
              .uploadScan({
                maHoSo: patient?.maHoSo,
                maBieuMau: state.maBieuMau || "",
                soPhieu: new Date().format("yyyyMMddHHmmss"),
                isPdf: state.isPdf == 1,
                file: state.file,
                active: state.active,
                ngayThucHien: state.ngayThucHien,
                moTa: state.moTa,
              })
              .then((s) => {
                setState({ show: false });
                if (refCallback.current) refCallback.current(s);
              });
        }
      });
    } else setState({ show: false });
  };
  const filterOption = (input, option) => {
    return (
      (option.props.name || "")
        .toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };

  const removeFile = (index) => () => {
    let file = state.file || [];
    file.splice(index, 1);
    setState({
      file: [...file],
    });
  };

  const changeForm = (value) => {
    setState({
      maBieuMau: value,
    });
  };

  const onChangeIsPdf = (e) => {
    setState({
      isPdf: e.target.value,
      file: [],
    });
  };

  let patient = state.patient || props.patientInfo;

  return (
    <Main
      visible={state.show}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={props.isLoadingCreate}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.readOnly
                ? "XEM THÔNG TIN"
                : "CHỈNH SỬA"
              : "THÊM MỚI"}{" "}
            BIỂU MẪU
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              {!state.id ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item label={"Mã hồ sơ"} className={"props-form-item"}>
                      {getFieldDecorator("maHoSo", {
                        // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                        initialValue: state.maHoSo,
                      })(
                        <Input.Search
                          onChange={onChange("maHoSo")}
                          type="text"
                          placeholder="Mã HS"
                          className="search-input search-item"
                          onPressEnter={submitSearch}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {!isEmpty(patient) ? (
                <React.Fragment>
                  <Row className="patient-info">
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label-info">Mã HS: </span>
                        <span className="info-content patient-doccument">
                          {patient.maHoSo}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="label-info">Họ và tên: </span>
                        <span className="info-content patient-name">
                          {patient.tenNb}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="label-info">Ngày sinh: </span>
                        <span className="info-content">
                          {moment(patient.ngaySinh).format(
                            "hh:mm - DD/MM/YYYY"
                          )}
                        </span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label-info">Giới tính: </span>
                        <span className="info-content">{patient.gioiTinh}</span>
                      </div>
                      <div className="info-item">
                        <span className="label-info">Địa chỉ: </span>
                        <span className="info-content">{patient.diaChi}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} className="select-file">
                    <Col span={24}>
                      <Form.Item
                        label={state.id ? "Biểu mẫu" : "Chọn biểu mẫu"}
                        className={"props-form-item"}
                      >
                        {getFieldDecorator("maBieuMau", {
                          // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                          initialValue: state.maBieuMau,
                        })(
                          <Select
                            disabled={!!state.id}
                            showSearch
                            size={"default"}
                            placeholder="Chọn biểu mẫu"
                            className="search-item"
                            notFoundContent={
                              <span id={"no-data-mess"}>
                                {t("drugDistributions.noData")}
                              </span>
                            }
                            filterOption={filterOption}
                            onChange={changeForm}
                            id={"department"}
                          >
                            <Select.Option
                              value={""}
                              disabled={true}
                              name={"Chọn biểu mẫu"}
                            >
                              -Chọn biểu mẫu-
                            </Select.Option>
                            {state.id ? (
                              <Select.Option
                                value={state.maBieuMau}
                                name={state.tenBieuMau}
                              >
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={state.tenBieuMau}
                                >
                                  {state.tenBieuMau}
                                </div>
                              </Select.Option>
                            ) : (
                              props.dataDocument?.dsBieuMau?.map(
                                (item, index) => (
                                  <Select.Option
                                    key={index}
                                    value={item.bieuMau.ma}
                                    name={item.bieuMau.ten}
                                  >
                                    <div
                                      style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                      title={item.bieuMau.ten}
                                    >
                                      {item.bieuMau.ten}
                                    </div>
                                  </Select.Option>
                                )
                              )
                            )}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={"Ngày thực hiện"}
                        className={"props-form-item"}
                      >
                        {getFieldDecorator("ngayThucHien", {
                          // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                          initialValue: moment(state.ngayThucHien),
                        })(
                          <DatePicker
                            placeholder="Chọn ngày thực hiện"
                            onChange={onChange("ngayThucHien")}
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={"Mô tả"} className={"props-form-item"}>
                        {getFieldDecorator("moTa", {
                          // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                          initialValue: state.moTa,
                        })(
                          <Input
                            placeholder="Nhập mô tả"
                            onChange={onChange("moTa")}
                          />
                        )}
                      </Form.Item>
                    </Col>
                    {!state.id ? (
                      <Col span={24}>
                        <Form.Item className={"props-form-item"}>
                          {getFieldDecorator("isPDF", {
                            // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                          })(
                            <div>
                              <Radio.Group
                                onChange={onChangeIsPdf}
                                value={state.isPdf}
                              >
                                <Radio value={1}>file PDF (chọn 1 file)</Radio>
                                <Radio value={2}>
                                  file ảnh (chọn nhiều file)
                                </Radio>
                              </Radio.Group>
                            </div>
                          )}
                        </Form.Item>
                      </Col>
                    ) : null}

                    <Col span={24}>
                      {!state.id ? (
                        <Upload
                          onChange={handleChangeImage}
                          name="file"
                          showUploadList={false}
                          multiple={state.isPdf == 2}
                          accept={
                            state.isPdf == 1 ? ".pdf" : ".png,.jpg,.jpeg,.bmp"
                          }
                        >
                          <Button>
                            <Icon type="upload" /> Upload
                          </Button>
                        </Upload>
                      ) : null}

                      {state.file?.length
                        ? state.file.map((item, index) => {
                            return (
                              <div className="file-info" key={index}>
                                {!!state.id && (
                                  <span style={{ marginRight: 5 }}>File: </span>
                                )}
                                <span className="file-name">
                                  {item.nameImage}
                                </span>
                                {!state.id ? (
                                  <Icon
                                    type="delete"
                                    className="remove"
                                    onClick={removeFile(index)}
                                  />
                                ) : null}
                              </div>
                            );
                          })
                        : null}
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} className="select-file">
                    <Col span={24}>
                      <Form.Item className={"props-form-item"}>
                        {getFieldDecorator("active", {
                          // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                        })(
                          <div>
                            <label style={{ marginRight: 5 }}>
                              Có hiệu lực:
                            </label>
                            <Checkbox
                              checked={state.active}
                              onChange={onChange("active")}
                            ></Checkbox>
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </React.Fragment>
              ) : (
                <Empty description={t("drugDistributions.noData")} />
              )}
            </Form>
          </div>
        </div>
        <div className="action-footer">
          {state.readOnly ? (
            <Button
              type="danger"
              style={{
                minWidth: 100,
              }}
              onClick={onOK(false)}
            >
              Đóng
            </Button>
          ) : (
            <>
              <Button
                type="danger"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(false)}
              >
                Huỷ
              </Button>
              <Button
                type="primary"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(true)}
              >
                Lưu
              </Button>
            </>
          )}
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingCreate: state.scan.isLoadingCreate || false,
      patientInfo: state.patient.patient,
      dataDocument: state.documents.dataDocument,
    }),
    ({
      patient: { searchPatient, clearPatient },
      documents: { getRecordTypeByPatientDocument },
      scan: { uploadScan, updateScanFile },
    }) => ({
      searchPatient,
      getRecordTypeByPatientDocument,
      uploadScan,
      updateScanFile,
      clearPatient,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddForm))
);
