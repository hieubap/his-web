import React, { useEffect, useState } from "react";
import { client, signerPath } from "client/request";
import { Tree, Icon } from "antd";
import moment from "moment";
import { Main } from "./styled";
import { connect } from "react-redux";
const { TreeNode } = Tree;
const HistorySigned = ({
  historySigned,
  getHistorySigned,
  maHoSo,
  loadFileSigned,
  soPhieu,
  formId,
  tenBieuMau,
  maBieuMau,
  getOriginFile,
  urlOriginFile,
  isRefresh,
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({
      ...state,
      ...data,
    }));
  };

  useEffect(() => {
    if (soPhieu || maBieuMau) {
      getHistorySigned({
        maHoSo: maHoSo,
        soPhieu: soPhieu,
        maBieuMau,
      });
      setState({
        key: [],
      });
    }
  }, [soPhieu, maHoSo]);

  useEffect(() => {
    if (historySigned.length) {
      viewPdfSigned(historySigned[0][0])();
    } else {
      setState({
        key: [],
      });
    }
  }, [historySigned]);

  const viewPdfSigned = (item) => () => {
    if (!item) return;
    loadFileSigned({ prefix: signerPath, url: item.fileSauKy });
    setState({
      key: [item?.id + ""],
    });
  };

  const onViewOriginal = () => {
    if (urlOriginFile) {
      loadFileSigned({ prefix: "", url: urlOriginFile });
    } else if (historySigned?.length && historySigned[0]?.length) {
      getOriginFile(historySigned[0][0]);
    }
    setState({
      key: ["0-0"],
    });
  };
  return (
    <Main>
      <h4 className="title-history">Lịch sử ký</h4>
      <Tree
        switcherIcon={<Icon type="down" />}
        showIcon={false}
        autoExpandParent={true}
        selectedKeys={state.key}
      >
        <TreeNode
          className="new-item"
          title={
            <div onClick={onViewOriginal} className="item-child">
              <span className="user">{tenBieuMau} </span>
              <p className="date">
                {moment().format("hh:mm - DD/MM/YYYY")}
                <span className="type">- Chưa ký</span>
              </p>
            </div>
          }
          key={"0-0"}
        />

        {historySigned.length > 0 &&
          historySigned.map((item) => {
            if (!item || !item.length || !item[0]) return null;
            return (
              <TreeNode
                title={
                  <div className="item-child" onClick={viewPdfSigned(item[0])}>
                    <span className="user">{item[0].tenBieuMau} </span>
                    <p className="date">
                      {moment(item[0].actDate).format("hh:mm - DD/MM/YYYY")}
                    </p>
                  </div>
                }
                key={item[0].id}
              >
                {item.length > 0 &&
                  item.map((child) => {
                    return (
                      <TreeNode
                        title={
                          <div
                            className="item-child"
                            onClick={viewPdfSigned(child)}
                          >
                            <span className="date">
                              {moment(child.ngayKy).format(
                                "hh:mm - DD/MM/YYYY"
                              )}
                            </span>
                            {/* <span className="user"> - {child.username} - </span> */}
                            <span className="type">
                              {child.loaiKy === 1 ? "Ký ĐT" : "Ký Số"}
                            </span>
                          </div>
                        }
                        key={child.id}
                      />
                    );
                  })}
              </TreeNode>
            );
          })}
      </Tree>
    </Main>
  );
};

const mapState = (state) => ({
  historySigned: state.signer.historySigned,
  fileSigned: state.signer.fileSigned,
});
const mapDispatch = ({
  signer: { getHistorySigned, loadFileSigned, getOriginFile },
}) => ({
  getHistorySigned,
  loadFileSigned,
  getOriginFile,
});
export default connect(mapState, mapDispatch)(HistorySigned);
