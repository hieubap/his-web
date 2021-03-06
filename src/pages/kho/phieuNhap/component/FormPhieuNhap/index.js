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
          `G??i th???u ???? h???t hi???u l???c ng??y ${moment(
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
  // kho theo nh??n vi??n hi???n t???i v?? active
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
        <b>Th??ng tin phi???u nh???p</b>
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
                  Kho nh???p
                </div>
              )}
              name="khoId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n kho nh???p!",
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
                placeholder="Ch???n kho nh???p"
                onSelect={onChange("khoId")}
              >
                {khoOption}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="S??? h??a ????n"
              name="soHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p s??? h??a ????n!",
                },
                // {
                //   max: 20,
                //   message: "Vui l??ng nh???p m?? ngu???n ng?????i b???nh kh??ng qu?? 20 k?? t???!",
                // },
                {
                  whitespace: true,
                  message: "Vui l??ng nh???p s??? h??a ????n!",
                },
              ]}
              initialValue={thongTinPhieuNhap?.soHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p s??? h??a ????n"
                onBlur={onBlur("soHoaDon")}
                onChange={onChange("soHoaDon")}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="K?? hi???u h??a ????n"
              name="kyHieuHoaDon"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.kyHieuHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p k?? hi???u h??a ????n"
                onChange={onChange("kyHieuHoaDon")}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Ng??y h??a ????n"
              name="ngayHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n ng??y h??a ????n!",
                },
              ]}
              initialValue={moment(thongTinPhieuNhap?.ngayHoaDon)}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Vui l??ng ch???n ng??y h??a ????n"
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
              label="S??? h???p ?????ng"
              name="soHopDong"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.soHopDong}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p s??? h???p ?????ng"
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
                  Quy???t ?????nh th???u
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
                placeholder="Vui l??ng ch???n quy???t ?????nh th???u"
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
                  Ngu???n nh???p kho
                </div>
              )}
              name="nguonNhapKhoId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n ngu???n nh???p kho",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.nguonNhapKhoId}
            >
              <Select
                allowClear
                showSearch
                onChange={onChange("nguonNhapKhoId")}
                placeholder="Vui l??ng ch???n ngu???n nh???p kho"
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
                  H??nh th???c nh???p
                </div>
              )}
              name="hinhThucNhapXuatId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n h??nh th???c nh???p xu???t",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieuNhap?.hinhThucNhapXuatId}
            >
              <Select
                allowClear
                showSearch
                onChange={onChange("hinhThucNhapXuatId")}
                placeholder="Vui l??ng ch???n h??nh th???c nh???p"
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
              label="Ghi ch??"
              name="ghiChu"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieuNhap?.ghiChu}
            >
              <Input.TextArea
                onChange={onChange("ghiChu")}
                rows={3}
                className="input-option"
                placeholder="Vui l??ng nh???p ghi ch??"
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="Lo???i nh???p xu???t"
              name="loaiNhapXuat"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n lo???i nh???p xu???t",
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
                placeholder="Vui l??ng ch???n lo???i nh??p xu???t"
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
                L??u v?? g???i duy???t
              </button>
              <button
                className="button-ok"
                onClick={onSave(false)}
              >
                L??u
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
