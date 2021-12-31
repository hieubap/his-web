import React, { useRef, useState, useEffect, memo } from "react";
import { Tag, Checkbox } from "antd";
import { VariableSizeList as CustomVirtualizeList } from "react-window";
import { RightOutlined } from "@ant-design/icons";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper, BlankContentWrapper } from "./styled";

const TableLoaiDV = ({
  hasChildren = false,
  data = [],
  onSelected,
  thanhTien,
  checkAll,
  onSelectedAll,
  indeterminate,
  listGoiDv,
  getDvChiTiet,
  listSelected,
  disableChiDinh,
  handleCloseTag,
  dataNb
}) => {
  const listRef = useRef();
  const [activeLink, setActiveLink] = useState(-1);
  const getItemSize = () => 50;
  const onCloseTag = (value) => () => {
    const listUpdatedTag = listSelected.filter(
      (item) => item.dichVuId !== value
    );
    handleCloseTag(listUpdatedTag);
  };

  useEffect(() => {
    if (!listSelected.length) {
      setActiveLink(-1);
    }
  }, [listSelected]);

  const handleSelect = (idx) => (e) => {
    onSelected(idx, e.target.checked);
  };

  const RowItems = ({ index, style }) => {
    const currentRow = data[index];
    const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
    const giaBaoHiem = (currentRow.giaBaoHiem || 0).formatPrice();
    const giaPhuThu = (currentRow.giaPhuThu || 0).formatPrice();
    const donGia = `${giaKhongBaoHiem} | BH: ${giaBaoHiem} | Phụ thu: ${giaPhuThu}`;

    return (
      <div
        className={index % 2 ? "item-odd row-item" : "item-even row-item"}
        onClick={handleSelect(index)}
        style={style}
      >
        <div className="left-box">
          <Checkbox
            checked={
              !!listSelected.find(
                (item) => item.uniqueKey === currentRow.uniqueKey
              )
            }
          />
        </div>
        <div className="right-box">
          <div className="name">
            <b>{currentRow?.ten}</b>
          </div>
          <div className="desc">{donGia}</div>
        </div>
      </div>
    );
  };

  const onSelectDv = (dichVuId, idx) => (e) => {
    setActiveLink(idx);
    getDvChiTiet(dichVuId);
    e.preventDefault();
  };

  const onCheckAll = (e) => {
    onSelectedAll(
      e,
      data.map((item) => item.uniqueKey)
    );
  };

  return (
    <BoxWrapper>
      {hasChildren && (
        <div className="content-equal-w">
          <ul className="list-item">
            {listGoiDv.map((item, idx) => (
              <li
                className={`name-item ${
                  activeLink === idx ? `active-item` : ""
                }`}
                onClick={onSelectDv(item.dichVuId, idx)}
                key={item.dichVuId}
              >
                {item.ten} <RightOutlined className="arrow-icon" />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="content-equal-w">
        <div className="title-table">Dịch vụ</div>
         <>
          <div className="checkall">
            {data.length > 0 && (
              <>
                <Checkbox
                  checked={checkAll}
                  onChange={onCheckAll}
                  indeterminate={indeterminate}
                />
                <span className="text">Chọn tất cả</span>
              </>
            )}
          </div>

          <CustomVirtualizeList
            height={400}
            itemCount={data.length}
            itemSize={getItemSize}
            width={`calc(100% - 7px)`}
            ref={listRef}
            className="custom-list"
            >
            {RowItems}
          </CustomVirtualizeList>
         </>
        </div>
      <div className="content-equal-w">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> Đã chọn
          </div>
          <div className="title__right">
            Tổng tiền: {(thanhTien || 0).formatPrice()} đ
          </div>
        </div>
        <div className="content-body">
          {!listSelected.length || listSelected.length === 0 ? (
            <BlankContentWrapper>
              <div>
                {!!dataNb && (dataNb.cdSoBo?.length > 0 || dataNb.dsCdChinhId.length > 0)
                  ? "Yêu cầu nhập chỉ định dịch vụ"
                  : "Yêu cầu nhập chẩn đoán trước khi cho chỉ định"
                  }
              </div>
            </BlankContentWrapper>
          ) : (
            <>
              {listSelected.map((item) => (
                <Tag
                  key={item.uniqueKey}
                  className="custom-tag"
                  color="green"
                  closable
                  onClose={onCloseTag(item.dichVuId)}
                >
                  {item.ten}
                </Tag>
              ))}
            </>
          )}
        </div>
      </div>
    </BoxWrapper>
  );
};

export default memo(TableLoaiDV);
