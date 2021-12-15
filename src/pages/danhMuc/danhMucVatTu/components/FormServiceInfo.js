import React, { useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, InputNumber } from "antd";
import { connect } from "react-redux";
import { LOAI_DICH_VU } from "constants/index";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
function FormServiceInfo(props) {
  // const [state, _setState] = useState({});
  // const setState = (data = {}) => {
  //   _setState((state) => {
  //     return { ...state, ...data };
  //   });
  // };

  const {
    listNhomVatTu,
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
  } = props;
  useEffect(() => {
    loadCurrentItem(currentItem);
  }, [currentItem]);

  const [form] = Form.useForm();

  const loadCurrentItem = (itemVatTu) => {
    if (itemVatTu) {
      const {
        dichVu: {
          ma,
          ten,
          donViTinhId: dvtThuCapId,
          dsNguonKhacChiTra,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          tyLeBhTt,
          tyLeTtDv,
          maTuongDuong,
          tenTuongDuong,
          nhomChiPhiBh,
          khongTinhTien,
        } = {},
        active,
        id,
      } = itemVatTu || {};
      const data = {
        id,
        ma,
        ten,
        dvtThuCapId,
        dsNguonKhacChiTra,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        maTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        tenTuongDuong,
        nhomChiPhiBh,
        khongTinhTien,
        active,
        ...itemVatTu,
      };
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
  };

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
          dvtThuCapId: donViTinhId,
          dsNguonKhacChiTra,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
          active,
          khongTinhTien,
          ...rest
        } = values;
        const data = {
          dichVu: {
            ten,
            ma,
            donViTinhId,
            dsNguonKhacChiTra,
            maTuongDuong,
            nhomChiPhiBh,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            tenTuongDuong,
            tyLeBhTt,
            tyLeTtDv,
            khongTinhTien,
            loaiDichVu: LOAI_DICH_VU.VAT_TU,
          },
          active,
          ...rest,
          id: currentItem?.id,
        };
        props.createOrEdit(data).then((res) => {
          if (currentItem?.id) {
            props.updateData({ currentItem: { ...res } });
          } else {
            form.resetFields();
          }
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
  return (
    <EditWrapper
      title="Thông tin vật tư"
      onCancel={onCancel}
      onSave={onSave}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={props.editStatus}
      showAdded={false}
      forceShowButtonSave={
        (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
        false
      }
      forceShowButtonCancel={
        (props?.currentItemRowParent && checkRole(props.roleEdit) && true) ||
        false
      }
      isHiddenButtonAdd={true}
    >
      <fieldset disabled={props.editStatus}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="Mã vật tư"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã vật tư!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã vật tư không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã vật tư!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui lòng nhập mã vật tư"
            />
          </Form.Item>
          <Form.Item
            label="Tên vật tư"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên vật tư!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên vật tư không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên vật tư!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên vật tư"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-vat-tu")}
              >
                Nhóm vật tư
              </div>
            }
            name="nhomDvKhoCap1Id"
          >
            <Select placeholder="Chọn nhóm vật tư" data={listNhomVatTu} />
          </Form.Item>
          <Form.Item label="Mã ký hiệu - Tên thương mại" name="maKyHieu">
            <Input className="input-option" placeholder="Nhập mã ký hiệu" />
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
            <Select placeholder="Chọn đơn vị sơ cấp" data={listDonViSoCap} />
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
            <Select placeholder="Chọn đơn vị thứ cấp" data={listDonViSoCap} />
          </Form.Item>
          <Form.Item
            label="Hệ số định mức"
            name="heSoDinhMuc"
            initialValue={1}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hệ số định mức!",
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Nhập hệ số định mức"
            />
          </Form.Item>
          <Form.Item label="Thông số kỹ thuật" name="thongSoKyThuat">
            <Input
              style={{ width: "100%" }}
              placeholder="Nhập thông số kỹ thuật"
            />
          </Form.Item>
          <Form.Item label="Quy cách" name="quyCach">
            <Input style={{ width: "100%" }} placeholder="Nhập quy cách" />
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
          <Form.Item label="Giá nhập" name="giaNhap">
            <Input className="input-option" placeholder="Nhập giá nhập" />
          </Form.Item>
          <Form.Item label="Giá trần" name="giaTran">
            <Input className="input-option" placeholder="Nhập giá trần" />
          </Form.Item>
          <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
            <Input className="input-option" placeholder="Nhập trần bảo hiểm" />
          </Form.Item>
          <Form.Item label="Tỷ lệ BH thanh toán" name="tyLeBhTt">
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
            ]}
          >
            <Input
              className="input-option"
              placeholder="Tỷ lệ thanh toán dịch vụ"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
              // TODO: phan loai theo chi phi bhyt
              // onClick={() => openInNewTab("/danh-muc/nhom-dich-vu")}
              >
                Nhóm chi phí
              </div>
            }
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
                Nhóm dịch vụ cấp 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn dịch vụ cấp 1",
              },
            ]}
          >
            <Select
              data={listNhomDvCap1}
              placeholder="Chọn nhóm dịch vụ cấp 1"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
              >
                Nhóm dịch vụ cấp 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn dịch vụ cấp 2",
              },
            ]}
          >
            <Select
              data={listNhomDvCap2}
              placeholder="Chọn nhóm dịch vụ cấp 2"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Nhóm dịch vụ cấp 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              data={listNhomDvCap3}
              placeholder="Chọn nhóm dịch vụ cấp 3"
            />
          </Form.Item>
          <Form.Item label="Mã tương đương" name="maTuongDuong">
            <Input className="input-option" placeholder="Nhập mã tương đương" />
          </Form.Item>
          <Form.Item label="Tên tương đương" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Nhập tên tương đương"
            />
          </Form.Item>
          <Form.Item label="Nguồn chi trả khác" name="dsNguonKhacChiTra">
            <Select
              data={listNguonKhacChiTra}
              placeholder="Chọn nguồn chi trả khác"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label=" " name="vatTuBo" valuePropName="checked">
            <Checkbox>Vật tư bộ</Checkbox>
          </Form.Item>
          <Form.Item
            label=" "
            name="vatTuTheoKichThuoc"
            valuePropName="checked"
          >
            <Checkbox>Vật tư theo kích thước</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="kyThuatCao" valuePropName="checked">
            <Checkbox>Kỹ thuật cao</Checkbox>
          </Form.Item>

          <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
            <Checkbox>Không tính tiền</Checkbox>
          </Form.Item>
          {currentItem &&
            currentItem.constructor === Object &&
            Object.keys(currentItem).length > 0 && (
              <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>Có hiệu lực</Checkbox>
              </Form.Item>
            )}
        </Form>
      </fieldset>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    danhMucVatTu: { currentItem },
  } = state;
  return {
    currentItem,
  };
};

const mapDispatchToProps = ({
  danhMucVatTu: { createOrEdit, updateData },
  utils: { getUtils },
}) => ({ createOrEdit, updateData });

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceInfo);
