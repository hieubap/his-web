import { Form, Row, Col, TimePicker, Checkbox, Button, Input } from "antd";
import { Select } from "components";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { DATA_TIME_QMS } from "constants/index";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IcCreate from "assets/images/kho/IcCreate2.png";
import IcSave from "assets/images/kho/save.png";
import { Main, ModalStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Carousel from "components/Carousel";
import { useHistory } from "react-router-dom";
import IcClose from "assets/images/qms/icClose.png";

const Modal = (props, ref) => {
  const history = useHistory();
  const formatHour = "HH:mm";
  const refVideo = useRef(null);
  const [state, _setState] = useState({
    value: [],
    data: [],
    currentIndex: -1,
  });

  const {
    phong: { listRoom  },
    khoa: { listKhoa },
    utils: { listTrangThaiHienThi },
    nhanVien: { listNhanVien, listBacSi, listDieuDuong },
    template: { listTemplate },
    kiosk: { dataSearch },
    thietLap: { dataBAC_SI, dataKY_THUAT_Y, dataDIEU_DUONG, dataY_TA },
    vanBang: { listVanBang },
  } = useSelector((state) => state);
  const {
    phong: { getListPhong },
    khoa: { getListKhoa },
    utils: { getUtils },
    nhanVien: {
      getListNhanVien,
      getListNhanVienTongHop,
      getListDieuDuong,
      getListBacSi,
    },
    kiosk: { createOrEdit, postVideo, updateData },
    template: { onChangeInputSearch },
    thietLap: { getThietLap },
    kiosk: { getById: getByIdKiosk },
    vanBang: { searchVanBangTongHop },
  } = useDispatch();

  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setState({ show: true, currentItem: item, currentData: item });
    },
  }));
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const [form] = Form.useForm();

  const renderTime = () => {
    return DATA_TIME_QMS.map((item, index) => {
      return (
        <Col span={6} key={index} style={{ paddingLeft: "0px" }}>
          <Form.Item
            style={{ paddingLeft: "0px" }}
            rules={[
              {
                required: false,
                message: "Vui l??ng ch???n th???i gian l??m vi???c!",
              },
            ]}
            label={item.title}
            name={item.value}
          >
            <TimePicker
              placeholder={item.title}
              format="HH:mm"
              popupClassName="popup-time-picker"
            />
          </Form.Item>
        </Col>
      );
    });
  };
  useEffect(() => {
    getListKhoa({});
    getListPhong({ loaiPhong: dataSearch?.loaiQms });
    getListNhanVienTongHop({});
    onChangeInputSearch({ loaiQms: dataSearch?.loaiQms, active: true });
    getUtils({ name: "TrangThaiHienThi" });
    getUtils({ name: "loaiQms" });
    getThietLap({ ma: "BAC_SI" });
    getThietLap({ ma: "KY_THUAT_Y" });
    getThietLap({ ma: "DIEU_DUONG" });
    getThietLap({ ma: "Y_TA" });
    searchVanBangTongHop({});
  }, []);

  useEffect(() => {
    let data = (listTrangThaiHienThi || []).map((item) => {
      return { name: item?.id, isactive: true };
    });
    setState({ dataTable: data });
  }, [listTrangThaiHienThi]);

  useEffect(() => {
    if (dataKY_THUAT_Y || dataBAC_SI) {
      let bacSi = listVanBang?.filter(
        (x) => x.ma == dataKY_THUAT_Y || x.ma == dataBAC_SI
      );
      let bacSiIds = bacSi.map((x) => x.id);
      if (bacSiIds?.length) getListBacSi({ dsVanBangId: bacSiIds });
    }
  }, [listVanBang, dataBAC_SI, dataKY_THUAT_Y]);

  useEffect(() => {
    if (dataDIEU_DUONG || dataY_TA) {
      let dieuDuong = listVanBang?.filter(
        (x) => x.ma == dataDIEU_DUONG || x.ma == dataY_TA
      );
      let dieuDuongIds = dieuDuong.map((x) => x.id);
      if (dieuDuongIds?.length) getListDieuDuong({ dsVanBangId: dieuDuongIds });
    }
  }, [listVanBang, dataDIEU_DUONG, dataY_TA]);

  const onChangeInput = (key, index) => (e) => {
    state.dataTable[index][key] = e.target.checked;
  };

  useEffect(() => {
    loadCurrentItem(state.currentItem);
  }, [state.currentItem, state.show]);

  const loadCurrentItem = (item) => {
    if (item) {
      const {
        mac,
        khoaId,
        dieuDuongId,
        ten,
        dsBacSiId,
        hoTroId,
        phongId,
        thoiGianChieuDen,
        thoiGianChieuTu,
        thoiGianSangDen,
        thoiGianSangTu,
        dsVideo,
        dsTrangThai,
        id,
        mauQmsId,
        loaiQms,
      } = item || {};
      const data = {
        mac,
        khoaId,
        dieuDuongId,
        ten,
        dsBacSiId,
        hoTroId,
        phongId: phongId || dataSearch?.phongId,
        dsVideo,
        thoiGianChieuDen: thoiGianChieuDen
          ? moment(thoiGianChieuDen, formatHour)
          : null,
        thoiGianChieuTu: thoiGianChieuTu
          ? moment(thoiGianChieuTu, formatHour)
          : null,
        thoiGianSangDen: thoiGianSangDen
          ? moment(thoiGianSangDen, formatHour)
          : null,
        thoiGianSangTu: thoiGianSangTu
          ? moment(thoiGianSangTu, formatHour)
          : null,
        id,
        mauQmsId,
      };
      let bacSi = listNhanVien.filter((x) => dsBacSiId.includes(x.id));
      setState({
        currentId: id,
        currentIndex: -1,
        fileName: dsVideo?.map((item) => {
          return item?.split("/").pop();
        }),
        dataTable: (listTrangThaiHienThi || []).map((item) => {
          return { name: item?.id, isactive: dsTrangThai.includes(item?.id) };
        }),
        video: dsVideo,
        bacSi,
        loaiQms,
      });
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldsValue({ phongId: dataSearch?.phongId });
    }
  };

  const onRow = (record = {}, index) => {
    if (record.name == 10 || record.name == 20 || record.name == 60)
      return null;
    return {
      onClick: (event) => {
        setState({ currentIndex: index });
      },
    };
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="T??n tr?????ng tr??n MH Kiosk" />,
      width: 200,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (item) => {
        return (listTrangThaiHienThi || []).find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Hi???n th???" />,
      width: 50,
      dataIndex: "isactive",
      key: "isactive",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Checkbox
              onChange={onChangeInput("isactive", index)}
              defaultValue={item}
            ></Checkbox>
          );
        } else {
          return <Checkbox checked={item}></Checkbox>;
        }
      },
    },
  ];
  const onCancel = () => {
    setState({ show: false });
  };

  const onChangeField = (key) => (e) => {
    if (key === "khoaId") {
      getListNhanVien({ size: 500, khoaId: e });
      getListPhong({ size: 500, khoaId: e });
    }
    if (key === "loaiPhong") {
      getListPhong({ size: 500, loaiPhong: e });
    }
  };

  const onSave = () => {
    form.submit();
  };

  const generateLink = (path) => {
    let link = `/qms/qms-doc/${path}`;
    history.push(link);
  };

  const onHanldeSubmit = (values) => {
    let newData = state?.dataTable.filter((item) => {
      return item.isactive && item.name;
    });
    const {
      mac,
      khoaId,
      dieuDuongId,
      ten,
      dsBacSiId,
      hoTroId,
      phongId,
      thoiGianChieuDen,
      thoiGianChieuTu,
      thoiGianSangDen,
      thoiGianSangTu,
      mauQmsId,
    } = values;
    const { video } = state;
    const data = {
      mac,
      khoaId,
      dieuDuongId,
      ten,
      dsBacSiId,
      hoTroId,
      phongId: phongId || dataSearch?.phongId,
      dsTrangThai: (newData || []).map((item) => {
        return item.name;
      }),
      mauQmsId,
      loaiQms: state?.loaiQms || dataSearch?.loaiQms,
      thoiGianChieuDen: thoiGianChieuDen
        ? thoiGianChieuDen.format("HH:mm")
        : null,
      thoiGianChieuTu: thoiGianChieuTu ? thoiGianChieuTu.format("HH:mm") : null,
      thoiGianSangDen: thoiGianSangDen ? thoiGianSangDen.format("HH:mm") : null,
      thoiGianSangTu: thoiGianSangTu ? thoiGianSangTu.format("HH:mm") : null,
      dsVideo: Array.isArray(video) ? video : Array(video),
      id: state.currentId,
    };
    createOrEdit(data).then((s) => {
      updateData({ currentKiosk: s });
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      generateLink(
        `${listTemplate.find((x) => x.id == s.mauQmsId)?.url}?kioskId=${s?.id}`
      );
      setState({ dataTable: data, show: false });
      if (kioskId) {
        getByIdKiosk(kioskId);
      }
    });
  };

  const onChangeBacSi = (e) => {
    let data = listNhanVien.filter((x) => e.includes(x.id));
    if (data) setState({ bacSi: data });
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    return refVideo.current.click();
  };

  const selectVideo = (data) => {
    let type =
      data.target &&
      data.target.files &&
      data.target.files[0] &&
      data.target.files[0].type;
    if (type === "video/mp4") {
      let fileUpload = "";
      let fileName = "";
      fileUpload = data.target.files[0] || {};
      fileName = fileUpload.name;
      setState({
        fileName,
        fileUpload,
      });
      postVideo(fileUpload).then((s) => {
        setState({ video: s?.data });
      });
    }
  };

  const onReset = () => {
    if (state.currentItem?.id) {
      loadCurrentItem(state.currentData);
    } else {
      loadCurrentItem();
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      setState({ dataTable: data, currentIndex: -1 });
    }
  };

  return (
    <ModalStyled
      visible={state.show}
      width={1000}
      closable={false}
      footer={false}
      onCancel={onCancel}
    >
      <Main>
        <div className="header">
          <div className="left">
            <span>THI??T L???P TH??NG S???</span>
          </div>
          <div className="right">
            <img src={IcClose} alt="..." onClick={onCancel} />
          </div>
        </div>
        <div className="content">
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            onFinish={onHanldeSubmit}
          >
            <Row>
              <Col xs={12}>
                <Form.Item
                  label="T??n thi???t b???"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n thi???t b???!",
                    },
                  ]}
                >
                  <Input placeholder="Nh???p t??n thi???t b???"></Input>
                </Form.Item>
                <Form.Item
                  name="khoaId"
                  label="Khoa"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n khoa!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Ch???n Khoa"
                    data={listKhoa}
                    onChange={onChangeField("khoaId")}
                  />
                </Form.Item>
                <Form.Item
                  name="dsBacSiId"
                  label="B??c s??"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n b??c s??!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Ch???n b??c s??"
                    data={listBacSi}
                    onChange={onChangeBacSi}
                    mode="multiple"
                    showArrow
                  />
                </Form.Item>
                <Form.Item name="dieuDuongId" label="Y t??">
                  <Select
                    required={true}
                    message="Vui l??ng ch???n tr??? l?? y t??!"
                    placeholder="Ch???n tr??? l?? y t??"
                    data={listDieuDuong}
                  />
                </Form.Item>
                <Form.Item name="hoTroId" label="H??? tr???">
                  <Select
                    required={true}
                    message="Vui l??ng ch???n h??? tr??? HD!"
                    placeholder="Ch???n h??? tr??? HD"
                    data={listDieuDuong}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                {" "}
                <Form.Item name="mac" label="?????a ch??? MAC">
                  <Input placeholder="Nh??p ?????a ch??? Mac"></Input>
                </Form.Item>
                <Form.Item
                  name="phongId"
                  label="Ph??ng"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n ph??ng!",
                    },
                  ]}
                >
                  <Select placeholder="Ch???n Ph??ng" data={listRoom} />
                </Form.Item>
                <Form.Item className="d-flex">
                  <Carousel data={state.bacSi} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item label="Th???i gian l??m vi???c" colon={false}>
                <Row gutter={22}>{renderTime()}</Row>
              </Form.Item>
            </Row>
          </Form>
          <TableWrapper
            columns={columns}
            dataSource={state.dataTable}
            rowKey={(record) => record.name}
            onRow={onRow}
          ></TableWrapper>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            onFinish={onHanldeSubmit}
          >
            <Form.Item
              name="mauQmsId"
              label="M?? m???u"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n m?? m???u!",
                },
              ]}
            >
              <Select
                required={true}
                message="Vui l??ng ch???n Template"
                placeholder="Ch???n Template"
                data={listTemplate}
              />
            </Form.Item>
          </Form>
          <div className="footer">
            <span className="title">Video</span>
            <div className="video">
              <div className="left">
                <a>{state.fileName}</a>
              </div>
              <div className="right">
                <input
                  style={{ display: "none" }}
                  accept="video/*"
                  type="file"
                  onChange={(e) => selectVideo(e)}
                  ref={refVideo}
                ></input>
                <Button onClick={handleUploadFile} className="btn-upload">
                  <span>Upload</span>
                  <img src={IcCreate} />
                </Button>
              </div>
            </div>
          </div>
          <div className="button">
            <Button className="btn-reset" onClick={onReset}>
              ?????t l???i
            </Button>
            <Button className="btn-save" onClick={onSave}>
              {" "}
              <span>L??u</span>
              <img src={IcSave} />
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(Modal);
