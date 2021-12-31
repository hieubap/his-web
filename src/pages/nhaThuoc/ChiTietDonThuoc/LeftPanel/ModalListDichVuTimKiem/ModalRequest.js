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
    //     let rangePickerInput = document.querySelectorAll(".range-picker-request .ant-picker-input") // tạo div suffix trong rangepicker 
    //     rangePickerInput.forEach((item, index) => {
    //         console.log('item: ', item);
    //         let div = document.createElement("div")
    //         div.className = 'icon-suffix'
    //         item.append(div)
    //     })
    // }, [rangePickerInput])
    const blockInvalidChar = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    const blockInvalidChar2 = (e) => {
        if(e.key === 'Backspace' || e.keyCode === 37 || e.keyCode === 39){
            
        } else if (["e", "E", "+", "-"].includes(e.key) || e.target.value.length >= 3) {
            return e.preventDefault()
        }
    };
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
                //     placeholder="Nhập số khám"
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
                    title="Tên thuốc"
                    sort_key="ten"
                // dataSort={dataSortColumn["maHoSo"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nhập mã hồ sơ"
                //     // onChange={onSearchInput("maHoSo")}
                //   />
                // }
                />
            ),
            width: "80px",
            dataIndex: "ten",
            key: "ten",
            render: (item, itemAll) => {
                return `${item} - ${itemAll?.hamLuong ? itemAll?.hamLuong : ""}`
            }
        },
        {
            title: (
                <HeaderSearch
                    title="Số lượng"
                    sort_key="soLuong"
                // dataSort={dataSortColumn["tenNb"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nhập Tên - Tuổi - Địa chỉ"
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
                        type="number"
                        defaultValue={1}
                        placeholder="Nhập số lượng"
                        onChange={onChange("soLuong")}
                        onKeyDown={blockInvalidChar}
                        min={1}
                    // onChange={onSearchInput("tenNb")}
                    />
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title="ĐVT"
                    sort_key="tenDonViTinh"
                // dataSort={dataSortColumn["maHoSo"] || 0}
                // onClickSort={onClickSort}
                // search={
                //   <Input
                //     placeholder="Nhập mã hồ sơ"
                //     // onChange={onSearchInput("maHoSo")}
                //   />
                // }
                />
            ),
            width: "20px",
            dataIndex: "tenDonViTinh",
            key: "tenDonViTinh",
            render: (item, itemAll) => {
                return item
            }
        },
        {
            title: (
                <HeaderSearch
                    title="Liều dùng - Cách dùng"
                    sort_key="lieuDungId"
                // dataSort={dataSortColumn["trangThai"] || 0}
                // onClickSort={onClickSort}
                // searchSelect={
                //   <Select
                //     placeholder="Chọn trạng thái"
                //     // onChange={onSearchInput("trangThai")}
                //     // data={[{ id: "", ten: "Tất cả" }, ...TRANG_THAI_KHAM_BN]}
                //     defaultValue=""
                //   />
                // }
                />
            ),
            width: "100px",
            dataIndex: "lieuDungId",
            key: "lieuDungId",
            render: (item) => {
                return (
                    <SelectCustom
                        placeholder="Nhập liều dùng - cách dùng"
                        onChange={onChange("lieuDungId")}
                        defaultValue={state.itemSelected.lieuDungId}
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
            title: <HeaderSearch title="Đợt dùng" />,
            width: "60px",
            dataIndex: "dotDung",
            key: "dotDung",
            render: (item) => {
                return (
                    <InputCustom
                        type="number"
                        onKeyDown={blockInvalidChar2}
                        onChange={onChange("dotDung")}
                        placeholder="Nhập đợt dùng"
                        defaultValue={state.itemSelected.dotDung}
                        min={1}
                        value={state.dotDung}
                    // onChange={onSearchInput("tenNb")}
                    />
                );
            },
        },
        {
            title: <HeaderSearch title="Thời gian dùng" />,
            width: "100px",
            dataIndex: "tenNhaSanXuat",
            key: "tenNhaSanXuat",
            render: (item, record) => {
                return (
                    <RangePicker
                        format="DD/MM/YYYY"
                        className="range-picker"
                        placeholder={["Từ ngày", "đến ngày"]}
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
            title: <HeaderSearch title="Ghi chú" />,
            width: "50px",
            dataIndex: "ghiChu",
            key: "ghiChu",
            align: "center",
            render: (item, record) => {
                return (
                    <InputCustom
                        placeholder="Nhập lưu ý"
                        onChange={onChange("ghiChu")}
                        defaultValue={state.itemSelected.ghiChu}
                    />
                );
            },
        },
    ];
    const onChange = (key) => (e) => {
        let value = e?.target?.value || e
        if ((key === "soLuong" || key === "dotDung") && Number(value) <= 0) {
            // message.error("Vui lòng nhập số lượng > 0");
            value = 1;
        }
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
            itemSelected.soLuong = 1
            setState({ open: true, itemSelected });
            // onSizeChange({ size: size, dataSortColumn, dataSearch }, true);
        },
    }));
    const onCloseModal = () => {
        setState({ open: false });
    };
    const onSubmitModal = () => {
        if (props.isThemMoi) {
            // người bệnh thêm mới , lưu bảng tạm , custom lại dữ liệu giống với chi tiết trả về
            let obj = {
                index: dsThuocTamThoi.length + 1,
                dotDung: state.dotDung || state.itemSelected.dotDung,
                ngayThucHienTu: state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
                ngayThucHienDen: state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
                lieuDungId: state.lieuDungId || state.itemSelected.ngayThucHienDen,
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
                dsThuocTamThoi[index].lieuDungId = state.lieuDungId || state.itemSelected.lieuDungId
            } else {
                dsThuocTamThoi.push(obj)
            }

            // dữ liệu gửi đi
            const indexPayload = dsThuocEdit.findIndex(item => !item.id)
            let objPayload = {
                id: null,
                dotDung: state.dotDung || state.itemSelected.dotDung,
                ngayThucHienTu: state.ngayThucHienTu || state.itemSelected.ngayThucHienTu,
                ngayThucHienDen: state.ngayThucHienDen || state.itemSelected.ngayThucHienDen,
                lieuDungId: state.lieuDungId || state.itemSelected.lieuDungId,
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
                return message.error("Vui lòng nhập đợt dùng")
            }
            if (!obj.nbDichVu.soLuong) {
                return message.error("Vui lòng nhập số lượng")
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
                lieuDungId: state.lieuDungId || state.itemSelected.lieuDungId,
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
                    <div className="header-table__left">Thông tin thuốc</div>
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
                        <ButtonBack style={{ marginRight: 10 }} onClick={onCloseModal}>Hủy</ButtonBack>
                        <ButtonNext onClick={onSubmitModal}>Đồng ý</ButtonNext>
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
