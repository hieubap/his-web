import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import { Form, Input, InputNumber, Checkbox } from "antd";
import { connect } from "react-redux";
import { LOAI_DICH_VU } from "constants/index";
import { InputNumberFormat } from "components/common";
import { openInNewTab } from "utils";
import { normalizeNumber } from "../../../../utils";
import { checkRole } from "app/Sidebar/constant";
function FormServiceInfo({ hiddenField = [], optionalField = [], ...props }) {
  const {
    listHoatChat,
    listNhomThuoc,
    listPhanNhomThuoc,
    listPhanLoaiThuoc,
    listDonViSoCap,
    listXuatXu,
    listNSX,
    listNCC,
    listnhomChiPhiBh,
    listNguonKhacChiTra,
    listNhomDvCap1,
    listNhomDvCap2,
    listNhomDvCap3,
    currentItem,
    listDuongDung,
  } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCurrentItem(currentItem);
    if (currentItem && Object.keys(currentItem).length <= 0) {
      form.resetFields();
    }
  }, [currentItem]);

  const loadCurrentItem = (danhMucThuoc) => {
    if (danhMucThuoc) {
      const {
        dichVu: {
          ma,
          ten,
          donViTinhId: dvtThuCapId,
          khongTinhTien,
          dsNguonKhacChiTra,
          nhomChiPhiBh,
          tyLeBhTt,
          tyLeTtDv,
          maTuongDuong,
          tenTuongDuong,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          duongDungId,
        } = {},
        active,
        id,
        giaNhapSauVat,
        giaTran,
        tranBaoHiem,
      } = danhMucThuoc || {};
      const data = {
        id,
        ma,
        ten,
        khongTinhTien,
        dsNguonKhacChiTra,
        nhomChiPhiBh,
        tyLeBhTt,
        tyLeTtDv,
        dvtThuCapId,
        maTuongDuong,
        tenTuongDuong,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        duongDungId,
        active,
        giaNhapSauVat,
        giaTran,
        tranBaoHiem,
        ...danhMucThuoc,
        heSoDinhMuc: danhMucThuoc?.heSoDinhMuc || 1,
      };
      console.log("danhMucThuoc", data);
      form.setFieldsValue(data);
      setState({
        data: data,
      });
    } else {
      form.resetFields();

      setState({
        data: null,
      });
    }
  };
  // const onAddNewRow = () => {
  //   loadCurrentItem({});
  // };

  const onCancel = () => {
    loadCurrentItem(currentItem);
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          ma,
          ten,
          active,
          maTuongDuong,
          dsNguonKhacChiTra,
          nhomChiPhiBh,
          tyLeBhTt,
          tyLeTtDv,
          dvtThuCapId,
          tenTuongDuong,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          khongTinhTien,
          ...rest
        } = values;
        values = {
          dichVu: {
            ten,
            ma,
            maTuongDuong,
            tenTuongDuong,
            nhomChiPhiBh,
            dsNguonKhacChiTra,
            tyLeBhTt,
            tyLeTtDv,
            donViTinhId: dvtThuCapId,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            khongTinhTien,
            loaiDichVu: LOAI_DICH_VU.THUOC,
          },

          active,
          ...rest,
          giaNhapSauVat:
            normalizeNumber(rest.giaNhapSauVat) != "undefined"
              ? normalizeNumber(rest.giaNhapSauVat)
              : null,
          giaTran:
            normalizeNumber(rest.giaTran) != "undefined"
              ? normalizeNumber(rest.giaTran)
              : null,
          tranBaoHiem:
            normalizeNumber(rest.tranBaoHiem) != "undefined"
              ? normalizeNumber(rest.tranBaoHiem)
              : null,
          id: state.data?.id,
        };
        props.createOrEdit(values).then(() => {
          if (state.data?.id) {
            return;
          }
          form.resetFields();
        });
      })
      .catch((error) => {});
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);
  console.log("form", form);
  return (
    <EditWrapper
      title="Thông tin gói dịch vụ"
      onCancel={onCancel}
      onSave={onSave}
      showAdded={false}
      // isShowSaveButton={true}
      // isShowCancelButton={true}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={editStatus}
      isHiddenButtonAdd={true}
      forceShowButtonSave={
        (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
        false
      }
      forceShowButtonCancel={
        (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
        false
      }
    >
      {/* <fieldset disabled={!props.roleSave && !editStatus}> */}
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        className="form-custom"
        initialValues={{ heSoDinhMuc: 1 }}
      >
        <Form.Item
          label="Mã thuốc"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng mã thuốc",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã thuốc không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng mã thuốc",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={true}
            className="input-option"
            placeholder="Vui lòng mã thuốc"
          />
        </Form.Item>
        <Form.Item
          label="Tên thuốc"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thuốc!",
            },
            {
              max: 200,
              message: "Vui lòng nhập tên thuốc không quá 200 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập tên thuốc!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên thuốc"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/hoat-chat")}
            >
              Mã hoạt chất
            </div>
          }
          name="hoatChatId"
        >
          <Select
            data={listHoatChat.map((item) => ({ id: item.id, ten: item.ma }))}
            placeholder="Chọn mã hoạt chất"
          />
        </Form.Item>
        <Form.Item label="Tên hoạt chất" name="tenHoatChat">
          <Input className="input-option" placeholder="Nhập tên hoạt chất" />
        </Form.Item>
        <Form.Item label="Hàm lượng" name="hamLuong">
          <Input className="input-option" placeholder="Nhập hàm lượng" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-thuoc")}
            >
              Nhóm thuốc
            </div>
          }
          name="nhomDvKhoCap1Id"
        >
          <Select data={listNhomThuoc} placeholder="Chọn mã nhóm thuốc" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phan-nhom-thuoc")}
            >
              Phân nhóm thuốc
            </div>
          }
          name="phanNhomDvKhoId"
        >
          <Select data={listPhanNhomThuoc} placeholder="Chọn phân nhóm thuốc" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phan-loai-thuoc")}
            >
              Phân loại thuốc
            </div>
          }
          name="phanLoaiDvKhoId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phân loại thuốc",
            },
          ]}
        >
          <Select data={listPhanLoaiThuoc} placeholder="Chọn phân loại thuốc" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
            >
              Đơn vị sơ cấp
            </div>
          }
          name="dvtSoCapId"
        >
          <Select data={listDonViSoCap} placeholder="Chọn đơn vị sơ cấp" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
            >
              Đơn vị thứ cấp
            </div>
          }
          name="dvtThuCapId"
        >
          <Select data={listDonViSoCap} placeholder="Chọn đơn vị thứ cấp" />
        </Form.Item>
        <Form.Item
          label="Hệ số định mức"
          name="heSoDinhMuc"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập hệ số định mức!",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "Vui lòng nhập hệ số định mức lớn hơn 0",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            maxLength={10}
            className="input-option"
            placeholder="Nhập hệ số định mức"
          />
        </Form.Item>
        <Form.Item label="Quy cách" name="quyCach">
          <Input className="input-option" placeholder="Nhập quy cách" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/xuat-xu")}
            >
              Nước sản xuất
            </div>
          }
          name="xuatXuId"
        >
          <Select data={listXuatXu} placeholder="Chọn nước sản xuất" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
            >
              Nhà sản xuất
            </div>
          }
          name="nhaSanXuatId"
        >
          <Select data={listNSX} placeholder="Chọn nhà sản xuất" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
            >
              Nhà cung cấp
            </div>
          }
          name="nhaCungCapId"
        >
          <Select data={listNCC} placeholder="Chọn nhà cung cấp" />
        </Form.Item>
        <Form.Item label="Giá nhập sau VAT" name="giaNhapSauVat">
          <InputNumberFormat
            className="input-option"
            placeholder="Nhập giá nhập sau VAT"
          />
        </Form.Item>
        {!hiddenField.includes("giaTran") && (
          <Form.Item label="Giá trần" name="giaTran">
            <InputNumberFormat
              className="input-option"
              placeholder="Nhập giá trần"
            />
          </Form.Item>
        )}
        {!hiddenField.includes("tranBaoHiem") && (
          <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
            <InputNumberFormat
              className="input-option"
              placeholder="Nhập trần bảo hiểm"
            />
          </Form.Item>
        )}
        <Form.Item
          label="Tỷ lệ BH thanh toán"
          name="tyLeBhTt"
          rules={[
            {
              pattern: new RegExp(/^.{1,3}$/),
              message: "Vui lòng nhập tỷ lệ BH thanh toán không quá 3 ký tự!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập tỷ lệ BH thanh toán"
          />
        </Form.Item>
        <Form.Item
          label="Tỷ lệ thanh toán dịch vụ"
          name="tyLeTtDv"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tỷ lệ thanh toán dịch vụ!",
            },
            {
              pattern: new RegExp(/^[0-9]{1,3}$/),
              message: "Vui lòng nhập tỷ lệ BH thanh toán không quá 3 ký tự!",
            },
          ]}
        >
          <Input
            type="number"
            className="input-option"
            placeholder="Tỷ lệ thanh toán dịch vụ"
          />
        </Form.Item>
        <Form.Item
          label="Nhóm chi phí"
          name="nhomChiPhiBh"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhóm chi phí",
            },
          ]}
        >
          <Select data={listnhomChiPhiBh} placeholder="Chọn nhóm chi phí" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
            >
              Nhóm dịch vụ cấp I
            </div>
          }
          name="nhomDichVuCap1Id"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn dịch vụ cấp I",
            },
          ]}
        >
          <Select data={listNhomDvCap1} placeholder="Chọn nhóm dịch vụ cấp I" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
            >
              Nhóm dịch vụ cấp II
            </div>
          }
          name="nhomDichVuCap2Id"
          rules={
            optionalField.includes("nhomDichVuCap2Id")
              ? []
              : [
                  {
                    required: true,
                    message: "Vui lòng chọn dịch vụ cấp II",
                  },
                ]
          }
        >
          <Select
            data={listNhomDvCap2}
            placeholder="Chọn nhóm dịch vụ cấp II"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
            >
              Nhóm dịch vụ cấp III
            </div>
          }
          name="nhomDichVuCap3Id"
        >
          <Select
            data={listNhomDvCap3}
            placeholder="Chọn nhóm dịch vụ cấp IIII"
          />
        </Form.Item>
        {!hiddenField.includes("maTuongDuong") && (
          <Form.Item label="Mã tương đương" name="maTuongDuong">
            <Input className="input-option" placeholder="Nhập mã tương đương" />
          </Form.Item>
        )}
        <Form.Item label="Tên tương đương" name="tenTuongDuong">
          <Input className="input-option" placeholder="Nhập tên tương đương" />
        </Form.Item>
        <Form.Item label="Số visa" name="soVisa">
          <Input className="input-option" placeholder="Nhập số visa" />
        </Form.Item>
        <Form.Item label="Mã liên thông" name="maLienThong">
          <Input className="input-option" placeholder="Nhập mã liên thông" />
        </Form.Item>
        <Form.Item label="Nguồn khác chi trả" name="dsNguonKhacChiTra">
          <Select
            mode="multiple"
            data={listNguonKhacChiTra}
            placeholder="Nguồn chi trả khác"
          />
        </Form.Item>
        <Form.Item label="Đường dùng" name="duongDungId">
          <Select placeholder="Đường dùng" data={listDuongDung} />
        </Form.Item>
        <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
          <Checkbox>Không tính tiền</Checkbox>
        </Form.Item>
        {currentItem && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
      </Form>
      {/* </fieldset> */}
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    danhMucThuoc: { currentItem },
  } = state;
  return { currentItem };
};

const mapDispatchToProps = ({ danhMucThuoc: { createOrEdit } }) => ({
  createOrEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceInfo);
