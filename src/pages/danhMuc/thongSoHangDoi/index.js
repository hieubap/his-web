import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import DanhSach from "pages/danhMuc/thongSoHangDoi/components/DanhSach";
import ChiTiet from "pages/danhMuc/thongSoHangDoi/components/ChiTiet";
import { Main } from "./styled";
import { HomeWrapper } from "components";
import { connect } from "react-redux";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
const ThongSoHangDoi = (props) => {
  const { getUtils, listLoaiPhongHangDoi, listDoiTuongHangDoi } = props;

  useEffect(() => {
    getUtils({ name: "LoaiPhongHangDoi" });
    getUtils({ name: "DoiTuongHangDoi" });
  }, []);
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    editStatus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  console.log("collapseStatus2", collapseStatus);
  return (
    <Main>
      <HomeWrapper title="Thiết lập">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <DanhSach
            handleChangeshowTable={handleChangeshowTable}
            handleCollapsePane={handleCollapsePane}
            collapseStatus={collapseStatus}
            listLoaiPhongHangDoi={listLoaiPhongHangDoi}
          ></DanhSach>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          >
            <ChiTiet
              listLoaiPhongHangDoi={listLoaiPhongHangDoi}
              listDoiTuongHangDoi={listDoiTuongHangDoi}
              stateParent={state}
              collapseStatus={collapseStatus}
            ></ChiTiet>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    utils: { listLoaiPhongHangDoi = [], listDoiTuongHangDoi = [] },
  } = state;

  return {
    listLoaiPhongHangDoi,
    listDoiTuongHangDoi,
  };
};
const mapDispatchToProps = ({ utils: { getUtils } }) => ({
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThongSoHangDoi);
