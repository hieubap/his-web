import React, { useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, InputNumber } from "antd";
import { connect } from "react-redux";
import { LOAI_DICH_VU } from "constants/index";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
function FormServiceInfo({ hiddenField = [], optionalField = [], ...props }) {
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
      title="Th??ng tin v???t t??"
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
            label="M?? v???t t??"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? v???t t??!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? v???t t?? kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? v???t t??!",
              },
            ]}
          >
            <Input
              ref={refAutoFocus}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? v???t t??"
            />
          </Form.Item>
          <Form.Item
            label="T??n v???t t??"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n v???t t??!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n v???t t?? kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n v???t t??!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n v???t t??"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-vat-tu")}
              >
                Nh??m v???t t??
              </div>
            }
            name="nhomDvKhoCap1Id"
          >
            <Select placeholder="Ch???n nh??m v???t t??" data={listNhomVatTu} />
          </Form.Item>
          <Form.Item label="M?? k?? hi???u - T??n th????ng m???i" name="maKyHieu">
            <Input className="input-option" placeholder="Nh???p m?? k?? hi???u" />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ????n v??? s?? c???p
              </div>
            }
            name="dvtSoCapId"
          >
            <Select placeholder="Ch???n ????n v??? s?? c???p" data={listDonViSoCap} />
          </Form.Item>

          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ????n v??? th??? c???p
              </div>
            }
            name="dvtThuCapId"
          >
            <Select placeholder="Ch???n ????n v??? th??? c???p" data={listDonViSoCap} />
          </Form.Item>
          <Form.Item
            label="H??? s??? ?????nh m???c"
            name="heSoDinhMuc"
            initialValue={1}
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p h??? s??? ?????nh m???c!",
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Nh???p h??? s??? ?????nh m???c"
            />
          </Form.Item>
          <Form.Item label="Th??ng s??? k??? thu???t" name="thongSoKyThuat">
            <Input
              style={{ width: "100%" }}
              placeholder="Nh???p th??ng s??? k??? thu???t"
            />
          </Form.Item>
          <Form.Item label="Quy c??ch" name="quyCach">
            <Input style={{ width: "100%" }} placeholder="Nh???p quy c??ch" />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/xuat-xu")}
              >
                N?????c s???n xu???t
              </div>
            }
            name="xuatXuId"
          >
            <Select data={listXuatXu} placeholder="Ch???n n?????c s???n xu???t" />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
              >
                Nh?? s???n xu???t
              </div>
            }
            name="nhaSanXuatId"
          >
            <Select data={listNSX} placeholder="Ch???n nh?? s???n xu???t" />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
              >
                Nh?? cung c???p
              </div>
            }
            name="nhaCungCapId"
          >
            <Select data={listNCC} placeholder="Ch???n nh?? cung c???p" />
          </Form.Item>
          <Form.Item label="Gi?? nh???p" name="giaNhap">
            <Input className="input-option" placeholder="Nh???p gi?? nh???p" />
          </Form.Item>
          {!hiddenField.includes("giaTran") && (
            <Form.Item label="Gi?? tr???n" name="giaTran">
              <Input className="input-option" placeholder="Nh???p gi?? tr???n" />
            </Form.Item>
          )}
          <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
            <Input className="input-option" placeholder="Nh???p tr???n b???o hi???m" />
          </Form.Item>
          <Form.Item label="T??? l??? BH thanh to??n" name="tyLeBhTt">
            <Input
              className="input-option"
              placeholder="Nh???p t??? l??? BH thanh to??n"
            />
          </Form.Item>
          <Form.Item
            label="T??? l??? thanh to??n d???ch v???"
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??? l??? thanh to??n d???ch v???!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="T??? l??? thanh to??n d???ch v???"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
              // TODO: phan loai theo chi phi bhyt
              // onClick={() => openInNewTab("/danh-muc/nhom-dich-vu")}
              >
                Nh??m chi ph??
              </div>
            }
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m chi ph??",
              },
            ]}
          >
            <Select data={listnhomChiPhiBh} placeholder="Ch???n nh??m chi ph??" />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                Nh??m d???ch v??? c???p 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n d???ch v??? c???p 1",
              },
            ]}
          >
            <Select
              data={listNhomDvCap1}
              placeholder="Ch???n nh??m d???ch v??? c???p 1"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
              >
                Nh??m d???ch v??? c???p 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={
              optionalField.includes("nhomDichVuCap2Id")
                ? []
                : [
                    {
                      required: true,
                      message: "Vui l??ng ch???n d???ch v??? c???p 2",
                    },
                  ]
            }
          >
            <Select
              data={listNhomDvCap2}
              placeholder="Ch???n nh??m d???ch v??? c???p 2"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Nh??m d???ch v??? c???p 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              data={listNhomDvCap3}
              placeholder="Ch???n nh??m d???ch v??? c???p 3"
            />
          </Form.Item>
          <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
            <Input className="input-option" placeholder="Nh???p m?? t????ng ??????ng" />
          </Form.Item>
          <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Nh???p t??n t????ng ??????ng"
            />
          </Form.Item>
          <Form.Item label="Ngu???n chi tr??? kh??c" name="dsNguonKhacChiTra">
            <Select
              data={listNguonKhacChiTra}
              placeholder="Ch???n ngu???n chi tr??? kh??c"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item label=" " name="vatTuBo" valuePropName="checked">
            <Checkbox>V???t t?? b???</Checkbox>
          </Form.Item>
          <Form.Item
            label=" "
            name="vatTuTheoKichThuoc"
            valuePropName="checked"
          >
            <Checkbox>V???t t?? theo k??ch th?????c</Checkbox>
          </Form.Item>
          <Form.Item label=" " name="kyThuatCao" valuePropName="checked">
            <Checkbox>K??? thu???t cao</Checkbox>
          </Form.Item>

          <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
            <Checkbox>Kh??ng t??nh ti???n</Checkbox>
          </Form.Item>
          {currentItem &&
            currentItem.constructor === Object &&
            Object.keys(currentItem).length > 0 && (
              <Form.Item label=" " name="active" valuePropName="checked">
                <Checkbox>C?? hi???u l???c</Checkbox>
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
