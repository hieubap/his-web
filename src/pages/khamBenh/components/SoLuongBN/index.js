import React, { useEffect } from "react";
import { connect } from "react-redux";
import { infoPatients } from "../../configs";
import { Main } from "./styled";
import IcChart from "assets/images/khamBenh/icChart.svg";

export const SoLuongBN = (props) => {
  const { statisticsRoom, phongThucHienId, getStatisticsRoom } = props;
  useEffect(() => {
    if (!phongThucHienId) return;
    getStatisticsRoom(phongThucHienId);
  }, [phongThucHienId]);

  return (
    <Main>
      <IcChart />
      {infoPatients.map((info) => {
        return (
          <div
            key={info.key}
            className="info"
            style={{ background: info.background }}
          >
            {info.title}:{" "}
            <span className="info--bold">{statisticsRoom[info.dataIndex]}</span>
          </div>
        );
      })}
    </Main>
  );
};

const mapStateToProps = ({
  khamBenh: { statisticsRoom },
  nbKhamBenh: { phongThucHienId },
}) => {
  return { statisticsRoom, phongThucHienId };
};

const mapDispatchToProps = ({ khamBenh: { getStatisticsRoom } }) => ({
  getStatisticsRoom,
});

export default connect(mapStateToProps, mapDispatchToProps)(SoLuongBN);
