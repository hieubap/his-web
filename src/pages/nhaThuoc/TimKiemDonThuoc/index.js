import { Col, Row, Button, Input, Popover, Checkbox, message } from "antd";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { SearchKho, Main, InputSearch, PopupWrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import "./styled.css";
import { TRANG_THAI_DON_THUOC } from "constants/index";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcClose from "assets/images/kho/icClose.png";
import CustomPopover from "pages/nhaThuoc/CustomPopover";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
const TimKiemDonThuoc = (props) => {
  const {
    dsKhoId = [],
    dsTrangThai,
    maNb,
    soPhieu,
    maHoSo,
    tuThoiGianDuyet,
    denThoiGianDuyet,
    nguoiDuyetId,
  } = useSelector((state) => state.thuocKho);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listKhoUser } = useSelector((state) => state.kho);
  const { getAll, listAllKho, onChangeInputSearch, onSearch, listDataNhanVienKho, onSearchNhanVienKho, auth, layerId } = props;

  const {
    kho: { getAllTongHop: getAllKhoTongHop, getTheoTaiKhoan },
    thuocKho: { searchThuocByParams, postTaoMoi },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  const listKhoNhanVienKho = useMemo(() => {
    return listKhoUser.map(item => {
      item.value = item.id
      item.label = item?.ten
      return item
    })
  }, [listKhoUser])
  
  const refFocusTenNb = useRef();
  const refFocusQr = useRef();
  const refCreate = useRef();

  const {
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
        {
          keyCode: 114, //F3
          onEvent: () => {
            refFocusQr.current && refFocusQr.current.focus();
          },
        },
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    getAllKhoTongHop({});
    getListAllNhanVien();
    getTheoTaiKhoan({ nhaThuoc: true });
    // if (auth?.nhanVienId) {
    //   onSearchNhanVienKho({ nhanVienId: auth?.nhanVienId, size: 9999999 })
    // }
  }, []);
  // useEffect(() => {
  //   if (listKhoUser.length > 0) {
  //     const list = listKhoUser.map(item => item.id)
  //     const randomId = list[~~(Math.random() * list.length)] // random
  //     updateData({
  //       dsKhoId: [randomId]
  //     })
  //   }
  // }, [listKhoUser]);
  const refShow = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => (e) => {
    switch (key) {
      case "khoId": {
        if (dsKhoId.includes(e)) return null;
        dsKhoId.push(e);
        // updateData({
        //   dsKhoId: dsKhoId
        // })
        // getListThuoc({ dsKhoId })
        searchThuocByParams({ dsKhoId });
        break;
      }
      case "tenNb": {
        // updateData({
        //   tenNb: e.target.value
        // })
        searchThuocByParams({ tenNb: e.target.value });
        break;
      }

      default:
        break;
    }
  };
  const history = useHistory();

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };
  const group = () => (
    <Checkbox.Group
      options={TRANG_THAI_DON_THUOC}
      onChange={onSearchInput("dsTrangThai")}
      value={dsTrangThai}
    />
  );

  const groupTenKho = () => (
    <Checkbox.Group
      options={listKhoNhanVienKho}
      onChange={onSearchInput("khoId")}
      value={dsKhoId}
    />
  );

  const onSearchInput = (key) => (e) => {
    // let value = "";
    // if (e.length > 0) {
    //   value = e;
    // }
    if (key === "khoId") {
      searchThuocByParams({ dsKhoId: e });
    }
    if (key === "dsTrangThai") {
      // updateData({
      //   dsTrangThai: value
      // })
      // getListThuoc({ dsTrangThai })
      searchThuocByParams({ dsTrangThai: e });
    }
  };
  const onKeyDown = (e) => {
    if (dsKhoId.length === 0) {
      message.error("Vui lòng chọn kho để quét đơn");
      return null;
    }
    if (dsKhoId.length > 1) {
      message.error("Chỉ chọn 1 kho để quét đơn");
      return null;
    }

    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (e.key === "Enter") {
      handleSearchBN(value);
    }
  };
  const onChangeSearch = (key, needEnter) => (e, item) => {
    if (dsKhoId.length > 1 || dsKhoId.length === 0) {
      return null;
    }
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "qrBN") {
      if (/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
  };
  const notifiNotSearch = () => {
    // let res = state.listPhongKham.filter((e) => e.id === state.phongLayMauId);
    message.error(`Không tồn tại dịch vụ người bệnh !`);
    // message.error(
    //   `Không tồn tại dịch vụ người bệnh ${
    //     (!!res.length && `tại ${res[0].ten}`) || ""
    //   }!`
    // );
  };
  const handleSearchBN = debounce((value) => {
    const { qrBN = "" } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str)) {
      param = { maHoSo: Number(str) };
    } else {
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maHoSo");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res.length) {
        if (res[0].length >= 10) {
          param = { maHoSo: Number(res[0]) };
        }
      }
    }
    if (param?.maHoSo || param?.soPhieu) {
      // Search info nb
      // param.isSingleSearch = true;
      param.sort = "id,desc";
      param.dsKhoId = dsKhoId.length > 0 ? dsKhoId : null;
      // console.log('param: ', param);
      const obj = {
        khoId: param.dsKhoId && param.dsKhoId[0], //103
        nbDotDieuTri: {
          maHoSo: param.maHoSo, //"2108090025"
        },
      };
      postTaoMoi(obj)
        .then((s) => {
          if (!s.length) {
            // notifiNotSearch();
          }
          history.push(`/nha-thuoc/chi-tiet/${s.phieuXuatId}`);
        })
        .catch((e) => {
          // notifiNotSearch();
        });
      // onSearch(param)
      //   .then((s) => {
      //     if (!s.length) {
      //       // notifiNotSearch();
      //     }
      //     history.push(`/kho/nha-thuoc/chi-tiet/${s[0].id}`);
      //   })
      //   .catch((e) => {
      //     notifiNotSearch();
      //   });
    } else {
      // if (str) {
      //   notifiNotSearch();
      // } else message.error("Vui lòng nhập thông tin tìm kiếm!");
    }
  }, 1000);
  const renderParamsSelected = (item, key, arr, mustFilter) => {
    return (
      <div className="item">
        <span>{mustFilter ? arr.find((x) => x.id == item)?.ten : item}</span>
        <img
          style={{ cursor: "pointer" }}
          src={IcClose}
          alt="..."
          onClick={(e) => {
            if (key === "time") {
              searchThuocByParams({
                tuThoiGianDuyet: null,
                denThoiGianDuyet: null,
              });
            } else {
              searchThuocByParams({ [key]: null });
            }
          }}
        ></img>
      </div>
    );
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách đơn thuốc</label>
            <Button
              ref={refCreate}
              className="btn_new"
              onClick={() => {
                history.push("/nha-thuoc/them-moi");
              }}
            >
              <span>Thêm mới</span>
              <img src={IcCreate} />
            </Button>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <CustomPopover ref={refShow}></CustomPopover>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span> Lọc phiếu </span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="132px">
            <PopupWrapper>
              <Popover
                getPopupContainer={(node) => node.parentNode}
                placement="bottom"
                content={groupTenKho}
                trigger="click"
                overlayClassName="popup-kho"
              >
                <SearchKho>
                  <Button className="status">
                    <span> Tên kho </span>
                    <img src={IcDown} />
                  </Button>
                </SearchKho>
              </Popover>
            </PopupWrapper>
            {/* <SearchKho>
              <Select
                style={{ width: "100%" }}
                data={listKhoUser}
                onChange={onChange("khoId")}
                value="Tên kho"
              ></Select>
            </SearchKho> */}
          </Col>
          <Col flex="160px">
            <Popover placement="bottom" content={group} trigger="click">
              <SearchKho>
                <Button className="status">
                  <span> Trạng thái đơn </span>
                  <img src={IcDown} />
                </Button>
              </SearchKho>
            </Popover>
          </Col>
          <Col xs={3}>
            <InputSearch>
              <Input
                ref={refFocusTenNb}
                placeholder="Tìm theo tên người bệnh"
                onChange={onChange("tenNb")}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col xs={9}>
            <InputSearch>
              <Input
                ref={refFocusQr}
                onChange={onChangeSearch("qrBN", true)}
                onKeyDown={onKeyDown}
                placeholder="Quét Qr người bệnh hoặc nhập mã hồ sơ để tìm đơn mới"
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
        <div className="array-store">
          {(dsKhoId || []).map((item, index) => {
            return (
              <div className="item" key={index}>
                <span>
                  {listKhoNhanVienKho?.find((x) => x.id == item)?.label}
                </span>
                <img
                  style={{ cursor: "pointer" }}
                  src={IcClose}
                  alt="..."
                  onClick={(e) => {
                    const index = dsKhoId?.findIndex((x) => x === item);
                    dsKhoId.splice(index, 1);
                    searchThuocByParams({ dsKhoId });
                  }}
                ></img>
              </div>
            );
          })}
          {(dsTrangThai || []).map((item, index) => {
            return (
              <div className="item" key={index}>
                <span>
                  {TRANG_THAI_DON_THUOC.find((x) => x.value == item)?.label}
                </span>
                <img
                  style={{ cursor: "pointer" }}
                  src={IcClose}
                  alt="..."
                  onClick={(e) => {
                    const index = dsTrangThai.findIndex((x) => x === item);
                    dsTrangThai.splice(index, 1);
                    searchThuocByParams({ dsTrangThai });
                  }}
                ></img>
              </div>
            );
          })}
          {maNb && renderParamsSelected(maNb, "maNb")}
          {soPhieu && renderParamsSelected(soPhieu, "soPhieu")}
          {maHoSo && renderParamsSelected(maHoSo, "maHoSo")}
          {nguoiDuyetId &&
            renderParamsSelected(
              nguoiDuyetId,
              "nguoiDuyetId",
              listAllNhanVien,
              true
            )}
          {tuThoiGianDuyet &&
            denThoiGianDuyet &&
            renderParamsSelected(
              `${tuThoiGianDuyet} - ${denThoiGianDuyet}`,
              "time"
            )}
        </div>
      </Row>
    </Main>
  );
};

export default TimKiemDonThuoc;
