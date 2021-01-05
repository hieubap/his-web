import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import PermissionDetail from "../PermissionDetail";
import { useTranslation } from "react-i18next";
import { Table, Tooltip, Button, Checkbox } from "antd";
import T from "prop-types";
import { Select } from "antd";
import {  unsignText } from "components/utils";

const PermissionList = ({ getListPermission, getApplications, permission, getAppValue }) => {
  const { t } = useTranslation();
  const { permissionList, applications } = permission;
  const { Column } = Table;
  const [visible, setVisible] = useState(false);
  const [dataPermission, setDataPermission] = useState({});
  const [patientsPagination, setPatients] = useState([]);
  useEffect(() => {
    getListPermission();
  }, []);

  const showModal = (visible, record) => {
    setVisible(visible);
    setDataPermission(record)
  };

  useEffect(() => {
    getApplications();
  }, []);

  const filterOption = (input, option) => {
    return (
      option.props.name && unsignText(option.props.name)
        .toLowerCase()
        .indexOf(unsignText(input.toLowerCase())) >= 0
    );
  };

  const selectApp = (value) => {
    getAppValue(value)
  };

  return (
    <Main>
      <div className="header-permission">
        <h2 className="title-list">{t("permission.categories")}</h2>
        <Select
          showSearch
          filterOption={filterOption}
          placeholder={t("permission.selectApplycation")}
          className="search-item"
          style={{ width: 280, height: 40, borderRadius: 50 }}
          onSelect={selectApp}
        >
          {applications &&
            applications.map((item) => (
              <Select.Option key={item} value={item.id} name={item.name}>
                <div title={item.name}>{item.name}</div>
              </Select.Option>
            ))}
        </Select>
      </div>

      <Table dataSource={patientsPagination} rowKey="id" pagination={false}>
        <Column
          title={`${t("permission.STT")}`}
          key="index"
          render={(value, item, index) => <span>{index + 1}</span>}
        />
        <Column
          title={`${t("permission.permissionCode")}`}
          dataIndex="ma"
          key="ma"
        />
        <Column
          title={`${t("permission.rightToUse")}`}
          dataIndex="ten"
          key="ten"
          render={(value, item) => <Tooltip placement="topLeft" title={item.ten}><span className="permission-text">{item.ten}</span></Tooltip>}
        />
        <Column
          title={`${t("permission.descriptions")}`}
          dataIndex="moTa"
          key="moTa"
          render={(value, item) => <Tooltip placement="topLeft" title={item.moTa}><span className="permission-text" >{item.moTa}</span></Tooltip>}
        />
        <Column
          title={`${t("permission.effective")}`}
          dataIndex="active"
          key="active"
          align="center"
          render={(text, record) => <Checkbox checked={record.active} />}
        />
        <Column
          title={`${t("permission.action")}`}
          key="action"
          align="left"
          render={(text, record) => (
            <span>
              <Button
                icon="zoom-in"
                className="btn-detail"
                onClick={() => showModal(true, record)}
              >
                {t("permission.detailInfo")}
              </Button>
            </span>
          )}
        />
      </Table>

      <PermissionDetail visible={visible} showModal={showModal} data={dataPermission}/>
    </Main>
  );
};
PermissionList.defaultProps = {
  getListPermission: () => {},
  getAppValue: () => {},
  visible: false,
};

PermissionList.propTypes = {
  getListPermission: T.func,
  getAppValue: T.func,
};
const mapState = (state) => ({
  permission: state.permission,
});

const mapDispatch = ({ permission: { getListPermission ,getApplications,getAppValue} }) => ({
  getListPermission,
  getApplications,
  getAppValue
});

export default connect(mapState, mapDispatch)(PermissionList);
