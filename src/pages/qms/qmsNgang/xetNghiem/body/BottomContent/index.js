import React from "react";
// import SlideText from "@admin/components/admin/SlideText";
import { Carousel } from 'antd';
import SlideText from "pages/qms/components/SlideText";

function BottomContent(props) {
  const { dsDaXacNhan, dsChoXacNhan, dsGoiNho} = props;

  const render = (data, type) => {
    // const dataSlice = isArray(data) ? data.slice(0, 4) : [];
    return (data || []).map((nb) => {
      const { id, stt, tenNb, tuoi } = nb || {};
      return (
        <div className="box-item" key={id}>
          <div className="box-item__left">
           {!type && <div className="box-item__number">
              <span>{stt}</span>
            </div>
              } 
             <SlideText className="box-item__name">
              <span>{tenNb}</span>
            </SlideText>
          </div>
          <div className="box-item__old">
            <span>{tuoi && `${tuoi} tuổi`}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bottom-content">
      <div className="bottom-box">
        <div className="bottom-box__header">
          <div className="bottom-box__title">{ `ĐÃ XÁC NHẬN - ${dsDaXacNhan?.length}NB`}</div>
        </div>
        {dsDaXacNhan && dsDaXacNhan.length > 4
          ? <Carousel
            className="bottom-box__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={3000}
            autoplay
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsDaXacNhan)}
          </Carousel>
          : <div className="bottom-box__body"> {render(dsDaXacNhan)}</div>}
      </div>
      <div className="bottom-box bottom-box--bg">
        <div className="bottom-box__header">
          <div className="bottom-box__title">{`CHỜ XÁC NHẬN - ${dsChoXacNhan?.length}NB`}</div>
        </div>
        {dsChoXacNhan && dsChoXacNhan.length > 4
          ? <Carousel
            className="bottom-box__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={3000}
            autoplay
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsChoXacNhan)}
          </Carousel>
          : <div className="bottom-box__body">{render(dsChoXacNhan, "ChoXacNhan")}</div>}
      </div>
      <div className="bottom-box-ignore bottom-box-ignore--bg">
        <div className="bottom-box-ignore__header">
          <div className="bottom-box-ignore__title">{`BỆNH NHÂN GỌI NHỠ - ${dsGoiNho?.length}NB`}</div>
        </div>
        {dsGoiNho && dsGoiNho.length > 4
          ? <Carousel
            className="bottom-box-ignore__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={3000}
            autoplay
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsGoiNho)}
          </Carousel>
          : <div className="bottom-box-ignore__body">{render(dsGoiNho, "GoiNho")}</div>}
      </div>
    </div>
  );
}
export default BottomContent;