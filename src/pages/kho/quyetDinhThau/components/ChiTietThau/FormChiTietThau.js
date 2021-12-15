import React, { forwardRef, useImperativeHandle, useState, useMemo } from "react";
import { Checkbox, Input, Form, InputNumber } from "antd";
import { Select } from "components";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { connect } from "react-redux"
import { openInNewTab } from "utils";

const FormQuyetDinhThau = ({
  handleSubmit,
  onCancel,
  dataSort,
  ...props }, ref) => {
  const [form] = Form.useForm();
  const formRef = React.useRef();
  const [dataEdit, setDataEdit] = useState(null);
  const [loaiDichVu, setLoaiDichVu] = useState(null);
  const [loaiDichVuThau, setLoaiDichVuThau] = useState(null);
  const [showField, setShowField] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
      return Promise.reject(new Error('Không được phép nhập SL >120% SL thầu'))
  }

  const onSave = (e) => {
    form.submit();
  };

  const handleSumitForm = (values) => {
    handleSubmit(values);
  }

  const handleErrors = (errors) => {
    console.log('errors: ', errors);
  }

  return (
    <>
      <EditWrapper
        title="Thông tin chi tiết"
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
            label="Dịch vụ"
            name="dichVuId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn dịch vụ!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn dịch vụ"
              data={loaiDichVu ? dataDichVu.filter((e) => e.loaiDichVu === loaiDichVu) : dataDichVu}
              onChange={(value, option) => onChangeField("dichVu", value, option)}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Quyết định thầu"
            name="quyetDinhThauId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập quyết định thầu!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn quyết định thầu"
              data={disabled ? props.listAllQuyetDinhThau : props.listAllQuyetDinhThau.filter((e) => (e.trangThai === 10 && (e.loaiDichVu === loaiDichVuThau || !loaiDichVuThau)))}
              ten="quyetDinhThau"
              onChange={(value, option) => onChangeField("quyetDinhThau", value, option)}
              disabled={disabled}

            />
          </Form.Item>
          <Form.Item
            label="SL thầu"
            name="soLuongThau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập SL thầu!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập SL thầu"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("soLuongThau", value)}
            />
          </Form.Item>
          <Form.Item
            label="SL được phép mua"
            name="soLuongDuocPhepMua"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập SL được phép mua!",
              },
              {

                validator: validateSoLuong
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập SL được phép mua"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Giá nhập sau VAT"
            name="giaNhapSauVat"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá nhập sau VAT!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập giá nhập sau VAT"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá không BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá không BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập giá không BH"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("giaKhongBaoHiem", value)}
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá BH"
            name="giaBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập giá BH"
              min={0}
              disabled={disabled}
              onChange={(value) => onChangeField("giaBaoHiem", value)}
            />
          </Form.Item>
          <Form.Item
            label="Phụ thu"
            name="giaPhuThu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng phụ thu"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Quy cách"
            name="quyCach"
            rules={[
              {
                required: true,
                message: "Vui lòng giá BH!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập quy cách"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nhà cung cấp"
            name="nhaCungCapId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà cung cấp!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhà cung cấp"
              data={props.listNhaCungCap}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Mã gói thầu"
            name="goiThau"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn mã gói thầu!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn mã gói thầu"
              data={props.listGoiThau}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Số visa"
            name="soVisa"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số visa!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập số visa"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nhóm thầu"
            name="nhomThau"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm thầu!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm thầu"
              data={props.listNhomThau}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nhóm chi phí"
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm chi phí!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm chi phí"
              data={props.listNhomChiPhi}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Tỷ lệ thanh toán BH"
            name="tyLeBhTt"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tỷ lệ thanh toán BH!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập tỷ lệ thanh toán BH"
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Ngưỡng thầu"
            name="nguongThau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngưỡng thầu!",
              },
            ]}
          >
            <InputNumber
              className="input-option"
              placeholder="Vui lòng nhập ngưỡng thầu"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Loại thuốc"
            name="loaiThuoc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại thuốc!",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn loại thuốc"
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
                Nước sản xuất
              </div>
            )}
            name="xuatXuId"
          >
            <Select
              placeholder="Vui lòng chọn nước sản xuất"
              data={props.listXuatXu}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Nhà sản xuất"
            name="nhaSanXuatId"
          >
            <Select
              placeholder="Vui lòng chọn nhà sản xuất"
              data={props.listNhaSanXuat}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            label="Trần bảo hiểm"
            name="tranBaoHiem"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="Số hợp đồng"
            name="soHopDong"
          >
            <Input
              disabled={disabled}
              className="input-option"
              placeholder="Vui lòng nhập số hợp đồng"
            />
          </Form.Item>
          <Form.Item
            label="Giá trần"
            name="giaTran"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          {showField && <Form.Item
            label="Đường dùng"
            name="tenDuongDung"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>}
          {showField && <Form.Item
            label="Mã hoạt chất"
            name="hoatChatId"
          >
            <Select
              data={props.listHoatChat}
              disabled
              className="input-option"
            />
          </Form.Item>}
          {showField && <Form.Item
            label="Hàm lượng"
            name="hamLuong"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>}
          <Form.Item
            label="Mã DV"
            name="ma"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="Năm"
            name="nam"
          >
            <Input
              disabled
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="Đơn vị tính"
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
              <Checkbox disabled={disabled}>Có hiệu lực</Checkbox>
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
