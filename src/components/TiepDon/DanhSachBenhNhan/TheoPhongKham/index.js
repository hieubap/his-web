import React, { useState, useEffect, memo, useRef } from "react";
import { useInterval } from "hook";
import TableWrapper from "../../TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useDispatch } from "react-redux";

const TheoPhongKham = (props) => {
  const refTimeout = useRef(null);
  const getListSlTheoPhong = useDispatch().goiSo.getListSlTheoPhong;
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
  const { data, dataSearch } = state;
  useInterval(() => {
    onSearch();
  }, 10000);
  useEffect(() => {
    onSearch();
  }, []);

  const onSearch = () => {
    getListSlTheoPhong().then((s) => {
      setState({
        data: s?.data || [],
        dataSearch: s?.data || [],
      });
    });
  };
  const search = (value) => {
    if (refTimeout.current) {
      try {
        clearTimeout(refTimeout.current);
      } catch (error) {}
    }
    refTimeout.current = setTimeout(() => {
      searchValue(value);
    }, 200);
  };
  const searchValue = (value) => {
    let valueText = value?.trim().toLowerCase().unsignText();
    let list = dataSearch?.filter((option) => {
      return (
        option?.tenPhong?.toLowerCase().unsignText().indexOf(valueText) >= 0 ||
        option?.maPhong?.toLowerCase().unsignText().indexOf(valueText) >= 0
      );
    });
    setState({ data: list || [] });
  };
  const columns = [
    {
      title: <HeaderSearch title="Mã phòng" />,
      width: 45,
      dataIndex: "maPhong",
      // search: (
      //   <>
      //     <img
      //       src={require("assets/images/welcome/search.png")}
      //       style={{ left: 15 }}
      //     ></img>
      //     <Input
      //       placeholder="Tìm Mã hoặc tên phòng"
      //       style={{
      //         position: "absolute",
      //         top: 0,
      //         left: 10,
      //         width: 200,
      //         zIndex: "1",
      //       }}
      //       onChange={(e) => search(e.target.value)}
      //     />
      //   </>
      // ),
    },
    {
      title: <HeaderSearch title="Phòng" />,
      width: 80,
      dataIndex: "tenPhong",
    },
    // {
    //   title: "Đăng ký",
    //   width: 43,
    //   dataIndex: "dangKy",
    // },
    {
      title: <HeaderSearch style={{ padding: "0 7px" }} title="Chờ khám" />,
      width: 20,
      dataIndex: "choKham",
    },
    {
      title: <HeaderSearch style={{ padding: "0 7px" }} title="Đang khám" />,
      width: 20,
      dataIndex: "dangKham",
    },
    {
      title: <HeaderSearch style={{ padding: "0 7px" }} title="Đã KL" />,
      width: 20,
      dataIndex: "daKetLuan",
    },
  ];
  return (
    <TableWrapper
      title="Số lượng người bệnh theo phòng khám"
      scroll={{ y: 110 }}
      columns={columns}
      data={data}
      isShowSearch
      onChangeSearch={(e) => search(e.target ? e.target?.value : e)}
      searchPlaceHolder="Tìm mã phòng, tên phòng"
    />
  );
};

export default memo(TheoPhongKham);
