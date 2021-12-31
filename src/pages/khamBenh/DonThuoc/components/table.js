import React, { useState, useEffect, useCallback, useRef } from "react";
import { groupBy, set, values } from "lodash";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { TitleTable } from "../styled";
import CustomPopover from "../../components/CustomPopover";
import { Checkbox, Form, Input, Row, Col } from "antd";
import Select from "components/Select";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import { connect } from "react-redux";
import SuaThongTinThuoc from "./ThongTinThuoc/SuaThongTinThuoc";

function Table(props) {
  const [state, _setState] = useState({
    visibleDelete: null,
    visibleEdit: null,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const ThongTinThuocRef = useRef(null);
  const {
    onDeleteDichVu,
    getListDichVuThuoc,
    listDvThuoc,
    nbDotDieuTriId,
    listloaiDonThuoc,
  } = props;
  const [form] = Form.useForm();
  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      setState({
        visibleEdit: false,
      });
    });
  };

  useEffect(() => {
    setState({ dataThuoc: listDvThuoc });
  }, [listDvThuoc]);

  const onDelete = (record) => {
    onDeleteDichVu(record.id).then((s) =>
      setState({
        dataThuoc: state.dataThuoc.filter((item) => item !== record),
        visibleEdit: null,
        visibleDelete: null,
      })
    );
  };

  const onCancel = () => {
    setState({
      visibleEdit: null,
      visibleDelete: null,
    });
  };
  const handleVisible = (type, idx) => (visible) => {
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };

  const onEdit = (record) => {
    ThongTinThuocRef.current &&
      ThongTinThuocRef.current.show({ newTable: Array(record) });
  };
  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          sort_key="index"
          // dataSort={dataSortColumn["stt"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "64px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, row, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên thuốc - Hàm lượng"
          sort_key="ten"
          // dataSort={dataSortColumn["tenThuoc"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "562px",
      dataIndex: "",
      key: "",
      colSpan: 1,
      render: (item, record) => {
        console.log("record", record)
        const ten = record?.ten || record?.thuocChiDinhNgoai.ten
        const tenLieuDung = record?.tenLieuDung || record?.lieuDung?.ten
        return (
          <div>
            <span>{`${ten} ${record.tenHoatChat ? " (" + record.tenHoatChat + ")" : " "} ${record.hamLuong ? " - " + record.hamLuong : ""}`}</span>
            <br />
            <span style={{fontSize:"12px"}}>{`${tenLieuDung} ${record?.tenDuongDung ? "-" + record?.tenDuongDung : ""}`}.Lưu ý: {record.ghiChu}</span>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          // dataSort={dataSortColumn["Số lượng"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "116px",
      dataIndex: "soLuong",
      key: "soLuong",
      colSpan: 1,
      render: (item) => {
        return item + " viên";
      },
    },
    {
      title: <HeaderSearch title="Khác" />,
      width: 110,
      dataIndex: "action",
      key: "action",
      align: "center",
      colSpan: 1,
      render: (item, record, index) => {
        return (
          <div className="action-btn">
            <img
              style={{ objectFit: "contain" }}
              src={IconEdit}
              onClick={() => onEdit(record)}
            />
            <CustomPopover
              icon={IconDelete}
              onSubmit={() => onDelete(record)}
              onCancel={onCancel}
              contentPopover={null}
              visible={state.visibleDelete === index}
              handleVisible={handleVisible("delete", index)}
              title="Xác nhận xóa bản ghi?"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TitleTable>{props.title}:</TitleTable>
      <TableWrapper
        columns={columns}
        dataSource={state.dataThuoc || listDvThuoc}
        scroll={{ x: false, y: false }}
      />
      <SuaThongTinThuoc ref={ThongTinThuocRef} />
    </div>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = ({
  chiDinhDichVuKho: { onDeleteDichVu, getListDichVuThuoc },
}) => ({
  onDeleteDichVu,
  getListDichVuThuoc,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
