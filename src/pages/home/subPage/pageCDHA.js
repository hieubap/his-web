import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Row, Input } from "antd";
import Layout from "../layout";
import { WrapperContentLeft } from "../layout/divInner";
import {  ListChanDoanHinhAnh } from "../layout/configData";
import { Mainfunc } from "../styled";

const PageCDHA = (props) => {
  const history = useHistory();
  const [state, _setState] = useState({
    data: ListChanDoanHinhAnh || [],
  });

  useEffect(() => {
    props.resetDatanbDotDieuTri();
  }, [])

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { data } = state;
  
  const gotoPage = (value) => {
    history.push(value);
  }
  const onSearch = (value) => {
    const valueText = value?.trim().toLowerCase().unsignText();
    const dataSearch = ListChanDoanHinhAnh?.filter(option => option?.title?.toLowerCase().unsignText().indexOf(valueText) >= 0);
    setState({ data: dataSearch || [] });
  }

  return (
    <Layout>
      <Mainfunc bgPageFunc={require("assets/images/pagehome/bgChanDoanHinhAnh.png")}>
        <div className="list-category list-func">
          <div className="list-func--search">
            <div className="list-func--goback" onClick={() => gotoPage("/")}  >
              <img src={require("assets/images/pagehome/icBack.png")} alt="iSofh" />
              <span>Quay lại</span>
            </div>
            <div className="list-func--cateogry">
              <img src={require("assets/images/pagehome/icCDHA.png")} alt="iSofh" />
              <span>Chẩn đoán hình ảnh</span>
            </div>
            <div className="list-func--boxSearch">
              <img src={require("assets/images/his-core/iconSearch.png")} alt="iSofh" />
              <Input
                placeholder="Tìm kiếm"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          <Row className="list-func--home">
            {data.map((item, index) => (
                <Col xs={24} md={12} lg={8} key={index}>
                  <WrapperContentLeft
                    title={item.title}
                    bg={item.bg}
                    link={item.link}
                    {...props}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </Mainfunc>
    </Layout>
  );
}
const mapState = (state) => ({
  auth: state.auth.auth,
});
const mapDispatch = ({
  auth: { onLogout },

  nbDotDieuTri: { resetData: resetDatanbDotDieuTri },
}) => ({
  onLogout,
  resetDatanbDotDieuTri,
});

export default connect(mapState, mapDispatch)(PageCDHA);
