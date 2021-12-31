import React, { useState, useEffect, useMemo, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Input, message } from "antd";
import Select from "components/Select";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Main, SearchPartient, InputSearch } from "./styled";
import { LOAI_PHONG } from "constants/index";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import ModalDanhSachBN from "../ModalDanhSachBN";
import { get } from "lodash";
export const TimKiemBN = (props) => {
  const refModalDanhSachBN = useRef(null);
  const refTraCuuBN = useRef(null);
  let history = useHistory();
  const match = useRouteMatch();
  const { phongThucHienId, maHoSo, dichVu } = match.params;
  const {
    listPhongKham = [],
    infoNb,
    getPhongKham,
    onSearch,
    getDsDichVuById,
    thongTinKhamBN,
    layerId,
  } = props;
  const [state, _setState] = useState({ listPhongKham: [] });
  const { onRegisterHotkey } = useDispatch().phimTat;
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const showDsNb = (param) => {
    if (refModalDanhSachBN.current) {
      refModalDanhSachBN.current.show({
        search: true,
        timKiem: state.qrBN,
      });
    }
  };
  useEffect(() => {
    // get data theo dịch vụ
    // getPhongKham({ loaiPhong: LOAI_PHONG.PHONG_KHAM, chuyenTrangThai: true })
    // if (dichVu) {
    //   // getDsDichVuById(17769)
    //   getDsDichVuById(dichVu)
    // } else {
    if (
      history.location.pathname === "/kham-benh" ||
      history.location.pathname === "/kham-benh/"
    ) {
      getPhongKham({
        loaiPhong: LOAI_PHONG.PHONG_KHAM,
        chuyenTrangThai: true,
        loaiPhong: LOAI_PHONG.PHONG_KHAM,
      }); //get phòng khám -> tự lấy ra bênh nhân đầu tiên -> chuyenTrangThai= true cho phép load bệnh  nâhn đó và chuyển trạng thái dv khám -> tương đương với nút gọ
    } else {
      getDsDichVuById({
        dichVuId: dichVu,
        phongThucHienId: phongThucHienId,
        loaiPhong: LOAI_PHONG.PHONG_KHAM,
      });
    }
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refTraCuuBN.current && refTraCuuBN.current.focus();
          },
        },
      ],
    });

    // }
  }, []);
  useEffect(() => {
    // get data kiểu cũ , không có dịch vụ
    // if (
    //   history.location.pathname === "/kham-benh" ||
    //   history.location.pathname === "/kham-benh/"
    // ) {
    //   getPhongKham({ loaiPhong: LOAI_PHONG.PHONG_KHAM, chuyenTrangThai: true }); //get phòng khám -> tự lấy ra bênh nhân đầu tiên -> chuyenTrangThai= true cho phép load bệnh  nâhn đó và chuyển trạng thái dv khám -> tương đương với nút gọ
    // } else {
    //   getPhongKham({
    //     loaiPhong: LOAI_PHONG.PHONG_KHAM, // get lại danh sách bệnh nhân và select bệnh nhân theo đúng path url, khi reload lại trang
    //     maHoSo: maHoSo,
    //     phongThucHienId: phongThucHienId,
    //     isSingleSearch: true,
    //     sort: "id,desc",
    //     isGetListData: true,
    //     chuyenTrangThai: false //khi mở sẵn 1 bệnh nhân từ url -> thì mặc định không chuyển trạng thái
    //   });
    // }
  }, []);
  // useEffect(() => {
  //   if (get(thongTinKhamBN, "dsKham[0]")) {
  //     getDsDichVuById(thongTinKhamBN?.dsKham[0]?.id)
  //   }
  // }, [JSON.stringify(thongTinKhamBN)]);
  useEffect(() => {
    if (infoNb && Object.keys(infoNb).length > 0) {
      // if (dichVu) {
      history.push(
        `/kham-benh/${infoNb.phongThucHienId}/${infoNb.maHoSo}/${infoNb.id}`
      );
      // } else {
      //   history.push(`/kham-benh/${infoNb.phongThucHienId}/${infoNb.maHoSo}`);
      // }
    }
  }, [infoNb]);
  useEffect(() => {
    let phongLayMauId =
      Number(phongThucHienId) ||
      (listPhongKham.length && listPhongKham[0].id) ||
      null;
    setState({
      phongLayMauId,
      listPhongKham: listPhongKham,
    });
  }, [listPhongKham]);
  const onChange = (key, needEnter) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    console.log("value: ", value);
    setState({
      [key]: value,
    });
    if (needEnter) return;
    if (key === "qrBN") {
      console.log("key: ", key);
      if (/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
    if (key === "phongLayMauId") {
      props.onSearch({
        phongThucHienId: value,
      });
    }
  };
  const handleSearchBN = (value) => {
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
      console.log("param: ", param);
      param.isSingleSearch = true;
      param.sort = "id,desc";
      onSearch(param)
        .then((s) => {
          if (!s.length) {
            notifiNotSearch();
          }
          history.push(`/kham-benh/${s[0].phongThucHienId}/${s[0].maHoSo}`);
        })
        .catch((e) => {
          notifiNotSearch();
        });
    } else {
      if (str) {
        notifiNotSearch();
      } else message.error("Vui lòng nhập thông tin tìm kiếm!");
    }
  };
  const notifiNotSearch = () => {
    let res = state.listPhongKham.filter((e) => e.id === state.phongLayMauId);
    message.error(
      `Không tồn tại dịch vụ người bệnh ${
        (!!res.length && `tại ${res[0].ten}`) || ""
      }!`
    );
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const { qrBN = "" } = state;
      let str = qrBN.trim() || qrBN || "";
      let param = {};
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
      if (Object.keys(param).length > 0) {
        // handleSearchBN()
        refModalDanhSachBN.current.show({
          search: true,
          timKiem: param?.maHoSo || param?.soPhieu,
        });
      } else {
        showDsNb();
      }
      // handleSearchBN();
    }
  };
  const onBlur = () => {
    setState({
      focusInput: false,
    });
  };
  return (
    <Main>
      <Row align="middle">
        <Col xs={24} md={12} className="paddingRight">
          <SearchPartient>
            <Select
              placeholder="Chọn phòng khám"
              data={state.listPhongKham}
              value={state.phongLayMauId}
              onChange={onChange("phongLayMauId")}
            />
          </SearchPartient>
        </Col>
        <Col xs={24} md={12} className="paddingLeft">
          <InputSearch focusInput={state.focusInput}>
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
            <Input
              placeholder="Tra cứu NB"
              autoFocus
              onChange={onChange("qrBN", true)}
              onKeyDown={onKeyDown}
              onFocus={() =>
                setState({
                  focusInput: true,
                })
              }
              ref={refTraCuuBN}
              onBlur={onBlur}
            />
            <img src={IconQR} alt="IconQrCode" className="qr-search" />
          </InputSearch>
        </Col>
      </Row>
      <ModalDanhSachBN ref={refModalDanhSachBN} />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    khamBenh: { infoNb, listPhongKham = [], thongTinKhamBN },
  } = state;
  return {
    infoNb,
    listPhongKham,
    thongTinKhamBN,
  };
};
const mapDispatchToProps = ({
  khamBenh: { getPhongKham, updateData, getDsDichVuById },
  nbKhamBenh: { onSearch },
  nbDotDieuTri: { searchNBDotDieuTri },
}) => ({
  onSearch,
  updateData,
  getPhongKham,
  searchNBDotDieuTri,
  getDsDichVuById,
});

TimKiemBN.propTypes = {
  listPhongKham: PropTypes.array,
};
TimKiemBN.defaultProps = {
  listPhongKham: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(TimKiemBN);
