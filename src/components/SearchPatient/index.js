import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Icon, Select, Input, Row, Col } from "antd";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import ScanIcon from "assets/svg/scan.svg";
import ScanQrCode from "components/ScanQrCode";
import { useHistory, useParams, useLocation } from "react-router-dom";

const SearchPatients = ({
  getAllDepartments,
  rooms,
  getAllRoomsAdmin,
  departments,
  ...props
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  const refQRCodeScaner = useRef(null);
  const { search: searchParams } = useLocation();

  useEffect(() => {
    getAllDepartments();
    const queryString = decodeURIComponent(searchParams);
    const urlParams = new URLSearchParams(queryString);
    const {
      timKiem = props.timKiem,
      phongId = props.phongId,
      khoaId = props.khoaId,
    } = Object.fromEntries(urlParams);
    setState({
      departmentId: khoaId ? parseInt(khoaId) : "",
      roomId: phongId ? parseInt(phongId) : "",
      inputValue: timKiem,
    });
  }, []);

  const changeInput = (e) => {
    setState({
      inputValue: e.target.value,
    });
  };
  const submit = (e, value) => {
    props.onSearch({
      page: 0,
      timKiem: value || state.inputValue,
      khoaId: state.departmentId,
      phongId: state.roomId,
    });
  };

  const selectDepartment = (value) => {
    setState({
      departmentId: value,
    });
    getAllRoomsAdmin({ departmentId: value });

    props.onSearch({
      page: 0,
      timKiem: state.inputValue,
      khoaId: value,
      phongId: state.roomId,
    });
  };
  const selectRoom = (value) => {
    setState({
      roomId: value,
    });
    props.onSearch({
      page: 0,
      timKiem: state.inputValue,
      khoaId: state.departmentId,
      phongId: value,
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
  const onScanQRcode = () => {
    if (refQRCodeScaner.current) {
      refQRCodeScaner.current.show((data) => {
        setState({
          inputValue: data,
        });
        submit(null, data);
      });
    }
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={props.windowWidth < 700 ? 24 : 8}>
          <Input
            onChange={changeInput}
            type="text"
            value={state.inputValue}
            placeholder="Nhập tên, mã HS hoặc mã BA"
            className="search-input search-item"
            prefix={
              <Icon
                type="search"
                style={{ color: "#125872" }}
                onClick={submit}
              />
            }
            suffix={
              <Icon
                style={{ fontSize: 22 }}
                onClick={onScanQRcode}
                className={"scan-suffix"}
                component={ScanIcon}
              />
            }
            onPressEnter={submit}
          />
        </Col>
        <Col
          span={props.windowWidth > 1300 ? 6 : props.windowWidth > 700 ? 8 : 24}
        >
          <Select
            showSearch
            value={state.departmentId}
            onSelect={selectDepartment}
            placeholder={t("drugDistributions.selectDepartmant")}
            className="search-item"
            filterOption={filterOption}
            notFoundContent={t("drugDistributions.noData")}
          >
            <Select.Option value={""}>
              <div className={"select-search-item"} title={"=== Tất cả ==="}>
                === Tất cả ===
              </div>
            </Select.Option>
            {departments.map((item) => (
              <Select.Option key={item} value={item.id} name={item.name}>
                <div className={"select-search-item"} title={item.name}>
                  {item.name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col
          span={props.windowWidth > 1300 ? 6 : props.windowWidth > 700 ? 8 : 24}
        >
          <Select
            showSearch
            value={state.roomId || undefined}
            onSelect={selectRoom}
            placeholder={t("drugDistributions.selectRoom")}
            className="search-item"
            filterOption={filterOption}
            notFoundContent={t("drugDistributions.noData")}
            width={280}
          >
            <Select.Option value="">{"- Chọn tất cả -"}</Select.Option>
            {rooms.map((item) => (
              <Select.Option key={item} value={item.id} name={item.name}>
                <div className={"select-search-item"} title={item.name}>
                  {item.name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <ScanQrCode ref={refQRCodeScaner} />
    </Main>
  );
};
const mapState = (state) => ({
  auth: state.auth.auth,
  departments: state.department.departments || [],
  rooms: state.room.rooms,
  windowWidth: state.application.width,
  phongId: state.patient.phongId,
  khoaId: state.patient.khoaId,
  timKiem: state.patient.timKiem,
});

const mapDispatch = ({
  department: { getAllDepartments },
  room: { getAllRoomsAdmin },
}) => ({
  getAllDepartments,
  getAllRoomsAdmin,
});

export default connect(mapState, mapDispatch)(SearchPatients);
