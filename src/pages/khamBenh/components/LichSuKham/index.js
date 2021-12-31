import React, { useEffect, useState, useRef } from "react";
import { Collapse } from "antd";
import { Main, HistoryTitle, HistoryContent } from "./styled";
import { connect } from "react-redux";
import moment from "moment";
import { isNil } from "lodash";
import CollapseIcon from "assets/images/khamBenh/collapse.png";
import CollapseIconGray from "assets/images/khamBenh/collapse-gray.png";
const { Panel } = Collapse;

export const LichSuKham = (props) => {
  const listScrollOld = useRef([])
  const [state, _setState] = useState({ size: 10 });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    infoNb,
    listhuongDieuTriKham,
    thongTinKhamBN,
    listHistory,
    getHistory,
    onSearchInformation,
    totalElementsLichSuKham
  } = props;

  useEffect(() => {
    if (!infoNb?.maNb) return;
    getHistory({ maNb: infoNb.maNb, page: 0, size: 10 });
  }, [infoNb]);

  const renderHistoryTitle = (history) => {
    const { thoiGianVaoVien, chuyenKhoa, thoiGianKetLuan } = history;
    return (
      <span>
        {thoiGianKetLuan ? moment(thoiGianKetLuan).format("DD/MM/YYYY") : thoiGianVaoVien && moment(thoiGianVaoVien).format("DD/MM/YYYY")}
        {/* {thoiGianVaoVien && moment(thoiGianVaoVien).format("DD/MM/YYYY")} */}
        {chuyenKhoa && ` - ${thoiGianKetLuan ? `Khám ${chuyenKhoa.toLowerCase()}` : chuyenKhoa}`}
      </span>
    );
  };

  const renderHistoryContent = (history) => {
    const {
      tenDichVu,
      thoiGianKetLuan,
      tenBacSiKetLuan,
      dsCdChinh,
      dsCdKemTheo,
      soNgayHenKham,
      khoaNhapVien,
      vienChuyenDen,
      ghiChu,
      loiDan,
      huongDieuTri,
    } = history;

    const huongDieuTriObj = listhuongDieuTriKham.find(
      (huongdt) => huongdt.id === huongDieuTri
    );

    const showContentHistory = (value, title, subContent) => {
      return (
        <span>
          {!isNil(value) && (
            <>
              <span className="collapse-content__title">{title}:</span>
              {value}
              {subContent}
            </>
          )}
        </span>
      );
    };

    return (
      <div className="collapse-content">
        <div className="collapse-content__box">
          {tenDichVu}
          {thoiGianKetLuan &&
            ` - ${moment(thoiGianKetLuan).format("DD/MM/YYYY")}`}
          {tenBacSiKetLuan && ` - ${tenBacSiKetLuan}`}
        </div>
        <div className="collapse-content__box">
          {dsCdChinh && dsCdChinh.length > 0 && (
            <>
              <span className="collapse-content__title">Chẩn đoán bệnh:</span>
              {dsCdChinh.map(
                (ds, index, arr) =>
                  `${ds.ma} - ${
                  arr.length - 1 === index ? ds.ten : `${ds.ten}; `
                  }`
              )}
            </>
          )}
        </div>
        <div className="collapse-content__box">
          {dsCdKemTheo && dsCdKemTheo.length > 0 && (
            <>
              <span className="collapse-content__title">Chẩn đoán khác:</span>
              {dsCdKemTheo.map(
                (ds, index, arr) =>
                  `${ds.ma} - ${
                  arr.length - 1 === index ? ds.ten : `${ds.ten}; `
                  }`
              )}
            </>
          )}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(huongDieuTriObj?.ten, "Hướng điều trị")}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(soNgayHenKham, "Hẹn khám", " ngày")}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(khoaNhapVien, "Nhập viện")}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(vienChuyenDen, "Chuyển viện")}
        </div>

        <div className="collapse-content__box">
          {showContentHistory(ghiChu, "Ghi chú")}
        </div>
        <div className="collapse-content__box">
          {showContentHistory(loiDan, "Lời dặn")}
        </div>
      </div>
    );
  };

  return (
    <Main>
      <HistoryTitle>
        <div className="title-left">
          Lịch sử khám
          <img
            title="Xem chi tiết hồ sơ bệnh án"
            style={{ marginLeft: 10, cursor: "pointer" }}
            src={CollapseIcon} alt="..."
            onClick={() => {
              window.open(`/ho-so-benh-an/chi-tiet-nguoi-benh/${infoNb.nbThongTinId}`)
              // onSearchInformation({ page: 0, size: 10, maHoSo: "2108120002" })
            }}
          />
        </div>
        <div className="title-right">
          Bệnh nhân đã khám{" "}
          <span className="title-right--bold">{totalElementsLichSuKham} lần</span>
        </div>
      </HistoryTitle>
      <HistoryContent
        onScroll={(event) => {
          let element = event.target
          if (element.scrollHeight - element.scrollTop === element.clientHeight && (listScrollOld.current.length != listHistory.length)) {
            // do something at end of scroll
            setState({ size: state.size + 10 })
            getHistory({ maNb: infoNb?.maNb, page: 0, size: state.size + 10});
            listScrollOld.current = listHistory
          }
        }}>

        {listHistory.length > 0 ? (
          <Collapse expandIconPosition="right">
            {listHistory.map((history, index) => {
              return (
                <Panel
                  key={index}
                  header={
                    <span className="collapse-title">
                      {renderHistoryTitle(history)}
                    </span>
                  }
                >
                  {renderHistoryContent(history)}
                  <div style={{ textAlign: "right" }}>
                    <img
                      title="Xem chi tiết hồ sơ bệnh án"
                      style={{ cursor: "pointer" }}
                      src={CollapseIconGray} alt="..."
                      onClick={() => {
                        // window.open(`/ho-so-benh-an/chi-tiet-nguoi-benh/${history.maHoSo}/${history.nbThongTinId}`)

                        window.open(`/ho-so-benh-an/chi-tiet-nguoi-benh/params?id=${history.nbThongTinId}&maHoSo=${history.maHoSo}`)
                        // props.history.push("/ho-so-benh-an/chi-tiet-nguoi-benh/22012")
                        // onSearchInformation({ page: 0, size: 10, maHoSo: "2108120002" })
                      }}
                    />
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        ) : (
            <>
              <div>
                Người bệnh chưa có lịch sử khám chữa bệnh tại Bệnh viện
              </div>
              <div>
                Lịch sử khám sẽ cung cấp thông tin về thời gian khám, tình trạng ra viện,
                chẩn đoán Bệnh khi đến khám và thông tin lời dặn - ghi chú của Bác sĩ khi thực hiện Khám - Chữa bệnh cho Người Bệnh
              </div>
            </>
          )}
      </HistoryContent>

    </Main>
  );
};

const mapStateToProps = ({
  khamBenh: { listHistory, thongTinKhamBN, infoNb ,totalElementsLichSuKham},
  utils: { listhuongDieuTriKham = [] },
}) => ({
  infoNb,
  listHistory,
  listhuongDieuTriKham,
  thongTinKhamBN,
  totalElementsLichSuKham
});

const mapDispatchToProps = ({ khamBenh: { getHistory },
  information: {
    onSearch: onSearchInformation
  },
}) => ({ getHistory, onSearchInformation });

export default connect(mapStateToProps, mapDispatchToProps)(LichSuKham);
