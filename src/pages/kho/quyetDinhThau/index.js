import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs, Modal } from "antd";
import { HomeWrapper } from "components";
import { Main } from "./styled";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import { ModalConfirm } from "components/ModalConfirm";
import { HeartTwoTone } from "@ant-design/icons";
import {
  DanhSach,
  QuyetDinhThau,
  FormQuyetDinhThau,
  ChiTietThau,
  FormChiTietThau,
  KhaiBaoGiamGia,
} from "./components";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";

const { TabPane } = Tabs;

const Index = ({
  //Quyet dinh thau
  searchQuyetDinhThau,
  dataEditQuyetDinhThauDefault,
  updateDataQuyetDinhThau,
  dataSearchQuyetDinhThau,
  dataSortQuyetDinhThau,
  createOrEditQuyetDinhThau,
  pageQuyetDinhThau,
  sizeQuyetDinhThau,
  totalQuyetDinhThau,
  onComplete,
  onUndoComplete,
  onVerify,
  onUndoVerify,
  //ChiTietThau
  getListQuyetDinhThauChiTiet,
  dataEditChiTietThauDefault,
  createOrEditChiTietThau,
  dataSearchChiTietThau,
  dataSortChiTietThau,
  updateDataChiTietThau,
  pageChiTietThau,
  sizeChiTietThau,
  totalChiTietThau,
  getListAllQuyetDinhThau,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;
  const [activeTab, setActiveTab] = useState(0);
  const [quyetDinhThauId, setQuyetDinhThauId] = useState(null);
  const [chiTietThauId, setChiTietThauId] = useState(null);
  const formQuyetDinhThau = useRef(null);
  const formChiTietThau = useRef(null);
  const [edited, setEdited] = useState(false);
  const [trangThai, setTrangThai] = useState(10);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const callback = (key) => {
    setActiveTab(parseInt(key, 10));

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
  };
  const listPanel = [
    {
      title: "Th??ng tin chi ti???t",
      key: 1,
      render: () => {
        return (
          <FormChiTietThau
            handleSubmit={onSaveChiTietThau}
            ref={formChiTietThau}
            onCancel={onCancelChiTietThau}
            layerId={refLayerHotKey2.current}
          />
        );
      },
    },
    {
      key: 2,
      title: "Khai b??o gi???m gi??",
      render: () => {
        return (
          <KhaiBaoGiamGia
            handleSubmit={onSaveChiTietThau}
            ref={formChiTietThau}
            onCancel={onCancelChiTietThau}
            layerId={refLayerHotKey3.current}
          />
        );
      },
    },
  ];

  //-----------------------Quyet dinh thau-----------------------
  const onSizeChangeQuyetDinhThau = (size) => {
    const params = {
      page: pageQuyetDinhThau,
      size: size,
    };
    updateDataQuyetDinhThau(params);
    searchQuyetDinhThau({
      ...params,
      ...dataSearchQuyetDinhThau,
      sort: combineSort(dataSortQuyetDinhThau),
    });
  };

  const onChangePageQuyetDinhThau = (page) => {
    const params = { page: page - 1, size: sizeQuyetDinhThau };
    updateDataQuyetDinhThau(params);
    searchQuyetDinhThau({
      ...params,
      ...dataSearchQuyetDinhThau,
      sort: combineSort(dataSortQuyetDinhThau),
    });
  };

  const onSaveQuyetDinhThau = (values) => {
    createOrEditQuyetDinhThau({ ...values, id: quyetDinhThauId })
      .then((s) => {
        searchQuyetDinhThau({
          page: pageQuyetDinhThau,
          size: sizeQuyetDinhThau,
          ...dataSearchQuyetDinhThau,
          sort: combineSort(dataSortQuyetDinhThau),
        });
        setEdited(false);
        setQuyetDinhThauId(s?.id);
        getListAllQuyetDinhThau({});
      })
      .catch((err) => console.error(err));
  };

  const onEditQuyetDinhThau = (info) => {
    updateDataQuyetDinhThau({ dataEditDefault: info });
    setQuyetDinhThauId(info.id);
    setTrangThai(info.trangThai);
    formQuyetDinhThau.current.setfields({
      info,
      quyetDinhThauId: info.id,
    });
  };

  const onCancelQuyetDinhThau = () => {
    if (formQuyetDinhThau.current) {
      setEdited(false);
      setTrangThai(dataEditQuyetDinhThauDefault.trangThai);
      formQuyetDinhThau.current.setfields({
        info: dataEditQuyetDinhThauDefault,
        quyetDinhThauId,
      });
    }
  };

  const onResetQuyetDinhThau = () => {
    if (formQuyetDinhThau.current) {
      setQuyetDinhThauId(null);
      formQuyetDinhThau.current.resetFields();
      setTrangThai(10);
    }
  };

  const onFieldsChangeForm = () => {
    setEdited(true);
  };

  const onCompleteDocument = () => {
    ModalConfirm({
      title: "B???n c?? ch???c ch???n ho??n th??nh quy???t ?????nh th???u?",
      onOk() {
        onComplete(quyetDinhThauId)
          .then((data) => {
            searchQuyetDinhThau({
              page: pageQuyetDinhThau,
              size: sizeQuyetDinhThau,
              ...dataSearchQuyetDinhThau,
              sort: combineSort(dataSortQuyetDinhThau),
            });
            formQuyetDinhThau.current.setfields({
              info: data,
              quyetDinhThauId,
            });
            setTrangThai(data.trangThai);
          })
          .catch((err) => console.error(err));
      },
      onCancel() {},
    });
  };

  const onUndoCompleteDocument = () => {
    ModalConfirm({
      title: "B???n c?? ch???c ch???n h???y ho??n th??nh quy???t ?????nh th???u?",
      onOk() {
        onUndoComplete(quyetDinhThauId)
          .then((data) => {
            searchQuyetDinhThau({
              page: pageQuyetDinhThau,
              size: sizeQuyetDinhThau,
              ...dataSearchQuyetDinhThau,
              sort: combineSort(dataSortQuyetDinhThau),
            });
            formQuyetDinhThau.current.setfields({
              info: data,
              quyetDinhThauId,
            });
            setTrangThai(data.trangThai);
          })
          .catch((err) => console.error(err));
      },
      onCancel() {},
    });
  };

  const onVerifyDocument = () => {
    ModalConfirm({
      title: "B???n c?? ch???c ch???n duy???t quy???t ?????nh th???u?",
      onOk() {
        onVerify(quyetDinhThauId)
          .then((data) => {
            searchQuyetDinhThau({
              page: pageQuyetDinhThau,
              size: sizeQuyetDinhThau,
              ...dataSearchQuyetDinhThau,
              sort: combineSort(dataSortQuyetDinhThau),
            });
            formQuyetDinhThau.current.setfields({
              info: data,
              quyetDinhThauId,
            });
            setTrangThai(data.trangThai);
          })
          .catch((err) => console.error(err));
      },
      onCancel() {},
    });
  };

  const onUndoVerifyDocument = () => {
    ModalConfirm({
      title: "B???n c?? ch???c ch???n h???y duy???t quy???t ?????nh th???u?",
      onOk() {
        onUndoVerify(quyetDinhThauId)
          .then((data) => {
            searchQuyetDinhThau({
              page: pageQuyetDinhThau,
              size: sizeQuyetDinhThau,
              ...dataSearchQuyetDinhThau,
              sort: combineSort(dataSortQuyetDinhThau),
            });
            formQuyetDinhThau.current.setfields({
              info: data,
              quyetDinhThauId,
            });
            setTrangThai(data.trangThai);
          })
          .catch((err) => console.error(err));
      },
      onCancel() {},
    });
  };

  //---------------Chi tiet thau-----------------
  const onSizeChangeChiTietThau = (size) => {
    const params = {
      page: pageChiTietThau,
      size: size,
    };
    getListQuyetDinhThauChiTiet({
      ...params,
      ...dataSearchChiTietThau,
      sort: combineSort(dataSortChiTietThau),
    });
  };

  const onChangePageChiTietThau = (page) => {
    const params = { page: page - 1, size: sizeChiTietThau };
    getListQuyetDinhThauChiTiet({
      ...params,
      ...dataSearchChiTietThau,
      sort: combineSort(dataSortChiTietThau),
    });
  };

  const onSaveChiTietThau = (values) => {
    createOrEditChiTietThau({ ...values, id: chiTietThauId })
      .then(() => {
        getListQuyetDinhThauChiTiet({
          page: pageChiTietThau,
          size: sizeChiTietThau,
          ...dataSearchChiTietThau,
          sort: combineSort(dataSortChiTietThau),
        });
      })
      .catch((err) => console.error(err));
  };

  const onEditChiTietThau = (info) => {
    updateDataChiTietThau({ dataEditDefault: info });
    setChiTietThauId(info.id);
    formChiTietThau.current.setfields({
      info,
      chiTietThauId: info.id,
    });
  };

  const onCancelChiTietThau = () => {
    if (formChiTietThau.current) {
      formChiTietThau.current.setfields({
        info: dataEditChiTietThauDefault,
        chiTietThauId,
      });
    }
  };

  const onResetChiTietThau = () => {
    if (formChiTietThau.current) {
      setChiTietThauId(null);
      formChiTietThau.current.resetFields();
    }
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
    setCollapseStatus(!collapseStatus);
  };
  //-------------------------------------
  return (
    <Main>
      <HomeWrapper title="Kho">
        <Col
          {...(activeTab === 0
            ? fullTableLayout
            : !state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          className="pr-3 transition-ease tab-main"
        >
          <div className="title-parentChild">Danh s??ch d???ch v??? trong th???u</div>
          <Tabs
            defaultActiveKey={activeTab}
            onChange={callback}
            className="table-tab"
          >
            <TabPane tab="T???t c???" key={0}>
              <DanhSach
                onSizeChange={onSizeChangeChiTietThau}
                onPageChange={onChangePageChiTietThau}
              />
            </TabPane>
            <TabPane tab="Danh s??ch th???u" key={1}>
              <QuyetDinhThau
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={collapseStatus}
                handleCollapsePane={handleCollapsePane}
                dataSort={dataSortQuyetDinhThau || []}
                dataSearch={dataSearchQuyetDinhThau}
                onEdit={onEditQuyetDinhThau}
                onSizeChange={onSizeChangeQuyetDinhThau}
                onPageChange={onChangePageQuyetDinhThau}
                onReset={onResetQuyetDinhThau}
                dataEditDefault={dataEditQuyetDinhThauDefault || []}
                page={pageQuyetDinhThau}
                size={sizeQuyetDinhThau}
                total={totalQuyetDinhThau}
                updateData={updateDataQuyetDinhThau}
                layerId={refLayerHotKey1.current}
              />
            </TabPane>
            <TabPane tab="Chi ti???t th???u" key={2}>
              <ChiTietThau
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={collapseStatus}
                handleCollapsePane={handleCollapsePane}
                dataSort={dataSortChiTietThau || []}
                dataSearch={dataSearchChiTietThau}
                onEdit={onEditChiTietThau}
                onSizeChange={onSizeChangeChiTietThau}
                onPageChange={onChangePageChiTietThau}
                onReset={onResetChiTietThau}
                dataEditDefault={dataEditChiTietThauDefault || []}
                page={pageChiTietThau}
                size={sizeChiTietThau}
                total={totalChiTietThau}
                updateData={updateDataChiTietThau}
                layerId={refLayerHotKey2.current}
              />
            </TabPane>
          </Tabs>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className="mt-3 transition-ease  parrent-wrapper"
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            {activeTab === 1 && (
              <FormQuyetDinhThau
                handleSubmit={onSaveQuyetDinhThau}
                ref={formQuyetDinhThau}
                onCancel={onCancelQuyetDinhThau}
                onFieldsChangeForm={onFieldsChangeForm}
                edited={edited}
                onComplete={onCompleteDocument}
                onUndoComplete={onUndoCompleteDocument}
                onVerify={onVerifyDocument}
                onUndoVerify={onUndoVerifyDocument}
                trangThai={trangThai}
                layerId={refLayerHotKey1.current}
              />
            )}
            {activeTab === 2 && (
              <div className="tab-chi-tiet-dau-thau">
                <MultiLevelTab
                  // defaultActiveKey={1}
                  listPanel={listPanel}
                  isBoxTabs={true}
                  activeKey={state.activeKeyTab}
                  onChange={(activeKeyTab) => {
                    if (activeKeyTab === "1")
                      onAddLayer({ layerId: refLayerHotKey2.current });
                    else if (activeKeyTab === "2")
                      onAddLayer({ layerId: refLayerHotKey3.current });
                    setState({ activeKeyTab });
                  }}
                ></MultiLevelTab>
              </div>
            )}
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    quyetDinhThau: {
      dataEditDefault: dataEditQuyetDinhThauDefault,
      dataSearch: dataSearchQuyetDinhThau,
      dataSort: dataSortQuyetDinhThau,
      page: pageQuyetDinhThau,
      size: sizeQuyetDinhThau,
      totalElements: totalQuyetDinhThau,
    },
    quyetDinhThauChiTiet: {
      dataEditDefault: dataEditChiTietThauDefault,
      dataSearch: dataSearchChiTietThau,
      dataSortChiTietThau,
      page: pageChiTietThau,
      size: sizeChiTietThau,
      totalElements: totalChiTietThau,
    },
  } = state;

  return {
    dataEditQuyetDinhThauDefault,
    dataSearchQuyetDinhThau,
    dataSortQuyetDinhThau,
    pageQuyetDinhThau,
    sizeQuyetDinhThau,
    totalQuyetDinhThau,
    dataEditChiTietThauDefault,
    dataSearchChiTietThau,
    dataSortChiTietThau,
    pageChiTietThau,
    sizeChiTietThau,
    totalChiTietThau,
  };
};
const mapDispatchToProps = ({
  quyetDinhThau: {
    searchQuyetDinhThau,
    getListAllQuyetDinhThau,
    createOrEdit: createOrEditQuyetDinhThau,
    updateData: updateDataQuyetDinhThau,
    onComplete,
    onUndoComplete,
    onVerify,
    onUndoVerify,
  },
  quyetDinhThauChiTiet: {
    getListQuyetDinhThauChiTiet,
    createOrEdit: createOrEditChiTietThau,
    updateData: updateDataChiTietThau,
  },
}) => ({
  searchQuyetDinhThau,
  getListAllQuyetDinhThau,
  createOrEditQuyetDinhThau,
  updateDataQuyetDinhThau,
  onComplete,
  onUndoComplete,
  onVerify,
  onUndoVerify,
  getListQuyetDinhThauChiTiet,
  createOrEditChiTietThau,
  updateDataChiTietThau,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
