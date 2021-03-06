import React, { forwardRef, useImperativeHandle, useState, useMemo, useEffect, useRef } from "react";
import { Checkbox, Input, Form, InputNumber } from "antd";
import { Select } from "components";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { connect, useDispatch } from "react-redux"
import { openInNewTab } from "utils";

const FormQuyetDinhThau = ({
  handleSubmit,
  onCancel,
  dataSort,
  layerId,
  ...props }, ref) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const [loaiDichVu, setLoaiDichVu] = useState(null);
  const [loaiDichVuThau, setLoaiDichVuThau] = useState(null);
  const [showField, setShowField] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refClickBtnSave = useRef();
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
  }, []);

  useImperativeHandle(ref, () => ({
    setfields: (data) => {
      if (data?.info?.id) {
        form.setFieldsValue(data?.info);
        setDataEdit(data?.info);
        setShowField(data?.info?.dichVu.loaiDichVu === 90 || data?.info?.dichVu.loaiDichVu === 110);
        setLoaiDichVuThau(data?.info?.dichVu.loaiDichVu);
        let trangThai = data?.info?.quyetDinhThau?.trangThai;
        setDisabled(trangThai && trangThai !== 10);
      } else {
        form.resetFields();
        setDataEdit(null);
        setDisabled(false);
        setLoaiDichVu(null);
        setLoaiDichVuThau(null);
      }
    },
    resetFields: (data) => {
      form.resetFields();
      setDataEdit(null);
      setDisabled(false);
      setLoaiDichVu(null);
      setLoaiDichVuThau(null);
    },
  }), []);

  const dataDichVu = useMemo(() => {
    return props.listDichVuKho.map((item, index) => item.dichVu);
  }, [props.listDichVuKho]);

  const onChangeField = (fieldName, value, option) => {
    if ("dichVu" === fieldName) {
      let loaiDV = option?.lists.loaiDichVu || null;
      if (loaiDV !== loaiDichVuThau) {
        setLoaiDichVuThau(loaiDV);
        form.setFieldsValue({ quyetDinhThauId: null });
      }
      if (value) {
        const dichVu = props.listDichVuKho.find((item) => item.id === value);
        form.setFieldsValue({
          giaNhap: dichVu.giaNhap,
          giaNhapSauVat: dichVu.giaNhapSauVat,
          giaKhongBaoHiem: dichVu.dichVu.giaKhongBaoHiem,
          giaBaoHiem: dichVu.dichVu.giaBaoHiem,
          giaPhuThu: Number(dichVu.dichVu.giaKhongBaoHiem) - Number(dichVu.dichVu.giaBaoHiem),
          quyCach: dichVu.quyCach,
          nhaCungCapId: dichVu.nhaCungCapId,
          soVisa: dichVu.soVisa,
          tyLeBhTt: dichVu.dichVu.tyLeBhTt,
          // nuocSanXuatId: dichVu.nuocSanXuatId,
          xuatXuId: dichVu.xuatXuId,
          nhaSanXuatId: dichVu.nhaSanXuatId,
          tranBaoHiem: dichVu.tranBaoHiem,
          hamLuong: dichVu.hamLuong,
          hoatChatId: dichVu.hoatChatId,
          donViTinhId: dichVu.dichVu.donViTinhId,
          ma: dichVu.dichVu.ma,
          maKyHieu: dichVu.maKyHieu,
          tenDuongDung: dichVu.duongDung?.ten,
          giaTran: dichVu.giaTran
        })
        setShowField(dichVu.dichVu.loaiDichVu === 90 || dichVu.dichVu.loaiDichVu === 110);
      } else {
        setLoaiDichVuThau(null);
      }
    }

    if ("quyetDinhThau" === fieldName) {
      let loaiDV = option?.lists.loaiDichVu || null;
      setLoaiDichVu(loaiDV);
      setShowField(loaiDV === 90 || loaiDV === 110);
      form.setFieldsValue({ "nam": option?.lists.nam });
    }

    if ("soLuongThau" === fieldName) {
      form.setFieldsValue({ soLuongDuocPhepMua: value });
    }

    if ("giaKhongBaoHiem" === fieldName || "giaBaoHiem" === fieldName) {
      let giaKhongBaoHiem = form.getFieldValue("giaKhongBaoHiem") || 0;
      let giaBaoHiem = form.getFieldValue("giaBaoHiem") || 0;
      form.setFieldsValue({ giaPhuThu: Number(giaKhongBaoHiem) - Number(giaBaoHiem) });
    }
  }
  const validateSoLuong = async (rule, value) => {
    if (value > form.getFieldValue("soLuongThau") * 1.2)
      return Promise.reject(new Error('Kh??ng ???????c ph??p nh???p SL >120% SL th???u'))
  }

  const onSave = (e) => {
    form.submit();
  };
  refClickBtnSave.current = onSave;

  const handleSumitForm = (values) => {
    handleSubmit(values);
  }

  const handleErrors = (errors) => {
    console.log('errors: ', errors);
  }

  return (
    <>
      <EditWrapper
        title="Th??ng tin chi ti???t"
        onCancel={onCancel}
        onSave={onSave}
        showAdded={false}
        isShowSaveButton={true}
        isShowCancelButton={true}
      >
        <Form
          ref={formRef}
          form={form}
          layout="vertical"
          onFinish={handleSumitForm}
          onError={handleErrors}
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="D???ch v???"
            name="dichVuId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n d???ch v???!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n d???ch v???"
              data={loaiDichVu ? dataDichVu.filter((e) => e.loaiDichVu === loaiDichVu) : dataDichVu}
              onChange={(value, option) => onChangeField("dichVu", value, option)}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Quy???t ?????nh th???u"
            name="quyetDinhThauId"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p quy???t ?????nh th???u!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n quy???t ?????nh th???u"
              data={disabled ? props.listAllQuyetDinhThau : props.listAllQuyetDinhThau.filter((e) => (e.trangThai === 10 && (e.loaiDichVu === loaiDichVuThau || !loaiDichVuThau)))}
              ten="quyetDinhThau"
              onChange={(value, option) => onChangeField("quyetDinhThau", value, option)}
              disabled={disabled}

            />
          </Form.Item>
          <Form.Item
            label="SL th???u"
            name="soLuongThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p SL th???u!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p SL th???u"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("soLuongThau", value)}
            />
          </Form.Item>
          <Form.Item
            label="SL ???????c ph??p mua"
            name="soLuongDuocPhepMua"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p SL ???????c ph??p mua!",
              },
              {

                validator: validateSoLuong
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p SL ???????c ph??p mua"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Gi?? nh???p sau VAT"
            name="giaNhapSauVat"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p gi?? nh???p sau VAT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p gi?? nh???p sau VAT"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="????n gi?? kh??ng BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p gi?? kh??ng BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p gi?? kh??ng BH"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("giaKhongBaoHiem", value)}
            />
          </Form.Item>
          <Form.Item
            label="????n gi?? BH"
            name="giaBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p gi?? BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p gi?? BH"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("giaBaoHiem", value)}
            />
          </Form.Item>
          <Form.Item
            label="Ph??? thu"
            name="giaPhuThu"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p gi?? BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng ph??? thu"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Quy c??ch"
            name="quyCach"
            rules={[
              {
                required: true,
                message: "Vui l??ng gi?? BH!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p quy c??ch"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nh?? cung c???p"
            name="nhaCungCapId"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh?? cung c???p!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh?? cung c???p"
              data={props.listNhaCungCap}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="M?? g??i th???u"
            name="goiThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n m?? g??i th???u!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n m?? g??i th???u"
              data={props.listGoiThau}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="S??? visa"
            name="soVisa"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p s??? visa!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p s??? visa"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nh??m th???u"
            name="nhomThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m th???u!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m th???u"
              data={props.listNhomThau}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nh??m chi ph??"
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m chi ph??!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m chi ph??"
              data={props.listNhomChiPhi}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="T??? l??? thanh to??n BH"
            name="tyLeBhTt"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??? l??? thanh to??n BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p t??? l??? thanh to??n BH"
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Ng?????ng th???u"
            name="nguongThau"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ng?????ng th???u!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui l??ng nh???p ng?????ng th???u"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Lo???i thu???c"
            name="loaiThuoc"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n lo???i thu???c!",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n lo???i thu???c"
              data={props.listLoaiThuocThau}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label={(
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/xuat-xu")}
              >
                N?????c s???n xu???t
              </div>
            )}
            name="xuatXuId"
          >
            <Select
              placeholder="Vui l??ng ch???n n?????c s???n xu???t"
              data={props.listXuatXu}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nh?? s???n xu???t"
            name="nhaSanXuatId"
          >
            <Select
              placeholder="Vui l??ng ch???n nh?? s???n xu???t"
              data={props.listNhaSanXuat}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Tr???n b???o hi???m"
            name="tranBaoHiem"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="S??? h???p ?????ng"
            name="soHopDong"
          >
            <Input
              disabled={disabled}
              className="input-option"
              placeholder="Vui l??ng nh???p s??? h???p ?????ng"
            />
          </Form.Item>
          <Form.Item
            label="Gi?? tr???n"
            name="giaTran"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          {showField && <Form.Item
            label="???????ng d??ng"
            name="tenDuongDung"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>}
          {showField && <Form.Item
            label="M?? ho???t ch???t"
            name="hoatChatId"
          >
            <Select
              data={props.listHoatChat}
              disabled
              className="input-option"
            />
          </Form.Item>}
          {showField && <Form.Item
            label="H??m l?????ng"
            name="hamLuong"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>}
          <Form.Item
            label="M?? DV"
            name="ma"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="N??m"
            name="nam"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="????n v??? t??nh"
            name="donViTinhId"
          >
            <Select
              data={props.listAllDonViTinh}
              disabled
              className="input-option"
            />
          </Form.Item>
          {dataEdit && (
            <Form.Item label=" " name="active" valuePropName="checked">
              <Checkbox disabled={disabled}>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
        </Form>
      </EditWrapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau,
    listDichVuKho: state.dichVuKho.listDichVuKho,
    listNhaSanXuat: state.nhaSanXuat.listNSX,
    listNhaCungCap: state.nhaSanXuat.listNCC,
    // listAllQuocGia: state.ttHanhChinh.listAllQuocGia,
    listXuatXu: state.xuatXu.listXuatXu || [],
    listGoiThau: state.utils.listGoiThau,
    listNhomThau: state.utils.listNhomThau,
    listNhomChiPhi: state.utils.listNhomChiPhiBh,
    listLoaiThuoc: state.utils.listLoaiThuoc,
    listtrangThaiThau: state.utils.listtrangThaiThau,
    listLoaiThuocThau: state.utils.listLoaiThuocThau,
    listAllKhoa: state.khoa.listAllKhoa,
    dataSort: state.nguonNhapKho.dataSortColumns,
    listAllDonViTinh: state.donViTinh.listAllDonViTinh,
    listHoatChat: state.hoatChat.listHoatChat
  };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(FormQuyetDinhThau)
);
