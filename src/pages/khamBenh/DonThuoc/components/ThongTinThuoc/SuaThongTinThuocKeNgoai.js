import TableWraper from "components/TableWrapper";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Button, DatePicker, Input, InputNumber, message, Row, Select as SelectAntd } from "antd";
import { ModalStyled, Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { connect, useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import PopupThemLieuDung from "../PopupThemLieuDung";
import lieuDungProvider from "data-access/categories/dm-lieu-dung-provider";
import moment from "moment";

const { RangePicker } = DatePicker;

const SuaThongTinThuocKeNgoai = (props, ref) => {
  const refPopupThemLieuDung = useRef(null)
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)
  const createOrEditLieuDungThuoc = useDispatch().lieuDungThuoc.createOrEdit

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const {
    getListAllLieuDung,
    listAllLieuDung,
    themThongTin,
    getListDichVuThuoc,
    createOrEditLieuDung,
    getListLieuDung,
    thongTinChiTiet,
    updateRecordByIdThuocKeNgoai,
    nbDotDieuTriId,
    getListDichVuThuocKeNgoai
  } = props;

  useEffect(() => {
    getListAllLieuDung({});
  }, []);
  useImperativeHandle(ref, () => ({
    show: async (options = {}) => {
      const { newTable } = options;
      const table = await Promise.all(newTable.map(async (x) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: x.dichVuId }).then((s) => {
          return s?.data
        })
        return ({
          ...x,
          lieuDungId: x?.lieuDungId || null,
          ngayThucHienTu: x?.ngayThucHienTu || null,
          ngayThucHienDen: x?.ngayThucHienDen || null,
          listLieuDung: listLieuDungDependDichVu
        });
      }));
      setData(table);
      setShow(true);
    },
  }));
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const blockInvalidChar2 = (e) => {
    console.log('e.key: ', e.key);
    if (e.key === 'Backspace' || e.keyCode === 37 || e.keyCode === 39) {

    } else if (["e", "E", "+", "-"].includes(e.key) || e.target.value.length >= 3) {
      return e.preventDefault()
    }
  };
  const onChangeInput = (type, index) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    if ((type === "soLuong" || type === "dotDung") && Number(value) <= 0 && value) {
      // message.error("Vui l??ng nh???p s??? l?????ng > 0");
      data[index][type] = 1;
    } else {
      data[index][type] = value;
    }
    setData([...data])
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
    setData([...data])
  };

  const onCancel = () => {
    setShow(false);
  };
  const reRenderListLieuDungDependDichVu = async () => {
    let list = [...data]
    await (() => {
      (list || []).forEach(async (item) => {
        const listLieuDungDependDichVu = await lieuDungProvider.searchAll({ bacSiId: nhanVienId, dichVuId: item.dichVuId }).then((s) => {
          return s?.data
        })
        item.listLieuDung = listLieuDungDependDichVu
      })
    })()
    setData([...list])
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
      title: <HeaderSearch title="T??n thu???c" sort_key="ten" />,
      width: "120px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title="S??? l?????ng" sort_key="thanhTien" />,
      width: "40px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            value={item}
            onChange={onChangeInput("soLuong", index)}
            onKeyDown={blockInvalidChar}
          ></Input>
        );
      },
    },
    {
      title: (
        <HeaderSearch title="Li???u d??ng - C??ch d??ng" sort_key="lieuDungId" />
      ),
      width: "120px",
      dataIndex: "lieuDungId",
      key: "lieuDungId",
      render: (item, data, index) => {
        return (
          <>
            <PopupThemLieuDung ref={refPopupThemLieuDung} />
            <Select
              data={data?.listLieuDung}
              value={item}
              onChange={onChangeInput("lieuDungId", index)}
              notFoundContent={
                <div>
                  <div style={{ color: "#7A869A", textAlign: "center" }}><small>Kh??ng c?? d??? li???u ph?? h???p</small></div>
                  {/* 
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
                          dichVuId: data.dichVuId
                        }
                        await createOrEditLieuDungThuoc(dataCustom)
                        await reRenderListLieuDungDependDichVu()
                        getListAllLieuDung({});
                      });
                    })}>
                      Th??m nhanh li???u d??ng b??c s??
                      </Button>
                  </Row> */}
                </div>
              }
            ></Select>
          </>
        );
      },
    },
    {
      title: <HeaderSearch title="?????t d??ng" sort_key="dotDung" />,
      width: "50px",
      dataIndex: "dotDung",
      key: "dotDung",
      render: (item, data, index) => {
        return (
          <Input
            type="number"
            value={item}
            onChange={onChangeInput("dotDung", index)}
            onKeyDown={blockInvalidChar2}
            min={1}
            max={999}
          ></Input>
        );
      },
    },
    {
      title: <HeaderSearch title="Th???i gian d??ng" sort_key="ngayThucHien" />,
      width: "100px",
      dataIndex: "",
      key: "",
      render: (item, data, index) => {

        return (
          <RangePicker
            // format={"DD/MM/YYYY"}
            defaultValue={
              [item?.ngayThucHienTu ? moment(item?.ngayThucHienTu, "YYYY/MM/DD") : null,
              item?.ngayThucHienDen ? moment(item?.ngayThucHienDen, "YYYY/MM/DD") : null]
            }
            placeholder={["T??? ng??y", "?????n ng??y"]}
            onChange={onChangeInputDate("ngayThucHien", index)}
          ></RangePicker>
        );
      },
    },
    {
      title: <HeaderSearch title="L??u ??" sort_key="ghiChu" />,
      width: "50px",
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (item, data, index) => {
        return (
          <Input
            value={item}
            onChange={onChangeInput("ghiChu", index)}
          ></Input>
        );
      },
    },
  ];

  const onSave = () => {

    let payload = data.map((item) => ({
      // nbDichVu: {
      //   ghiChu: item?.ghiChu,
      //   soLuong: item?.soLuong,
      // },
      thuocChiDinhNgoaiId: item?.thuocChiDinhNgoaiId,
      id: item?.id,
      ghiChu: item?.ghiChu,
      soLuong: item?.soLuong,
      lieuDungId: item?.lieuDungId,
      dotDung: item?.dotDung,
      ngayThucHienTu: item?.ngayThucHienTu,
      ngayThucHienDen: item?.ngayThucHienDen,
      nbDotDieuTriId
    }));


    updateRecordByIdThuocKeNgoai(payload[0])
      .then((s) => {
        if (s?.code === 0) {
          getListDichVuThuoc({ nbDotDieuTriId: s?.data?.nbDotDieuTriId });
          getListDichVuThuocKeNgoai({ nbDotDieuTriId: s?.data?.nbDotDieuTriId, page: 0 });
          onCancel();
        } else {
          message.error(s[0]?.message);
        }
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
        <div className="header">
          <span>Th??ng tin thu???c</span>
        </div>
        <div>
          <TableWraper columns={columns} dataSource={data && [...data]} />
        </div>
        <div className="footer">
          <div className="left"></div>
          <div className="right">
            <Button className="btn-cancel" onClick={onCancel}>
              H???y
            </Button>
            <Button className="btn-accept" onClick={onSave}>
              ?????ng ??
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
    nbDotDieuTriId: state.khamBenh?.infoNb?.nbDotDieuTriId,
  };
};

const mapDispatchToProps = ({
  lieuDung: { getListAllLieuDung, createOrEdit: createOrEditLieuDung, getListLieuDung },
  chiDinhDichVuKho: { themThongTin, getListDichVuThuoc, updateRecordByIdThuocKeNgoai, getListDichVuThuocKeNgoai },
}) => ({
  getListAllLieuDung,
  themThongTin,
  getListDichVuThuoc,
  createOrEditLieuDung,
  getListLieuDung,
  updateRecordByIdThuocKeNgoai,
  getListDichVuThuocKeNgoai
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(SuaThongTinThuocKeNgoai));
