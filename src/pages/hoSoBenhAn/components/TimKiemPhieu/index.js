import { Col, Row, Button, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { SearchKho, Main, InputSearch, InputSearch2 } from "./styled";
import { connect } from "react-redux";
import IcFilter from "assets/images/kho/icFilter.png";
import "./styled.css";
import CustomPopover from "../CustomPopover";
import { useHistory } from "react-router-dom";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";

const TimKiemPhieu = ({
  onChangeInputSearch,
  ...props
}) => {
  useEffect(() => {

  }, []);
  const refShow = useRef(null);
  const refTimeOut = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (key) => (e) => {

  };

  const onKeyDown = (type) => (e) => {
    if (e?.key == "Enter") {
      let value = e.target ? e.target?.value : e;
      if (!value) return;
      if (type == "maNb") {
        if (!/^[0-9]+$/.test(value)) {
          const regex = new RegExp(/"maNb":"([0-9]+)"/);
          const match = regex.exec(`${value}`);
          value = match[1];
        }
      }
      onChangeInputSearch({ [type]: `${value}`.trim() });
    }
  }

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách người bệnh</label>
          </div>
          {/* <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nha-thuoc/them-moi");
              }}
            >
              <span>Thêm mới</span>
              <img src={IcCreate} />
            </Button>
          </div> */}
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <CustomPopover ref={refShow}></CustomPopover>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span>Bộ lọc</span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="232px">
            <InputSearch>
              <Input
                placeholder="Tìm họ tên Người bệnh"
                autoFocus
                onKeyDown={onKeyDown("tenNb")}
                onChange={((e) => {
                  const value = e.target ? e.target?.value : e;
                  if (value == "")
                    onChangeInputSearch({ tenNb: `${value}`.trim() });
                })}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="232px">
            <InputSearch>
              <Input
                placeholder="Tìm số điện thoại"
                autoFocus
                onKeyDown={onKeyDown("soDienThoai")}
                onChange={((e) => {
                  const value = e.target ? e.target?.value : e;
                  if (value == "")
                    onChangeInputSearch({ soDienThoai: `${value}`.trim() });
                })}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col flex="489px">
            <InputSearch>
              <Input
                placeholder="Nhập hoặc quét QR NB, Mã NB"
                autoFocus
                onKeyDown={onKeyDown("maNb")}
                onChange={((e) => {
                  const value = e.target ? e.target?.value : e;
                  if (value == "")
                    onChangeInputSearch({ maNb: `${value}`.trim() });
                })}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default connect(
  (state) => ({

  }),
  ({
    information: {
      onChangeInputSearch,
    }
  }) => ({
    onChangeInputSearch,
  }),
)(TimKiemPhieu);
