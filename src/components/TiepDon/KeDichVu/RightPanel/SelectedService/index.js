import React, { memo, useState } from "react";
import Table from "components/Table";
import { ROLES } from "constants/index";
import { Main } from "./styled";
import { connect } from "react-redux";
import { compose } from "redux";
import { Checkbox } from "antd";
import Select from "components/Select";
import TableWrapper from "../../../TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import AuthWrapper from "components/AuthWrapper";
import { getIdFromUrl } from "utils";

const Index = (props) => {
  const {
    listDvChoose,
    doiTuong,
    updateData,
    listDvKham,
    listAllPhong,
    keDichVuKham,
    deleteDvKyThuat,
  } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onDeleteIndex = (data, index, id) => {
    if (id) deleteDvKyThuat({ id, loaiDichVu: data.loaiDichVu });
    let indexLeft = listDvKham?.findIndex(
      (x) => x?.dichVuId === data?.dichVuId
    );
    if (listDvKham[indexLeft]) listDvKham[indexLeft].checked = false;
    listDvChoose.splice(index, 1);    
    updateData({
      listDvChoose: [...listDvChoose],
      listDvKham: [...listDvKham],
    });
  };
  const update = (index) => {
    setState({ [`showUpdate${index}`]: true });
  };
  const save = (data, index) => {
    let obj = {
      id: Number(data?.id),
      nbDotDieuTriId: data?.nbDotDieuTriId,
      nbDvKyThuat: {
        phongThucHienId: data?.phongId,
      },
      nbDichVu: {
        dichVuId: data?.dichVuId,
      },
    };
    keDichVuKham({
      data: [obj],
      id: data?.id,
    }).then(() => {
      setState({ [`showUpdate${index}`]: false });
    });
  };
  // let data = orderBy(listDvChoose, ["thanhToan",], "asc");
  const getTenPhong = (id) => {
    let phong = listAllPhong.find((e) => e.id === id);
    if (phong) {
      return (
        phong?.ma + "-" + phong?.ten + (phong.toaNha ? "-" + phong.toaNha : "")
      );
    }
    return "";
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
        />
      ),
      width: "150px",
      dataIndex: "ten",
      hideSearch: true,
      render: (item, list) => {
        let data =
          listDvChoose.filter((option) => {
            let check1 =
              option?.ten && item && option?.ten === item
                ? true
                : false;
            let check2 =
              option?.tenDichVu &&
                list?.tenDichVu &&
                option?.tenDichVu === list?.tenDichVu
                ? true
                : false;
            return check1 || check2;
          }) || [];
        let index = data.findIndex((x) => x?.id === list?.id);
        return (
          <div>
            {item ? item : list?.tenDichVu}{" "}
            {index ? ` lần ${index + 1}` : ""}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="SL"
        />
      ),
      width: "40px",
      dataIndex: "soLuong",
      hideSearch: true,
      align: "right",
      render: (item) => {
        return <div>{item ? item : 1}</div>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá"
        />
      ),
      width: "80px",
      dataIndex: "giaKhongBaoHiem",
      hideSearch: true,
      align: "right",
      render: (item, list) => {
        return (
          <div>
            {doiTuong === 1
              ? item
                ? item.formatPrice()
                : ""
              : doiTuong === 2
                ? list?.giaBaoHiem
                  ? list?.giaBaoHiem.formatPrice()
                  : item
                    ? item.formatPrice()
                    : ""
                : ""}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
        />
      ),
      width: "100px",
      dataIndex: "phongThucHienId",
      hideSearch: true,
      render: (value, item) => {
        return getTenPhong(item?.phongThucHienId || item?.phongId);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đã TT"
        />
      ),
      width: "70px",
      dataIndex: "thanhToan",
      hideSearch: true,
      align: "center",
      render: (item, list) => {
        return <Checkbox checked={item} disabled></Checkbox>;
      },
    },
    {
      title: " ",
      width: "80px",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      hideSearch: true,
      render: (item, list, index) => {
        return (
          <div className="col-action">
            <AuthWrapper accessRoles={[ROLES["TIEP_DON"].SUA_DV]}>
              {!!list?.id &&
                (!state[`showUpdate${index}`] ? (
                  <div className="">
                    <img
                      onClick={() => update(index)}
                      src={require("assets/images/welcome/load.png")}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="">
                    <img
                      onClick={() => save(list, index)}
                      src={require("assets/images/welcome/save2.png")}
                      alt=""
                    />
                  </div>
                ))}
            </AuthWrapper>
            <div className="btn-delete">
              {!list?.thanhToan && (
                <img
                  onClick={() => onDeleteIndex(list, index, list?.id)}
                  src={require("assets/images/welcome/delete2.png")}
                  alt=""
                  style={{ marginLeft: 10 }}
                />
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Main md={24} xl={24} xxl={24} className="container">
      <TableWrapper
        title="Dịch vụ đã chọn"
        scroll={{ x: 500, y: 180 }}
        rowKey={"key"}
        columns={columns}
        data={listDvChoose.map((item, index) => {
          item.key = "item" + index;
          return item;
        })}
      />
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    listDvKham: state.tiepDonDichVu.listDvKham || [],
    listDvChoose: state.tiepDonDichVu.listDvChoose || [],
    doiTuong: state.tiepDon.doiTuong,
    listAllPhong: state.phong.listAllPhong || [],
  };
};
const mapDispatchToProps = ({
  tiepDonDichVu: { keDichVuKham, updateData },
}) => ({
  keDichVuKham,
  updateData,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Index);
