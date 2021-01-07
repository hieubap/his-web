import cacheUtils from "utils/cache-utils";
import addressProvider from "data-access/address-provider";
import ZoneDB from 'utils/IndexedDB/Zones';
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllDistricts: async (payload, state) => {
      let listDistricts = await cacheUtils.read("DATA_DISTRICTS", "", [], false);
      dispatch.address.updateData({ listDistricts });
      addressProvider
        .searchDistricts({ page: "0", active: true, sort: "ten,asc", ...payload })
        .then((s) => {
          let listDistricts = s?.data || [];
          dispatch.address.updateData({ listDistricts });
          dispatch.address.getZone();
          cacheUtils.save("DATA_DISTRICTS", "", listDistricts, false);
        });
    },
    getZone: async (payload, state) => {
      return new Promise((resolve, reject) => {
        addressProvider.searchZones()
          .then((s) => {
            const listZones = s?.data || [];
            const dataDistricts = state.address.listDistricts || [];
            const dataZones = listZones.map((item) => {
              let dataTinhThanhPho = dataDistricts.find((option) => option.id === item.quanHuyenId);
              return ({
                id: item.id,
                ten: item.ten,
                quanHuyenId: item.quanHuyenId,
                quanHuyen: item.quanHuyen,
                tinhThanhPhoId: dataTinhThanhPho.tinhThanhPhoId,
                tinhThanhPho: dataTinhThanhPho.tinhThanhPho
              })
            })
            ZoneDB.putMore(dataZones);
            dispatch.address.updateData({ listZones });
            resolve(s);
          })
          .catch((e) => { reject(e) })
      })
    }
  })
};
