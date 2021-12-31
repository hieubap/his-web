import React, { memo, useEffect, useState, useRef } from "react";
import { Checkbox, message, Button } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { ChiDinhBoSungWrapper } from "./styled";
import Select from "components/Select";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import { LOAI_DICH_VU } from "../../configs";
import { useSelector, useDispatch } from "react-redux";

const ModalChiDinh = (props) => {
  const { width, dataSource, onCancel, visible, dataNbChiDinh } = props;
  const refFuncSubmit = useRef(null);

  const listBenhPham = useSelector(
    (state) => state.benhPham.listBenhPham || []
  );
  const listPhongThucHien = useSelector(
    (state) => state.phongThucHien.listData || []
  );

  const {
    chiDinhDichVuCls: {
      chiDinhDichVu,
      getTongHopDichVuXN,
      getDsDichVuChiDinhCLS,
    },
    benhPham: { searchBenhPham },
    phongThucHien: { getData: searchPhongThucHien },
  } = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dataTable, setData] = useState([]);
  const [listErrorCode, setListErrorCode] = useState([]);
  const dataPhongThucHien = listPhongThucHien.map((item) => ({
    id: item.phongId,
    ten: item.phong?.ten,
    dichVuId: item.dichVuId,
  }));

  useEffect(() => {
    if (!dataSource.length) return;
    let listErrorCode = [];
    const data = dataSource.map((item, idx) => {
      const nbDichVu = item.nbDichVu;
      listErrorCode = [...listErrorCode, item.code];
      return {
        benhPhamId: item.benhPhamId,
        nbChanDoan: { cdSoBo: item.nbChanDoan?.cdSoBo },
        nbDichVu: {
          dichVu: nbDichVu?.dichVu,
          dichVuId: nbDichVu?.dichVuId,
          soLuong: 1,
          chiDinhTuDichVuId: nbDichVu?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: nbDichVu?.chiDinhTuLoaiDichVu,
          khoaChiDinhId: nbDichVu?.khoaChiDinhId,
          loaiDichVu: nbDichVu?.loaiDichVu,
        },
        nbDotDieuTriId: item.nbDotDieuTriId,
        nbDvKyThuat: {
          phongThucHienId: item.nbDvKyThuat?.phongThucHienId,
        },
        key: idx,
        stt: idx + 1,
        code: item.code,
      };
    });
    setData(data);
    setListErrorCode([...new Set(listErrorCode)]);
  }, [dataSource]);

  const onChange = (type, idx) => async (e) => {
    let value = e;
    if (e.target) {
      value = e.target.checked;
    } else {
      let item = value[0];
      if (typeof item === "string") {
        const response = await benhPhamProvider.post({
          ten: item,
        });
        if (response.code === 0) {
          value = response.data.id;
          searchBenhPham();
        } else {
          value = item;
        }
      }
    }
    dataTable.map((item, index) => {
      if (idx === index) {
        if (type === "benhPhamId") item.benhPhamId = value;
        if (type === "phongThucHienId")
          item.nbDvKyThuat.phongThucHienId = value;
        if (type === "tuTra") item.nbDichVu.tuTra = value;
      }
      return item;
    });
    setData([...dataTable]);
  };

  const getDsDichVu = (listLoaiDv) => {
    const payload = {
      chiDinhTuDichVuId: dataNbChiDinh?.id,
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
    };
    if (listLoaiDv.includes(LOAI_DICH_VU[1].id)) {
      getTongHopDichVuXN(payload);
    }
    if (listLoaiDv.includes(LOAI_DICH_VU[2].id)) {
      getDsDichVuChiDinhCLS(payload);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isInValid = dataTable.some(
      (item) =>
        (item.code === 8709 && !item.benhPhamId) ||
        (item.code === 7802 && !item.nbDvKyThuat?.phongThucHienId)
    );
    if (isInValid) {
      message.error("Mời bổ sung thông tin dịch vụ còn thiếu!");
      return;
    }
    const updatedData = dataTable.map((item) => {
      delete item["key"];
      delete item["stt"];
      delete item["code"];
      if (item.benhPhamId?.length) {
        item.benhPhamId = item.benhPhamId[item.benhPhamId.length - 1];
      }
      return item;
    });

    setLoading(true);
    chiDinhDichVu({ dataTable: updatedData, isUpdateInfo: true })
      .then(({ code, listLoaiDichVu, neededUpdateRecord }) => {
        if (code === 0 && !neededUpdateRecord.length) {
          getDsDichVu(listLoaiDichVu);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  refFuncSubmit.current = onSubmit;

  const onSearhDSPhong =
    ({ dichVuId }) =>
    () => {
      searchPhongThucHien({ dichVuId });
    };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "stt",
      align: "center",
      key: "stt",
    },
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      width: "250px",
      dataIndex: "tenDichVu",
      align: "left",
      key: "tenDichVu",
      render: (item, record) => record?.nbDichVu?.dichVu.ten,
    },
    {
      title: <HeaderSearch title="Bệnh phẩm" />,
      width: "250px",
      dataIndex: "benhPhamId",
      key: "benhPhamId",
      render: (item, record, idx) => {
        return (
          <Select
            // mode="tags"
            // defaultValue={record?.benhPhamId || null}
            className={
              record.code === 8709 && !record.benhPhamId ? "error" : ""
            }
            allowClear
            data={listBenhPham}
            showSearch={true}
            placeholder="Lựa chọn"
            onChange={onChange("benhPhamId", idx)}
          ></Select>
        );
      },
      className: "custom-col",
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      width: "150px",
      dataIndex: "phongThucHienId",
      key: "phongThucHienId",
      className: "custom-col",
      render: (item, record, idx) => (
        <Select
          defaultValue={record?.nbDvKyThuat?.phongThucHienId}
          className={record.code === 7802 && !record.benhPhamId ? "error" : ""}
          allowClear
          data={dataPhongThucHien}
          placeholder="Lựa chọn"
          onChange={onChange("phongThucHienId", idx)}
          onClick={onSearhDSPhong({
            dichVuId: record.nbDichVu?.dichVuId,
          })}
        />
      ),
    },
    {
      title: <HeaderSearch title="Tự túc" />,
      width: "50px",
      dataIndex: "tuTra",
      key: "tuTra",
      render: (item, record, idx) => (
        <div className="check">
          <Checkbox onChange={onChange("tuTra", idx)} />
        </div>
      ),
    },
  ];

  return (
    <ChiDinhBoSungWrapper
      width={width}
      visible={visible}
      closable={false}
      footer={null}
    >
      <div className="header-chidinh">
        <span>Bổ sung thông tin</span>
      </div>
      <TableWrapper
        scroll={{ y: 500, x: 700 }}
        columns={columns}
        dataSource={dataTable}
      />
      <div className="btn-action">
        <Button className="cancel" onClick={onCancel}>
          Hủy
        </Button>
        <Button className="ok" onClick={onSubmit}>
          Đồng ý
        </Button>
      </div>
    </ChiDinhBoSungWrapper>
  );
};

export default memo(ModalChiDinh);
