import React, { useEffect } from "react";
import { Main } from "../styled";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import Notifications from "../notifications";

const Layout = (props) => {
  const { auth, homePage, updateDataThuocKho } = props;
  const renderBody = () => {
    return (
      <div className="content-left">
        <div className="title">
          Chào mừng, <b>{auth?.full_name}</b>
          <div className="content-title">Hãy lựa chọn chức năng.</div>
        </div>
        {props.children}
      </div>
    );
  };
  useEffect(() => {
    updateDataThuocKho({ dataSortColumn: {}, dsTrangThai: [15], dataSearch: { dsKhoId: [] } , tenNb : null })
  }, [])
  return (
    <Main>
      <Row className="page-home">
        {homePage ? (
          <Col xs={24} lg={24} xl={24}>
            {renderBody()}
          </Col>
        ) : (
            <>
              <Col xs={24} lg={14} xl={12}>
                {renderBody()}
              </Col>
              <Col xs={24} lg={10} xl={12}>
                <Notifications />
              </Col>
            </>
          )}
      </Row>
    </Main>
  );
};
const mapState = (state) => ({
  auth: state.auth.auth,
});
const mapDispatch = ({
  thuocKho: {
    updateData: updateDataThuocKho
  }
}) => ({
  updateDataThuocKho
});

export default connect(mapState, mapDispatch)(Layout);
