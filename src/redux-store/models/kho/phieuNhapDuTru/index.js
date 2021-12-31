import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listPhieuNhapDuTru: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { active: 2 },
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    createOrUpdate: async ({ id, sendApprove, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          if (!id) {
            const response = await phieuNhapXuatProvider.post(payload);
            if (response?.code == 0) {
              if (sendApprove) {
                const { code, data, _ } = await phieuNhapXuatProvider.sendApproved(response?.data?.id);
                if (code == 0) {
                  message.success("Thêm mới và gửi duyệt thành công dữ liệu phiếu dự trù");
                  resolve(data);
                }
              }
              else {
                message.success("Thêm mới thành công dữ liệu phiếu dự trù");
                resolve(response?.data);
              }
            }
            reject(response);
          }
          else {
            const response = await phieuNhapXuatProvider.put({ id, ...payload });
            if (response.code == 0) {
              message.success("Cập nhật thành công dữ liệu phiếu dự trù");
              resolve(response.data);
            }
            else reject(response);
          }
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
    getDetail: async (id, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .detail(id)
          .then((s) => {
            const {
              code,
              data: {
                dsNhapXuatChiTiet,
                ...restData
              },
              _
            } = s;
            if (code == 0) {
              dispatch.phieuNhapDuTru.updateData({
                thongTinPhieuNhap: {
                  ...restData
                },
                dsNhapXuatChiTiet: dsNhapXuatChiTiet?.map((item, index) => ({
                  ...item?.dichVu,
                  ...item,
                  stt: index + 1,
                  index: index + 1,
                }))
              })
            }
            else {
              // message.error("");
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      });
    },
    sendApprove: async ({ id }, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .sendApproved(id)
          .then((s) => {
            const { code, data, _ } = s;
            if (code == 0) {
              message.success("Gửi duyệt phiếu thành công!");
              resolve(data);
            }
            else reject(s);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      });
    },
    delete: async ({ id }, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .delete(id)
          .then((s) => {
            const { code, data, _ } = s;
            if (code == 0) {
              message.success("Xóa phiếu thành công!");
              resolve(data);
            }
            else reject(s);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            reject(e);
          });
      })
    }
  }),
};
