import React,{useEffect} from 'react'
import actionTtHanhChinh from "@actions/ttHanhChinh";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { Main } from "./styled";
import clientUtils from '@utils/client-utils';
import {
    useLocation
  } from "react-router-dom";
  const CheckInHistory =(props)=> {
      const location = useLocation();
      const query =new URLSearchParams(location.search);        
    
    useEffect(() => {
        const access_token = query.get("access_token");
        const soDienThoai = query.get("soDienThoai");
        const donViMa = query.get("donViMa");
        if(access_token)
        {
            clientUtils.auth = "Bearer "+query.get("access_token");
            if(props.history)
            {
                props.history.push(`/lich-su-check-in?soDienThoai=${soDienThoai}&donViMa=${donViMa}`)
            }
            return;
        }
        if(query.get("soDienThoai"))
        props.historyCheckin({timKiem: query.get("soDienThoai")})
        setTimeout(() => {
            const recaptchaElems = document.getElementsByClassName('grecaptcha-badge');
            if (recaptchaElems.length) {
                recaptchaElems[0].remove();
            }                
        }, 500);
    }, [])

    return (
        <Main>
            <div className="top-header">
                Lịch sử khai báo
            </div>
            {props.dataHistory.map((item,index)=>{
                if(!item.ngayCheckIn || !item.donVi)
                return null;
                if(query.get("donViMa") && query.get("donViMa")!==item.donVi.ma)
                return null;
                return <div className="history-item" key={index}>
                    <div className="history-header">
                        <p className="checkin-date">{item.ngayCheckIn.toDateObject().format("Ngày: dd/MM/yyyy - HH:mm")}</p>
                        <img src={item.phanLoai===10?require("@images/svg/batthuong.png"):require("@images/svg/binhthuong.png")}/>
                    </div>
                    <div className="history-body">
                        <p className="history-donvi">Họ tên: {item.ttHanhChinh.hoVaTen}</p>
                        <p className="history-donvi">Mã khách: {item.ttHanhChinh.ma}</p>
                        <p className="history-donvi">{item.donVi.ten}</p>
                        <p className={`history-status ${item.phanLoai===10?"bat-thuong":"binh-thuong"}`}>{item.phanLoai===10?"Trạng thái: Bất thường":"Trạng thái: Bình thường"}</p>
                    </div>
                </div>
            })}
        </Main>
    )
}
export default connect(
    (state) => {
      return {
        auth: (state.auth && state.auth.auth) || {},
        dataHistory: state.ttHanhChinh.dataHistory || []
      };
    },
    {
      updateData: actionTtHanhChinh.updateData,
      historyCheckin: actionTtHanhChinh.historyCheckin,  }
  )(withTranslate(CheckInHistory));
  
  
