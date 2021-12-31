import { Col, Row, Select, Tooltip, Checkbox, Button } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useState } from "react";
import RankGoldIcon from "assets/svg/hoSoBenhAn/rankGold.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { Main } from "./styled";
import PrintIcon from "assets/svg/hoSoBenhAn/print.svg";

const { Option } = Select;

const HoSoKhamBenh = ({ ...props }) => {
  const [dsTenPhieu, setDsTenPhieu] = useState([
    { name: "Phiếu khám chung", checked: true },
    { name: "Phiếu chị định X-Quang", checked: true },
    { name: "Phiếu chỉ định siêu âm", checked: true },
    { name: "Phiếu chỉ định huyết học", checked: false },
    { name: "Phiếu chỉ định vi sinh", checked: true },
    { name: "Phiếu kết quả X-Quang", checked: false },
    { name: "Đơn thuốc", checked: false },
  ]);
  const onChangeCheck = (index, value) => {
    const newDsTenPhieu = Object.assign([], dsTenPhieu);
    newDsTenPhieu[index].checked = value;
    setDsTenPhieu(newDsTenPhieu);
  };
  return (
    <Main>
      <div className="left-content">
        <div className="right-content-body">
          <div className="left-title">
            <div className="left-title_top">Phiếu khám chung</div>
            <div className="left-title_bottom"></div>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="right-title">
          <div className="right-title_top">Danh sách phiếu</div>
          <div className="right-title_bottom">Tên phiếu</div>
        </div>
        <div className="right-li">
          <ul>
            {dsTenPhieu.map((item, index) => (
              <li key={index}>
                <div className="li-name">{item.name}</div>
                <div className="li-check">
                  <Checkbox
                    onChange={(e) => onChangeCheck(index, e.target.checked)}
                    checked={item.checked}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-print">
          <Button className="btn-print">
            <span>In</span>
            <PrintIcon
              style={{ marginLeft: "5px", width: "16px", height: "16px" }}
            />
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default HoSoKhamBenh;
