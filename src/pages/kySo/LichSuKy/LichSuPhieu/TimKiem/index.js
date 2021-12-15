import { Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import "./styled.css";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
const TimKiem = (props) => {
  const { dsKhoId = [] } = useSelector(
    (state) => state.danhSachPhieuChoKy
  );
  const {
    danhSachPhieuChoKy: { searchByParams, postTaoMoi },
    kho: { getTheoTaiKhoan, getAllTongHop: getAllKhoTongHop },
    nhanVien: { getListAllNhanVien },
    baoCao: { tongHop: baoCaotongHop },
  } = useDispatch();

  useEffect(() => {
    getAllKhoTongHop({});
    getTheoTaiKhoan();
    getListAllNhanVien();
    baoCaotongHop();
  }, []);

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const history = useHistory();

  const onSearchInput = (key) => (e) => {
    // let value = "";
    // if (e.length > 0) {
    //   value = e;
    // }
    if (key === "khoId") {
      searchByParams({ dsKhoId: e });
    }
    if (key === "baoCaoId") {
      searchByParams({ baoCaoId: e });
    }
  };
  const onKeyDown = (e) => {
    if (dsKhoId.length === 0) {
      message.error("Vui lòng chọn kho để quét đơn");
      return null;
    }
    if (dsKhoId.length > 1) {
      message.error("Chỉ chọn 1 kho để quét đơn");
      return null;
    }

    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (e.key === "Enter") {
      handleSearchBN(value);
    }
  };
  const onChangeSearch = (key, needEnter) => (e, item) => {
    if (dsKhoId.length > 1 || dsKhoId.length === 0) {
      return null;
    }
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "qrBN") {
      if (/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
  };
  const handleSearchBN = debounce((value) => {
    const { qrBN = "" } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str)) {
      param = { maHoSo: Number(str) };
    } else {
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maHoSo");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res.length) {
        if (res[0].length >= 10) {
          param = { maHoSo: Number(res[0]) };
        }
      }
    }
    if (param?.maHoSo || param?.soPhieu) {
      // Search info nb
      // param.isSingleSearch = true;
      param.sort = "id,desc";
      param.dsKhoId = dsKhoId.length > 0 ? dsKhoId : null;
      const obj = {
        khoId: param.dsKhoId && param.dsKhoId[0], //103
        nbDotDieuTri: {
          maHoSo: param.maHoSo, //"2108090025"
        },
      };
      postTaoMoi(obj)
        .then((s) => {
          if (!s.length) {
            // notifiNotSearch();
          }
          history.push(`/kho/nha-thuoc/chi-tiet/${s.phieuXuatId}`);
        })
        .catch((e) => {
          // notifiNotSearch();
        });
      // onSearch(param)
      //   .then((s) => {
      //     if (!s.length) {
      //       // notifiNotSearch();
      //     }
      //     history.push(`/kho/nha-thuoc/chi-tiet/${s[0].id}`);
      //   })
      //   .catch((e) => {
      //     notifiNotSearch();
      //   });
    } else {
      // if (str) {
      //   notifiNotSearch();
      // } else message.error("Vui lòng nhập thông tin tìm kiếm!");
    }
  }, 1000);
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Lịch sử ký chi tiết</label>
            {/* <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nha-thuoc/them-moi");
              }}
            >
              <span>Thêm mới</span>
              <img src={IcCreate} />
            </Button> */}
          </div>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
