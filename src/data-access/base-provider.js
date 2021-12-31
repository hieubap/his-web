import { client, dataPath } from "client/request";
import { combineUrlParams } from "utils";

export default (API = "") => ({
  _searchTongHop: (param) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${API}/tong-hop`, {
            ...param,
            active: true,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  _search: ({ page = 0, active, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      console.log(sort,'sort');
      client
        .get(
          combineUrlParams(`${dataPath}${API}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  _post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${API}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  _put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${API}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  _delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${API}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
});
