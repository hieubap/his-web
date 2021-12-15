import React, { memo, useMemo } from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row, Input } from "antd";
import { Main, PopoverWrapper, GlobalStyle, InputSearch } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Checkbox from "antd/lib/checkbox/Checkbox";

const ThongTinDichVu = (props) => {
  const history = useHistory()
  const selectedItem = useSelector(state => state.danhSachDichVuKho.selectedItem)
  return (
    <Main className="info">
      <div className="body-info">
        <Row className="info-full">
          <Col span={24}><div className="title">Thông tin dịch vụ: </div></Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title" >Mã DV:</div> &nbsp;
              <div className="detail" >
                {selectedItem?.ma}
              </div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title">SL tồn thực tế : </div> &nbsp;
              <div className="detail">
                {selectedItem?.soLuong}
              </div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Tên hoạt chất : </div> &nbsp;
              <div className="detail last">{selectedItem?.tenHoatChat}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Phân loại thuốc : </div> &nbsp;
              <div className="detail last">{selectedItem?.tenPhanLoaiDvKho}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Tên DV : </div> &nbsp;
              <div className="detail last">{selectedItem?.ten}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">SL tồn khả dụng : </div> &nbsp;
              <div className="detail last">{selectedItem?.soLuongKhaDung}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">Hàm lượng : </div> &nbsp;
              <div className="detail last">{selectedItem?.hamLuong}</div>
            </Row>
          </Col>
          <Col span={6} className="info">
            <Row className="">
              <div className="title last">ĐVT : </div> &nbsp;
              <div className="detail last">{selectedItem?.tenDonViTinh}</div>
            </Row>
          </Col>
        </Row>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => { };
const mapDispatchToProps = ({ tiepDon: { updateData, getDetail } }) => ({

});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThongTinDichVu);
