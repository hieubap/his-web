import { Row, Col } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DanhSach from "pages/danhMuc/templateQms/components/DanhSach";
import ChiTiet from "pages/danhMuc/templateQms/components/ChiTiet";
import { Main } from "./styled";
import { HomeWrapper } from "components";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ROLES,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

const TemplateQms = () => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
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
          <DanhSach
            handleChangeshowTable={handleChangeshowTable}
            handleCollapsePane={handleCollapsePane}
            collapseStatus={collapseStatus}
            stateParent={state}
            setStateParent={setState}
            layerId={refLayerHotKey.current}
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
              stateParent={state}
              setStateParent={setState}
              layerId={refLayerHotKey.current}
            ></ChiTiet>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default TemplateQms;
