import cacheUtils from "utils/cache-utils";
import xaTongHopProvider from "data-access/categories/dm-xa-tong-hop-provider";
import orderBy from "lodash/orderBy";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllData: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        let data = await cacheUtils.read("DATA_DIA_CHI", "", {}, false);
        dispatch.address.updateData(data);
        xaTongHopProvider.searchAll().then((s) => {
          let _listTinhTp = {};
          let _listQuanHuyen = {};
          let listXaPhuong = [];
          // let _listQuocGia = {};
          (s.data || []).forEach((item) => {
            if (!_listTinhTp[item.tinhThanhPho?.id]) {
              item.tinhThanhPho.quocGia = item.quocGia;
              _listTinhTp[item.tinhThanhPho?.id] = item.tinhThanhPho;
            }
            if (!_listQuanHuyen[item.quanHuyen?.id]) {
              item.quanHuyen.tinhThanhPho = item.tinhThanhPho;
              if (item.quanHuyen.tinhThanhPho) {
                item.quanHuyen.tinhThanhPho.quocGia = item.quocGia;
              }
              item.quanHuyen.tinhThanhPhoId = item.tinhThanhPho?.id;
              _listQuanHuyen[item.quanHuyen?.id] = item.quanHuyen;
            }
            // if (!_listQuocGia[item.quocGia?.id]) {
            //   _listQuocGia[item.quocGia?.id] = item.quocGia;
            // }
            if (item.tinhThanhPho) {
              item.tinhThanhPho.quocGia = item.quocGia;
            }
            delete item.quocGia;
            listXaPhuong.push(item);
          });
          listXaPhuong = orderBy(listXaPhuong, "ten", "asc");
          // let listQuocGia = orderBy(
          //   Object.keys(_listQuocGia).map((key) => {
          //     return _listQuocGia[key];
          //   }),
          //   "ten",
          //   "asc"
          // );
          let listTinhTp = orderBy(
            Object.keys(_listTinhTp).map((key) => {
              return _listTinhTp[key];
            }),
            "ten",
            "asc"
          );
          let listQuanHuyen = orderBy(
            Object.keys(_listQuanHuyen).map((key) => {
              return _listQuanHuyen[key];
            }),
            "ten",
            "asc"
          );
          cacheUtils.save(
            "DATA_DIA_CHI",
            "",
            {
              listXaPhuong,
              // listQuocGia,
              listTinhTp,
              listQuanHuyen,
            },
            false
          );
          dispatch.address.updateData({
            listXaPhuong,
            // listQuocGia,
            listTinhTp,
            listQuanHuyen,
          });
        });
      });
    },
  }),
};
