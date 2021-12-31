import React, { useCallback, useState, useMemo, useRef } from "react";
import { Checkbox, Form, Input, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ModalNotification2 } from "components/ModalConfirm";
import groupBy from "lodash/groupBy";
import Select from "components/Select";
import { TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IconDelete from "assets/images/khamBenh/delete.png";
import IconEdit from "assets/images/khamBenh/edit.png";
import CustomPopover from "../../components/CustomPopover";
import { PhieuChiDinhWrapper } from "./styled";
import { LOAI_DICH_VU } from "../../configs";
import { getColorByTrangThai, canEditOrUpdate } from "../utils";
import { formatDecimal } from "../../../../utils";

const DanhSachDichVu = ({
  dataSortColumn = {},
  listBenhPham,
  onDeleteDichVu,
  dataSource,
  getNBSoPhieuCLS,
  soPhieuCls,
  getDsDichVu,
  themThongTinDV,
  searchPhongThucHien,
  dataPhongThucHien,
  trangThai,
  loaiDichVu,
  onChangePhieu,
}) => {
  const refNotification = useRef(null);
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    visibleEdit: null,
    dataPhongThucHien: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const dataTable = useMemo(() => {
    const groupData = groupBy(dataSource, "tenNhomDichVuCap2");
    let formattedData = [];
    Object.keys(groupData).forEach((key, idx) => {
      formattedData.push({
        id: key,
        nameDichVu: key,
        type: "group",
        key,
      });
      const listChild = groupData[key].map((item, index) => ({
        ...item,
        nameDichVu: item?.tenDichVu,
        stt: index + 1,
        key: `${key}-${item?.tenDichVu}-${index}`,
      }));
      formattedData = [...formattedData, ...listChild];
    });

    return formattedData;
  }, [JSON.stringify(dataSource)]); // https://github.com/facebook/react/issues/14476#issuecomment-471199055

  const onClickSort = () => { };
  const handleEdit = (record) => () => {
    form.validateFields().then((values) => {
      console.log('values: ', values);
      let { ghiChu, ...rest } = values
      let obj = {
        body: {
          rest,
          nbDichVu: { ghiChu },
        },
        id: record.id,
        loaiDichVu: record.loaiDichVu,
      }
      console.log('obj: ', obj);
      themThongTinDV(obj).then((s) => {
        if (s.code === 0) {
          getDsDichVu(record.loaiDichVu);
          onClose();
        }
      });
    });
  };

  const onDelete = (record) => () => {
    refNotification.current &&
      refNotification.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa chỉ định ${record.nameDichVu}?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu({ id: record.id, loaiDichVu: record.loaiDichVu }).then(
            (s) => {
              if (s.code === 0) {
                getDsDichVu(record.loaiDichVu);
              }
            }
          );
        }
      );
  };

  const onClose = () => {
    setState({
      visibleEdit: false,
      visibleDelete: false,
    });
  };

  const handleVisible = (type, idx, record) => () => {
    if (type === "edit") {
      form.setFieldsValue({
        benhPhamId: record.benhPhamId ? record.benhPhamId : [],
        ghiChu: record.ghiChuNbDv,
        phongThucHienId: record.phongThucHienId,
        soPhieu: record.soPhieu,
        tuTra: record.tuTra,
      });
      getNBSoPhieuCLS({ loaiDichVu: record.loaiDichVu });
      searchPhongThucHien({ dichVuId: record.dichVuId });
    }
    const dataType = {
      edit: "visibleEdit",
      delete: "visibleDelete",
      info: "visibleInfo",
    };
    setState({
      [dataType[type]]: idx,
    });
  };

  const renderContentEdit = useCallback(
    (record) => (
      <>
        <Form form={form} layout="vertical">
          <Row gutter={8}>
            {![LOAI_DICH_VU[2].id, LOAI_DICH_VU[0].id].includes(
              record.loaiDichVu
            ) && (
                <Col span={12}>
                  <Form.Item
                    label="Bệnh phẩm"
                    name="benhPhamId"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập bệnh phẩm!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      data={listBenhPham}
                      placeholder="Chọn tên bệnh phẩm"
                      mode="tags"
                      removeIcon={() => null}
                      onChange={onChangePhieu(record.soPhieuId, loaiDichVu, form)}
                    />
                  </Form.Item>
                </Col>
              )}
            <Col span={12}>
              <Form.Item
                label="Phòng thực hiện"
                name="phongThucHienId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên phòng thực hiện!",
                  },
                ]}
              >
                <Select
                  allowClear
                  data={dataPhongThucHien}
                  placeholder="Chọn tên phòng thực hiện"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Lưu ý" name="ghiChu">
                <Input
                  className="input-option"
                  placeholder="Vui lòng nhập lưu ý!"
                />
              </Form.Item>
            </Col>

            {record.loaiDichVu !== LOAI_DICH_VU[0].id && (
              <Col span={12}>
                <Form.Item
                  label="Số phiếu"
                  name="soPhieu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số phiếu!",
                    },
                  ]}
                >
                  <Select data={soPhieuCls} placeholder="Chọn số phiếu" />
                </Form.Item>
              </Col>
            )}
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              <Form.Item label="" name="tuTra" valuePropName="checked">
                <Checkbox>Tự trả</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    ),
    [state.visibleEdit, dataPhongThucHien]
  );

  const renderContent = (typeContent) => (value, row, index) => {
    const obj = {
      children: typeContent === "price" ? formatDecimal(value) : value,
      props: {},
    };

    if (row.type === "group") {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 10,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: renderContent(),
    },
    {
      title: (
        <HeaderSearch
          title="Dịch vụ"
          sort_key="dichvu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichvu"] || 0}
        />
      ),
      width: 60,
      dataIndex: "nameDichVu",
      key: "nameDichVu",
      align: "left",

      render: (text, row, index) => {
        if (row.type !== "group") {
          const colorStatus = getColorByTrangThai(row.trangThai);

          const additionalInfo = `${row.tuTra ? "Tự túc" : ""} ${
            row.tuTra && row.loaiDichVu === 10 ? "|" : ""
            } ${row.loaiDichVu === 10 ? row.tenBacSiChiDinh : ""}`;
          return (
            <div className="group-row-item">
              <div className="group-row-item__icon">
                <CheckCircleOutlined
                  style={{ fontSize: "25px", color: colorStatus }}
                />
              </div>
              <div className="group-row-item__text">
                <p>{text}</p>
                <p className="add-info">{additionalInfo}</p>
              </div>
            </div>
          );
        }
        return {
          children: <span className="group-title">{text}</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || 0}
        />
      ),
      width: 20,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: renderContent("price"),
    },
    {
      title: <HeaderSearch title="Khác" />,
      width: 15,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item, record, index) => {
        const obj = {
          props: {},
        };
        if (record.type === "group") {
          obj.props.colSpan = 0;
        }
        obj.children = (
          <div className="action-btn">
            {canEditOrUpdate(record.trangThai, record.loaiDichVu) && (
              <>
                <CustomPopover
                  overlayInnerStyle={{ height: "fit-content", padding: "0px !important" }}
                  overlayClassName="popover-custom-all popover-custom-all_res"
                  icon={IconEdit}
                  onSubmit={handleEdit(record)}
                  onCancel={onClose}
                  contentPopover={renderContentEdit(record)}
                  visible={state.visibleEdit === index}
                  handleVisible={handleVisible("edit", index, record)}
                  mask={true}
                />

                <img src={IconDelete} onClick={onDelete(record)} alt="" />
              </>
            )}
          </div>
        );
        return obj;
      },
    },
  ];
  return (
    <PhieuChiDinhWrapper>
      <div className="form-detail">
        <TableWrapper
          scroll={{ x: false }}
          columns={columns}
          dataSource={dataTable}
        />
      </div>
      <ModalNotification2 ref={refNotification} />
    </PhieuChiDinhWrapper>
  );
};

export default DanhSachDichVu;
