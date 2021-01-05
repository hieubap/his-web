import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Button, Modal, Input, Form , Checkbox} from "antd";
import { useTranslation } from "react-i18next";
import T from 'prop-types';
const DetailModal = ({ showModal, visible , data, permission}) => {
  const {TextArea} = Input;
  const [permissionLocal ,setPermission] =useState();
  const [descriptions ,setDescription] =useState();
  const [effective ,setEffective] =useState(false);
  const [value ,setValue] =useState('');
  const [appLocal ,setAppLocal] =useState('');
  const { t } = useTranslation();
 const { appValue, applications} = permission;
  const handleOk = () => {
    showModal(true);
  };

  const handleCancel = () => {
    showModal(false);
  };
  useEffect(() => {
    if(data){
      setPermission(data.ten);
      setDescription(data.moTa);
      setEffective(data.active);
      setValue(data.ma);
    }
    
  }, [data]);

  useEffect( () => {
    const appLocal = applications && applications.find(item => item.id === appValue);
    appLocal && setAppLocal(appLocal.name)
  }, [appValue])

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }
  const changePermission = (e) => {
    setPermission(e.target.value)
  }
  const changeEffective = (e) => {
    setEffective(e.target.checked)
  }
  const handleSubmit = () => {
    
  }
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      okText={t("drugDistributions.close")}
      cancelText={""}
      onCancel={handleCancel}
      style={{ maxWidth: 420 }}
      footer={[
        <div style={{ textAlign: "center", padding: '5px' }}>
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
          <Form.Item label={`${t("permission.detailInfo")}`} className={"props-form-item"}>
            <Input disabled value={appLocal}/>
          </Form.Item>
        </div>
        <Form.Item label={`${t("permission.permissionCode")}`} className={"props-form-item"}>
          <Input disabled value={value}/>
        </Form.Item>
        <Form.Item label={`${t("permission.rightToUse")}`}>
          <Input value={permissionLocal} onChange={changePermission}/>
        </Form.Item>
        <Form.Item label={`${t("permission.descriptions")}`}>
          <TextArea
          placeholder="Autosize height with minimum and maximum number of lines"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={descriptions} onChange={changeDescription}
        />
        </Form.Item>
        <Form.Item >
          <Checkbox checked={effective} onChange={changeEffective} >{t("permission.effective")}</Checkbox>
        </Form.Item>
      </Main>
    </Modal>
  );
};

DetailModal.defaultProps = {
  showModal: ( )=> {},
  visible: false,
  data: {},
};

DetailModal.propTypes = {
  showModal: T.func,
  visible: T.bool,
  data: T.shape({})
};
const mapState = (state) => ({
  permission: state.permission
});

export default connect(mapState, null)(DetailModal);
