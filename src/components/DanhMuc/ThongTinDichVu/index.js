import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { InputNumberFormat } from "components/common";
import InputBlockString from "../inputBlockString";
import { formatKetQuaThamChieu } from "../utils";
import { openInNewTab } from "../../../utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
function FormServiceInfo(props, ref) {
  const { currentItem, layerId, refCallbackSave = {} } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    form.resetFields();
    loadCurrentItem(currentItem);
  }, [currentItem]);
  useEffect(() => {
    props.getUtils({ name: "nhomChiPhiBh" });
    props.getUtils({ name: "gioiTinh" });
    props.getUtils({ name: "doiTuongSuDung" });
    props.getUtils({ name: "loaiMau" });
    // props.getListChuyenKhoa({});
    props.getListTongHopChuyenKhoa({});
    // props.getListDonViTinh({});
    props.getListDonViTinhTongHop({});
    // props.getAllDichVuCap1();
    // props.getAllDichVuCap2();
    // props.getAllDichVuCap3();
    props.getAllTongHopDichVuCap1();
    props.getAllTongHopDichVuCap2();
    props.getAllTongHopDichVuCap3();
  }, []);

  const [form] = Form.useForm();

  const loadCurrentItem = (goiDichVu) => {
    if (goiDichVu) {
      const {
        dichVu: {
          donViTinhId,
          dsNguonKhacChiTra,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          khongTinhTien,
          ma,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          ten,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
        } = {},
        id,
        phieuChiDinhId,
        chuyenKhoaId,
        dsDoiTuongSuDung,
        gioiTinh,
        hanCheKhoaChiDinh,
        ngayCongBo,
        soNgaySuDung,
        maKetNoi,
        tiepDonCls,
        quyetDinh,
        loaiMau,
        theTich,
        phiVanChuyen,
        active,
        ketQuaLau,
        phanLoaiPTTT,
        yeuCauBenhPham,
        chiSoNuCao,
        chiSoNuThap,
        chiSoNamCao,
        chiSoNamThap,
        loaiKetQua,
        ketQuaThamChieu,
        covid,
      } = goiDichVu || {};
      const data = {
        id,
        donViTinhId,
        giaBaoHiem,
        giaKhongBaoHiem,
        giaPhuThu,
        khongTinhTien,
        covid,
        ma,
        maTuongDuong,
        nhomChiPhiBh,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        ten,
        tenTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        chuyenKhoaId,
        phieuChiDinhId,
        dsDoiTuongSuDung: dsDoiTuongSuDung || [],
        gioiTinh,
        hanCheKhoaChiDinh,
        ngayCongBo: (ngayCongBo && moment(ngayCongBo)) || null,
        quyetDinh,
        maKetNoi,
        soNgaySuDung,
        tiepDonCls,
        loaiMau,
        theTich,
        phiVanChuyen,
        active: active !== undefined ? active : true,
        phanLoaiPTTT,
        ketQuaLau,
        yeuCauBenhPham,
        chiSoNuCao,
        chiSoNuThap,
        chiSoNamCao,
        chiSoNamThap,
        ketQuaThamChieu: formatKetQuaThamChieu(loaiKetQua, ketQuaThamChieu),
        loaiKetQua,
      };
      form.setFieldsValue(data);
      setState({
        data: data,
      });
      if (props.loaiDichVu === 20) {
        setState({
          loaiKetQuaXN: loaiKetQua,
        });
      }
    } else {
      form.resetFields();
      form.setFieldsValue({ phiVanChuyen: true });
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
    form.setFieldsValue({ phiVanChuyen: true });
  };

  const onCancel = () => {
    if (currentItem?.id) {
      loadCurrentItem({ ...currentItem });
    } else {
      loadCurrentItem({});
      form.resetFields();
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          donViTinhId,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          khongTinhTien,
          covid,
          ma,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          ten,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
          dsNguonKhacChiTra,
          chuyenKhoaId,
          phieuChiDinhId,
          dsDoiTuongSuDung,
          gioiTinh,
          hanCheKhoaChiDinh,
          ngayCongBo,
          quyetDinh,
          tiepDonCls,
          loaiMau,
          theTich,
          active,
          phiVanChuyen,
          soNgaySuDung,
          maKetNoi,
          ketQuaLau,
          phanLoaiPTTT,
          yeuCauBenhPham,
          chiSoNuCao,
          chiSoNuThap,
          chiSoNamCao,
          chiSoNamThap,
          ketQuaThamChieu,
          loaiKetQua,
        } = values;
        values = {
          dichVu: {
            donViTinhId,
            dsNguonKhacChiTra: dsNguonKhacChiTra || [],
            giaBaoHiem: giaBaoHiem?.toString().replaceAll(".", "") || null,
            giaKhongBaoHiem:
              giaKhongBaoHiem?.toString().replaceAll(".", "") || null,
            giaPhuThu: giaPhuThu?.toString().replaceAll(".", "") || null,
            khongTinhTien,
            ma,
            maTuongDuong,
            nhomChiPhiBh,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            ten,
            tenTuongDuong,
            tyLeBhTt,
            tyLeTtDv,
            loaiDichVu: props.loaiDichVu,
          },
          loaiMau,
          theTich,
          active,
          phiVanChuyen,
          chuyenKhoaId,
          phieuChiDinhId,
          dsDoiTuongSuDung,
          gioiTinh,
          hanCheKhoaChiDinh,
          ngayCongBo: (ngayCongBo && ngayCongBo.format("YYYY-MM-DD")) || null,
          quyetDinh,
          tiepDonCls,
          soNgaySuDung,
          maKetNoi,
          ketQuaLau,
          yeuCauBenhPham,
          phanLoaiPTTT,
          chiSoNuCao,
          chiSoNuThap,
          chiSoNamCao,
          chiSoNamThap,
          id: state.data?.id,
          loaiKetQua,
          covid,
          ketQuaThamChieu: formatKetQuaThamChieu(
            loaiKetQua,
            ketQuaThamChieu,
            "save"
          ),
        };
        props.createOrEdit(values, props.loaiDichVu).then(() => {
          if (state.data?.id) {
            return;
          }
          form.resetFields();
          form.setFieldsValue({ phiVanChuyen: true });
        });
      })
      .catch((error) => {});
  };
  refCallbackSave.current = onSave;
  const renderKetQuaThamChieu = useCallback(() => {
    switch (state.loaiKetQuaXN) {
      case 10:
        return (
          <InputBlockString
            placeholder="Vui lòng nhập kết quả tham chiếu"
            style={{ width: "100%" }}
          />
        );
      case 20:
        return (
          <Select
            placeholder="Vui lòng nhập kết quả tham chiếu"
            mode="tags"
          ></Select>
        );
      case 30:
        return (
          <Select
            placeholder="Chọn kết quả tham chiếu"
            data={[
              { id: "-1", ten: "Âm tính" },
              { id: "1", ten: "Dương tính" },
            ]}
          />
        );
      default:
        return (
          <Input placeholder="Vui lòng nhập kết quả tham chiếu" disabled />
        );
    }
  }, [state.loaiKetQuaXN]);
  const refAutoFocus = useRef(null);
  // useEffect(() => {
  //   // console.log("aaa", refAutoFocus.current.focus());
  //   console.log("refAutoFocus.current", refAutoFocus.current);
  // }, [currentItem]);
  // console.log("currentItem", currentItem);
  return (
    <EditWrapper
      title="Thông tin dịch vụ"
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      // isShowSaveButton={state.data}
      // isShowCancelButton={state.data}
      // showAdded={!state.data}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={editStatus}
      forceShowButtonSave={checkRole(props.roleEdit) && true}
      forceShowButtonCancel={checkRole(props.roleEdit) && true}
      // showAdded={false}
      // isShowSaveButton={true}
      // isShowCancelButton={true}
      isHiddenButtonAdd={true}
      layerId={layerId}
    >
      <fieldset disabled={props.editStatus}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="Mã dịch vụ"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã dịch vụ!",
              },
              {
                max: 20,
                message: "Vui lòng nhập mã dịch vụ không quá 20 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập mã dịch vụ!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              className="input-option"
              placeholder="Vui lòng nhập mã dịch vụ"
            />
          </Form.Item>
          <Form.Item
            label="Tên dịch vụ"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
              {
                max: 1000,
                message: "Vui lòng nhập tên dịch vụ không quá 1000 ký tự!",
              },
              {
                whitespace: true,
                message: "Vui lòng nhập tên dịch vụ!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên dịch vụ "
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá không BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đơn giá không BH!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui lòng nhập đơn giá không BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Đơn giá BH" name="giaBaoHiem">
            <InputNumberFormat
              placeholder="Vui lòng nhập đơn giá BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item label="Phụ thu" name="giaPhuThu">
            <InputNumberFormat
              placeholder="Vui lòng nhập Phụ thu"
              className="input-option"
            />
          </Form.Item>
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
            <InputBlockString
              placeholder="Vui lòng nhập tỷ lệ BH thanh toán"
              maxLength={3}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Tỷ lệ thanh toán DV"
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tỷ lệ thanh toán DV!",
              },
              {
                pattern: new RegExp(/^.{1,3}$/),
                message: "Vui lòng nhập tỷ lệ thanh toán DV không quá 3 ký tự!",
              },
            ]}
          >
            <InputBlockString
              placeholder="Vui lòng nhập tỷ lệ thanh toán DV"
              maxLength={3}
              style={{ width: "100%" }}
            />
          </Form.Item>
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Loại kết quả" name="loaiKetQua">
              <Select
                data={props.listloaiKetQuaXetNghiem}
                placeholder="Vui lòng chọn loại kết quả"
                onChange={(e, item) => {
                  setState({ loaiKetQuaXN: e });
                  if (e === 20) {
                    form.setFieldsValue({
                      ketQuaThamChieu: [],
                    });
                  } else {
                    form.setFieldsValue({
                      ketQuaThamChieu: null,
                    });
                  }
                }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Kết quả tham chiếu" name="ketQuaThamChieu">
              {renderKetQuaThamChieu()}
            </Form.Item>
          )}
          {[120].includes(props.loaiDichVu) && (
            <>
              <Form.Item
                label="Loại máu"
                name="loaiMau"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại máu!",
                  },
                ]}
              >
                <Select
                  data={props.listloaiMau || []}
                  placeholder="Chọn loại máu"
                />
              </Form.Item>
            </>
          )}
          {[120].includes(props.loaiDichVu) && (
            <>
              <Form.Item label="Thể tích" name="theTich">
                <InputBlockString
                  placeholder="Nhập thể tích"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
          {[120].includes(props.loaiDichVu) && (
            <Form.Item label="Số ngày sử dụng" name="soNgaySuDung">
              <InputBlockString
                placeholder="Vui lòng nhập số ngày sử dụng"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[10, 20, 30].includes(props.loaiDichVu) && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                >
                  Chuyên khoa
                </div>
              }
              name="chuyenKhoaId"
            >
              <Select
                data={props.listAllChuyenKhoa}
                placeholder="Vui lòng chọn chuyên khoa"
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/bao-cao")}
                >
                  Tên báo cáo
                </div>
              }
              name="phieuChiDinhId"
            >
              <Select
                data={props.listAllBaoCao}
                placeholder="Vui lòng chọn tên báo cáo"
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Chỉ số nữ thấp" name="chiSoNuThap">
              <InputNumber
                type="number"
                placeholder="Vui lòng nhập chỉ số nữ thấp"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Chỉ số nữ cao" name="chiSoNuCao">
              <InputNumber
                type="number"
                placeholder="Vui lòng nhập chỉ số nữ cao"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Chỉ số nam thấp" name="chiSoNamThap">
              <InputNumber
                type="number"
                placeholder="Vui lòng nhập chỉ số nam thấp"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Chỉ số nam cao" name="chiSoNamCao">
              <InputNumber
                type="number"
                placeholder="Vui lòng nhập chỉ số nam cao"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          <Form.Item
            label={
              // TODO: phan loai nhom theo chi phi cua bhyt
              <div
              // className="pointer"
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
            <Select
              placeholder="Vui lòng chọn nhóm chi phí"
              data={props.listnhomChiPhiBh}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ĐVT
              </div>
            }
            name="donViTinhId"
          >
            <Select
              data={props.listAllDonViTinh}
              placeholder="Vui lòng chọn đơn vị tính"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                Nhóm DV Cấp 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dịch vụ cấp 1",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 1"
              data={props.listAllNhomDichVuCap1}
              onChange={(e) => {
                if (e) {
                  props.getAllDichVuCap2({ nhomDichVuCap1Id: e });
                } else {
                  props.getAllDichVuCap2();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
              >
                Nhóm DV Cấp 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhóm dịch vụ cấp 2",
              },
            ]}
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 2"
              data={props.listAllNhomDichVuCap2}
              onChange={(e) => {
                if (e) {
                  props.getAllDichVuCap3({ nhomDichVuCap2Id: e });
                } else {
                  props.getAllDichVuCap3();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Nhóm DV Cấp 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              placeholder="Vui lòng chọn nhóm dịch vụ cấp 3"
              data={props.listAllNhomDichVuCap3}
            />
          </Form.Item>
          <Form.Item label="Mã tương đương" name="maTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập mã tương đương"
            />
          </Form.Item>
          <Form.Item label="Tên tương đương" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui lòng nhập tên tương đương"
            />
          </Form.Item>
          {[120].includes(props.loaiDichVu) && (
            <Form.Item name="phiVanChuyen" valuePropName="checked">
              <Checkbox>Chi phí vận chuyển</Checkbox>
            </Form.Item>
          )}
          {[10, 20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item label="Giới tính" name="gioiTinh">
              <Select
                data={props.listgioiTinh}
                placeholder="Vui lòng chọn giới tính"
              />
            </Form.Item>
          )}
          {[10, 20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item label="Trường hợp kê DV" name="dsDoiTuongSuDung">
              <Select
                data={props.listdoiTuongSuDung}
                placeholder="Vui lòng chọn trường hợp kê DV"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
          )}
          {[30].includes(props.loaiDichVu) && (
            <Form.Item name="tiepDonCls" valuePropName="checked">
              <Checkbox>Tiếp đón CLS</Checkbox>
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item
              label="Mã số quyết định"
              name="quyetDinh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã số quyết định",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập mã số quyết định"
              />
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item
              label="Ngày quyết định"
              name="ngayCongBo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày quyết định",
                },
              ]}
            >
              <DatePicker
                className="input-option"
                placeholder="Vui lòng chọn ngày quyết định"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          )}
          {[40].includes(props.loaiDichVu) && (
            <Form.Item label="Phân loại PTTT" name="phanLoaiPTTT">
              <Select
                data={props.listdoiTuongSuDung}
                placeholder="Phân loại PTTT"
                mode="multiple"
              />
            </Form.Item>
          )}
          <Form.Item label="Nguồn khác chi trả" name="dsNguonKhacChiTra">
            <Select
              data={props.listnguonKhacChiTra}
              placeholder="Vui lòng chọn nguồn chi trả khác"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>
          {[20, 30].includes(props.loaiDichVu) && (
            <Form.Item label="Mã gửi LIS/PACS" name="maKetNoi">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập mã gửi LIS/PACS"
              />
            </Form.Item>
          )}
          {[20, 30].includes(props.loaiDichVu) && (
            <Form.Item valuePropName="checked" name="ketQuaLau">
              <Checkbox>DV có kết quả lâu</Checkbox>
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item valuePropName="checked" name="yeuCauBenhPham">
              <Checkbox>Yêu cầu bệnh phẩm </Checkbox>
            </Form.Item>
          )}
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Không tính tiền</Checkbox>
          </Form.Item>
          {[10, 20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item name="hanCheKhoaChiDinh" valuePropName="checked">
              <Checkbox>Hạn chế khoa chỉ định</Checkbox>
            </Form.Item>
          )}
          <Form.Item name="covid" valuePropName="checked">
            <Checkbox>Dùng cho Covid</Checkbox>
          </Form.Item>
          {state.data?.id && (
            <Form.Item name="active" valuePropName="checked">
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
    chuyenKhoa: { listAllChuyenKhoa },
    donViTinh: { listAllDonViTinh = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
    utils: {
      listgioiTinh = [],
      listnhomChiPhiBh = [],
      listnguonKhacChiTra = [],
      listdoiTuongSuDung = [],
      listloaiMau = [],
      listloaiKetQuaXetNghiem = [],
    },
    baoCao: { listAllData: listAllBaoCao = [] },
  } = state;

  return {
    listnhomChiPhiBh,
    listnguonKhacChiTra,
    listdoiTuongSuDung,
    listgioiTinh,
    listAllDonViTinh,
    listAllChuyenKhoa,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    listloaiMau,
    listloaiKetQuaXetNghiem,
    listAllBaoCao,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: { createOrEdit },
  utils: { getUtils },
  donViTinh: { getListDonViTinh, getListDonViTinhTongHop },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2, getAllTongHopDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3, getAllTongHopDichVuCap3 },
  chuyenKhoa: { getListChuyenKhoa, getListTongHopChuyenKhoa },
}) => ({
  getListChuyenKhoa,
  getUtils,
  createOrEdit,
  getListDonViTinh,
  getListDonViTinhTongHop,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListTongHopChuyenKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(FormServiceInfo));
