import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Button, Modal, Tooltip, Table, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import T from "prop-types";
const AccountList = ({ showModal, visible, data, permission }) => {
  const { t } = useTranslation();
  const { permissionList } = permission;
  const { Column } = Table;
  const handleOk = () => {
    showModal(true);
  };

  const handleCancel = () => {
    showModal(false);
  };



  const handleSubmit = () => {};
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      okText={t("drugDistributions.close")}
      cancelText={""}
      onCancel={handleCancel}
      style={{ maxWidth: 420 }}
      footer={[
        <div style={{ textAlign: "center", padding: "5px" }}>
          <Button
            style={{
              minWidth: 130,
              backgroundColor: "#FE5955",
              textAlign: "center",
              color: "#fff",
              border: "none",
              height: "40px",
            }}
            onClick={handleCancel}
          >
            {t("drugDistributions.close")}
          </Button>
          <Button
            style={{
              minWidth: 130,
              backgroundColor: "#20D0CE",
              textAlign: "center",
              color: "#fff",
              border: "none",
              height: "40px",
            }}
            onClick={handleSubmit}
          >
            {t("permission.save")}
          </Button>
        </div>,
      ]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Main>
        <div className="title">
          <h4>{t("permission.detailInfo")}</h4>
        </div>
        <div className="form">
        <Table dataSource={permissionList} rowKey="id" pagination={false}>
        
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
      </Table>
        </div>
      </Main>
    </Modal>
  );
};

AccountList.defaultProps = {
  showModal: () => {},
  visible: false,
  data: {},
};

AccountList.propTypes = {
  showModal: T.func,
  visible: T.bool,
  data: T.shape({}),
};
const mapState = (state) => ({
  permission: state.permission,
});

export default connect(mapState, null)(AccountList);
