import nbDvKTProvider from "data-access/nb-dv-ky-thuat-provider";
import nbDvXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import printProvider from "data-access/print-provider";

export default {
  state: {
    listDvKham: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    dsDichVuChiDinhXN: [],
    dsDichVuChiDinhKham: [],
    dsDichVuChiDinhCls: [],
    dataPhieu: {},
    neededUpdateRecord: [],
    listGoiDv: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    searchDv: async ({ bacSiChiDinhId, ...payload }, state) => {
      const userId = state.auth.auth?.id;
      const { loaiDichVu } = payload;
      const listDvKham = await cacheUtils.read(
        userId,
        `DATA_DICH_VU_KHAM_NGOAI_TRU_${loaiDichVu}`,
        [],
        false
      );
      dispatch.chiDinhKhamBenh.updateData({ listDvKham, loaiDichVu });
      if (loaiDichVu && loaiDichVu === 150) {
      } else {
        dispatch.boChiDinh.getBoChiDinh({ dsLoaiDichVu: loaiDichVu, bacSiChiDinhId });
      }
      return new Promise((resolve, reject) => {
        nbDvKTProvider
          .searchDMDichVuNgoaiTru(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(listDvKham)) {
                if (loaiDichVu === 150) {
                  dispatch.chiDinhKhamBenh.updateData({
                    listGoiDv: data,
                  });
                } else {
                  dispatch.chiDinhKhamBenh.updateData({
                    listDvKham: data,
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
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    tamTinhTien: (payload, state) => {
      let { listLoaiDichVu } = state.chiDinhKhamBenh;
      let listUpdatedLoaiDichVu = payload.map(
        (item) => item.nbDichVu?.loaiDichVu
      );
      listUpdatedLoaiDichVu = [
        ...new Set([...listLoaiDichVu, ...listUpdatedLoaiDichVu]),
      ];

      if (!listUpdatedLoaiDichVu.length) return;
      dispatch.chiDinhKhamBenh.updateData({
        listLoaiDichVu: listUpdatedLoaiDichVu,
      });

      const tamTinhTienDVKham = listUpdatedLoaiDichVu.includes(10)
        ? new Promise((resolve, reject) => {
          const body = payload.filter(
            (item) => item.nbDichVu.loaiDichVu === 10
          );
          return nbDvKhamProvider
            .tamTinhTienDVKham(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        })
        : 0;

      const tamTinhTienDVXN = listUpdatedLoaiDichVu.includes(20)
        ? new Promise((resolve, reject) => {
          const body = payload.filter(
            (item) => item.nbDichVu.loaiDichVu === 20
          );
          return nbDvXNProvider
            .tamTinhTienDVXN(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        })
        : 0;
      const tamTinhTienDVCLS = listUpdatedLoaiDichVu.includes(30)
        ? new Promise((resolve, reject) => {
          const body = payload.filter(
            (item) => item.nbDichVu.loaiDichVu === 30
          );
          return nbDvCLSProvider
            .tamTinhTienDVCLS(body)
            .then((s) => {
              if (s?.code === 0) {
                resolve(s);
              } else {
                reject(s);
                message.error(s?.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        })
        : 0;

      return Promise.all([tamTinhTienDVKham, tamTinhTienDVXN, tamTinhTienDVCLS])
        .then((response) => {
          let dataTamTinhTien = [];
          response.forEach((res) => {
            const khoaChiDinhId = state.auth?.auth?.dsKhoaPhuTrachId?.[0];
            const khoaThucHienId = state.khamBenh.infoNb.khoaThucHienId;
            if (res === 0) return;
            const tinhTien = res.data.map((item) => {
              return {
                nbDotDieuTriId: state.khamBenh.infoNb?.nbDotDieuTriId,
                nbDichVu: {
                  dichVu: item.nbDichVu?.dichVu,
                  dichVuId: item.nbDichVu?.dichVuId,
                  soLuong: 1,
                  chiDinhTuDichVuId: state.khamBenh?.infoNb?.id,
                  chiDinhTuLoaiDichVu: 10,
                  khoaChiDinhId: khoaThucHienId,
                  loaiDichVu: item.nbDichVu?.loaiDichVu,
                  thanhTien: item.nbDichVu?.thanhTien,
                },
                nbDvKyThuat: {
                  phongId: item.nbDvKyThuat?.phongId,
                },
                nbChanDoan: {
                  cdSoBo: "",
                },
              };
            });
            dataTamTinhTien = [...dataTamTinhTien, ...tinhTien];
          });

          dispatch.chiDinhKhamBenh.updateData({
            dataTamTinhTien,
          });
          return dataTamTinhTien;
        })
        .catch((e) => {
          message.error(e?.message);
        });
    },
    chiDinhDichVu: (payload, state) => {
      const { listLoaiDichVu } = state.chiDinhKhamBenh;
      let dataTamTinhTien = state.chiDinhKhamBenh.dataTamTinhTien;
      if (payload?.isUpdateInfo) {
        dataTamTinhTien = payload.dataTable;
      }

      const chiDinhDVKham = listLoaiDichVu.includes(10)
        ? new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) => item.nbDichVu.loaiDichVu === 10
          );
          return nbDvKhamProvider
            .chiDinhDVKham(body)
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
        })
        : 0;

      const chiDinhDVXN = listLoaiDichVu.includes(20)
        ? new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) => item.nbDichVu.loaiDichVu === 20
          );
          return nbDvXNProvider
            .chiDinhXN(body)
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
        })
        : 0;

      const chiDinhDVCLS = listLoaiDichVu.includes(30)
        ? new Promise((resolve, reject) => {
          const body = dataTamTinhTien.filter(
            (item) => item.nbDichVu.loaiDichVu === 30
          );
          nbDvCLSProvider
            .chiDinhCLS(body)
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
        })
        : 0;
      return Promise.all([chiDinhDVKham, chiDinhDVXN, chiDinhDVCLS])
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
          if (errMessage.length) {
            message.error(errMessage.join());
          }
          dispatch.chiDinhKhamBenh.updateData({
            neededUpdateRecord,
          });
          if (!neededUpdateRecord.length) {
            message.success("Cập nhật thành công dữ liệu!");
          }
          return {
            code: 0,
            listLoaiDichVu,
            neededUpdateRecord,
          };
        })
        .catch((e) => {
          message.error(e?.message);
        });
    },
    getTongHopDichVuXN: (payload, state) => {
      return new Promise((resolve, reject) => {
        const payload = {
          chiDinhTuDichVuId: state.khamBenh.infoNb.id,
          nbDotDieuTriId: state.khamBenh.infoNb.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        nbDvXNProvider
          .getTongHopDichVuXN(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhXN: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsDichVuChiDinhKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        const payload = {
          chiDinhTuDichVuId: state.khamBenh.infoNb.id,
          nbDotDieuTriId: state.khamBenh.infoNb.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        nbDvKhamProvider
          .getDsDichVuChiDinhKham(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhKham: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsDichVuChiDinhCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        const payload = {
          chiDinhTuDichVuId: state.khamBenh.infoNb.id,
          nbDotDieuTriId: state.khamBenh.infoNb.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        nbDvCLSProvider
          .getDsDichVuChiDinhCLS(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                dsDichVuChiDinhCls: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getNBSoPhieuCLS: ({ page, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        const data = {
          nbDotDieuTriId: state.khamBenh.infoNb.nbDotDieuTriId,
          page,
          loaiDichVu,
        };
        nbDvKTProvider
          .getNBSoPhieuCLS(data)
          .then((s) => {
            if (s.code === 0) {
              dispatch.chiDinhKhamBenh.updateData({
                soPhieuCls: s.data.map((item) => ({
                  id: item.id,
                  ten: item.soPhieu,
                })),
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    onDeleteDichVu: ({ id, loaiDichVu, listDeletingId }, state) => {
      return new Promise((resolve, reject) => {
        let provider = null;
        switch (loaiDichVu) {
          case 10: //kham
            provider = nbDvKhamProvider;
            break;
          case 20: //xet nghiem
            provider = nbDvXNProvider;
            break;
          case 30:
            provider = nbDvCLSProvider;
        }
        if (provider && provider.onDeleteDichVu) {
          provider
            .onDeleteDichVu({ id, listDeletingId })
            .then((s) => {
              if (s.code === 0) {
                const resultError =
                  s?.data?.filter((item) => item.code != 0) || [];
                {
                  resultError.forEach((item) =>
                    message.error(
                      item?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                    )
                  );
                }
                if (resultError.length) {
                } else {
                  message.success("Xoá thành công dữ liệu chỉ định dịch vụ!");
                }
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        }
      });
    },
    themThongTinDV: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 20)
        return new Promise((resolve, reject) => {
          nbDvXNProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 30)
        return new Promise((resolve, reject) => {
          nbDvCLSProvider
            .themThongTinDV(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
    },
    themThongTinPhieu: ({ body, id, loaiDichVu }, state) => {
      if (loaiDichVu === 10)
        return new Promise((resolve, reject) => {
          nbDvKhamProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 20)
        return new Promise((resolve, reject) => {
          nbDvXNProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
      if (loaiDichVu === 30)
        return new Promise((resolve, reject) => {
          nbDvCLSProvider
            .themThongTinPhieu(body, id)
            .then((s) => {
              if (s.code === 0) {
                message.success("Cập nhật thành công dữ liệu dịch vụ!");
                resolve(s);
              } else {
                reject(s);
                message.error(s.message);
              }
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message);
            });
        });
    },
    inPhieu: ({ loaiDichVu, nbDotDieuTriId, soPhieuId, phieuChiDinhId }, state) => {
      console.log('phieuChiDinhId: ', phieuChiDinhId);
      console.log('soPhieuId: ', soPhieuId);
      console.log('nbDotDieuTriId: ', nbDotDieuTriId);
      console.log('loaiDichVu: ', loaiDichVu);
      return new Promise((resolve, reject) => {
        // 10 phiếu khám bệnh
        // 20 xét nghiệm 
        // 30 cdha, tdcn
        if (
          loaiDichVu == 10 ||
          loaiDichVu == 20 || //in xét nghiệm
          loaiDichVu == 30 //cdha, tdcn
        ) {
          let api = ""
          switch (loaiDichVu) {
            case 10:
              api = nbDvKhamProvider
              break;
            case 20:
              api = nbDvXNProvider
              break;
            case 30:
              api = nbDvCLSProvider
              break;

          }
          api.getPhieuChiDinh({
            nbDotDieuTriId,
            soPhieuId,
            phieuChiDinhId,
            chiDinhTuLoaiDichVu: 10,
            chiDinhTuDichVuId: state.khamBenh?.infoNb?.id
          })
            .then((s) => {
              printProvider
                .printPdf(s.data)
                .then(() => {
                  console.info("Print success");
                })
                .catch((err) => {
                  message.error(
                    err?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                });
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        }
      });
    },
    loiDan: ({ body, id, loaiDichVu }, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .loiDan(body, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.khamBenh.updateData({ thongTinChiTiet: s?.data });
              // message.success("Cập nhật thành công dữ liệu dịch vụ!");
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
