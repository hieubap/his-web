import React, { useEffect, memo } from "react";
import { Main } from "./styled";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "hook";
import extendTable from "assets/svg/extendTable.svg";
import Icon from "@ant-design/icons";
const ButtonNguoiBenhTiepTheo = ({ disabled, ...props }) => {
  const {
    goiSo: { getNbTiepTheo, updateData },
  } = useDispatch();
  const { nbTiepTheo, quayTiepDonId } = useSelector((state) => state.goiSo);

  const { type } = props;

  useInterval(() => {
    {
      /*
        Cứ 10s là load lên người bệnh hiện trên nút người bệnh tiếp theo
        - trong trường hợp đã chọn quầy và chưa có người bệnh nào thì mới load.
      */
    }
    onGetNbTiepTheo();
  }, [5000]);

  useEffect(() => {
    {
      /*
      - Nếu chưa chọn quầy mà đã có nbTiepTheo thì set nbTiepTheo = null
      - Nếu đã chọn quầy mà chưa có nbTiepTheo thì gọi api get NbTiepTheo
      */
    }
    if (!quayTiepDonId) {
      if (nbTiepTheo?.id) updateData({ nbTiepTheo: {} });
    } else onGetNbTiepTheo();
  }, [nbTiepTheo, quayTiepDonId]);

  const onSetNbTiepTheo = (isLoadNguoiBenhTiepDon) => {
    if (quayTiepDonId) {
      const data = {
        id: quayTiepDonId,
        isLoadNguoiBenhTiepDon,
        data: {
          nbTiepTheo: nbTiepTheo?.id,
        },
      };
      updateData({
        daThanhToan: true,
        messageChuaThanhToan: "",
      });
      getNbTiepTheo(data);
    } else message.error("Vui lòng chọn quầy trước ghi gọi số!");
  };

  const onGetNbTiepTheo = () => {
    if (!nbTiepTheo?.id)
      getNbTiepTheo({
        id: quayTiepDonId,
        isGet: true,
      });
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "F1") {
        e.preventDefault();
        document.getElementById("btn_nguoi_benh_tiep_theo").click();
      }
    });
  }, []);
  return (
    <Main
      className={`person ${props.className} ${type && type}`}
      id="btn_nguoi_benh_tiep_theo"
      onClick={() => !disabled && !type && onSetNbTiepTheo(true)}
    >
      <div className="title">
        <span>Người bệnh tiếp theo</span>
        <span>[F1]</span>
        {!type ? (
          <div className="dub-img">
            <Icon component={extendTable} />
          </div>
        ) : null}
      </div>
    </Main>
  );
};

export default memo(ButtonNguoiBenhTiepTheo);
