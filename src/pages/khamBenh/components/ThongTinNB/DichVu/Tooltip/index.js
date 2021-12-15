import React from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import { openInNewTab } from "utils";
export const DichVu = ({ item, isMainService, ...props }) => {
  if (isMainService) {
    let trangThai = props.listtrangThaiDichVu.find(
      (tt) => tt.id == item.trangThai
    );
    return (
      <Main>
        {trangThai?.ten && (
          <div className="tooltip-item">
            <label>{trangThai?.ten}</label><p>{`${item?.tenBacSiKham ? `- BS ${item?.tenBacSiKham}` : ""}`}</p>
          </div>
        )}
        {item?.tenBacSiKham && (
          <div className="tooltip-item">
            <label>BS Khám: </label>
            <p>{item?.tenBacSiKham}</p>
          </div>
        )}
        {(item?.dsCdChinh || []).length != 0 && (
          <div className="tooltip-item">
            <label
              //TODO: lay ten benh co nhom benh chinh != null
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-benh-tat?nhomBenh=true")}
            >Chẩn đoán bệnh: </label>
            <p>
              <ul>
                {(item?.dsCdChinh || []).map((cd, index) => {
                  return <li key={index}>{cd.ten}</li>;
                })}
              </ul>
            </p>
          </div>
        )}
        {(item?.dsCdKemTheo || []).length != 0 && (
          <div className="tooltip-item">
            <label
              //TODO: lay ten benh co nhom benh phu [1or2] != null
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-benh-tat?nhomBenh=false")}
            >Chẩn đoán kèm theo: </label>
            <p>
              <ul>
                {(item?.dsCdKemTheo || []).map((cd, index) => {
                  return <li key={index}>{cd.ten}</li>;
                })}
              </ul>
            </p>
          </div>
        )}
      </Main>
    );
  } else if (props.isResult)
    return (
      <Main>
        {/* {item?.tenBacSiKetLuan && ( */}
        <div className="tooltip-item">
          <label>Bác sĩ kết luận: </label>
          <p>{item?.tenBacSiKetLuan}</p>
        </div>
        {/* )} */}
        {item?.ghiChu && (
          <div className="tooltip-item">
            <label>Ghi chú: </label>
            <p>{item?.ghiChu}</p>
          </div>
        )}
        {item?.loiDan && (
          <div className="tooltip-item">
            <label>Lời dặn: </label>
            <p>{item?.loiDan}</p>
          </div>
        )}
      </Main>
    );
  return (
    <Main>
      <div className="tooltip-item">
        <ul>
          {(props.items || []).map((item, index) => {
            let trangThai = props.listtrangThaiDichVu.find(
              (tt) => tt.id == item.trangThai
            );
            return (
              <li key={index}>
                {/* {item.tenNhomDichVuCap2}{" "}
                {item.bacSiDocKetQua ? `- {item.bacSiDocKetQua}` : ""} -{" "}
                {trangThai?.ten} */}
                <p>{`${item.tenDichVu} : ${trangThai.ten}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Main>
  );
};

export default connect((state) => {
  return {
    listtrangThaiDichVu: state.utils.listtrangThaiDichVu || [],
  };
}, null)(DichVu);
