import React, { useState, useEffect, memo } from "react";
import get from "lodash/get";
import { checkRole } from "app/Sidebar/constant";
// import { Main } from "./styled";
// import Table from "components/Table";
import orderBy from "lodash/orderBy";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "hook";
import TableWrapper from "../../TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";

const DanhSachGoiNho = (props) => {
  const quayTiepDonId = useSelector((state) => state.goiSo.quayTiepDonId);
  const readOnlyDsGoiNho = useSelector((state) => state.goiSo.readOnlyDsGoiNho);
  const auth = useSelector((state) => state.auth.auth);
  const getNbTiepTheo = useDispatch().goiSo.getNbTiepTheo;
  const getListGoiNho = useDispatch().goiSo.getListGoiNho;
  const [state, _setState] = useState({
    data: [],
    dataSearch: [],
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { data } = state;
  useInterval(() => {
    onSearch();
  }, [10000]);
  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    getListGoiNho().then((s) => {
      let array = orderBy(s?.data, "stt", "asc") || [];
      setState({
        data: array,
        dataSearch: array,
      });
    });
  };

  const onClickRow = (nbGoiNho) => {
    const roles = auth?.authorities || [];
    if (!checkRole(["tiepDon_tiepDonLai_nbNho"], roles)) return;
    if (!readOnlyDsGoiNho)
      getNbTiepTheo({
        id: quayTiepDonId,
        data: { nbTiepTheoId: nbGoiNho?.id ? nbGoiNho?.id : null },
        goiNho: nbGoiNho,
      });
  };
  const columns = [
    {
      key: "stt",
      title: <HeaderSearch title="STT" />,
      width: 12,
      dataIndex: "stt",
      hideSearch: true,
    },
    {
      key: "tenNb",
      title: (
        <HeaderSearch
          title="Họ tên - tuổi"
          sort_key="tenNb"
          // onClickSort={onClickSort}
          dataSort={
            (props.dataSortColumn && props?.dataSortColumn["tenNb"]) || 0
          }
        />
      ),
      width: 120,
      dataIndex: "tenNb",
      hideSearch: true,
      // search: (<>
      //     <img src={require("assets/images/welcome/search.png")}></img>
      //     <Input
      //         placeholder="Tìm tên NB hoặc STT"
      //         onChange={(e) => search(e.target.value)}
      //     />
      // </>),
      render: (item, list) => {
        return <span>{`${item} - ${list?.tuoi}`}</span>;
      },
    },
  ];
  return (
    <TableWrapper
      title="Danh sách gọi nhỡ"
      scroll={{ y: 110 }}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: () => {
            onClickRow(record);
          },
        };
      }}
      data={data}
    />
  );
};

export default memo(DanhSachGoiNho);
