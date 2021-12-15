import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Input, Form, Col, Row, Select, DatePicker, message } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Main } from "./styled";
import { openInNewTab } from "utils";
const { Option } = Select;
const { Item } = Form;

const CreateOrUpdate = (
  {
    //state
    auth,
    nhanVienHienTai,
    listKhoUser,
    hoaDonBiTrung,
    listQuyetDinhThau,
    listNguonNhapKho,
    listHinhThucNhapXuat,
    khoHienTai,
    thongTinPhieuNhap,
    //dispatch
    searchNhanVienById,
    searchQuyetDinhThau,
    searchNguonNhapKho,
    searchHinhThucNhapXuat,
    kiemTraSoHoaDon,
    updateData,
    searchKhoById,
    getTheoTaiKhoan,
    listDataNhanVienKho,
    onSearchNhanVienKho,
    ...props
  },
  ref
) => {
  const formRef = useRef();
  const [form] = Form.useForm();
  const [kho, setKho] = useState([]);
  const refTimeout = useRef(null);
  const [state, _setState] = useState({
    ngayHoaDon: new Date(),
    loaiNhapXuat: 10,
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  useImperativeHandle(ref, () => ({
    setQuyetDinhThau: (value) => {
      if (value) {
        onChange("quyetDinhThauId")(value);
      }
    },
    getQuyetDinhThauId: () => {
      return thongTinPhieuNhap?.quyetDinhThauId;;
    },
    setData: (data) => {
      //TODO: set value form
      const thongTinForm = [
        "khoId",
        "soHoaDon",
        "kyHieuHoaDon",
        "ngayHoaDon",
        "soHopDong",
        "quyetDinhThauId",
        "nguonNhapKhoId",
        "hinhThucNhapXuatId"
      ].reduce((a, item) => ({
        ...a,
        [item]: data[item],
      }), {});
      form.setFieldsValue(thongTinForm);
      setState({ id: data?.id });
    },
  }));
  const onChange = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.value
      : e?.hasOwnProperty("_d")
        ? moment(e._d)
        : e;
    // if (refTimeout.current) {
    //   clearTimeout(refTimeout.current);
    // }
    // refTimeout.current = setTimeout(() => {
    // const newState = { [type]: value };
    // setState({ ...newState });
    updateData({
      thongTinPhieuNhap: {
        ...thongTinPhieuNhap,
        [type]: value,
      },
    });
    if (type == "quyetDinhThauId") {
      const goiThau = listQuyetDinhThau?.find((item) => item?.id == value);
      if (moment().isAfter(moment(goiThau?.ngayHieuLuc))) {
        message.warning(
          `Gói thầu đã hết hiệu lực ngày ${moment(
            goiThau?.ngayHieuLuc
          ).format(`DD/MM/YYYY`)}`
        );
      }
    }
    // }, 700);
  };
  const onBlur = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e.target.value
      : e?.hasOwnProperty("_d")
        ? moment(e._d)
        : e;
    if (type == "soHoaDon") {
      //TODO: check trung hoa don
      kiemTraSoHoaDon({
        [type]: value,
        id: thongTinPhieuNhap?.id ? thongTinPhieuNhap?.id : 0,
        ngayHoaDon: moment(form.getFieldValue('ngayHoaDon')).format("YYYY-MM-DD"),
      });
    }
    if (type == "ngayHoaDon" && e) {
      kiemTraSoHoaDon({
        [type]: moment(value).format("YYYY-MM-DD"),
        id: thongTinPhieuNhap?.id ? thongTinPhieuNhap?.id : 0,
        soHoaDon: thongTinPhieuNhap?.soHoaDon,
      });
    }
  };
  const onSave = (approve) => () => {
    form
      .validateFields()
      .then((values) => {
        if (!thongTinPhieuNhap?.id) {
          props.onCreate({
            ...values,
            quyetDinhThauChiTietId: thongTinPhieuNhap?.quyetDinhThauChiTietId,
            approve
          })
        }
        else {
          props.onUpdate({
            id: thongTinPhieuNhap?.id,
            payload: values
          })
        }
      })
      .catch((error) => { });
  };
  useEffect(() => {
    const thongTinForm = [
      "khoId",
      "soHoaDon",
      "kyHieuHoaDon",
      "soHopDong",
      "quyetDinhThauId",
      "nguonNhapKhoId",
      "hinhThucNhapXuatId"
    ].reduce((a, item) => ({
      ...a,
      [item]: thongTinPhieuNhap[item],
    }), {});
    form.setFieldsValue(thongTinForm);
    form.setFieldsValue({ ngayHoaDon: moment(thongTinPhieuNhap["ngayHoaDon"]) })
  }, [thongTinPhieuNhap]);
  useEffect(() => {
    if (thongTinPhieuNhap.khoId) {
      searchKhoById({ khoId: thongTinPhieuNhap.khoId })
        .then((data) => {
          searchQuyetDinhThau({ active: true, trangThai: 30, dsLoaiDichVu: data.dsLoaiDichVu });
        })
    }
    else searchQuyetDinhThau({ active: true, trangThai: 30 });
  }, [thongTinPhieuNhap.khoId]);
  useEffect(() => {
    if (thongTinPhieuNhap.nhaCungCapId) {
      if (!khoHienTai && thongTinPhieuNhap?.khoId)
        searchKhoById({ khoId: thongTinPhieuNhap?.khoId })
          .then((data) => {
            searchQuyetDinhThau({
              active: true, trangThai: 30, dsLoaiDichVu: data?.dsLoaiDichVu, nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId
            });
          });
      else
        searchQuyetDinhThau({
          active: true, trangThai: 30, dsLoaiDichVu: khoHienTai?.dsLoaiDichVu, nhaCungCapId: thongTinPhieuNhap?.nhaCungCapId
        });
    }
  }, [thongTinPhieuNhap.nhaCungCapId]);
  useEffect(() => {
    let dataSearch = { active: true, dsLoaiDichVu: khoHienTai?.dsLoaiDichVu };
    if (thongTinPhieuNhap?.quyetDinhThauId) {
      dataSearch = {
        ...dataSearch,
        thau: true,
      };
    } else if (!thongTinPhieuNhap?.quyetDinhThauId) {
      dataSearch = {
        ...dataSearch,
        thau: false,
      };
    }
    searchNguonNhapKho({ dataSearch });
  }, [thongTinPhieuNhap?.quyetDinhThauId]);
  useEffect(() => {
    if (auth?.nhanVienId) {
      searchNhanVienById({ nhanVienId: auth?.nhanVienId });
      onSearchNhanVienKho({ nhanVienId: auth?.nhanVienId ,size : 9999999})
    }
    searchNguonNhapKho({
      dataSearch: { active: true, thau: false, dsLoaiDichVu: khoHienTai?.dsLoaiDichVu }
    });
    searchHinhThucNhapXuat({ active: true, dsHinhThucNhapXuat: 10 });
  }, []);
  // kho theo nhân viên hiện tại và active
  let khoOption = useMemo(() => {
    let options = listDataNhanVienKho?.map((item, index) => (
      <Option key={index} value={item?.khoId}>
        {item?.kho?.ten}
      </Option>
    ));
    return options;
  }, [listDataNhanVienKho]);

  return (
    <Main>
      <h2>
        <b>Thông tin phiếu nhập</b>
      </h2>
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
      // onFinish={}
      >
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Item
              label={(
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quan-tri-kho")}
                >
                  Kho nhập
                </div>
              )}
              name="khoId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kho nhập!",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.khoId}
            >
              <Select
                allowClear
                showSearch
                disabled={thongTinPhieuNhap?.id}
                filterOption={(input, option) => {
                  const str = ('(' + input.toLowerCase() + ')').split(' ').join(')?(');
                  return RegExp(str || '').test(option.children.toLowerCase());
                }
                }
                placeholder="Chọn kho nhập"
                onSelect={onChange("khoId")}
              >
                {khoOption}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Số hóa đơn"
              name="soHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số hóa đơn!",
                },
                // {
                //   max: 20,
                //   message: "Vui lòng nhập mã nguồn người bệnh không quá 20 ký tự!",
                // },
                {
                  whitespace: true,
                  message: "Vui lòng nhập số hóa đơn!",
                },
              ]}
              initialValue={thongTinPhieuNhap?.soHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập số hóa đơn"
                onBlur={onBlur("soHoaDon")}
                onChange={onChange("soHoaDon")}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Ký hiệu hóa đơn"
              name="kyHieuHoaDon"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.kyHieuHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập ký hiệu hóa đơn"
                onChange={onChange("kyHieuHoaDon")}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Ngày hóa đơn"
              name="ngayHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày hóa đơn!",
                },
              ]}
              initialValue={moment(thongTinPhieuNhap?.ngayHoaDon)}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Vui lòng chọn ngày hóa đơn"
                format="DD / MM / YYYY"
                // onBlur={onBlur("ngayHoaDon")}
                onChange={(e) => {
                  onBlur("ngayHoaDon")(e);
                  onChange("ngayHoaDon")(e);
                }}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Số hợp đồng"
              name="soHopDong"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.soHopDong}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập số hợp đồng"
                onChange={onChange("soHopDong")}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label={(
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quyet-dinh-thau")}
                >
                  Quyết định thầu
                </div>
              )}
              name="quyetDinhThauId"
              rules={[]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.quyetDinhThauId}
            >
              <Select
                allowClear
                showSearch
                disabled={thongTinPhieuNhap.id}
                placeholder="Vui lòng chọn quyết định thầu"
                onSelect={onChange("quyetDinhThauId")}
                onClear={
                  () => {
                    setState({ quyetDinhThauId: "", nguonNhapKhoId: "" });
                    updateData({
                      thongTinPhieuNhap: {
                        ...thongTinPhieuNhap,
                        "quyetDinhThauId": null,
                      }
                    })
                  }
                }
              >
                {listQuyetDinhThau?.map((item, index) => (
                  <Option key={index} value={item?.id}>
                    {item?.quyetDinhThau}
                  </Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label={(
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
                >
                  Nguồn nhập kho
                </div>
              )}
              name="nguonNhapKhoId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nguồn nhập kho",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.nguonNhapKhoId}
            >
              <Select
                allowClear
                showSearch
                onChange={onChange("nguonNhapKhoId")}
                placeholder="Vui lòng chọn nguồn nhập kho"
              >
                {listNguonNhapKho?.map((item, index) => (
                  <Option key={index} value={item?.id}>
                    {item?.ten}
                  </Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label={(
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/hinh-thuc-nhap-xuat")}
                >
                  Hình thức nhập
                </div>
              )}
              name="hinhThucNhapXuatId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hình thức nhập xuất",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.hinhThucNhapXuatId}
            >
              <Select
                allowClear
                showSearch
                onChange={onChange("hinhThucNhapXuatId")}
                placeholder="Vui lòng chọn hình thức nhập"
              >
                {listHinhThucNhapXuat?.map((item, index) => (
                  <Option key={index} value={item?.id}>
                    {item?.ten}
                  </Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Ghi chú"
              name="ghiChu"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.ghiChu}
            >
              <Input.TextArea
                onChange={onChange("ghiChu")}
                rows={3}
                className="input-option"
                placeholder="Vui lòng nhập ghi chú"
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Loại nhập xuất"
              name="loaiNhapXuat"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại nhập xuất",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={state?.loaiNhapXuat}
              hidden
            >
              <Select
                onChange={onChange("loaiNhapXuat")}
                allowClear
                showSearch
                placeholder="Vui lòng chọn loại nhâp xuất"
              >
                {/* {listHinhThucNhapXuat?.map((item, index) => (
                  <Option key={index} value={item?.id}>
                    {item?.ten}
                  </Option>
                ))} */}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <div className="action">
              <button
                className="button-cancel"
                onClick={onSave(true)}
              >
                Lưu và gửi duyệt
              </button>
              <button
                className="button-ok"
                onClick={onSave(false)}
              >
                Lưu
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Main>
  );
};

export default connect(
  (state) => ({
    auth: state.auth.auth,
    nhanVienHienTai: state.nhanVien.nhanVienHienTai,
    listQuyetDinhThau: state.quyetDinhThau.listQuyetDinhThau || [],
    listNguonNhapKho: state.nguonNhapKho.listData || [],
    listHinhThucNhapXuat: state.hinhThucNhapXuat.listHinhThucNhapXuat || [],
    hoaDonBiTrung: state.phieuNhap.hoaDonBiTrung,
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
    listKhoUser: state.kho.listKhoUser || [],
    khoHienTai: state.kho.currentItem,
    listDataNhanVienKho: state.nhanVienKho.listData || [],
  }),
  ({
    nhanVien: { searchId: searchNhanVienById },
    quyetDinhThau: { searchQuyetDinhThau },
    phieuNhap: { updateData, kiemTraSoHoaDon },
    nguonNhapKho: { onSearch: searchNguonNhapKho },
    hinhThucNhapXuat: { getListHinhThucNhapXuat: searchHinhThucNhapXuat },
    kho: { searchById: searchKhoById, getTheoTaiKhoan },
    nhanVienKho: { onSearch: onSearchNhanVienKho }
  }) => ({
    searchNhanVienById,
    searchQuyetDinhThau,
    searchNguonNhapKho,
    searchHinhThucNhapXuat,
    kiemTraSoHoaDon,
    updateData,
    searchKhoById,
    getTheoTaiKhoan,
    onSearchNhanVienKho
  }),
  null,
  { forwardRef: true }
)(forwardRef(CreateOrUpdate));
