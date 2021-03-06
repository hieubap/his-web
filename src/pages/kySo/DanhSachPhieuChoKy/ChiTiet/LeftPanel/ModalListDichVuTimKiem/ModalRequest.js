import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    useRef,
    useMemo
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Input, Button, message, DatePicker, Select } from "antd";
import { Main, ContentTable, ModalStyled, ButtonBack, ButtonNext, Footer, InputCustom, SelectCustom, RangePickerCustom, TableWrapperStyled } from "./styled";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
// import Select from "components/Select";
// import { TRANG_THAI_KHAM_BN } from "../../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { Modal } from "antd";
import moment from "moment";
// import { ModalNotification2 } from "../../../../components/ModalConfirm";
const { confirm } = Modal;
const { RangePicker } = DatePicker
const { Option } = Select

let timer = null;

const ModalRequest = (props, ref) => {
    const [state, _setState] = useState({ open: false, itemSelected: {} });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };

    const { listAllDichVuTonKho } = useSelector(state => state.thuocChiTiet)
    const { listAllLieuDung } = useSelector(state => state.lieuDung)
    const thuocChiTiet = useSelector(state => state.thuocChiTiet)

    const { updateData } = useDispatch().thuocChiTiet

    const {
        isAdvised,
        infoPatient,
        nguoiBenhId,
        dsThuocEdit,
        pageDvSearch,
        sizeDvSearch,
        dataSearchDv,
        totalElementsDvSearch,
        khoId,
        dsThuocTamThoi
    } = thuocChiTiet

    const { onSearchAllDichVuTonKho, onSearchListDichVuTonKho, changesDonThuoc } = useDispatch().thuocChiTiet
    // let rangePickerInput = document.querySelectorAll(".range-picker-request .ant-picker-input")
    // useEffect(() => {
    //     let rangePickerInput = document.querySelectorAll(".range-picker-request .ant-picker-input") // t???o div suffix trong rangepicker 
    //     rangePickerInput.forEach((item, index) => {
    //         console.log('item: ', item);
    //         let div = document.createElement("div")
    //         div.className = 'icon-suffix'
    //         item.append(div)
    //     })
    // }, [rangePickerInput])
    const columns = [
        {
            title: (
                <HeaderSearch
                    title="STT"
                    sort_key="index"
                // dataSort={dataSortColumn["stt"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nh???p s??? kh??m"
                //     // onChange={onSearchInput("soKham")}
                //   />
                // }
                />
            ),
            align: "center",
            width: "20px",
            dataIndex: "index",
            key: "index",
        },
        {
            title: (
                <HeaderSearch
                    title="T??n thu???c"
                    sort_key="ten"
                // dataSort={dataSortColumn["maHoSo"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nh???p m?? h??? s??"
                //     // onChange={onSearchInput("maHoSo")}
                //   />
                // }
                />
            ),
            width: "80px",
            dataIndex: "ten",
            key: "ten",
        },
        {
            title: (
                <HeaderSearch
                    title="S??? l?????ng"
                    sort_key="soLuong"
                // dataSort={dataSortColumn["tenNb"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nh???p T??n - Tu???i - ?????a ch???"
                //     // onChange={onSearchInput("tenNb")}
                //   />
                // }
                />
            ),
            width: "50px",
            dataIndex: "soLuong",
            key: "soLuong",
            render: (item) => {
                return (
                    <InputCustom
                        defaultValue={state.itemSelected.soLuong}
                        placeholder="Nh???p s??? l?????ng"
                        onChange={onChange("soLuong")}
                    // onChange={onSearchInput("tenNb")}
                    />
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title="Li???u d??ng - C??ch d??ng"
                    sort_key="lieuDung"
                // dataSort={dataSortColumn["trangThai"] || 0}
                // onClickSort={onClickSort}
                // searchSelect={
                //   <Select
                //     placeholder="Ch???n tr???ng th??i"
                //     // onChange={onSearchInput("trangThai")}
                //     // data={[{ id: "", ten: "T???t c???" }, ...TRANG_THAI_KHAM_BN]}
                //     defaultValue=""
                //   />
                // }
                />
            ),
            width: "100px",
            dataIndex: "lieuDung",
            key: "lieuDung",
            render: (item) => {
                return (
                    <SelectCustom
                        placeholder="Nh???p li???u d??ng - c??ch d??ng"
                        onChange={onChange("lieuDung")}
                        defaultValue={state.itemSelected.lieuDung}
                    // onChange={onSearchInput("tenNb")}
                    >
                        {listAllLieuDung.map((o) => {
                            return (
                                <Option key={o.id} value={o.id}>
                                    {o.ten}
                                </Option>
                            );
                        })}
                    </SelectCustom>
                );
            },
            // render: (item) => {
            //   const res = TRANG_THAI_KHAM_BN.find((el) => el.id === item) || {};
            //   return res.ten;
            // },
        },
        {
            title: <HeaderSearch title="?????t d??ng" />,
            width: "60px",
            dataIndex: "dotDung",
            key: "dotDung",
            render: (item) => {
                return (
                    <InputCustom
                        type="number"
                        onChange={onChange("dotDung")}
                        placeholder="Nh???p ?????t d??ng"
                        defaultValue={state.itemSelected.dotDung}
                    // onChange={onSearchInput("tenNb")}
                    />
                );
            },
        },
        {
            title: <HeaderSearch title="Th???i gian d??ng" />,
            width: "100px",
            dataIndex: "tenNhaSanXuat",
            key: "tenNhaSanXuat",
            render: (item, record) => {
                // return (
                //     <RangePickerCustom>
                //         <Row>
                //             <div className="title-1">T???</div>
                //             <RangePicker
                //                 suffixIcon={<div></div>}
                //                 separator={<div>?????n</div>}
                //                 format="DD/MM/YYYY"
                //                 className="range-picker-request"
                //                 placeholder={["T??? ng??y", "?????n ng??y"]}
                //                 onChange={onChangeDate("dotDung")}
                //                 defaultValue={
                //                     () => {
                //                         const ngayThucHienTu = state.itemSelected?.ngayThucHienTu && moment(state.itemSelected.ngayThucHienTu)
                //                         const ngayThucHienDen = state.itemSelected?.ngayThucHienDen && moment(state.itemSelected.ngayThucHienDen)
                //                         return [ngayThucHienTu, ngayThucHienDen]
                //                     }
                //                 }
                //             // // bordered={false}
                //             // onChange={onChangeDate(item)}
                //             ></RangePicker>
                //         </Row>
                //     </RangePickerCustom>
                // )
                return (
                    <RangePicker
                        format="DD/MM/YYYY"
                        className="range-picker"
                        placeholder={["T??? ng??y", "?????n ng??y"]}
                        onChange={onChangeDate("dotDung")}
                        defaultValue={
                            () => {
                                const ngayThucHienTu = state.itemSelected?.ngayThucHienTu && moment(state.itemSelected.ngayThucHienTu)
                                const ngayThucHienDen = state.itemSelected?.ngayThucHienDen && moment(state.itemSelected.ngayThucHienDen)
                                return [ngayThucHienTu, ngayThucHienDen]
                            }
                        }
                        // // bordered={false}
                        // onChange={onChangeDate(item)}
                        separator={<div>-</div>}
                    ></RangePicker>
                );
            },
        },
        {
            title: <HeaderSearch title="Ghi ch??" />,
            width: "50px",
            dataIndex: "ghiChu",
            key: "ghiChu",
            align: "center",
            render: (item, record) => {
                return (
                    <InputCustom
                        placeholder="Nh???p l??u ??"
                        onChange={onChange("ghiChu")}
                        defaultValue={state.itemSelected.ghiChu}
                    />
                );
            },
        },
    ];
    const onChange = (key) => (e) => {
        let value = e?.target?.value || e
        setState({ [key]: value })
    }
    const onChangeDate = (key) => (e) => {
        let value = "";
        let value1 = "";
        if (e) {
            value = e[0].format("YYYY-MM-DD");
            value1 = e[1].format("YYYY-MM-DD");
        }
        setState({ [`ngayThucHienTu`]: value, [`ngayThucHienDen`]: value1 });
    };
    const handleChangePage = (page) => {
        // onSearchListDichVuTonKho({ page: pageDvSearch - 1 }, true);
    };

    const handleSizeChange = (size) => {
        // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
    };

    const rowClassName = (record) => {
        // return record.id === infoNb?.id ? "active" : "";
    };
    useImperativeHandle(ref, () => ({
        show: ({ itemSelected }) => {
            setState({ open: true, itemSelected });
            // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
        },
    }));
    const onCloseModal = () => {
        setState({ open: false });
    };
    const onSubmitModal = () => {
        if (props.isThemMoi) {
            // ng?????i b???nh th??m m???i , l??u b???ng t???m , custom l???i d??? li???u gi???ng v???i chi ti???t tr??? v???
            let obj = {
                index: dsThuocTamThoi.length + 1,
                dotDung: state.dotDung || state.itemSelected.dotDung,
                ngayThucHienTu: state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
                ngayThucHienDen: state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
                lieuDung: state.lieuDung || state.itemSelected.ngayThucHienDen,
                nbDichVu: {
                    dichVuId: state.itemSelected.dichVuId,
                    soLuong: state.soLuong || state.itemSelected.soLuong,
                    giaKhongBaoHiem: state.itemSelected.giaKhongBaoHiem,
                    ghiChu: state.ghiChu || state.itemSelected.ghiChu,
                    dichVu: {
                        ...state.itemSelected
                    }
                },
                nbDvKho: {
                    soLuongKhaDung: state.itemSelected.soLuongKhaDung
                }
            }
            const index = dsThuocTamThoi.findIndex(item => item.nbDichVu.dichVuId)
            if (index !== -1) {
                dsThuocTamThoi[index].dotDung = state.dotDung || state.itemSelected.dotDung
                dsThuocTamThoi[index].ngayThucHienTu = state.ngayThucHienTu || state.itemSelected.ngayThucHienTu
                dsThuocTamThoi[index].ngayThucHienDen = state.ngayThucHienDen || state.itemSelected.ngayThucHienDen
                dsThuocTamThoi[index].nbDichVu.soLuong = state.soLuong || state.itemSelected.soLuong
                dsThuocTamThoi[index].nbDichVu.ghiChu = state.ghiChu || state.itemSelected.ghiChu
                dsThuocTamThoi[index].lieuDung = state.lieuDung || state.itemSelected.lieuDung
            } else {
                dsThuocTamThoi.push(obj)
            }

            // d??? li???u g???i ??i
            const indexPayload = dsThuocEdit.findIndex(item => !item.id)
            let objPayload = {
                id: null,
                dotDung: state.dotDung || state.itemSelected.dotDung,
                ngayThucHienTu: state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
                ngayThucHienDen: state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
                lieuDung: state.lieuDung || state.itemSelected.lieuDung,
                nbDichVu: {
                    dichVuId: state.itemSelected.dichVuId,
                    soLuong: state.soLuong || state.itemSelected.soLuong,
                    ghiChu: state.ghiChu || state.itemSelected.ghiChu
                }
            }
            if (indexPayload !== -1) {
                dsThuocEdit[indexPayload].dotDung = state.dotDung || state.itemSelected.dotDung
                dsThuocEdit[indexPayload].ngayThucHienTu = state.ngayThucHienTu || state.itemSelected.ngayThucHienTu
                dsThuocEdit[indexPayload].ngayThucHienDen = state.ngayThucHienDen || state.itemSelected.ngayThucHienDen
                dsThuocEdit[indexPayload].nbDichVu.soLuong = state?.soLuong || state.itemSelected.soLuong
                dsThuocEdit[indexPayload].nbDichVu.ghiChu = state.ghiChu || state.itemSelected.ghiChu
            } else {
                dsThuocEdit.push(objPayload)
            }

            // validate
            if (!obj.dotDung) {
                return message.error("Vui l??ng nh???p ?????t d??ng")
            }
            if (!obj.nbDichVu.soLuong) {
                return message.error("Vui l??ng nh???p s??? l?????ng")
            }
            // end validate
            updateData({
                infoPatient: {
                    dsThuoc: dsThuocTamThoi
                }
            })
            setState({ open: false });

        } else {
            const index = dsThuocEdit.findIndex(item => !item.id)
            let obj = {
                id: null,
                dotDung: state.dotDung || state.itemSelected.dotDung,
                ngayThucHienTu: state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
                ngayThucHienDen: state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
                lieuDung: state.lieuDung || state.itemSelected.lieuDung,
                nbDichVu: {
                    dichVuId: state.itemSelected.dichVuId,
                    soLuong: state.soLuong || state.itemSelected.soLuong,
                    ghiChu: state.ghiChu || state.itemSelected.ghiChu
                }
            }
            if (index !== -1) {
                dsThuocEdit[index].dotDung = state.dotDung || state.itemSelected.dotDung
                dsThuocEdit[index].ngayThucHienTu = state.ngayThucHienTu || state.itemSelected.ngayThucHienTu
                dsThuocEdit[index].ngayThucHienDen = state.ngayThucHienDen || state.itemSelected.ngayThucHienDen
                dsThuocEdit[index].nbDichVu.soLuong = state.soLuong || state.itemSelected.soLuong
                dsThuocEdit[index].nbDichVu.ghiChu = state.ghiChu || state.itemSelected.ghiChu
            } else {
                dsThuocEdit.push(obj)
            }

            changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit }).then(res => {
                setState({ open: false });
            }).catch(err => {
            })
        }

    };
    const onRow = (record) => {
        return {
            onClick: () => {

            },
        };
    };
    
    return (
        <ModalStyled width={1320} visible={state.open} closable={false} footer={null}>
            <Main>
                <Row className="header-table">
                    <div className="header-table__left">Danh s??ch d???ch v???</div>
                    <div className="header-table__right">
                        <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
                    </div>
                </Row>
                <ContentTable>
                    <TableWrapperStyled
                        // rowSelection={{
                        //   type: "radio",
                        // }}
                        // className="table"
                        rowClassName={rowClassName}
                        columns={columns}
                        onRow={onRow}
                        dataSource={([state.itemSelected] || []).map((item, index) => { item.index = index + 1; return item })}
                        // onRow={onRow}
                        // scroll={{ y: 450 }}
                        rowKey={(record) => `${record.ma}`}
                    />
                    {/* {totalElements ? ( */}
                    {/* <Pagination
                        onChange={handleChangePage}
                        current={pageDvSearch + 1}
                        pageSize={sizeDvSearch}
                        total={totalElementsDvSearch}
                        onShowSizeChange={handleSizeChange}
                    /> */}
                    {/* ) : null} */}
                    <Footer align="end" >
                        <ButtonBack style={{ marginRight: 10 }} onClick={onCloseModal}>H???y</ButtonBack>
                        <ButtonNext onClick={onSubmitModal}>?????ng ??</ButtonNext>
                    </Footer>
                </ContentTable>
                {/* <ModalNotification2 ref={refModalNotification2} /> */}
            </Main>
        </ModalStyled>
    );
};

export default connect(null, null, null, {
    forwardRef: true,
})(forwardRef(ModalRequest));
