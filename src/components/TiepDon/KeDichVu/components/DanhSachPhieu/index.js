import React, {
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import CustomButton from "components/TiepDon/CustomeButton"
import EditIcon from "assets/svg/tiep-don/editIcon.svg";
import PrintIcon from "assets/svg/tiep-don/printIcon.svg";
import printJS from "print-js";
import { Element, scroller, Events, animateScroll as scroll, scrollSpy, Link } from "react-scroll";
const DanhSachPhieu = ({
  listPhieu,
  updateDataTiepDonDV,
  getDataDanhSachPhieu,
  listkhoGiay,
  elementScrollingPdfKey,
  ...props
},ref) => {
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (type, value) => (e) => {
    if (type == "active") {
      const checked = e?.target?.checked;
      let ids = [];
      if (!checked) {
        ids = state.selectedIds?.filter(x => x != value);
        setState({ selectedIds: ids });
        updateDataTiepDonDV({ selectedIds: ids });
      }
      else {
        ids = [...state.selectedIds, value];
        setState({ selectedIds: ids });
        updateDataTiepDonDV({ selectedIds: ids });
      }
    }
  }

  const onCheckAll = (e) => {
    const checked = e?.target?.checked;
    if (!checked) {
      setState({ selectedIds: [] });
      updateDataTiepDonDV({ selectedIds: [] });
    }
    else {
      setState({
        selectedIds: state.dataIds,
      });
      updateDataTiepDonDV({ selectedIds: state.dataIds });
    }
  }

  const handlePrint = () => {
    const dsPhieuPreview = listPhieu?.filter(x => state.selectedIds?.includes(x?.id));
    const dsFilePdf = dsPhieuPreview?.reduce((acc, item) => {
      acc = [...acc, ...item.filePdf];
      return acc;
    }, []);
    getDataDanhSachPhieu({ dsFile: dsFilePdf, mode: 0 })
      .then((s) => {
        printJS({
          printable: s,
          type: "pdf",
        });
      })
  }

  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          sort_key="index"
        // // onClickSort={onClickSort}
        // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      width: 30,
      dataIndex: "index",
      hideSearch: true,
      align: "center"
    },
    {
      title: (
        <HeaderSearch
          title="Tên phiếu"
          sort_key="tenBaoCao"
        // // onClickSort={onClickSort}
        // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      width: 100,
      dataIndex: "tenBaoCao",
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title="Khổ giấy"
          sort_key="khoGiay"
        // // onClickSort={onClickSort}
        // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      render: (item, list) => {
        return listkhoGiay.find(itemKhoGiay => item === itemKhoGiay.id)?.ten
      },
      width: 50,
      dataIndex: "khoGiay",
      hideSearch: true,
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
        // // onClickSort={onClickSort}
        // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      width: 60,
      dataIndex: "trangThai",
      hideSearch: true,
    },
    {
      title: (
        <HeaderSearch
          title={(
            <Checkbox
              onClick={onCheckAll}
              checked={state.dataIds?.every((id) => state.selectedIds?.includes(id))}
            />
          )}
        // sort_key="ma"
        // // onClickSort={onClickSort}
        // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
        />
      ),
      width: 30,
      dataIndex: "id",
      hideSearch: true,
      align: "center",
      render: (value, item, index) => {
        return (
          <Checkbox
            onClick={onChange("active", value)}
            checked={state.selectedIds?.includes(value)}
            className="box-item"
          />
        );
      },
    },
  ];

  useEffect(() => {
    let ids = listPhieu?.map(x => x?.id);
    setState({
      data: listPhieu,
      dataIds: ids,
      selectedIds: ids,
    });
    updateDataTiepDonDV({ selectedIds: ids });
  }, [listPhieu]);

  useEffect(() => {

  }, []);

  const styleButton = {
    backgroundColor: "#0762F7",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    border: "none"
  };
  const setRowClassName = (record, index) => {
    return elementScrollingPdfKey === index + 1 ? "active" : "";
  };

  return (
    <Main className="bg">
      <div className="header">
        <div className="title">Danh sách phiếu</div>

      </div>
      <div className="container">
        <div className="__list">
          <TableWrapper
            scroll={{ y: 500, x: 0 }}
            rowKey={"key"}
            columns={columns}
            dataSource={state.data}
            rowClassName={setRowClassName}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  scroller.scrollTo(rowIndex + 1, {
                    duration: 500,
                    offset: -100,
                    smooth: "easeInOutQuint",
                    containerId: "containerElementPdf",
                  });
                  updateDataTiepDonDV({
                    elementScrollingPdfKey: rowIndex + 1
                  })
                }
              };
            }}
          />
        </div>
        <div className="__button">
          <CustomButton
            style={{ ...styleButton, width: "30%" }}
            title="Ký / Trình ký"
            icon={<PrintIcon />}
          />
          <CustomButton
            onClick={handlePrint}
            className="print"
            style={{ ...styleButton, width: "15%" }}
            title="In"
            icon={<EditIcon />}
          />
        </div>
      </div>
    </Main>
  );
};

export default connect(
  (state) => ({
    listPhieu: state.tiepDonDichVu.listPhieu || [],
    listkhoGiay: state.utils.listkhoGiay,
    elementScrollingPdfKey: state.tiepDonDichVu.elementScrollingPdfKey || [],
  }),
  ({
    tiepDonDichVu: { updateData: updateDataTiepDonDV, getDataDanhSachPhieu }
  }) => ({
    updateDataTiepDonDV,
    getDataDanhSachPhieu,
  }),
  null,
  { forwardRef: true }
)(forwardRef(DanhSachPhieu));
