import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Icon, Input, Tooltip } from "antd";
import ScanIcon from "assets/svg/scan.svg";
import ScanQrCode from "components/ScanQrCode";
import { useHistory } from "react-router-dom";

const Heading = (props) => {
  const history = useHistory();
  const refQRCodeScaner = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const submit = () => {
    props.searchPatient({ page: 0, timKiem: inputValue, exact: true });
  };

  const changeInput = (e) => {
    setInputValue(e.target.value);
  };
  const onScanQRcode = () => {
    if (refQRCodeScaner.current) {
      refQRCodeScaner.current.show((data) => {
        history.push("/app/vital-signs/" + data);
      });
    }
  };

  return (
    <Main>
      <div className="search-container">
        <Input
          prefix={
            <Icon type="search" style={{ color: "#125872" }} onClick={submit} />
          }
          suffix={
            <Tooltip placement="topLeft" title={"Scan"}>
              <Icon
                onClick={onScanQRcode}
                className={"scan-suffix"}
                component={ScanIcon}
              />
            </Tooltip>
          }
          className="input-search"
          onChange={changeInput}
          onPressEnter={submit}
          placeholder="Nhập mã HS, mã BA"
        />
      </div>
      <ScanQrCode ref={refQRCodeScaner} />
    </Main>
  );
};

const mapDispatch = ({ patient: { searchPatient } }) => ({
  searchPatient,
});

export default connect(null, mapDispatch)(Heading);
