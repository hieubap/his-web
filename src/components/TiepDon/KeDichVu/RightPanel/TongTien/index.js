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
          setState({ isProcessing: false }); //b??? tr???ng th??i ??ang k?? d???ch v???
          let isError = false; //????nh d???u kh??ng c?? l???i
          s.forEach((item) => {
            //duy???t qua c??c response
            if (item.code != 0) {
              //n???u c?? response c?? l???i
              isError = true; //th?? ????nh d???u l?? c?? l???i
              (item.message || []).forEach((mes) => {
                //?????ng th???i print ra l???i
                message.error(mes);
              });
              (item.data || []).forEach((dv) => {
                //duy???t qua danh s??ch d???ch v??? ???? th??m th??nh c??ng
                const dvKe = listDvChoose?.find(
                  //t??m ki???m d???ch v??? ???? k?? tr??ng v???i d???ch v??? k?? th??nh c??ng
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //n???u t??m th???y th?? set id cho d???ch v??? ???? k??
              });
            } else {
              (item.data || []).forEach((dv) => {
                //duy???t qua danh s??ch d???ch v??? ???? th??m th??nh c??ng
                const dvKe = listDvChoose?.find(
                  //t??m ki???m d???ch v??? ???? k?? tr??ng v???i d???ch v??? k?? th??nh c??ng
                  (item) => item.dichVuId === dv.nbDichVu?.dichVuId
                );
                if (dvKe) dvKe.id = dv.id; //n???u t??m th???y th?? set id cho d???ch v??? ???? k??
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
          <TableWrapper isTable={false} title="T???ng ti???n">
            <div className="main">
              <div className="note">
                <span>Ghi ch??: </span>S??? ti???n ch??nh x??c ???????c x??c ?????nh t???i qu???y
                thu ng??n sau khi ??p d???ng c??c ch??nh s??ch gi???m gi?? n???u c??.{" "}
              </div>
              <div className="not-pay">Ch??a thanh to??n</div>
              <div className="content-main">
                {doiTuong == 2 ? ( //?????i t?????ng 2 l?? ?????i t?????ng b???o hi???m, check !== 2 l?? sai
                  <>
                    <div className="item">
                      <div className="title">NB c??ng chi tr???</div>
                      <div className="price">
                        {tienNbCungChiTra?.formatPrice()} ??
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Ph??? thu</div>
                      <div className="price">
                        {tienNbPhuThu?.formatPrice()} ??
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Ti???n BH chi tr???</div>
                      <div className="price ">
                        {tienBhThanhToan?.formatPrice()} ??
                      </div>
                    </div>
                    <div className="item">
                      <div className="title">Ti???n NB t??? tr???</div>
                      <div className="price ">
                        {tienNbTuTra?.formatPrice()} ??
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="item">
                  <div className="title">T???ng ti???n</div>
                  <div className="price">{thanhTien?.formatPrice()} ??</div>
                </div>
              </div>
            </div>
          </TableWrapper>
        </div>
      </div>

      <div className="footer">
        <div>
          <Button className="btn-priview" onClick={onPrint}>
            <span>In gi???y t???</span>
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
