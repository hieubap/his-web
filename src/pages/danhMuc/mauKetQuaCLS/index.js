import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import Pagination from "components/Pagination";
import Breadcrumb from "components/Breadcrumb";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form, Row } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import DsMauKetQua from "./containers/DsMauKetQua";
import ThongTinDichVu from "./containers/thongTinDichVu";

const LoaiCapCuu = (props) => {
  const [form] = Form.useForm();
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
  return (
    <Main>
      <HomeWrapper title="Danh mục">
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
          <DsMauKetQua
            handleChangeshowTable={handleChangeshowTable}
            handleCollapsePane={handleCollapsePane}
            collapseStatus={collapseStatus}
            form={form}
            stateParent={state}
            setStateParent={setState}
          />
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          >
            <ThongTinDichVu
              form={form}
              stateParent={state}
              setStateParent={setState}
            />
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    loaiCapCuu: {
      listLoaiCapCuu,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
  } = state;

  return {
    listLoaiCapCuu,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  loaiCapCuu: { getListLoaiCapCuu, createOrEdit, onDelete, updateData },
}) => ({
  getListLoaiCapCuu,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoaiCapCuu);
