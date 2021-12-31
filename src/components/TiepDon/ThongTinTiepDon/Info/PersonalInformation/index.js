import React, { useState, useRef } from "react";
import { Row } from "antd";
import Header from "components/Header";
import { connect, useDispatch, useSelector } from "react-redux";
import { Main, GlobalStyle } from "./styled";
import Show from "./Show";
import Hide from "./Hide";

const PersonalInformation = (props) => {
  const { checkFormInfo } = useSelector((state) => state.tiepDon);
  const { onChange, selectAddress, onCheckTrungThongTin } = props;
  const refViewMore = useRef(null);
  const showItemInfo = () => {
    // updateData({ checkFormInfo: !checkFormInfo });
    refViewMore.current.show();
  };
  return (
    <Main md={24} xl={24} xxl={24}>
      <div className="frames">
        <Row className="left">
          <Header
            title="Thông tin cá nhân"
            content={
              <div>
                Nhấn <span> [F6] </span> để thêm thông tin cá nhân{" "}
              </div>
            }
          />
        </Row>
        <Show
          onChange={onChange}
          selectAddress={selectAddress}
          onCheckTrungThongTin={onCheckTrungThongTin}
        />
        {/* {checkFormInfo ?
                    <Hide
                        onChange={onChange}
                        updateData={updateData}
                        onCheckTrungThongTin={onCheckTrungThongTin}
                    /> : null} */}
        <GlobalStyle />
        <Hide
          onChange={onChange}
          onCheckTrungThongTin={onCheckTrungThongTin}
          ref={refViewMore}
        />
        <Row>
          <div
            className="button-clear"
            onClick={() => showItemInfo()}
            style={{ marginTop: checkFormInfo ? 102 : 24 }}
          >
            <span>{checkFormInfo ? "Thu gọn" : "Xem thêm  "}</span>
            {checkFormInfo ? (
              <img
                className="icon"
                src={require("assets/images/welcome/arrow.png")}
              />
            ) : (
              <img
                className="icon"
                src={require("assets/images/welcome/arrowDown.png")}
              />
            )}
          </div>
        </Row>
      </div>
    </Main>
  );
};

export default PersonalInformation;
