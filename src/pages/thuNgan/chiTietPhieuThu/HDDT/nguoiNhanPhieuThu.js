import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import IconCheck from "assets/images/thuNgan/icCheck.png";
import IconAdd from "assets/images/thuNgan/icAdd.png";
import IconDelete from "assets/images/thuNgan/icDelete.png";
import { Detail } from "./styled";
const dsNguoiNhan = [
  {
    soTien: 2000000,
    tenNguoiNhan: "Nguyễn Văn A",
    diaChi: "Hà Nội",
    maSoThue: "12905767",
  },
];
const NguoiNhanPhieuThu = (props) => {
  const [state, _setState] = useState({
    data: [],
    selectedRowKeys: [],
    discount: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    setState({
      dataNguoiNhan: dsNguoiNhan,
      dataAdd: [{}],
    });
  }, []);
  const columnsNguoiNhan = [
    {
      title: <HeaderSearch title="Số tiền" />,
      dataIndex: "soTien",
      key: "soTien",
      width: "70px",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: <HeaderSearch title="Tên người/ TC nhận HDDT" />,
      dataIndex: "tenNguoiNhan",
      key: "tenNguoiNhan",
      width: "170px",
    },
    {
      title: <HeaderSearch title="Địa chỉ" />,
      dataIndex: "diaChi",
      key: "diaChi",
      width: "150px",
    },
    {
      title: <HeaderSearch title="Mã sô thuế" />,
      dataIndex: "maSoThue",
      key: "maSoThue",
      width: "100px",
    },
    {
      title: "",
      //   dataIndex: "item",
      //   key: "item",
      align: "center",
      width: "50px",
      render: () => {
        return <img src={IconDelete} />;
      },
    },
  ];
  const columnsAdd = [
    {
      dataIndex: "soTien",
      width: "70px",
      render: () => {
        return <Input placeholder="Nhập số tiền" />;
      },
    },
    {
      dataIndex: "tenNguoiNhan",
      width: "170px",
      render: () => {
        return <Input placeholder="Nhập tên người nhận" />;
      },
    },
    {
      dataIndex: "diaChi",
      width: "150px",
      render: () => {
        return <Input placeholder="Nhập địa chỉ" />;
      },
    },
    {
      width: "100px",
      dataIndex: "maSoThue",
      render: () => {
        return <Input placeholder="Nhập mã số thuế" />;
      },
    },
    {
      width: "50px",
      align: "center",
      render: () => {
        return <img src={IconCheck} onClick={onclose} />;
      },
    },
  ];
  const onclose = () => {
    setState({
      showTableAdd: false,
    });
  };
  const onAdd = () => {
    setState({
      showTableAdd: true,
    });
  };
  return (
    <Detail>
      <div className="title textBold">Chi tiết</div>
      <TableWrapper
        columns={columnsNguoiNhan}
        dataSource={state.dataNguoiNhan}
        scroll={{ y: 150, x: 500 }}
      />
      {state.showTableAdd && (
        <div className="table-add">
          <Table
            columns={columnsAdd}
            dataSource={state.dataAdd}
            pagination={false}
          />
        </div>
      )}
      <div onClick={onAdd} className="addItem">
        <img src={IconAdd} />
        Thêm
      </div>
    </Detail>
  );
};

export default NguoiNhanPhieuThu;
