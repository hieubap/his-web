import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Input, DatePicker } from "antd";
import { Main, ContentTable, ModalStyled, SearchDate } from "./styled";
import IconCancel from "assets/images/khamBenh/iconCancel.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import { TRANG_THAI_KHAM_BN } from "../../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import DateDropdown from "./DateDropdown";
import Calendar from "assets/images/kho/calendar.png";
import moment from "moment";

const { RangePicker } = DatePicker;
let timer = null;

export const ModalDanhSachBN = forwardRef(({ refModalNotification2 }, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refInputNhapSoKham = useRef(null);
  const refShowDate = useRef(null);

  const [state, _setState] = useState({
    show: false,
    data: {},
    selectedDateFrom: moment().format("DD/MM/YYYY"),
    selectedDateTo: moment().format("DD/MM/YYYY"),
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { listData, totalElements, page, size, dataSearch, dataSortColumn } =
    useSelector((state) => state.nbKhamBenh);
  const { infoNb, dangKhamError } = useSelector((state) => state.khamBenh);
  const { listtrangThaiDichVu } = useSelector((state) => state.utils);
  const { onSearch, onSizeChange, onSortChange, onChangeInputSearch } =
    useDispatch().nbKhamBenh;
  const { kiemTraTrangThaiLoadNguoiBenh, boQuaKham, updateData } =
    useDispatch().khamBenh;
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const { getUtils } = useDispatch().utils;

  useEffect(() => {
    if (refModalNotification2 && dangKhamError) {
      refModalNotification2.current &&
        refModalNotification2.current.show(
          {
            showBtnOk: false,
            title: "Th??ng b??o",
            content: dangKhamError,
            rightCancelButton: true,
            cancelText: "????ng",
          },
          () => { },
          () => {
            updateData({
              dangKhamError: "",
            });
          }
        );
    }
  }, [dangKhamError]);

  useEffect(() => {
    getUtils({ name: "trangThaiDichVu" });
  }, []);

  useEffect(() => {
    renderData();
  }, [listData]);
  const renderData = () => {
    let data = listData.map((item) => {
      return {
        ...item,
        thongTin: `${item.tenNb}${item.tuoi && ` - ${item.tuoi} tu???i`}${
          !!item.xaPhuong ? ` - ${item.xaPhuong}` : ""
          }
        ${!!item.quanHuyen ? ` - ${item.quanHuyen}` : ""}${
          item.tenTinhThanhPho ? ` - ${item.tenTinhThanhPho}` : ""
          }${item.quocGia ? ` - ${item.quocGia}` : ""}`,
      };
    });
    setState({ data });
  };
  useImperativeHandle(ref, () => ({
    show: (option = {}) => {
      const {
        search = false,
        timKiem = "",
        maHoSo = "",
        soPhieu = "",
      } = option;
      setState({
        show: true,
      });
      if (search) {
        onSizeChange(
          {
            size: size,
            dataSortColumn,
            dataSearch,
            timKiem: timKiem,
            maHoSo: maHoSo,
            soPhieu: soPhieu,
          },
          true
        );
      } else {
        // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
        onChangeInputSearch({ tuThoiGianVaoVien: moment().format("DD-MM-YYYY"), denThoiGianVaoVien: moment().format("DD-MM-YYYY") }, true);
      }
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 117, //F6
            onEvent: () => {
              refInputNhapSoKham.current && refInputNhapSoKham.current.focus();
            },
          },
          {
            keyCode: 27, //ESC
            onEvent: () => {
              onCloseModal();
            },
          },
        ],
      });
    },
  }));
  const onCloseModal = () => {
    setState({ show: false, selectedDateFrom: moment().format("DD/MM/YYYY"), selectedDateTo: moment().format("DD/MM/YYYY"), });
  };
  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [state.show]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  const onSetNbTiepTheo = (record, chuyenTrangThai) => {
    return new Promise((resolve, reject) => {
      kiemTraTrangThaiLoadNguoiBenh({ infoNb: record, chuyenTrangThai })
        .then((s) => {
          resolve(true);
        })
        .catch((e) => {
          refModalNotification2.current.show(
            {
              showBtnOk: true,
              title: "Th??ng b??o",
              content: e,
              cancelText: "????ng",
              okText: "X??c nh???n",
              typeModal: "warning",
            },
            () => {
              kiemTraTrangThaiLoadNguoiBenh({
                infoNb: record,
                chuyenTrangThai,
                forceUpdate: true,
              })
                .then((s) => {
                  resolve(true);
                })
                .catch((e) => {
                  reject(e);
                });
            },
            () => {
              reject();
            }
          );
        });
    });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        onSetNbTiepTheo(record, false).then((s) => {
          setState({ show: false });
        });
      },
    };
  };
  const onClickSort = (key, value) => {
    onSortChange(
      {
        [key]: value,
      },
      true
    );
  };
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch(
        {
          [key]: value,
        },
        true
      );
    }, 300);

    if (key == "dsTrangThai") {
      if (value == 20) {
        value = [value, 30, 40];
      } else if (value == 100) {
        value = [value, 110, 120];
      }
      if (value == 50) {
        value = [value, 130];
      }
      onChangeInputSearch(
        {
          [key]: value,
        },
        true
      );
    }
  };

  const onClickBoQua = (record) => () => {
    boQuaKham({
      loadNbTiepTheo: false,
      id: record.id,
      trangThai: record.trangThai,
      showMessage: true,
    }).then((s) => {
      record.trangThai = s?.data?.nbDvKyThuat?.trangThai;
      setState({ data: [...state.data] });
    });
  };
  const onClickGoi = (record) => () => {
    onSetNbTiepTheo(record, true).then((s) => {
      setState({ show: false });
    });
  };
  const renderGoiButton = (record) => {
    const trangThai = record?.trangThai;
    switch (trangThai) {
      case TRANG_THAI_DICH_VU.CHO_KHAM:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
      case TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM:
      case TRANG_THAI_DICH_VU.DA_CHECKIN_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
      case TRANG_THAI_DICH_VU.BO_QUA:
      case TRANG_THAI_DICH_VU.BO_QUA_KET_LUAN:
        //cho ph??p button G???i nh???n
        return (
          <div className="btn-action" onClick={onClickGoi(record)}>
            G???i
          </div>
        );
      case TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU:
      case TRANG_THAI_DICH_VU.DA_KET_LUAN:
      case TRANG_THAI_DICH_VU.DA_DUYET:
        //button g???i kh??ng cho ph??p
        return (
          <div disabled className="btn-action">
            G???i
          </div>
        );
    }
  };
  const renderBoQuaButton = (record) => {
    const trangThai = record?.trangThai;
    switch (trangThai) {
      case TRANG_THAI_DICH_VU.DANG_KHAM:
      case TRANG_THAI_DICH_VU.CHO_KHAM:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
      case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
      case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
      case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
        //cho ph??p button G???i nh???n
        return (
          <div className="btn-action" onClick={onClickBoQua(record)}>
            B??? qua
          </div>
        );
    }
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" isTitleCenter={true}/>,
      width: "35px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="S??? kh??m"
          sort_key="stt2"
          dataSort={dataSortColumn["stt2"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              ref={refInputNhapSoKham}
              placeholder="Nh???p s??? kh??m"
              onChange={onSearchInput("soKham")}
            />
          }
        />
      ),
      width: "40px",
      dataIndex: "stt2",
      key: "stt2",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="Ng??y ????ng k??"
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              ref={refInputNhapSoKham}
              placeholder="Nh???p ng??y ????ng k??"
              onChange={onSearchInput("thoiGianVaoVien")}
            />
          }
        />
      ),
      render: (item) => {
        return moment(item).format("DD/MM/YYYY hh:mm:ss")
      },
      width: "80px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="M?? h??? s??"
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p m?? h??? s??"
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="M?? NB"
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p m?? ng?????i b???nh"
              onChange={onSearchInput("maNb")}
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="T??n - Tu???i - ?????a ch???"
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p T??n - Tu???i - ?????a ch???"
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "thongTin",
      key: "thongTin",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="T??n d???ch v???"
          sort_key="tenDichVu"
          dataSort={dataSortColumn["tenDichVu"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder="Nh???p T??n d???ch v???"
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title="Tr???ng th??i"
          sort_key="trangThai"
          dataSort={dataSortColumn["trangThai"] || 0}
          onClickSort={onClickSort}
          searchSelect={
            <Select
              placeholder="Ch???n tr???ng th??i"
              onChange={onSearchInput("dsTrangThai")}
              data={[{ id: "", ten: "T???t c???" }, ...TRANG_THAI_KHAM_BN]}
              defaultValue=""
            />
          }
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        const res = listtrangThaiDichVu.find((el) => el.id === item) || {};
        return res.ten;
      },
    },
    {
      title: <HeaderSearch title="Thao t??c" isTitleCenter={true}/>,
      width: "50px",
      dataIndex: "action",
      key: "action",
      render: (item, record) => {
        return (
          <div className="action-group">
            {renderGoiButton(record)}
            {renderBoQuaButton(record)}
          </div>
        );
      },
    },
  ];
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 }, true);
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
  };

  const rowClassName = (record) => {
    return record.id === infoNb?.id ? "active" : "";
  };
  return (
    <ModalStyled
      width={1447}
      visible={state.show}
      closable={false}
      footer={null}
    >
      <Main>
        <Row className="header-table">
          <div className="header-table__left">
            DANH S??CH NG?????I B???NH
            <span style={{
              fontFamily: "Nunito Sans",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 600,
              marginLeft: 24,
              marginRight: 10
            }}>
              Ng??y ????ng k??
            </span>
            <SearchDate>
              <DateDropdown stateParent={state} setStateParent={setState} ref={refShowDate} onChangeInputSearch={onChangeInputSearch}></DateDropdown>
              <input className="filter" value={`${state.selectedDateFrom} - ${state.selectedDateTo}`} onClick={() => refShowDate.current.show()} />
              <img src={Calendar} alt="..." style={{ marginRight: 5 }} style={{ position: "absolute", right: 5, top: 6 }} />
            </SearchDate>
          </div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
          </div>
        </Row>
        <ContentTable>
          <TableWrapper
            rowClassName={rowClassName}
            columns={columns}
            dataSource={state.data}
            onRow={onRow}
            scroll={{ y: 450 }}
            rowKey={(record) => `${record.id}-${record.tenNb}`}
          />
          {totalElements ? (
            <Pagination
              onChange={handleChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
            />
          ) : null}
        </ContentTable>
      </Main>
    </ModalStyled>
  );
});

export default ModalDanhSachBN;
