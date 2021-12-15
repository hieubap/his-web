import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { MainTheKhach } from "./styledModal";
import { withTranslate } from 'react-redux-multilingual';
import PrintTheKhach from './PrintTheKhach';
import Iframe from 'react-iframe';
import moment from "moment";
function index(props, ref) {
    const refCallback = useRef(null);
    const { translate, clearData, form, updateData, searchDoiTuong, auth, getAllKhoa, setting } = props;
    const [state, _setState] = useState({});
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    useImperativeHandle(ref, () => ({
        show: (data, callback) => {
            setState({
                show: true,
                hidePrintGuestCard: true,
                donViId: data.donViId,
                dataDonVi: data.dataDonVi,
                hoVaTen: data.hoVaTen,
                soCanCuoc: data.soCanCuoc,
                ma: data.ma,
                ngaySinh: data.ngaySinh,
                ngayCheckIn: data.ngayCheckIn,
                qrcodeBarcode: data.qrcodeBarcode,
                phanLoai: data.phanLoai,
                checkInId: data.checkInId
            });
            refCallback.current = callback;
        },
    }));
    const handleClose = (data) => {
        clearData();
        form.resetFields();
        if (data) {
            setState({
                show: false
            });
        }
        updateData({
            ngayCheckIn: new Date(),
            gioiTinh: "1",
            quocTichId: 22,
            donViId: auth.donViId,
            khuVucId: auth.khuVucId
        })
        searchDoiTuong(auth.donViId, auth.khuVucId, true).then((s) => {
            updateData({ listDoiTuong: s.data });
        });
        setting(auth.donViId);
        getAllKhoa(auth.donViId);
        if (refCallback.current) refCallback.current(data);
    };
    const printGuestCard = () => {
        setState({ printTheKhach: true });
    }
    // const url=window.location.origin + `/print-the-khach?ma=${state.ma ? state.ma :
    //     ""}&qrcodeBarcode=${state.qrcodeBarcode ? state.qrcodeBarcode :
    //         ""}&donViTen=${state.donViTen ? state.donViTen :
    //             ""}&hoVaTen=${state.hoVaTen ? state.hoVaTen :
    //                 ""}&soCanCuoc=${state.soCanCuoc ? state.soCanCuoc :
    //                     ""}&ngaySinh=${state.ngaySinh ? state.ngaySinh :
    //                         ""}&ngayCheckIn=${state.ngayCheckIn ? moment(state.ngayCheckIn).format("DD/MM/YYYY HH:mm") :
    //                             ""}&phanLoai=${state.phanLoai ? state.phanLoai : ""}`
    // console.log(url);
    return (
        <>
            <MainTheKhach
                visible={state.show}
                onCancel={handleClose}
                onOk={printGuestCard}
                title={translate("the_khach")}
                className="modal-guest-card"
                okText={translate("in_phieu")}
                cancelText={translate("no")}
            >
                {state.hidePrintGuestCard ? <PrintTheKhach
                    hidePrintGuestCard={state.hidePrintGuestCard}
                /> : null}
            </MainTheKhach>
            {state.printTheKhach &&
                <Iframe
                    url={window.location.origin + `/print-the-khach?ma=${state.ma ? state.ma :
                        ""}&qrcodeBarcode=${state.qrcodeBarcode ? state.qrcodeBarcode :
                            ""}&donViTen=${state.donViTen ? state.donViTen :
                                ""}&hoVaTen=${state.hoVaTen ? state.hoVaTen :
                                    ""}&soCanCuoc=${state.soCanCuoc ? state.soCanCuoc :
                                        ""}&ngaySinh=${state.ngaySinh ? state.ngaySinh :
                                            ""}&ngayCheckIn=${state.ngayCheckIn ? moment(state.ngayCheckIn).format("DD/MM/YYYY HH:mm") :
                                                ""}&phanLoai=${state.phanLoai ? state.phanLoai : ""}`}
                    width="0px"
                    height="0px"
                    id="import-ticket-store"
                    className="import-ticket-store"
                    display="block"
                    position="relative"
                    title="Thẻ Khách"
                />}
        </>
    );
}

export default withTranslate(forwardRef(index));
