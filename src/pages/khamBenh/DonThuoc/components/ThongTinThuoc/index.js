import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, DatePicker, Input, message, InputNumber, Row, Form, Col, Popover } from "antd";
import { ModalStyled, Main, ContentTable, GlobalStyle, ContentWrapper } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect, useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "../PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";

const { RangePicker } = DatePicker;

const ThongTinThuoc = (props, ref) => {
  const refPopupThemLieuDung = useRef(null)
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const listDuongDung = useSelector(state => state.duongDung.listDuongDung)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)
  const createOrEditLieuDungThuoc = useDispatch().lieuDungThuoc.createOrEdit

  const {
    getListAllLieuDung,
    listAllLieuDung,
    chiDinhDichVuKho,
    getListDichVuThuoc,
    khoId,
    createOrEditLieuDung,
    thongTinChiTiet
  } = props;
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}) => {
      const { newTable } = options;
      // let table = newTable.map((x) => {
      //   return {
      //     ...x,
      //     lieuDungId: x?.lieuDungId || null,
      //     dotDung: null,
      //     ghiChu: null,
      //     ngayThucHienTu: null,
      //     ngayThucHienDen: null,
      //     key: x.nbDichVu.dichVuId,
      //   };
      // });
      const table = await Promise.all(newTable.map(async (x) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: x?.nbDichVu?.dichVuId }).then((s) => {
          return s?.data
        })
        return ({
          ...x,
          lieuDungId: x?.lieuDungId || null,
          dotDung: null,
          ghiChu: null,
          ngayThucHienTu: null,
          ngayThucHienDen: null,
          key: x.nbDichVu.dichVuId,
          listLieuDung: listLieuDungDependDichVu
        });
      }));
      console.log('table: ', table);
      setData(table);
      setShow(true);
    },
  }));
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...data]
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item?.nbDichVu?.dichVuId }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
    setData([...list])
  }
  const onChangeInput = (type, index) => (e) => {
    const newData = Object.assign([], data);
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if (type === "soLuong") {
      if (Number(value) <= 0 && value) {
        message.error("Vui lòng nhập số lượng > 0");
        newData[index].nbDichVu[type] = null;
      } else {
        newData[index].nbDichVu[type] = Number(value);
      }
    } else {
      newData[index][type] = value;
      setData(newData);
    }
  };
  const onChangeInputDate = (type, index) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    data[index][`${type}Tu`] = value;
    data[index][`${type}Den`] = value1;
  };

  const onCancel = () => {
    setShow(false);
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const blockInvalidChar2 = (e) => {
    if (e.key === 'Backspace' || e.keyCode === 37 || e.keyCode === 39) {

    } else if (["e", "E", "+", "-"].includes(e.key) || e.target.value.length >= 3) {
      return e.preventDefault()
    }
  };
  const contentPopoverLieuDung = () => {
    return (
      <ContentWrapper>
        <div className="content-popover">
          <div className="title-popup" style={{
            background: "linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            fontFamily: "Nunito Sans",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: 0,
            textAlign: "left",
            padding: "8px 16px",
          }}>Thêm nhanh liều dùng bác sĩ</div>
          <Form
            form={form}
            layout="vertical"
            className="form-custom form-custom--one-line"
          >
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Tên liều dùng"
                  name="ten"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên liều dùng"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="SL dùng sáng"
                  name="slDungSang"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập sl dùng sáng"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="SL dùng chiều"
                  name="slDungChieu"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập sl dùng chiều"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="SL dùng tối"
                  name="slDungToi"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập sl dùng tối"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="SL dùng đêm"
                  name="slDungDem"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập sl dùng đêm"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Thời điểm dùng"
                  name="thoiDiemDung"
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập thời điểm dùng"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Đường dùng"
                  name="duongDung"
                >
                  <Select
                    placeholder="Vui lòng chọn đường dùng"
                    data={listDuongDung}
                    showArrow={true}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="popover-btn-list">
            <Button className="popover-btn-list__cancel"
              //  onClick={onCancel}
              onClick={() => setState({ visiblePopupThemLieuDung: "" })}
            >
              Hủy
            </Button>
            <Button
              className="popover-btn-list__ok"
            // onClick={onSubmitThem}
            >
              {"Lưu"}<img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img>
            </Button>
          </div>
        </div>
      </ContentWrapper>
    )
  }
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="Tên thuốc" sort_key="ten" />,
      width: "120px",
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item) => {
        return `${item.dichVu?.ten} ${
          item.dichVu?.tenHoatChat ? " (" + item.dichVu?.tenHoatChat + ")" : " "
          } ${item.dichVu?.hamLuong ? " - " + item.dichVu?.hamLuong : ""}`;
      },
    },
    {
      title: <HeaderSearch title="Số lượng" sort_key="thanhTien" />,
      width: "40px",
      dataIndex: "nbDichVu",
      key: "nbDichVu",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            defaultValue={item.soLuong}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
            min={1}
          ></Input>
        );
      },
    },
    {
      title: (
        <HeaderSearch title="Liều dùng - Cách dùng" sort_key="lieuDungId" />
      ),
      width: "120px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      render: (item, data, index) => {
        return (
          <>
            {/* <Popover
              overlayClassName="popover-table-thuoc-ke-ngoai popover-table-thuoc-ke-ngoai_lieu-dung"
              overlayInnerStyle={{ width: 640, height: 310, padding: "0px !important" }}
              content={contentPopoverLieuDung()}
              // trigger="click"
              visible={state.visiblePopupThemLieuDung === data.id}
              placement="left"
            ></Popover> */}
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
              showSearch={true}
              data={data?.listLieuDung}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", index)}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}><small>Không có dữ liệu phù hợp</small></div>

                  <Row justify="center">
                    <Button trigger="click" style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      width: "215px",
                      margin: "auto",
                      lineHeight: 0,
                      // boxShadow: "-1px 3px 1px 1px #d9d9d9",
                      cursor: "pointer"
                    }} onClick={() => refPopupThemLieuDung && refPopupThemLieuDung.current.show({ visible: true }, (res) => {
                      const { values } = res
                      values.bacSiId = nhanVienId
                      createOrEditLieuDung(values).then(async (s) => {
                        const dataCustom = {
                          lieuDung: {
                            ...s,
                          },
                          lieuDungId: s.id,
                          dichVuId: data?.nbDichVu?.dichVuId
                        }
                        await createOrEditLieuDungThuoc(dataCustom)
                        await reRenderListLieuDungDependDichVu()
                        getListAllLieuDung({});
                      });
                    })}>
                      Thêm nhanh liều dùng bác sĩ
                      </Button>
                  </Row>
                </div>
              }
            ></Select>
          </>
        );
      },
    },
    {
      title: <HeaderSearch title="Đợt dùng" sort_key="dotDung" />,
      width: "50px",
      dataIndex: "dotDung",
      key: "dotDung",
      render: (item, record, index) => {
        return (
          <Input
            type="number"
            defaultValue={item}
            onChange={onChangeInput("dotDung", index)}
            onKeyDown={blockInvalidChar2}
            min={1}
            max={999}
          ></Input>
        );
      },
    },
    {
      title: <HeaderSearch title="Thời gian dùng" sort_key="ngayThucHien" />,
      width: "100px",
      dataIndex: "",
      key: "",
      render: (item, data, index) => {
        return (
          <RangePicker
            placeholder={["Từ ngày", "đến ngày"]}
            onChange={onChangeInputDate("ngayThucHien", index)}
          ></RangePicker>
        );
      },
    },
    {
      title: <HeaderSearch title="Lưu ý" sort_key="ghiChu" />,
      width: "50px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (item, data, index) => {
        return (
          <>
            <Input onChange={onChangeInput("ghiChu", index)}></Input>
            {(item || "").length > 1000 && (
              <span className="error">
                Vui lòng nhập Lưu ý không quá 1000 ký tự!
              </span>
            )}
          </>
        );
      },
    },
  ];

  const onSave = () => {
    if ((data || []).some((item) => (item.ghiChu || "").length > 1000)) {
      message.error("Vui lòng nhập Lưu ý không quá 1000 ký tự!");
      return;
    }
    console.log('data: ', data);
    let payload = data.map((item) => ({
      nbDotDieuTriId: item?.nbDotDieuTriId,
      listLieuDung: item.listLieuDung,
      nbDichVu: {
        ghiChu: item?.ghiChu,
        soLuong: item?.nbDichVu.soLuong,
        dichVuId: item?.nbDichVu.dichVuId,
        dichVu: item.nbDichVu.dichVu
      },
      nbDvKho: {
        khoId
      },
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
    }));
    chiDinhDichVuKho(payload)
      .then((s) => {
        const arrIsNotEligible = []
        const arrIsEligible = []
        s.forEach((obj, index) => {
          if (obj.code === 8503 || obj.code === 8501) {
            arrIsNotEligible.push(obj)
            message.error(obj?.message);
          } else {
            arrIsEligible.push(obj)
          }
        })
        if (arrIsNotEligible?.length <= 0) {
          onCancel()
        } else {
          let filter = data.filter(item1 => arrIsNotEligible.some(item2 => item2.nbDichVu.dichVuId === item1.nbDichVu.dichVuId))
          setData(filter)
        }
        getListDichVuThuoc({ nbDotDieuTriId: s[0].nbDotDieuTriId });
      })
      .catch(() => { });
  };

  return (
    <ModalStyled
      closable={null}
      footer={null}
      width={1320}
      visible={show}
      onCancel={onCancel}
    >
      <Main>
        <GlobalStyle />
        <div className="header">
          <span>Thông tin thuốc</span>
        </div>
        <div>{show && <TableWraper columns={columns} dataSource={data} />}</div>
        <div className="footer">
          <div className="left"></div>
          <div className="right">
            <Button className="btn-cancel" onClick={onCancel}>
              Hủy
            </Button>
            <Button className="btn-accept" onClick={onSave}>
              Đồng ý
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};
const mapStateToProps = (state) => {
  return {
    listAllLieuDung: state.lieuDung.listAllLieuDung || [],
    thongTinChiTiet: state.khamBenh.thongTinChiTiet || {},
  };
};

const mapDispatchToProps = ({
  lieuDung: { getListAllLieuDung, createOrEdit: createOrEditLieuDung },
  chiDinhDichVuKho: { chiDinhDichVuKho, getListDichVuThuoc },
}) => ({
  getListAllLieuDung,
  chiDinhDichVuKho,
  getListDichVuThuoc,
  createOrEditLieuDung
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ThongTinThuoc));
