import React, { memo, useEffect, useState, useRef } from "react";
import { Checkbox, message } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { ChiDinhBoSungWrapper } from "./styled";
import Select from "components/Select";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import Button from "../components/Button";
import { LOAI_DICH_VU } from "../configs";
import { useSelector, useDispatch } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";

const ModalChiDinh = (props) => {
  const { width, dataSource, onCancel, visible } = props;
  const refLayerHotKey = useRef(stringUtils.guid());
  const refFuncSubmit = useRef(null);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const {
    chiDinhDichVu,
    getDsDichVuChiDinhKham,
    getTongHopDichVuXN,
    getDsDichVuChiDinhCLS,
  } = useDispatch().chiDinhKhamBenh;

  const searchPhongThucHien = useDispatch().phongThucHien.getData;
  const searchBenhPham = useDispatch().benhPham.searchBenhPham;
  const listBenhPham = useSelector(
    (state) => state.benhPham.listBenhPham || []
  );
  const listPhongThucHien = useSelector(
    (state) => state.phongThucHien.listData || []
  );

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
  useEffect(() => {
    if (visible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              onCancel();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refFuncSubmit.current && refFuncSubmit.current();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [visible]);

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
    if (listLoaiDv.includes(LOAI_DICH_VU[0].id)) {
      getDsDichVuChiDinhKham();
    }
    if (listLoaiDv.includes(LOAI_DICH_VU[1].id)) {
      getTongHopDichVuXN();
    }
    if (listLoaiDv.includes(LOAI_DICH_VU[2].id)) {
      getDsDichVuChiDinhCLS();
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
    ...(listErrorCode.includes(8709)
      ? [
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
        ]
      : []),
    ...(listErrorCode.includes(7802)
      ? [
          {
            title: <HeaderSearch title="Phòng thực hiện" />,
            width: "150px",
            dataIndex: "phongThucHienId",
            key: "phongThucHienId",
            className: "custom-col",
            render: (item, record, idx) => (
              <Select
                defaultValue={record?.nbDvKyThuat?.phongThucHienId}
                className={
                  record.code === 7802 && !record.benhPhamId ? "error" : ""
                }
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
        ]
      : []),
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
        <div className="btn-action">
          <Button
            loading={loading}
            name="Đồng ý"
            className="ok"
            onClick={onSubmit}
          />
          <Button name="Hủy" className="cancel" onClick={onCancel} />
        </div>
      </div>
      <TableWrapper
        scroll={{ y: 500, x: 700 }}
        columns={columns}
        dataSource={dataTable}
      />
    </ChiDinhBoSungWrapper>
  );
};

export default memo(ModalChiDinh);
