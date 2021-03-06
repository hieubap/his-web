import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import tonKhoProvider from "data-access/kho/ton-kho-provider";
import nbDvThuocProvider from "data-access/nb-dv-thuoc-provider";
import nbDvThuocChiDinhNgoaiProvider from "data-access/nb-dv-thuoc-chi-dinh-ngoai-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import printProvider from "data-access/print-provider";

export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvThuoc: [],
    listDvThuocKeNgoai: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async ({ notCallBoChiDinh, bacSiChiDinhId, ...payload }, state) => {
      const userId = state.auth.auth?.id;
      const { loaiDichVu } = payload;
      const listDvKho = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_NGOAI_TRU_${loaiDichVu}`,
        [],
        false
      );
      dispatch.chiDinhDichVuKho.updateData({ listDvKho, loaiDichVu });
      if (loaiDichVu && loaiDichVu === 150) {
      } else {
        !notCallBoChiDinh &&
          dispatch.boChiDinh.getBoChiDinh({ dsLoaiDichVu: loaiDichVu, bacSiChiDinhId });
      }
      return new Promise((resolve, reject) => {
        dichVuKhoProvider
          .searchAll({ ...payload, size: 9999 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKho)) {
                if (loaiDichVu === 150) {
                  dispatch.chiDinhDichVuKho.updateData({
                    listGoiDv: data,
                  });
                } else {
                  dispatch.chiDinhDichVuKho.updateData({
                    listDvKho: data,
                  });
                }
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    getListDichVuThuoc: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .search({ ...payload, size: 9999 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.chiDinhDichVuKho.updateData({
                listDvThuoc: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    tamTinhTien: (payload, state) => {
      let { listLoaiDichVu } = state.chiDinhDichVuKho;
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhDichVuKho.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

      const tamTinhTienKho = new Promise((resolve, reject) => {
        return nbDvThuocProvider
          .tamTinhTien(payload)
          .then((s) => {
            if (s?.code === 0) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
      return Promise.all([tamTinhTienKho])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            const khoaThucHienId = state.khamBenh.infoNb.khoaThucHienId;
            if (res === 0) return;
            const tinhTien = res.data.map((item) => {
              return {
                nbDotDieuTriId: state.khamBenh.infoNb?.nbDotDieuTriId,
                lieuDungId: item.lieuDungId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: item?.nbDichVu?.soLuong,
                  chiDinhTuDichVuId: state.khamBenh?.infoNb?.id,
                  chiDinhTuLoaiDichVu: 10,
                  khoaChiDinhId: khoaThucHienId,
                  loaiDichVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhDichVuKho.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => { });
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuKho;
      let dataTamTinhTien = state.chiDinhDichVuKho.dataTamTinhTien;

      let data = payload.map((item) => {
        return {
          ...item,
          thanhTien: dataTamTinhTien.find(
            (x) => x.nbDichVu.dichVuId === item.nbDichVu.dichVuId
          )?.nbDichVu?.thanhTien,
        };
      });
      const chiDinhDVKho = new Promise((resolve, reject) => {
        return nbDvThuocProvider
          .post(data)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });

      return Promise.all([chiDinhDVKho])
        .then((response) => {
          let neededUpdateRecord = [];
          let errMessage = [];
          response.forEach((res) => {
            if (res === 0) return;
            const updatingRecord = res.data.filter(
              (item) => item.code && item.code !== 0
            );
            const listMessages = res.data
              .filter((item) => item.code && item.code !== 0)
              .map(
                (item2) =>
                  `(${item2?.nbDichVu?.dichVu?.ten} - ${item2.message})`
              );
            errMessage = [...listMessages];
            neededUpdateRecord = [...neededUpdateRecord, ...updatingRecord];
          });
          errMessage = [...new Set(errMessage)];

          dispatch.chiDinhDichVuKho.updateData({
            neededUpdateRecord,
          });
          if (!neededUpdateRecord.length) {
            message.success("C???p nh???t th??nh c??ng d??? li???u!");
          }
          return {
            code: 0,
            listLoaiDichVu,
            neededUpdateRecord,
          };
        })
        .catch((e) => { });
    },
    getListDichVuThuocKeNgoai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .search({ ...payload, size: 9999 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              console.log("data: ", data);
              dispatch.chiDinhDichVuKho.updateData({
                listDvThuocKeNgoai: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    chiDinhDichVuThuocKeNgoai: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhDichVuKho;

      const chiDinhDVThuocKeNgoai = new Promise((resolve, reject) => {
        return nbDvThuocChiDinhNgoaiProvider
          .postBatch(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });

      return Promise.all([chiDinhDVThuocKeNgoai])
        .then((response) => {
          let neededUpdateRecord = [];
          let errMessage = [];
          response.forEach((res) => {
            if (res === 0) return;
            const updatingRecord = res.data.filter(
              (item) => item.code && item.code !== 0
            );
            const listMessages = res.data
              .filter((item) => item.code && item.code !== 0)
              .map(
                (item2) =>
                  `(${item2?.thuocChiDinhNgoai?.ten} - ${item2.message})`
              );
            errMessage = [...listMessages];
            neededUpdateRecord = [...neededUpdateRecord, ...updatingRecord];
          });
          errMessage = [...new Set(errMessage)];

          dispatch.chiDinhDichVuKho.updateData({
            neededUpdateRecord,
          });
          if (!neededUpdateRecord.length) {
            message.success("C???p nh???t th??nh c??ng d??? li???u!");
          }
          return {
            code: 0,
            listLoaiDichVu,
            neededUpdateRecord,
          };
        })
        .catch((e) => { });
    },
    getListDichVuTonKho: (payload, state) => {
      return new Promise((resolve, reject) => {
        tonKhoProvider
          .getTongHop(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhDichVuKho.updateData({
                listDvTonKho: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    themThongTin: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .themThongTin(payload)
          .then((s) => {
            resolve(s);
            message.success("Th??m th??ng tin th??nh c??ng");
          })
          .catch((e) => message.error(e?.message || "Th??m th??ng tin th???t b???i"));
      });
    },

    chiDinhDichVuKho: (payload, state) => {
      const khoaThucHienId = state.khamBenh.infoNb.khoaThucHienId;
      const body = payload.map((item) => {
        return {
          nbDotDieuTriId: item.nbDotDieuTriId,
          nbDichVu: {
            dichVu: item?.nbDichVu?.dichVu,
            dichVuId: item.nbDichVu.dichVuId,
            soLuong: item.nbDichVu.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            chiDinhTuDichVuId: state.khamBenh?.infoNb?.id,
            chiDinhTuLoaiDichVu: 10,
            khoaChiDinhId: khoaThucHienId,
          },
          nbDvKho: {
            khoId: item?.nbDvKho?.khoId,
          },
          lieuDungId: item?.lieuDungId,
          dotDung: item?.dotDung,
          ngayThucHienTu: item?.ngayThucHienTu,
          ngayThucHienDen: item?.ngayThucHienDen,
        };
      });

      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .post(body)
          .then((s) => {
            if (s.code === 0) {
              resolve(s?.data);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    onDeleteDichVu: (id) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .onDeleteDichVu(id)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    updateRecordByIdThuocKeNgoai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .updateRecordById(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    onDeleteDichVuThuocKeNgoai: (id) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .onDeleteDichVu(id)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    onDeleteAll: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocProvider
          .onDeleteAll(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    onDeleteAllThuocKeNgoai: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider
          .onDeleteAll(payload)
          .then((s) => {
            if (s.code === 0) {
              resolve(s);
              message.success("X??a ????n thu???c th??nh c??ng");
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
    inPhieu: ({ loaiDonThuoc, nbDotDieuTriId, soPhieuId, phieuNhapXuatId, ...payload }) => {
      return new Promise((resolve, reject) => {
        // 10 phi???u kh??m b???nh
        // 20 x??t nghi???m 
        // 30 cdha, tdcn
        if (
          loaiDonThuoc == 10 || // thu???c nh?? thu???c 
          loaiDonThuoc == 20 || // thu???c t??? tr???c
          loaiDonThuoc == 30 ||//cdha, tdcn
          loaiDonThuoc == 40 
        ) {
          let api = nbDvThuocProvider
          switch (loaiDonThuoc) {
            case 10:
              api = nbDvThuocProvider
              break;
            case 20:
              api = nbDvThuocProvider
              break;
            // case 30:
            //   api = nbDvCLSProvider
            //   break;

          }
          api.getDonChiDinh({ nbDotDieuTriId, soPhieuId, phieuNhapXuatId })
            .then((s) => {
              printProvider
                .printPdf(s.data)
                .then(() => {
                  console.info("Print success");
                })
                .catch((err) => {
                  message.error(
                    err?.message || "X???y ra l???i, vui l??ng th??? l???i sau"
                  );
                });
            })
            .catch((e) => {
              message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
            });
        }
      });
    },
    inPhieuThuocKeNgoai: ({ loaiDonThuoc, nbDotDieuTriId, soPhieuId, phieuNhapXuatId, ...payload }) => {
      return new Promise((resolve, reject) => {
        nbDvThuocChiDinhNgoaiProvider.getDonChiDinh({ nbDotDieuTriId, soPhieuId, phieuNhapXuatId })
          .then((s) => {
            printProvider
              .printPdf(s.data)
              .then(() => {
                console.info("Print success");
              })
              .catch((err) => {
                message.error(
                  err?.message || "X???y ra l???i, vui l??ng th??? l???i sau"
                );
              });
          })
          .catch((e) => {
            message.error(e?.message || "X???y ra l???i, vui l??ng th??? l???i sau");
          });
      });
    },
  }),
};
