import React, { useEffect, useState } from "react";
import { MainData, MainModal } from "./styledModal";
import './style.scss';
import moment from "moment";
import { withTranslate } from 'react-redux-multilingual';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
function index(props) {
    const { translate, onSearchQuanHuyen, onSearchXaPhuong, anhDaiDien, show, updateData, dataHistory, donViId, updateDataPost, searchAllQuestions, historyCheckin } = props;
    console.log(props);
    const [screenWidth,setScreenWidth] = useState(false);
    const [showModal,setShowModal] = useState(true);
    const handleClose = () => {
        updateData({
            showPopupData: false
        })
    };
    const update = (item) => {

        let data = item.ttHanhChinh || {};
        let date = "";
        let arr = data.ngaySinh && data.ngaySinh.split("-");
        if (arr && arr.length === 3) {
            date = arr[2] + "/" + arr[1] + "/" + arr[0];
        }
        if (data.tinhThanhPhoId) {
            onSearchQuanHuyen(data.tinhThanhPhoId);
        }
        if (data.quanHuyenId) {
            onSearchXaPhuong(data.quanHuyenId);
        }
        if (data.ma) {
            historyCheckin({ma: data.ma, page: 0});
        }
        updateData({
            ttHanhChinh: item.ttHanhChinh,
            checkin: item,
            id: data.id,
            hoVaTen: data.hoVaTen,
            soCanCuoc: data.soCanCuoc,
            ngaySinh: date,
            ngheNghiepId: data.ngheNghiepId,
            nguoiBaoHo: data.nguoiBaoHo,
            gioiTinh: (data.gioiTinh && data.gioiTinh.toString()) || "1",
            soDienThoai: data.soDienThoai,
            sdtNguoiBaoHo: data.sdtNguoiBaoHo,
            quocTichId: data.quocTichId || 22,
            quanHuyenId: data.quanHuyenId,
            soNha: data.soNha,
            tinhThanhPhoId: data.tinhThanhPhoId,
            quanHuyenId: data.quanHuyenId,
            xaPhuongId: data.xaPhuongId,
            anhDaiDien: anhDaiDien ? anhDaiDien : item.anhDaiDien,
            ma: data.ma,
            // ngayCheckIn: item.ngayCheckIn,
            showPopupData: false,
            // donViId: item.donViId ? item.donViId : auth.donViId,
            // khuVucId: item.khuVucCheckInId ? item.khuVucCheckInId : auth.khuVucId,
        });
        let ngayDen = item.ngayCheckIn && moment(item.ngayCheckIn).format("YYYYMMDD")
        let nowDate = moment(new Date()).format("YYYYMMDD")
        if ((donViId === (item.donVi || {}).id) && item.trangThai != 30) {
            searchAllQuestions(donViId, item.khuVucCheckInId, item.doiTuongId);
            updateData({
                thongTinDoiTuongLienHe: item.thongTinDoiTuongLienHe,
                doiTuongId: item.doiTuongId,
                doiTuongMa: item.doiTuong && item.doiTuong.ma,
                answer: item.khaiBaoYTe && item.khaiBaoYTe.traLoi,
                idCheck: data.id
            });
        } else {
            updateData({
                doiTuongId: "",
                doiTuongMa: "",
                answer: [],
                thongTinDoiTuongLienHe: "",
                idCheck: ""
            });
            updateDataPost({ dataQuestions: {} });
        }
    }
    useEffect(()=>{
        if (window.innerWidth > 1100)
        {
            setScreenWidth(true);
        }
        else {
            setScreenWidth(false);
        }
    },[window.innerWidth]);
console.log(screenWidth);
    return (
        // <MainData
        //     visible={show}
        //     onCancel={handleClose}
        //     title={translate("chonthongtinnguoibenh")}
        //     className="modal-data"
        //     style={{ width: 800 }}
        //     footer={[
        //         <div onClick={handleClose}>{translate("no")}</div>
        //     ]}
        // >
        //     <div className="body-data">
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <td>{translate("stt")}</td>
        //                     <td>{translate("donvi")}</td>
        //                     <td>{translate("ngaycheckin")}</td>
        //                     <td>{translate("hovaten")}</td>
        //                     <td>{translate("makhach")}</td>
        //                     <td>{translate("sdt")}</td>
        //                     {/* <td>Là số điện thoại người thân</td> */}
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {dataHistory && dataHistory.length ? dataHistory.map((item, index) => {
        //                     return (
        //                         <tr
        //                             className="table-name"
        //                             key={index}
        //                             onClick={() => update(item)}
        //                         >
        //                             <td>{index + 1}</td>
        //                             <td>{item.donVi && item.donVi.ten}</td>
        //                             <td>{item.ngayCheckIn && moment(item.ngayCheckIn).format("DD/MM/YYYY HH:ss")}</td>
        //                             <td>{item.ttHanhChinh && item.ttHanhChinh.hoVaTen}</td>
        //                             <td>{item.ttHanhChinh && item.ttHanhChinh.ma}</td>
        //                             <td>{item.ttHanhChinh && item.ttHanhChinh.soDienThoai}</td>
        //                             {/* <td>{item.ttHanhChinh && item.ttHanhChinh.laSoDienThoaiNguoiThan
        //                                 ? <i className="fal fa-check-circle" style={{ color: "red", fontSize: 17, fontWeight: "bold" }}></i>
        //                                 : null}</td> */}
        //                         </tr>
        //                     )
        //                 }) : null}
        //             </tbody>
        //         </table>

        //     </div>
        // </MainData>
    <MainModal
    visible={showModal}
        onCancel={handleClose}
        title={translate("chonthongtinnguoibenh")}
        className="modal-detail"
        closable={screenWidth}
        footer={null}>
        <div
        className="table-body"
    >
        {!screenWidth &&
        <div className="modal-top">
            <button
            onClick={() => setShowModal(false)}
            >
                <img src="../img/backIcon.png"></img>
            </button>
            <span>Tìm kiếm Khách Hàng</span>
            <button>
                <img src="../img/detailIcon.png"></img>
            </button>
        </div>}
            <table>
                     <thead>
                         <tr>
                             <td style={{width:"5vw"}}>{translate("stt")}</td>
                             {screenWidth && <td style={{width:"22vw"}}>{translate("donvi")}</td>}
                             <td style={{width:"30vw"}}>{translate("thongtinkhachhang")}</td>
                             {screenWidth && <td style={{width:"14vw"}}>Số ĐT/CMT</td> }
                             {screenWidth && <td>Mã khách</td>}
                             {/* <td>Là số điện thoại người thân</td> */}
                         </tr>
                     </thead>
                     <tbody>
                         {dataHistory && dataHistory.length ? dataHistory.map((item, index) => {
                            return (
                                <tr
                                    className="table-name"
                                    key={index}
                                    onClick={() => update(item)}
                                >
                                    <td>{index + 1}</td>
                                    {screenWidth && 
                                    <td>
                                        <p className="name-bold">
                                        {item.donVi && item.donVi.ten}
                                        </p>
                                        <p className="Modal-checkIn">
                                            {item.ngayCheckIn && moment(item.ngayCheckIn).format("HH:ss - DD/MM/YYYY ")}
                                        </p>
                                    </td>
                                    }
                                    {screenWidth ?
                                        <td>
                                            <p className="name-bold">
                                            {item.ttHanhChinh && item.ttHanhChinh.hoVaTen}
                                            {item.ttHanhChinh && 
                                            ((item.ttHanhChinh.gioiTinh == 1)? 
                                            <img src="../img/male.png"></img>
                                            :  <img src="../img/female.png"></img> )
                                            } 
                                            </p>
                                            <span>
                                            {item.ttHanhChinh && 
                                            item.ttHanhChinh.ngaySinh && 
                                            moment(item.ttHanhChinh.ngaySinh).format("DD/MM/YYYY ")}
                                            </span>
                                            <p>
                                            {item.ttHanhChinh && item.ttHanhChinh.soNha + " , "}
                                            {item.ttHanhChinh && item.ttHanhChinh.xaPhuong && item.ttHanhChinh.xaPhuong.ten + " , " }
                                            {item.ttHanhChinh && item.ttHanhChinh.quanHuyen && item.ttHanhChinh.quanHuyen.ten + " , " }
                                            {item.ttHanhChinh && item.ttHanhChinh.tinhThanhPho && item.ttHanhChinh.tinhThanhPho.ten}
                                            </p>
                                        </td>
                                    : 
                                    <td>
                                        <p className="name-bold">
                                        {item.donVi && item.donVi.ten + "  "}
                                        </p>
                                        <p className="Modal-checkIn name-bold" >
                                            {item.ngayCheckIn && moment(item.ngayCheckIn).format("HH:ss DD/MM/YYYY ")}
                                        </p>
                                        <br></br>
                                        <p className="name-bold">
                                            {item.ttHanhChinh && item.ttHanhChinh.hoVaTen}
                                            {item.ttHanhChinh && 
                                            ((item.ttHanhChinh.gioiTinh == 1)? 
                                            <img src="../img/male.png"></img>
                                            :  <img src="../img/female.png"></img> )
                                            } 
                                        </p>
                                        <p>
                                        {item.ttHanhChinh && 
                                        item.ttHanhChinh.ngaySinh && 
                                        moment(item.ttHanhChinh.ngaySinh).format("DD/MM/YYYY ")}
                                        </p>
                                        <p>
                                            Đ/c:
                                        {item.ttHanhChinh && item.ttHanhChinh.soNha + " , "}
                                        {item.ttHanhChinh && item.ttHanhChinh.xaPhuong && item.ttHanhChinh.xaPhuong.ten + " , " }
                                        {item.ttHanhChinh && item.ttHanhChinh.quanHuyen && item.ttHanhChinh.quanHuyen.ten + " , " }
                                        {item.ttHanhChinh && item.ttHanhChinh.tinhThanhPho && item.ttHanhChinh.tinhThanhPho.ten}
                                        </p>
                                        <p>
                                            {item.ttHanhChinh && item.ttHanhChinh.soDienThoai && "SĐT: "+item.ttHanhChinh.soDienThoai + "  "}
                                        </p>
                                        <p>
                                            {item.ttHanhChinh && item.ttHanhChinh.soCanCuoc   && "CMT: "+item.ttHanhChinh.soCanCuoc}
                                        </p>
                                    </td>
                                    }

                                    {screenWidth && 
                                    <td>
                                        <p>
                                            {item.ttHanhChinh && item.ttHanhChinh.soDienThoai && "SĐT: "+item.ttHanhChinh.soDienThoai}
                                        </p>
                                        <p>
                                            {item.ttHanhChinh && item.ttHanhChinh.soCanCuoc   && "CMT: "+item.ttHanhChinh.soCanCuoc}
                                        </p>
                                    </td>
                                    }
                                    {screenWidth && 
                                    <td>{item.ttHanhChinh && item.ttHanhChinh.ma}</td>}
                                    {/* <td>{item.ttHanhChinh && item.ttHanhChinh.laSoDienThoaiNguoiThan
                                        ? <i className="fal fa-check-circle" style={{ color: "red", fontSize: 17, fontWeight: "bold" }}></i>
                                        : null}</td> */}
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
        </div>
    </MainModal>
    );
}

export default withTranslate(index);
