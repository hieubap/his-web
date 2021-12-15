import { Col, Tabs } from "antd";
import { HomeWrapper } from "components";
import {
  ADD_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { combineSort } from "utils";
import FormRight from "./FormRight";
import { Main } from "./styled";
import TableLeft from "./TableLeft";

const { TabPane } = Tabs;
const DiaChiHanhChinh = ({ tabObject }) => {
  const generateHotkeyArr = () => {
    const output = [];
    for (let i = 0; i < tabObject.length; i++) {
      output[i] = stringUtils.guid();
    }
    return output;
  };
  const refLayerHotKeyArr = useRef(generateHotkeyArr());
  const refClickBtnAdd = useRef();
  const { onAddLayer } = useDispatch().phimTat;

  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [quocGiaId, setQuocGiaId] = useState(null);
  const [tinhId, setTinhId] = useState(null);
  const [editQuanHuyenId, setQuanHuyenId] = useState(null);
  const [editXaPhuongId, setXaPhuongId] = useState(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { push } = useHistory();
  const refForm = useRef(null);

  const url = new URL(window.location.href);
  const mode = url.searchParams.get("level");

  // useEffect(() => {
  //   onAddLayer({ layerId: refLayerHotKeyArr.currrent[0] });
  // }, []);
  const callback = (key) => {
    push("/danh-muc/dia-chi-hanh-chinh");
    let mode = parseInt(key, 10);
    setActiveTab(`${mode}`);
    onAddLayer({ layerId: refLayerHotKeyArr.current[key] });
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
  const handleCollapsePane = () => {
    setState({
      changeCollapseStatus: true,
      collapseStatus: !state.collapseStatus,
    });
    setTimeout(() => {
      setState({
        changeCollapseStatus: false,
      });
    }, 500);
  };

  const renderFormRight = () => {
    const tab = tabObject.find((_, idx) => `${idx}` === activeTab) || {};
    const { form: FormEditRight } = tab;
    return FormEditRight ? (
      <FormEditRight
        ref={refForm}
        layerId={refLayerHotKeyArr.current[activeTab]}
        refClickBtnAdd={refClickBtnAdd}
      />
    ) : (
      <div></div>
    );
  };

  // const onShowEditRow =
  //   ({ updateData, updateDataEdit }) =>
  //   (info) => {
  //     if (updateDataEdit) {
  //       updateDataEdit(info);
  //     } else {
  //       updateData({
  //         dataEdit: info,
  //       });
  //     }
  //     if (refForm.current) {
  //       refForm.current.setFields({ info });
  //     }
  //   };

  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(activeTab === "0"
            ? { xl: 24, xxl: 24 }
            : !state.showFullTable
            ? state.collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          className={`pr-3 ${
            state.changeCollapseStatus ? "transition-ease" : ""
          }`}
        >
          <div className="title-parentChild">Danh mục địa chỉ hành chính</div>
          <Tabs
            defaultActiveKey={activeTab}
            activeKey={activeTab}
            onChange={callback}
            className="table-tab"
          >
            {tabObject.map(({ updateData, ...item }, index) => (
              <TabPane tab={item.tab} key={index}>
                {
                  <item.table
                    handleChangeshowTable={handleChangeshowTable}
                    showFullTable={state.showFullTable}
                    collapseStatus={state.collapseStatus}
                    handleCollapsePane={handleCollapsePane}
                    // page={pageQuocGia}
                    // size={sizeQuocGia}
                    // onEditQuocGia={onEditQuocGia}
                    // onSizeChange={onSizeChangeQuocGia}
                    // onPageChange={onChangePageQuocGia}
                    total={item.totalElements}
                    updateData={updateData}
                    // onReset={onResetQuocGia}
                    setEditStatus={setEditStatus}
                    sortData={item.dataSort}
                    layerId={refLayerHotKeyArr?.current[index]}
                    // onShowEdit={onShowEditRow({ updateData })}
                    refClickBtnAdd={refClickBtnAdd}
                    refForm={refForm}
                  />
                }
              </TabPane>
            ))}
          </Tabs>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3  ${
              state.changeCollapseStatus ? "transition-ease" : ""
            } parrent-wrapper`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            {renderFormRight()}
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default DiaChiHanhChinh;
