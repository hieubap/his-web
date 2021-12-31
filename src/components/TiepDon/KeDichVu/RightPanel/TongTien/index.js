import React, { memo, useState, useEffect, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ButtonNguoiBenhTiepTheo from "components/TiepDon/ButtonNguoiBenhTiepTheo";
import TableWrapper from "../../../TableWrapper";
import { Button, message } from "antd";
import IcPrint from "assets/images/khamBenh/icPrint.png";
import ModalKyIn from "../../../ModalKyIn";
import { addPrefixNumberZero } from "utils";
import moment from "moment";
import { useParams } from "react-router-dom";

const reducer = (accumulator, currentValue) =>
  accumulator + (currentValue || 0);

const TongTien = (props) => {
  const { id } = useParams();

  const refModalKyIn = useRef(null);
  const refIsProcessing = useRef(null);
  const history = useHistory();

  const { nbTiepTheo = {} } = useSelector((state) => state.goiSo);
  const { listDvChoose } = useSelector((state) => state.tiepDonDichVu);
  const { doiTuong, khoaId, covid } = useSelector((state) => state.tiepDon);
  const { autoSelectQuayTiepDon } = useDispatch().goiSo;
  const { getUtils } = useDispatch().utils;
  const { getPhieuKhamBenh, keDichVuKham } = useDispatch().tiepDonDichVu;

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    setState({
      thanhTien: 0,
      tienNbPhuThu: 0,
      tienNbCungChiTra: 0,
      isProcessing: false,
    });
    autoSelectQuayTiepDon();
    getUtils({ name: "khoGiay" });
  }, []);
  const {
    thanhTien,
    tienNbPhuThu,
    tienBhThanhToan,
    tienNbCungChiTra,
    tienNbTuTra,
    isProcessing,
  } = state;
  const onKeDichVu = (e, payload = {}) => {
    if (refIsProcessing.current) {
      return;
    }
    refIsProcessing.current = true;
    setState({ isProcessing: true });
    let data = listDvChoose
      ?.filter((option) => !option?.id)
      .map((item) => {
        return {
          nbDotDieuTriId: id,
          nbDvKyThuat: {
            phongThucHienId: item?.phongId,
          },
          nbDichVu: {
            dichVuId: item?.dichVuId,
            soLuong: 1,
            chiDinhTuDichVuId: id,
            chiDinhTuLoaiDichVu: 200,
            loaiDichVu: item.loaiDichVu,
            khoaChiDinhId: khoaId,
          },
        };
      });
    keDichVuKham({ data })
      .then((s) => {
        setState({ isProcessing: false });
        if (s) {
          setState({ isProcessing: false }); //bỏ trạng thái đang kê dịch vụ
          let isError = false; //đánh dấu không có lỗi
          s.forEach((item) => {
            //duyệt qua các response
            if (item.code != 0) {
              //nếu có response có lỗi
              isError = true; //thì đánh dấu là có lỗi
              (item.message || []).forEach((mes) => {
                //đồng thời print ra lỗi
                message.error(mes);
              });
              (item.data || []).forEach((dv) => {
                //duyệt qua danh sách dịch vụ đã thêm thành công
                const dvKe = listDvChoose?.find(
                  //tìm kiếm dịch vụ đã kê trùng với dịch vụ kê thành công
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //nếu tìm thấy thì set id cho dịch vụ đã kê
              });
            } else {
              (item.data || []).forEach((dv) => {
                //duyệt qua danh sách dịch vụ đã thêm thành công
                const dvKe = listDvChoose?.find(
                  //tìm kiếm dịch vụ đã kê trùng với dịch vụ kê thành công
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //nếu tìm thấy thì set id cho dịch vụ đã kê
              });
            }
          });
          if (!isError) {
            refIsProcessing.current = false;
            if (payload.isInPhieu) {
              refModalKyIn.current.show({ id });
            } else {
              getPhieuKhamBenh(id);
              history.push(`/tiep-don`);
            }
          }
        }
      })
      .catch((e) => {
        refIsProcessing.current = false;
        setState({ isProcessing: false });
      });
  };
  const convertData = (value) => {
    return (
      listDvChoose
        ?.filter(
          (option) => !option.thanhToanBaoHiem || !option.thanhToanDichVu
        )
        .map((item) => {
          let gia = item?.tinhTien ? item?.tinhTien[`${value}`] : 0;
          return gia;
        }) ?? []
    );
  };
  useEffect(() => {
    let thanhTien = 0;
    let tienBhThanhToan = 0;
    let tienNbPhuThu = 0;
    let tienNbCungChiTra = 0;
    let tienNbTuTra = 0;
    if (listDvChoose?.length) {
      let datathanhTien = convertData("thanhTien") || [];
      if (datathanhTien && datathanhTien.length) {
        thanhTien = datathanhTien.reduce(reducer);
      }
      if (doiTuong === 2) {
        let datatienNbCungChiTra = convertData("tienNbCungChiTra") || [];
        if (datatienNbCungChiTra && datatienNbCungChiTra.length) {
          tienNbCungChiTra = datatienNbCungChiTra.reduce(reducer);
        }
        let datatienNbPhuThu = convertData("tienNbPhuThu") || [];
        if (datatienNbPhuThu && datatienNbPhuThu.length) {
          tienNbPhuThu = datatienNbPhuThu.reduce(reducer);
        }
        let datatienNbTuTra = convertData("tienNbTuTra") || [];
        if (datatienNbTuTra && datatienNbTuTra.length) {
          tienNbTuTra = datatienNbTuTra.reduce(reducer);
        }
        let datatienBhThanhToan = convertData("tienBhThanhToan") || [];
        if (datatienBhThanhToan && datatienBhThanhToan.length) {
          tienBhThanhToan = datatienBhThanhToan.reduce(reducer);
        }
      }
      setState({
        thanhTien: thanhTien,
        tienBhThanhToan: tienBhThanhToan,
        tienNbPhuThu: tienNbPhuThu,
        tienNbCungChiTra: tienNbCungChiTra,
        tienNbTuTra: tienNbTuTra,
      });
    } else {
      setState({
        thanhTien: 0,
        tienNbPhuThu: 0,
        tienBhThanhToan: 0,
        tienNbCungChiTra: 0,
        tienNbTuTra: 0,
      });
    }
  }, [listDvChoose]);

  const onPrint = () => {
    onKeDichVu(null, { isInPhieu: true });
  };

  return (
    <Main md={24} xl={24} xxl={24} className="sum-money">
      <div className="sum-money-container">
        <div className="content-sum">
          <TableWrapper isTable={false} title="Tổng tiền">
            <div className="main">
              <div className="note">
                <span>Ghi chú: </span>Số tiền chính xác được xác định tại quầy
                thu ngân sau khi áp dụng các chính sách giảm giá nếu có.{" "}
              </div>
              <div className="not-pay">Chưa thanh toán</div>
              <div className="content-main">
                {doiTuong == 2 ? ( //đối tượng 2 là đối tượng bảo hiểm, check !== 2 là sai
                  <>
                    <div className="item">
                      <div className="title">NB cùng chi trả</div>
                      <div className="price">
                        {tienNbCungChiTra?.formatPrice()} đ
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Phụ thu</div>
                      <div className="price">
                        {tienNbPhuThu?.formatPrice()} đ
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Tiền BH chi trả</div>
                      <div className="price ">
                        {tienBhThanhToan?.formatPrice()} đ
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Tiền NB tự trả</div>
                      <div className="price ">
                        {tienNbTuTra?.formatPrice()} đ
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="item">
                  <div className="title">Tổng tiền</div>
                  <div className="price">{thanhTien?.formatPrice()} đ</div>
                </div>
              </div>
            </div>
          </TableWrapper>
        </div>
      </div>

      <div className="footer">
        <div>
          <Button className="btn-priview" onClick={onPrint}>
            <span>In giấy tờ</span>
            <img src={IcPrint} alt="" />
          </Button>
        </div>
        <div>
          <Button
            className="button"
            loading={isProcessing}
            onClick={onKeDichVu}
          >
            <ButtonNguoiBenhTiepTheo />
          </Button>
        </div>
      </div>
      {nbTiepTheo && (
        <div className="next-patient">
          BNS-
          {nbTiepTheo?.stt && <b>{addPrefixNumberZero(nbTiepTheo?.stt)} </b>}
          {nbTiepTheo?.tenNb && <span>{nbTiepTheo?.tenNb}</span>}
          {nbTiepTheo?.ngaySinh && (
            <span>
              {" - "}
              {moment(nbTiepTheo?.ngaySinh)?._d?.getAge()}
            </span>
          )}
        </div>
      )}
      <ModalKyIn ref={refModalKyIn} />
    </Main>
  );
};
export default memo(TongTien);
