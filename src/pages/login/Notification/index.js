import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Collapse } from "antd";
import { WrapperPanel } from "../LayOut/divInner";
import { Main } from "./styled";
const { Panel } = Collapse;
const Index = (props) => {
  const { listThongBaoKhanCap, searchThongBao, totalElements20 } = props;

  useEffect(() => {
    searchThongBao({
      page: 0,
      size: 5,
      active: true,
      loaiThongBao: 10,
      isLoadMore: false,
      sort: "createdAt,desc",
    });
    console.log("sdsdsd  = " + listThongBaoKhanCap);
  }, []);

  const [page, setPage] = useState(0);
  const onScroll = (e) => {
    let obj = e.target;
    if (obj.scrollTop === obj.scrollHeight - obj.offsetHeight) {
      onLoadMore(true);
    }
  };

  function onLoadMore(isLoadMore) {
    if (listThongBaoKhanCap.length >= totalElements20) {
      return;
    }
    searchThongBao({
      page: page + 1,
      size: 5,
      active: true,
      loaiThongBao: 10,
      isLoadMore: isLoadMore,
      sort: "createdAt,desc",
    });
    setPage(page + 1);
  }

  const [activeKey, setActiveKey] = useState(0);
  const onViewIcon = (item) => {
    return require("assets/images/pagehome/icWarn.png");
  };
  const thongBaoComponent = listThongBaoKhanCap?.map((info, index) => {
    return (
      <Panel
        header={
          <WrapperPanel
            title={"Tin tức " + (index + 1)}
            description={info.noiDung}
            link=""
            icon={onViewIcon(index % 2)}
          />
        }
        key={index}
        className={
          index % 2 === 0 ? "content-right-panel" : "content-right-success"
        }
      ></Panel>
    );
  });

  return (
    <Main>
      <div className="content-right">
        <div className="title">Thông báo</div>
        <div
          id="notification"
          // style={{ maxHeight: "70vh", overflow: "auto" }}
          onScroll={onScroll}
        >
          <Collapse
            defaultActiveKey={[activeKey]}
            onChange={(e) => {
              setActiveKey(e);
            }}
            expandIconPosition={"right"}
            className="content-right-wrapper"
          >
            {thongBaoComponent}
          </Collapse>
        </div>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    thongBao: { listThongBaoKhanCap: listThongBaoKhanCap, totalElements20 },
  } = state;
  return { listThongBaoKhanCap, totalElements20 };
  console.log("sdsdsd" + listThongBaoKhanCap);
};

const mapDispatchToProps = ({ thongBao: { searchThongBao } }) => ({
  searchThongBao,
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
