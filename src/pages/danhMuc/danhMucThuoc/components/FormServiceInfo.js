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
      title="Th??ng tin g??i d???ch v???"
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
          label="M?? thu???c"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui l??ng m?? thu???c",
            },
            {
              max: 20,
              message: "Vui l??ng nh???p m?? thu???c kh??ng qu?? 20 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng m?? thu???c",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            autoFocus={true}
            className="input-option"
            placeholder="Vui l??ng m?? thu???c"
          />
        </Form.Item>
        <Form.Item
          label="T??n thu???c"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n thu???c!",
            },
            {
              max: 200,
              message: "Vui l??ng nh???p t??n thu???c kh??ng qu?? 200 k?? t???!",
            },
            {
              whitespace: true,
              message: "Vui l??ng nh???p t??n thu???c!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p t??n thu???c"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/hoat-chat")}
            >
              M?? ho???t ch???t
            </div>
          }
          name="hoatChatId"
        >
          <Select
            data={listHoatChat.map((item) => ({ id: item.id, ten: item.ma }))}
            placeholder="Ch???n m?? ho???t ch???t"
          />
        </Form.Item>
        <Form.Item label="T??n ho???t ch???t" name="tenHoatChat">
          <Input className="input-option" placeholder="Nh???p t??n ho???t ch???t" />
        </Form.Item>
        <Form.Item label="H??m l?????ng" name="hamLuong">
          <Input className="input-option" placeholder="Nh???p h??m l?????ng" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-thuoc")}
            >
              Nh??m thu???c
            </div>
          }
          name="nhomDvKhoCap1Id"
        >
          <Select data={listNhomThuoc} placeholder="Ch???n m?? nh??m thu???c" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phan-nhom-thuoc")}
            >
              Ph??n nh??m thu???c
            </div>
          }
          name="phanNhomDvKhoId"
        >
          <Select data={listPhanNhomThuoc} placeholder="Ch???n ph??n nh??m thu???c" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/phan-loai-thuoc")}
            >
              Ph??n lo???i thu???c
            </div>
          }
          name="phanLoaiDvKhoId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n ph??n lo???i thu???c",
            },
          ]}
        >
          <Select data={listPhanLoaiThuoc} placeholder="Ch???n ph??n lo???i thu???c" />
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
          <Select data={listDonViSoCap} placeholder="Ch???n ????n v??? s?? c???p" />
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
          <Select data={listDonViSoCap} placeholder="Ch???n ????n v??? th??? c???p" />
        </Form.Item>
        <Form.Item
          label="H??? s??? ?????nh m???c"
          name="heSoDinhMuc"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p h??? s??? ?????nh m???c!",
            },
            {
              pattern: new RegExp(/^[1-9][0-9]*$/),
              message: "Vui l??ng nh???p h??? s??? ?????nh m???c l???n h??n 0",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            maxLength={10}
            className="input-option"
            placeholder="Nh???p h??? s??? ?????nh m???c"
          />
        </Form.Item>
        <Form.Item label="Quy c??ch" name="quyCach">
          <Input className="input-option" placeholder="Nh???p quy c??ch" />
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
        <Form.Item label="Gi?? nh???p sau VAT" name="giaNhapSauVat">
          <InputNumberFormat
            className="input-option"
            placeholder="Nh???p gi?? nh???p sau VAT"
          />
        </Form.Item>
        {!hiddenField.includes("giaTran") && (
          <Form.Item label="Gi?? tr???n" name="giaTran">
            <InputNumberFormat
              className="input-option"
              placeholder="Nh???p gi?? tr???n"
            />
          </Form.Item>
        )}
        {!hiddenField.includes("tranBaoHiem") && (
          <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
            <InputNumberFormat
              className="input-option"
              placeholder="Nh???p tr???n b???o hi???m"
            />
          </Form.Item>
        )}
        <Form.Item
          label="T??? l??? BH thanh to??n"
          name="tyLeBhTt"
          rules={[
            {
              pattern: new RegExp(/^.{1,3}$/),
              message: "Vui l??ng nh???p t??? l??? BH thanh to??n kh??ng qu?? 3 k?? t???!",
            },
          ]}
        >
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
            {
              pattern: new RegExp(/^[0-9]{1,3}$/),
              message: "Vui l??ng nh???p t??? l??? BH thanh to??n kh??ng qu?? 3 k?? t???!",
            },
          ]}
        >
          <Input
            type="number"
            className="input-option"
            placeholder="T??? l??? thanh to??n d???ch v???"
          />
        </Form.Item>
        <Form.Item
          label="Nh??m chi ph??"
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
              Nh??m d???ch v??? c???p I
            </div>
          }
          name="nhomDichVuCap1Id"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n d???ch v??? c???p I",
            },
          ]}
        >
          <Select data={listNhomDvCap1} placeholder="Ch???n nh??m d???ch v??? c???p I" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
            >
              Nh??m d???ch v??? c???p II
            </div>
          }
          name="nhomDichVuCap2Id"
          rules={
            optionalField.includes("nhomDichVuCap2Id")
              ? []
              : [
                  {
                    required: true,
                    message: "Vui l??ng ch???n d???ch v??? c???p II",
                  },
                ]
          }
        >
          <Select
            data={listNhomDvCap2}
            placeholder="Ch???n nh??m d???ch v??? c???p II"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
            >
              Nh??m d???ch v??? c???p III
            </div>
          }
          name="nhomDichVuCap3Id"
        >
          <Select
            data={listNhomDvCap3}
            placeholder="Ch???n nh??m d???ch v??? c???p IIII"
          />
        </Form.Item>
        {!hiddenField.includes("maTuongDuong") && (
          <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
            <Input className="input-option" placeholder="Nh???p m?? t????ng ??????ng" />
          </Form.Item>
        )}
        <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
          <Input className="input-option" placeholder="Nh???p t??n t????ng ??????ng" />
        </Form.Item>
        <Form.Item label="S??? visa" name="soVisa">
          <Input className="input-option" placeholder="Nh???p s??? visa" />
        </Form.Item>
        <Form.Item label="M?? li??n th??ng" name="maLienThong">
          <Input className="input-option" placeholder="Nh???p m?? li??n th??ng" />
        </Form.Item>
        <Form.Item label="Ngu???n kh??c chi tr???" name="dsNguonKhacChiTra">
          <Select
            mode="multiple"
            data={listNguonKhacChiTra}
            placeholder="Ngu???n chi tr??? kh??c"
          />
        </Form.Item>
        <Form.Item label="???????ng d??ng" name="duongDungId">
          <Select placeholder="???????ng d??ng" data={listDuongDung} />
        </Form.Item>
        <Form.Item label=" " name="khongTinhTien" valuePropName="checked">
          <Checkbox>Kh??ng t??nh ti???n</Checkbox>
        </Form.Item>
        {currentItem && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>C?? hi???u l???c</Checkbox>
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
