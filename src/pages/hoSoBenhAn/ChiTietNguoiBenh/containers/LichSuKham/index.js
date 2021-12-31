import { Select, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";

const { Option } = Select;

const LichSuKham = ({
  lichSuKham = [],
  updateData,
  soDotDieuTri,
  getDvKt,
  selectedMaHs,
  getThongTinNBDotDieuTri,
  ...props
}) => {
  const getListDichVuThuoc = useDispatch().chiDinhDichVuKho.getListDichVuThuoc
  const getListDichVuVatTu = useDispatch().hoSoBenhAn.getListDichVuVatTu
  const nbDotDieuTriId = useSelector(state => state.hoSoBenhAn.nbDotDieuTriId)
  
  const listData = lichSuKham.map((item) => ({
    maHS: item.maHoSo,
    id: item.id,
    ngayTao: moment(item.thoiGianVaoVien).format("DD/MM/YYYY"),
    noiDung:
      [...(item.dsCdChinh || []), ...(item.dsCdKemTheo || [])].length > 0
        ? [...(item.dsCdChinh || []), ...(item.dsCdKemTheo || [])]
            .map((element) => element.ma + " - " + element.ten)
            .join(",\n")
        : "",
  }));

  return (
    <Main>
      <div className="title">
        Lịch sử khám chữa bệnh <span>({soDotDieuTri})</span>
      </div>
      <div className="history">
        <ul>
          {listData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                updateData({ selectedMaHs: item.maHS });
                getDvKt({ nbDotDieuTriId: item.id });
                getThongTinNBDotDieuTri(item.id);
                getListDichVuThuoc({nbDotDieuTriId})
                getListDichVuVatTu({nbDotDieuTriId})
              }}
              className={item.maHS === selectedMaHs ? "active" : ""}
            >
              <div className="li-head">
                {item.ngayTao + " - Mã HS: " + item.maHS}
              </div>
              <Tooltip
                title={item.noiDung}
                overlayStyle={{ whiteSpace: "break-spaces" }}
              >
                <div className="li-content">
                  {item.noiDung && item.noiDung.substr(0, 110) + "..."}
                </div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  );
};

export default connect(
  ({ hoSoBenhAn: { lichSuKham, selectedMaHs, soDotDieuTri } }) => ({
    lichSuKham,
    selectedMaHs,
    soDotDieuTri,
  }),
  ({
    hoSoBenhAn: { updateData, getDvKt },
    nbDotDieuTri: { getThongTinNBDotDieuTri },
  }) => ({
    updateData,
    getDvKt,
    getThongTinNBDotDieuTri,
  })
)(LichSuKham);
