import React, {
  useState,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import { Select } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import { Element, scroller, Events, animateScroll as scroll, scrollSpy, Link } from "react-scroll";

const { Option } = Select;
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.js`;

const XemTruoc = ({
  selectedIds,
  listPhieu,
  updateData,
  getDataDanhSachPhieu,
  ...props
}, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (type) => (e) => {
    const value = e.target ? e.target?.value : e;
    setState({ type: value });
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({
      numPages: numPages,
    });
  };
  const onDocumentComplete = (pages) => {
    setState({
      pageNumber: 1,
      numPages: pages,
    });
  };
  const onPageComplete = (page) => {
    setState({
      pageNumber: page,
    });
  };

  useEffect(() => {
    if (selectedIds) {
      const dsPhieuPreview = listPhieu?.filter(x => selectedIds?.includes(x?.id));
      const dsFilePdf = dsPhieuPreview?.reduce((acc, item) => {
        acc = [...acc, ...item.filePdf];
        return acc;
      }, []);
      setState({ dsFilePdf });
    }
  }, [selectedIds, state.mode]);

  useEffect(() => {
    if (state.dsFilePdf && state.dsFilePdf?.length > 0) {
      getDataDanhSachPhieu({ dsFile: state.dsFilePdf, mode: state.mode })
        .then((s) => setState({ urlFileLocal: s, pageNumber: 1 }));
    }
    else { setState({ urlFileLocal: "" }) }
  }, [state.dsFilePdf]);

  return (
    <Main className="bg">
      <div className="header">
        <div className="title">Phiếu 1</div>
        <div className="mode">
          <Select
            value={state.mode} defaultValue={0}
            onChange={onChange("mode")}
          >
            <Option value={0}>Xem phiếu đã ký mới nhất</Option>
            <Option value={1}>Xem phiếu chưa ký mới nhất</Option>
          </Select>
        </div>
      </div>
      <div className="container">
        <Element
          name="stepwrapper"
          className="element section-body"
          id="containerElementPdf"
          style={{
            position: "relative",
            height: `calc(100vh - 255px)`,
            overflowY: "scroll",
          }}
        >
          {state.urlFileLocal && ( // state.urlFileLocal là blob
            <Document
              className="docs"
              file={state.urlFileLocal}
              onLoadSuccess={onDocumentLoadSuccess}
              onDocumentComplete={onDocumentComplete}
              onPageComplete={onPageComplete}
              onLoadError={console.log}
              height={200}
            >
              {/* <Page pageNumber={state.pageNumber} /> */}
              {/* <Page pageNumber={state.numPages} /> */}

              {Array.apply(null, Array(state.numPages))
                .map((x, i) => i + 1)
                .map(page => {
                  return (
                    <Link
                      // className={`${elementKey == itemKey ? "active" : ""}`}
                      activeClass="active"
                      to={page}
                      spy={true}
                      smooth={true}
                      isDynamic={true}
                      duration={250}
                      containerId="containerElementPdf"
                      offset={-100}
                      onSetActive={(key, element, onClick) => {
                        updateData({
                          elementScrollingPdfKey : key
                        })
                      }}>
                      <Element name={page} className="element element-page" >
                        <Page pageNumber={page} />
                      </Element>
                    </Link>
                  )
                }
                )}
            </Document>
          )}
        </Element>
      </div>
    </Main>
  );
};

export default connect(
  (state) => {
    return {
      selectedIds: state.tiepDonDichVu.selectedIds || [],
      listPhieu: state.tiepDonDichVu.listPhieu || [],
      elementScrollingPdfKey: state.tiepDonDichVu.elementScrollingPdfKey || [],
    };
  },
  ({
    tiepDonDichVu: { getDataDanhSachPhieu, updateData },
  }) => ({
    getDataDanhSachPhieu,
    updateData,
  }),
  null,
  { forwardRef: true }
)(forwardRef(XemTruoc));
