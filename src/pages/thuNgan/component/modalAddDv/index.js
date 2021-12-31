import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Pagination } from "components";
import PropTypes from "prop-types";
import { ModalStyled } from "./styled";
import { Button, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { combineSort } from "utils";
import { useHistory } from "react-router-dom";
import { data } from "./data";
import moment from "moment";
let timer = null;
const ModalAddDichVu = ({}, ref) => {
  const [state, _setState] = useState({
    show: false,
    dataSortColumn: {},
    listData: data,
    page: 0,
    size: 10,
    dataSearch: {},
    selectedRowKeys: [],
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchNBDotDieuTriTongHop, updateData } = dispatch.nbDotDieuTri;
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refCallBack = useRef(null);
  useImperativeHandle(ref, () => ({
    show: ({}, callback) => {
      setState({
        show: true,
      });
      refCallBack.current = callback;
    },
  }));
  const onSelectChange = (selectedRowKeys) => {
    setState({
      selectedRowKeys: selectedRowKeys,
    });
  };
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value };
    setState({
      dataSortColumn: sort,
    });
    onSearch({ page: state.page, size: state.size });
  };
  const onRow = () => {};
  const setRowClassName = () => {};
  const onChangePage = (page) => {
    setState({
      page: page - 1,
    });
    onSearch({
      page: page - 1,
      size: state.size,
      dataSearch: state.dataSearch,
    });
  };
  const onSearch = ({ page, size, dataSearch }) => {
    const sort = combineSort(state.dataSortColumn);
    searchNBDotDieuTriTongHop({
      ...dataSearch,
      sort,
      page: page,
      size: size,
    }).then((s) => {
      setState({
        listData: s.totalElements,
        listData: s.data,
      });
    });
  };
  const handleSizeChange = (size) => {
    setState({
      size: size,
    });
    onSearch({ size: size, page: state.page, dataSearch: state.dataSearch });
  };
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  // useEffect(() => {
  //   searchNBDotDieuTriTongHop({
  //     ...state.dataSearch,
  //     page: state.page,
  //     size: state.size,
  //   }).then((s) => {
  //     setState({
  //       totalElements: s.totalElements,
  //       listData: s.data,
  //     });
  //   });
  // }, []);
  const onSearchInput = (key) => (e) => {
    // let value = "";
    // if (e?.target) {
    //   if (e.target.hasOwnProperty("checked")) value = e.target.checked;
    //   else value = e.target.value;
    // } else value = e;
    // setState({
    //   dataSearch: {
    //     ...state.dataSearch,
    //     [key]: value,
    //   },
    // });
    // const dataSearch = {
    //   ...state.dataSearch,
    //   [key]: value,
    // };
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   onSearch({
    //     page: state.page,
    //     size: state.size,
    //     dataSearch,
    //   });
    // }, 500);
  };
  const confirm = () => {
    if (refCallBack.current) {
      const listItem = state.listData.filter((item) =>
        state.selectedRowKeys.some((e) => {
          return e == item.id;
        })
      );
      refCallBack.current({ newDv: listItem });
      setState({
        show: false,
      });
    }
  };
  const columnsGroup = [
    {
      title: (
        <HeaderSearch
          title="Số phiếu thu"
          sort_key="soPhieuThu"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maHoSo || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("soPhieuThu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "soPhieuThu",
      key: "soPhieuThu",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Số tiền"
          sort_key="soTien"
          onClickSort={onClickSort}
          // dataSort={state.dataSortColumn?.maNb || 0}
          // search={
          //   <Input
          //     placeholder="Nhập mã người bệnh"
          //     onChange={onSearchInput("maNb")}
          //   />
          // }
        />
      ),
      width: 150,
      dataIndex: "soTien",
      key: "soTien",
      align: "right",
      render: (text) => text?.formatPrice(),
    },
    {
      title: (
        <HeaderSearch
          title="Tên thu ngân"
          sort_key="tenThuNgan"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tenThuNgan || 0}
          search={
            <Input
              placeholder="Nhập mã họ tên nb"
              onChange={onSearchInput("tenThuNgan")}
            />
          }
        />
      ),
      width: 300,
      dataIndex: "tenThuNgan",
      key: "tenThuNgan",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian thanh toán"
          sort_key="diaChi"
          // onClickSort={onClickSort}
          // dataSort={state.dataSortColumn?.diaChi || 0}
          // search={
          //   <Input
          //     placeholder="Nhập địa chỉ người bệnh"
          //     onChange={onSearchInput("diaChi")}
          //   />
          // }
        />
      ),
      width: 200,
      dataIndex: "thoiGian",
      key: "thoiGian",
      align: "left",
      render: (text) => moment(text).format("YYYY/MM/DD hh:mm:ss"),
    },
  ];

  return (
    <ModalStyled
      title={
        <>
          <div>Tìm kiếm phiếu thu</div>
          <div>
            <span>{"Nguyễn đoàn huyền trang"}</span>-
            <span className="fNormal">Nữ</span>
            <span className="fNormal">-32 tuổi</span>
          </div>
        </>
      }
      centered
      visible={state.show}
      footer={null}
      onCancel={() => {
        setState({
          show: false,
        });
      }}
      closable={false}
      width={1000}
    >
      <TableWrapper
        columns={columnsGroup}
        rowSelection={rowSelection}
        dataSource={state.listData || []}
        onRow={onRow}
        scroll={{ x: 200 }}
        rowClassName={setRowClassName}
      ></TableWrapper>
      <Pagination
        onChange={onChangePage}
        current={state?.page + 1}
        pageSize={state?.size || 10}
        listData={state.listData}
        total={state?.totalElements || 10}
        onShowSizeChange={handleSizeChange}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
      <div className="footer">
        <p className="button-cancel" onClick={handleCancel}>
          <ArrowLeftOutlined /> Quay lại
        </p>
        <Button className="button-ok" onClick={confirm}>
          Xác nhận
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </ModalStyled>
  );
};

export default forwardRef(ModalAddDichVu);
