import React, { useRef, useState, useEffect } from "react";
import { Form, DatePicker, Button, Spin, Input, Col, Select, Row } from "antd";
import { connect } from "react-redux";
import { Main } from "./styled";
import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
import { useTranslation } from "react-i18next";
import moment from "moment";

const ReportSummary = (props) => {
  const [state, _setState] = useState({
    trangThai: 30,
    khoaIds: [],
    tuNgay: new Date(),
    denNgay: new Date(),
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();

  const { getFieldDecorator } = props.form;
  useEffect(() => {
    props.getAllDepartments();
    props.updateData({
      isLoadingSummaryReport: false,
    });
  }, []);
  const handleSubmit = (e) => {
    e.prentDefault();
  };
  const selectDepartment = (value) => {
    setState({
      khoaIds: value,
    });
    props.getAllRoomsAdmin({ departmentId: value });
  };

  const selectRoom = (value) => {
    setState({
      phongIds: value,
    });
  };
  const selectStatus = (value) => {
    setState({
      trangThai: value,
    });
  };
  const filterOption = (input, option) => {
    return (
      option.props.name &&
      option.props.name
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  const onChangeDate = (key) => (date) => {
    setState({
      [key]: date?._d,
    });
  };
  const checkDenNgay = (rules, value, callback) => {
    if (value?._d && state.tuNgay) {
      if (state.tuNgay.format("yyyyMMdd") > value?._d.format("yyyyMMdd")) {
        callback("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      }
    }
    callback();
  };
  const exportReport = (type) => () => {
    props.form.validateFields((errors, values) => {
      if (!errors) {
        props
          .onExportSummaryReport({
            tuNgay: state.tuNgay,
            denNgay: state.denNgay,
            khoaIds: state.khoaIds,
            phongIds: state.phongIds,
            trangThai: state.trangThai,
            type,
          })
          .then((s) => {
            let blob = "";
            if (type == "pdf") {
              blob = new Blob([new Uint8Array(s)], {
                type: "application/pdf",
              });
            } else {
              blob = new Blob([new Uint8Array(s)], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
            }
            let url = window.URL.createObjectURL(blob);
            window.open(url);
            // const a = document.createElement("a");
            // a.style.display = "none";
            // a.href = url;
            // document.body.appendChild(a);
            // a.click();
            // window.URL.revokeObjectURL(url);
          })
          .catch((e) => {});
      }
    });
  };
  return (
    <Main>
      <Page
        header={
          <PageHeader leftArea={"BÁO CÁO TỔNG HỢP TÌNH HÌNH CẤP PHÁT THUỐC"} />
        }
      >
        <Spin spinning={props.isLoadingSummaryReport}>
          <Form onSubmit={handleSubmit}>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label={"Từ ngày y lệnh"}>
                  {getFieldDecorator("tuNgay", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn ngày bắt đầu!",
                      },
                    ],
                    initialValue: state.tuNgay ? moment(state.tuNgay) : null,
                  })(
                    <DatePicker
                      onChange={onChangeDate("tuNgay")}
                      format={"DD/MM/YYYY"}
                      className="search-item"
                      disabledTime
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Đến ngày y lệnh"}>
                  {getFieldDecorator("denNgay", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn ngày kết thúc!",
                      },
                      {
                        validator: checkDenNgay,
                      },
                    ],
                    initialValue: state.denNgay ? moment(state.denNgay) : null,
                  })(
                    <DatePicker
                      onChange={onChangeDate("denNgay")}
                      format={"DD/MM/YYYY"}
                      className="search-item"
                      disabledTime
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label={"Khoa chỉ định"}>
                  {getFieldDecorator("khoaIds", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn khoa!",
                      },
                    ],
                    initialValue: state.khoaIds,
                  })(
                    <Select
                      showSearch
                      onChange={selectDepartment}
                      placeholder={t("drugDistributions.selectDepartmant")}
                      className="search-item"
                      filterOption={filterOption}
                      notFoundContent={t("drugDistributions.noData")}
                      mode="multiple"
                    >
                      <Select.Option value={""} name={"- Chọn tất cả -"}>
                        <div
                          className={"select-search-item"}
                          title={"- Chọn tất cả -"}
                        >
                          {"- Chọn tất cả -"}
                        </div>
                      </Select.Option>
                      {props.departments.map((item) => (
                        <Select.Option
                          key={item}
                          value={item.id}
                          name={item.name}
                        >
                          <div
                            className={"select-search-item"}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label={"Phòng chỉ định"}>
                  {getFieldDecorator("phongIds", {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: "Vui lòng chọn phòng!",
                    //   },
                    // ],
                    initialValue: state.phongIds,
                  })(
                    <Select
                      showSearch
                      onChange={selectRoom}
                      placeholder={t("drugDistributions.selectRoom")}
                      className="search-item"
                      filterOption={filterOption}
                      notFoundContent={t("drugDistributions.noData")}
                      width={280}
                      mode="multiple"
                    >
                      <Select.Option value="">
                        {"- Chọn tất cả -"}
                      </Select.Option>
                      {props.rooms.map((item) => (
                        <Select.Option
                          key={item}
                          value={item.id}
                          name={item.name}
                        >
                          <div
                            className={"select-search-item"}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label={"Trạng thái"}>
                  {getFieldDecorator("trangThai", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn trạng thái!",
                      },
                    ],
                    initialValue: state.trangThai,
                  })(
                    <Select
                      showSearch
                      onSelect={selectStatus}
                      placeholder={t("drugDistributions.selectDepartmant")}
                      className="search-item"
                      filterOption={filterOption}
                      notFoundContent={t("drugDistributions.noData")}
                    >
                      {[
                        {
                          id: 0,
                          name: "Tất cả",
                        },
                        {
                          id: 10,
                          name: "Chưa duyệt thuốc",
                        },
                        {
                          id: 20,
                          name: "Đã duyệt thuốc",
                        },
                        {
                          id: 30,
                          name: "Chưa cấp phát thuốc",
                        },
                        {
                          id: 40,
                          name: "Đã cấp phát thuốc",
                        },
                      ].map((item) => (
                        <Select.Option
                          key={item}
                          value={item.id}
                          name={item.name}
                        >
                          <div
                            className={"select-search-item"}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{
                    minWidth: 100,
                  }}
                  onClick={exportReport("excel")}
                >
                  Xuất Excel
                </Button>
                <Button
                  type="primary"
                  style={{
                    minWidth: 100,
                    marginLeft: 5,
                  }}
                  onClick={exportReport("pdf")}
                >
                  Xuất báo cáo
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Page>
    </Main>
  );
};

const mapState = (state) => ({
  departments: state.department.departments || [],
  rooms: state.room.rooms || [],
  isLoadingSummaryReport: state.drugAllocation.isLoadingSummaryReport || false,
});

const mapDispatch = ({
  department: { getAllDepartments },
  room: { getAllRoomsAdmin },
  drugAllocation: { onExportSummaryReport, updateData },
}) => ({
  getAllDepartments,
  getAllRoomsAdmin,
  onExportSummaryReport,
  updateData,
});

export default Form.create({})(connect(mapState, mapDispatch)(ReportSummary));
