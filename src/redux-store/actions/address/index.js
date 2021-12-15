import addressProvider from "@data-access/address-provider";
import cacheProvider from '@data-access/datacache-provider';

function updateData(data) {
  return dispatch => {
    dispatch({
      type: "ADDRESS-UPDATE-DATA",
      data: data
    });
  };
}
function onSearchQuocGia(page, size) {
  return (dispatch, getState) => {
    let data = cacheProvider.read("", "QUOC_GIA", []);
    dispatch(updateData({
      data
    }));

    addressProvider.search(page, size).then(s => {
      if (s && s.code === 0) {
        cacheProvider.save("","QUỐC GIA",s.data || [])
        dispatch(
          updateData({
            data: s.data || []
          })
        );
      }
    });
  };
}
function onSearchTinhTp(page, size) {
  return (dispatch, getState) => {
    let data = cacheProvider.read("", "TINH_THANH", []);
    dispatch(updateData({
      dataTinhTp: data
    }));
    addressProvider.searchTinhTp(page, size).then(s => {
      if (s && s.code === 0) {
        cacheProvider.save("","TINH_THANH",s.data || [])
        dispatch(
          updateData({
            dataTinhTp: s.data || []
          })
        );
      }
    });
  };
}
function onSearchQuanHuyen(tinhThanhPhoId, page, size) {
  return (dispatch, getState) => {
    let data = cacheProvider.read(tinhThanhPhoId, "QUAN_HUYEN", []);
    dispatch(updateData({
      dataQuanHuyen: data
    }));
    addressProvider.searchQuanHuyen(tinhThanhPhoId, page, size).then(s => {
      if (s && s.code === 0) {
        cacheProvider.save(tinhThanhPhoId,"QUAN_HUYEN",s.data || []);
        dispatch(
          updateData({
            dataQuanHuyen: s.data || []
          })
        );
      }
    });
  };
}
function onSearchXaPhuong(quanHuyenId, page, size) {
  return (dispatch, getState) => {
    let data = cacheProvider.read(quanHuyenId, "XA_PHUONG", []);
    dispatch(updateData({
      dataXaPhuong: data
    }));
    addressProvider.searchXaPhuong(quanHuyenId, page, size).then(s => {
      if (s && s.code === 0) {
        cacheProvider.save(quanHuyenId,"XA_PHUONG",s.data || []);
        dispatch(
          updateData({
            dataXaPhuong: s.data || []
          })
        );
      }
    });
  };
}

export default {
  updateData,
  onSearchQuocGia,
  onSearchQuanHuyen,
  onSearchTinhTp,
  onSearchXaPhuong
};
