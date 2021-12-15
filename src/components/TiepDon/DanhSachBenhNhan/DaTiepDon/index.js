import React, { useEffect, useState, memo, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { get } from "lodash";
import Table from "components/Table";
import { ROLES } from "constants/index";
import { checkRole } from "app/Sidebar/constant";
import { Input } from "antd";
import { Main } from "./styled";
import { useInterval } from "hook";
import TableWrapper from "../../TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";

const DaTiepDon = (props) => {
  const history = useHistory();
  const { quayTiepDonId, getListDaTiepDon, updateDataTiepDon } = props;
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { data, clearTimeOutAffterRequest, tenNb, maPhong } = state;
  useInterval(() => {
    onSearch({ tenNb, maPhong });
  }, 10000);
  useEffect(() => {
    onSearch({ tenNb, maPhong });
  }, [quayTiepDonId]);

  const onSearch = (payload) => {
    if (!payload?.tenNb && !payload?.maPhong)
      payload.quayTiepDonId = quayTiepDonId;
    getListDaTiepDon({
      sort: "thoiGianVaoVien,desc",
      size: 5,
      ...payload,
    }).then((s) => {
      setState({
        data: (s?.data || []).map((item, index) => {
          item.stt = index + 1;
          return item;
        }),
      });
    });
  };
  const search = (value, variables) => {
    setState({ [`${variables}`]: value });
    let tenNbText = variables === "tenNb" ? value : tenNb;
    let maPhongText = variables === "maPhong" ? value : maPhong;
    if (clearTimeOutAffterRequest) {
      try {
        clearTimeout(clearTimeOutAffterRequest);
      } catch (error) { }
    }
    let data = setTimeout(() => {
      onSearch({
        tenNb: tenNbText,
        maPhong: maPhongText,
      });
    }, 200);
    setState({ clearTimeOutAffterRequest: data });
  };
  const onClickRow = (data) => {
    const roles = get(props.auth, "auth.authorities", []);
    if (!checkRole([ROLES["TIEP_DON"].CHI_TIET_NB_DA_TIEP_DON], roles)) return;
    if (data?.id) {
      props.getDetail(data?.id);
      history.push(`/tiep-don/dich-vu/${data?.id}`);
    } else
      updateDataTiepDon({
        ngaySinh: {
          str: data?.ngaySinh && moment(data?.ngaySinh).format("DD/MM/YYYY"),
          date: data?.ngaySinh,
        },
        stt: data?.stt,
        tenNb: data?.tenNb,
      });
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
        />
      ),
      width: 12,
      dataIndex: "stt",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên - tuổi"
          sort_key="tenNb"
          dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      width: 50,
      dataIndex: "tenNb",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //     ></img>
      //     <Input
      //       placeholder="Tìm tên NB"
      //       onChange={(e) => search(e.target.value, "tenNb")}
      //     />
      //   </>
      // ),
      render: (item, list) => {
        return <span>{`${item} - ${list?.tuoi}`}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã phòng"
        />
      ),
      width: 35,
      dataIndex: "maPhong",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //     ></img>
      //     <Input
      //       placeholder="Tìm mã phòng"
      //       onChange={(e) => search(e.target.value, "maPhong")}
      //     />
      //   </>
      // ),
    },
  ];
  return (
    <TableWrapper
      title="Danh sách người bệnh đã tiếp đón"
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
      isShowSearch
      onChangeSearch={(e) => search(e.target.value, "tenNb")}
      searchPlaceHolder="Tìm tên người bệnh"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    quayTiepDonId: state.goiSo.quayTiepDonId,
    auth: state.auth,
  };
};

const mapDispatchToProps = ({
  goiSo: { updateData, getListDaTiepDon },
  tiepDon: { getDetail, updateData: updateDataTiepDon },
}) => ({
  updateData,
  getListDaTiepDon,
  getDetail,
  updateDataTiepDon,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DaTiepDon);
