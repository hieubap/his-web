import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Col, Checkbox } from "antd";
import Select from "components/Select";
import Modal from "components/TiepDon/Modal";
import { connect } from "react-redux";
import { openInNewTab } from "utils";

const ModalAddCapCuu = (props, ref) => {
  const refCallback = useRef(null);
  const [state, _setState] = useState({ khongCoNguoiThanDiKem: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        loaiCapCuuId: item?.loaiCapCuuId,
        viTriChanThuongId: item?.viTriChanThuongId,
        nguyenNhanNhapVienId: item?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: item?.thoiGianCapCuuId,
      });
      refCallback.current = callback;
    },
  }));
  const {
    loaiCapCuuId,
    viTriChanThuongId,
    nguyenNhanNhapVienId,
    thoiGianCapCuuId,
    checkValidate,
    loaiCapCuuTen,
    viTriChanThuongTen,
    nguyenNhanNhapVienTen,
    thoiGianCapCuuTen,
    khongCoNguoiThanDiKem
  } = state;
  const onOK = () => {
    if (loaiCapCuuId) {
      setState({
        show: false,
        checkValidate: false,
      });
      let obj = {
        loaiCapCuuId,
        loaiCapCuuTen,
        viTriChanThuongId,
        viTriChanThuongTen,
        nguyenNhanNhapVienId,
        nguyenNhanNhapVienTen,
        thoiGianCapCuuId,
        thoiGianCapCuuTen,
        khongCoNguoiThanDiKem
      };
      if (refCallback.current) refCallback.current(obj);
    } else {
      setState({ checkValidate: true });
    }
  };
  const onBack = () => {
    setState({ show: false });
  };
  const onChange = (value, variables, valueTen, variablesTen) => {
    setState({
      [`${variables}`]: value,
      [`${variablesTen}`]: valueTen,
    });
  };
  useEffect(() => {
    props.getListAllNguyenNhanNhapVien();
    props.getListAllLoaiCapCuu();
    props.getListAllThoiGianCapCuu();
    props.getListAllViTriTranThuong();
  }, []);
  return (
    <Modal
      closable={false}
      width={600}
      show={state.show}
      typeModal="infoModal"
      title={"Thông tin bổ sung"}
      button={
        <>
          <div className="btn btn-cancel" onClick={() => onBack()}>
            <span> Quay lại </span>
          </div>
          <div className="btn btn-accept" onClick={() => onOK()}>
            <span>Lưu thông tin</span>
            <img src={require("assets/images/welcome/save.png")}></img>
          </div>
        </>
      }
    >
      <Main>
        <Col span={12}>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/loai-cap-cuu")}
              className={!loaiCapCuuId ? `label label-error pointer` : "label pointer"}>
              Loại cấp cứu<span style={{ color: "red" }}> *</span>
            </label>
            <Select
              onChange={(e, list) =>
                onChange(e, "loaiCapCuuId", list?.children, "loaiCapCuuTen")
              }
              autoFocus={true}
              value={loaiCapCuuId}
              placeholder={"Chọn loại cấp cứu"}
              data={props.listAllLoaiCapCuu}
            />
            {checkValidate && !loaiCapCuuId && (
              <div className="error2">Vui lòng chọn loại cấp cứu!</div>
            )}
          </div>
          <div className="item-select ">
            <label
              onClick={() => openInNewTab("/danh-muc/nguyen-nhan-nhap-vien")}
              className="label pointer">Nguyên nhân nhập viện</label>
            <Select
              onChange={(e) => onChange(e, "nguyenNhanNhapVienId")}
              onChange={(e, list) =>
                onChange(
                  e,
                  "nguyenNhanNhapVienId",
                  list?.children,
                  "nguyenNhanNhapVienTen"
                )
              }
              value={nguyenNhanNhapVienId}
              placeholder={"Chọn nguyên nhân nhập viện"}
              data={props.listAllNguyenNhanNhapVien}
            />
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: 30 }}>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/vi-tri-chan-thuong")}
              className="label pointer">Vị trí chấn thương</label>
            <Select
              onChange={(e) => onChange(e, "viTriChanThuongId")}
              onChange={(e, list) =>
                onChange(
                  e,
                  "viTriChanThuongId",
                  list?.children,
                  "viTriChanThuongTen"
                )
              }
              value={viTriChanThuongId}
              placeholder={"Chọn vị trí chấn thương"}
              data={props.listAllViTriTranThuong}
            />
          </div>
          <div className="item-select">
            <label
              onClick={() => openInNewTab("/danh-muc/thoi-gian-cap-cuu")}
              className="label pointer">Thời gian cấp cứu</label>
            <Select
              onChange={(e) => onChange(e, "thoiGianCapCuuId")}
              onChange={(e, list) =>
                onChange(
                  e,
                  "thoiGianCapCuuId",
                  list?.children,
                  "thoiGianCapCuuTen"
                )
              }
              value={thoiGianCapCuuId}
              placeholder={"Chọn thời gian cấp cứu"}
              data={props.listAllThoiGianCapCuu}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="item-select">
            <Checkbox
              checked={state?.khongCoNguoiThanDiKem}
              onChange={(e) => {
                setState({
                  "khongCoNguoiThanDiKem": e.target.checked
                })
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  let value = e?.target?.checked;
                  setState({
                    "khongCoNguoiThanDiKem": !state?.khongCoNguoiThanDiKem
                  })
                }

              }}
            >Không có người thân đi kèm</Checkbox>
          </div>
        </Col>
      </Main>
    </Modal>
  );
};

export default connect(
  (state) => {
    return {
      listAllNguyenNhanNhapVien:
        state.nguyenNhanNhapVien.listAllNguyenNhanNhapVien || [],
      listAllLoaiCapCuu: state.loaiCapCuu.listAllLoaiCapCuu || [],
      listAllThoiGianCapCuu: state.thoiGianCapCuu.listAllThoiGianCapCuu || [],
      listAllViTriTranThuong: state.viTriChanThuong.listAllViTriTranThuong || [],
    };
  },
  ({
    nguyenNhanNhapVien: { getListAllNguyenNhanNhapVien },
    loaiCapCuu: { getListAllLoaiCapCuu },
    thoiGianCapCuu: { getListAllThoiGianCapCuu },
    viTriChanThuong: { getListAllViTriTranThuong },
  }) => ({
    getListAllNguyenNhanNhapVien,
    getListAllLoaiCapCuu,
    getListAllThoiGianCapCuu,
    getListAllViTriTranThuong,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalAddCapCuu));
