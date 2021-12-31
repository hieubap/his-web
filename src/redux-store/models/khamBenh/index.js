import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import phongProvider from "data-access/categories/dm-phong-provider";
import { message } from "antd";
import { TRANG_THAI_DICH_VU, LOAI_PHONG } from "constants/index";

export default {
  state: {
    infoNb: {},
    statisticsRoom: {},
    listHistory: [],
    listPhongkham: [],
    thongTinChiTiet: {},
    thongTinKhamBN: {},
    elementKey: 0,
    dangKhamError: "",
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getStatisticsRoom: (payload = [], state) => {
      const phongThucHienId =
        payload.phongThucHienId || state.nbKhamBenh.phongThucHienId;
      nbDvKhamProvider
        .getStatisticsRoom({
          dsPhongId: [phongThucHienId],
        })
        .then((s) => {
          const data = s?.data || [];
          const statisticsRoom = data[0] || {};

          dispatch.khamBenh.updateData({
            statisticsRoom,
          });
        })
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },
    getNbDvKham: ({ nbId, chuyenTrangThai, turnOffPopupCatch }, state) => {
      if (!nbId) {
        dispatch.khamBenh.updateData({ thongTinChiTiet: {} });
        return;
      }
      nbDvKhamProvider
        .getNbDvKham(nbId)
        .then((s) => {
          const data = s?.data || [];
          dispatch.khamBenh.updateData({
            thongTinChiTiet: data,
            nbCovid: data?.nbCovid,
          });
          if (chuyenTrangThai) {
            //nếu flag chuyenTrangThai ==true thì cho phép chuyển trạng thái dịch vụ khám sau khi load dịch vụ khám
            dispatch.khamBenh.dangKham({ turnOffPopupCatch });
          }
        })
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },
    updateNbDvKham: (payload, state, update = true) => {
      return new Promise((resolve, reject) => {
        if (!payload.id) {
          dispatch.khamBenh.updateData({ thongTinChiTiet: {} });
          resolve(true);
          return;
        }
        nbDvKhamProvider
          .updateNbDvKham(payload)
          .then((s) => {
            const data = s?.data || [];
            if (update) dispatch.khamBenh.updateData({ thongTinChiTiet: data });
            message.success("Đã lưu dữ liệu!");

            const { trangThai } = data?.nbDvKyThuat || {};
            if (
              trangThai == TRANG_THAI_DICH_VU.CHO_KHAM ||
              trangThai == TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM ||
              trangThai == TRANG_THAI_DICH_VU.CHUAN_BI_KHAM ||
              trangThai == TRANG_THAI_DICH_VU.DA_CHECKIN
            ) {
              dispatch.khamBenh.dangKham();
            }
            resolve(s);
          })
          .catch((err) => {
            reject(err);
            message.error(
              err?.message || "Lỗi không xác định vui lòng thử lại!"
            );
          });
      });
    },
    ketLuanKham: (payload, state, ketThuc) => {
      //lưu kết luận khám
      return new Promise((resolve, reject) => {
        const thongTinChiTiet = {
          ...(state.khamBenh.thongTinChiTiet || {}),
        };
        //khi truyền vào là kết thúc thì gọi function kết thúc khám, ngược lại gọi function lưu kết luận
        nbDvKhamProvider[ketThuc ? "ketThucKham" : "ketLuanKham"](payload)
          .then((s) => {
            //kết thúc và kết luận trả về body giống nhau.
            const data = s?.data || {};
            thongTinChiTiet.nbKetLuan = data; //sau khi response thì cập nhật lại thông tin chi tiết
            thongTinChiTiet.nbChuyenVien = data.nbChuyenVien;
            thongTinChiTiet.nbNhapVien = data.nbNhapVien;
            if (ketThuc)
              //nếu gọi api kết thúc thì cập nhật lại trạng thái dịch vụ khám
              thongTinChiTiet.nbDvKyThuat.trangThai =
                TRANG_THAI_DICH_VU.DA_KET_LUAN;
            if (!thongTinChiTiet.nbChanDoan) thongTinChiTiet.nbChanDoan = {}; //cập nhật lại trường nbChanDoan
            if (data.nbChuyenVien) {
              thongTinChiTiet.nbChanDoan.dsCdChinhId = data.dsChanDoanId;
              // thongTinChiTiet.nbChanDoan.dsCdChinhId =
              //   data.nbChuyenVien?.dsChanDoanId;
            }
            if (data.nbNhapVien) {
              thongTinChiTiet.nbChanDoan.dsCdChinhId = data.dsCdVaoVienId;
              // thongTinChiTiet.nbChanDoan.dsCdChinhId =
              // data.nbNhapVien?.dsCdVaoVienId;
            }

            dispatch.khamBenh.updateData({
              thongTinChiTiet,
            });
            let phongThucHienId = state.nbKhamBenh.phongThucHienId;
            if (phongThucHienId)
              dispatch.khamBenh.getStatisticsRoom(phongThucHienId);

            message.success(
              ketThuc ? "Đã kết thúc khám!" : "Đã lưu dữ liệu kết luận khám!"
            );
            resolve(s);
          })
          .catch((err) => {
            message.error(
              err?.message || "Lỗi không xác định vui lòng thử lại!"
            );
            reject(err);
          });
      });
    },
    huyKetLuanKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .huyKetLuan(payload)
          .then((s) => {
            const thongTinChiTiet = {
              ...(state.khamBenh.thongTinChiTiet || {}),
            };
            thongTinChiTiet.nbDvKyThuat.trangThai =
              TRANG_THAI_DICH_VU.DANG_KET_LUAN; //sau khi huỷ kết luận thì update trạng thái dịch vụ khám về đang kết luận
            dispatch.khamBenh.updateData({
              thongTinChiTiet: { ...thongTinChiTiet },
            });
            message.success("Đã huỷ dữ liệu kết luận khám!");
            resolve(true);
          })
          .catch((err) => {
            message.error(
              err?.message || "Lỗi không xác định vui lòng thử lại!"
            );
            reject(err);
          });
      });
    },
    ketLuanKhamApi: (payload, state) => {
      nbDvKhamProvider
        .ketLuan(payload)
        .then((s) => {})
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },

    updateChiSoSong: (payload, state) => {
      nbDvKhamProvider
        .updateChiSoSong(payload)
        .then((s) => {
          const data = s?.data || [];
        })
        .catch((err) => {
          let obj = [];
          Object.keys(payload).forEach((item) => {
            const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // check kí tự đặc biệt
            const camel = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g; // đổi camel thành string có whitespace
            const char = /[a-zA-Z]/;
            let changeCamel = (o) => {
              return o.replace(camel, "$1$4 $2$3$5").toLowerCase();
            };
            if (item === "nhietDo") {
              let formatClone = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
              if (formatClone.test(payload[item]) || char.test(payload[item])) {
                obj.push(changeCamel(item));
              }
            } else if (format.test(payload[item]) || char.test(payload[item])) {
              obj.push(changeCamel(item));
            }
          });
          message.error(
            (err?.message.includes("Data invalid format") &&
              `Sai định dạng ${obj?.join()}`) ||
              "Lỗi không xác định vui lòng thử lại!"
          );
        });
    },
    getHistory: (payload = {}, state) => {
      nbDvKhamProvider
        .getHistory(payload)
        .then((s) => {
          const data = s?.data || [];

          dispatch.khamBenh.updateData({
            listHistory: data,
            totalElementsLichSuKham: s?.totalElements,
          });
        })
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },
    getPhongKham: (
      {
        isSingleSearch,
        isGetListData,
        phongThucHienId,
        maHoSo,
        chuyenTrangThai,
        ...payload
      } = {},
      state
    ) => {
      phongProvider
        .getPhongTheoTaiKhoan(payload)
        .then((s) => {
          const listPhongKham = (s?.data || []).map((item) => {
            return {
              id: item.id,
              ten: `${item.ten} - ${item.khoa}`,
            };
          });
          dispatch.khamBenh.updateData({ listPhongKham });
          if ((listPhongKham.length && listPhongKham[0].id) || "") {
            let obj = {
              phongThucHienId:
                (listPhongKham.length && listPhongKham[0].id) || "",
              size: 10,
              chuyenTrangThai,
            };
            if (isGetListData && maHoSo && phongThucHienId && isSingleSearch) {
              obj.maHoSo = maHoSo;
              obj.phongThucHienId = phongThucHienId;
              obj.isSingleSearch = isSingleSearch;
              // obj.sort =  payload.sort
              obj.isGetListData = isGetListData;
            }
            dispatch.nbKhamBenh.onSizeChange(obj);
          }
        })
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },
    getHanhTrinhKham: (payload = {}, state) => {
      nbDvKhamProvider
        .getHanhTrinhKham(payload)
        .then((s) => {
          let thongTinKhamBN = s?.data;
          dispatch.khamBenh.updateData({ thongTinKhamBN });
        })
        .catch((err) => {
          message.error(err?.message || "Lỗi không xác định vui lòng thử lại!");
        });
    },
    setElementKey: (key) => {
      dispatch.khamBenh.updateData({
        elementKey: key,
      });
    },
    onLoadNb: ({ infoNb, chuyenTrangThai, turnOffPopupCatch }, state) => {
      return new Promise(async (resolve, reject) => {
        let phongThucHienId = state.nbKhamBenh.phongThucHienId;
        dispatch.khamBenh.updateData({ infoNb });
        dispatch.khamBenh.getNbDvKham({
          nbId: infoNb?.id,
          chuyenTrangThai,
          turnOffPopupCatch,
        });
        if (phongThucHienId)
          dispatch.khamBenh.getStatisticsRoom(phongThucHienId);
      });
    },
    loadNbTiepTheo: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { phongThucHienId } = state.nbKhamBenh;
        let obj = {
          phongThucHienId,
          isSingleSearch: true,
          size: 10,
          chuyenTrangThai: true,
        };
        dispatch.nbKhamBenh.onSizeChange(obj);
      });
    },
    dangKham: (payload, state) => {
      return new Promise((resolve, reject) => {
        const { id } = state.khamBenh.thongTinChiTiet;
        const { trangThai } = state.khamBenh.thongTinChiTiet?.nbDvKyThuat || {};
        if (
          trangThai == TRANG_THAI_DICH_VU.CHO_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.DA_CHECKIN_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.CHUAN_BI_KHAM ||
          trangThai == TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU ||
          trangThai == TRANG_THAI_DICH_VU.BO_QUA
        ) {
          nbDvKhamProvider
            .dangKham(id)
            .then((s) => {
              dispatch.khamBenh.updateData({
                dangKhamError: "",
                thongTinChiTiet: s.data,
              });
              // if (loadNbTiepTheo) {
              //   dispatch.khamBenh.loadNbTiepTheo();
              // }
            })
            .catch((e) => {
              dispatch.khamBenh.updateData({ dangKhamError: e?.message });
              if (!payload?.turnOffPopupCatch) {
                message.error(
                  e?.message || "Xảy ra lỗi, vui lòng thử lại sau!"
                );
              }
            });
          resolve(true);
        } else {
          dispatch.khamBenh
            .dangKetLuan()
            .then((s) => {
              resolve(s);
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    dangKetLuan: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { id } = state.khamBenh.thongTinChiTiet;
        const { trangThai } = state.khamBenh.thongTinChiTiet?.nbDvKyThuat || {};
        switch (trangThai) {
          case TRANG_THAI_DICH_VU.DANG_KHAM:
          case TRANG_THAI_DICH_VU.DANG_THUC_HIEN_DICH_VU:
          case TRANG_THAI_DICH_VU.DA_KET_LUAN:
            if (!payload.ketThucKham) break;
          case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
          case TRANG_THAI_DICH_VU.DA_CHECKIN_KET_LUAN:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
          case TRANG_THAI_DICH_VU.BO_QUA_KET_LUAN:
            nbDvKhamProvider
              .dangKetLuan(id)
              .then((s) => {
                dispatch.khamBenh.updateData({
                  thongTinChiTiet: s.data,
                });
                resolve(s);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
            break;
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            resolve(true);
            break;
          default:
            resolve(true);
        }
      });
    },
    boQuaKham: (
      { loadNbTiepTheo, id, trangThai, showMessage, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        if (!id) {
          id = state.khamBenh.thongTinChiTiet?.id;
        }
        if (!trangThai) {
          trangThai = state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        }
        let phongThucHienId = state.nbKhamBenh.phongThucHienId;
        if (phongThucHienId)
          dispatch.khamBenh.getStatisticsRoom(phongThucHienId);

        switch (trangThai) {
          case TRANG_THAI_DICH_VU.CHO_KHAM:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KHAM:
          case TRANG_THAI_DICH_VU.DANG_KHAM:
            nbDvKhamProvider
              .boQuaKham(id)
              .then((s) => {
                if (showMessage) {
                  message.success("Đã bỏ qua bệnh nhân");
                }
                if (loadNbTiepTheo) {
                  dispatch.khamBenh.loadNbTiepTheo();
                }
                resolve(s);
              })
              .catch((e) => {
                message.error(e?.message);
                reject(e);
              });
            break;
          case TRANG_THAI_DICH_VU.CHO_KET_LUAN:
          case TRANG_THAI_DICH_VU.CHUAN_BI_KET_LUAN:
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            return dispatch.khamBenh.boQuaKetLuan({
              loadNbTiepTheo,
              id,
              trangThai,
              showMessage,
            });
            break;
          default:
            if (loadNbTiepTheo) {
              dispatch.khamBenh.loadNbTiepTheo();
            }
        }
      });
    },
    boQuaKetLuan: (
      { loadNbTiepTheo, id, trangThai, showMessage, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        if (!id) {
          id = state.khamBenh.thongTinChiTiet?.id;
        }
        if (!trangThai) {
          trangThai = state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        }
        nbDvKhamProvider
          .boQuaKetLuan(id)
          .then((s) => {
            if (showMessage) {
              message.success("Đã bỏ qua bệnh nhân");
            }
            if (loadNbTiepTheo) {
              dispatch.khamBenh.loadNbTiepTheo();
            }
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    nguoiBenhTiepTheo: (payload, state) => {
      return new Promise((resove, reject) => {
        const phongThucHienId = state.nbKhamBenh.phongThucHienId;
        const infoNb = state.khamBenh.infoNb;
        nbDvKhamProvider
          .getNbTiepTheo({ phongThucHienId, nbTiepTheoId: infoNb?.id })
          .then((s) => {
            let nbTiepTheo = (s.data || [])[0];
            if (nbTiepTheo) {
              dispatch.khamBenh.getDsDichVuById({
                dichVuId: nbTiepTheo?.id,
                phongThucHienId: phongThucHienId,
                loaiPhong: LOAI_PHONG.PHONG_KHAM,
                chuyenTrangThai: true,
              });
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getDsDichVuById: (
      {
        dichVuId,
        phongThucHienId,
        loaiPhong,
        chuyenTrangThai,
        page = 0,
        size = 10,
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        dispatch.nbKhamBenh.updateData({ phongThucHienId });
        phongProvider
          .getPhongTheoTaiKhoan({ loaiPhong: loaiPhong })
          .then((s) => {
            const listPhongKham = (s?.data || []).map((item) => {
              return {
                id: item.id,
                ten: `${item.ten} - ${item.khoa}`,
              };
            });
            dispatch.khamBenh.updateData({ listPhongKham });

            nbDvKhamProvider
              .getDsDichVuById(dichVuId)
              .then((s) => {
                if (s?.code == 602) {
                  message.error(s.message);
                  reject(s);
                  return;
                }
                dispatch.khamBenh.onLoadNb({
                  infoNb: s.data,
                  chuyenTrangThai,
                });
                // if (isGetListData) {
                // khi load lại url , chỉ lấy giá trị hiện tại, nhưng mất danh sách bệnh nhân , điều kiện này giúp kéo lại danh sách bệnh nhân
                nbDvKhamProvider
                  .getDanhSachBN({
                    page,
                    size,
                    dsPhongThucHienId: phongThucHienId, //thay thế trường phongThucHienId -> dsPhongThucHienId để request api search
                  })
                  .then((res) => {
                    dispatch.nbKhamBenh.updateData({
                      listData: res?.data.map((item, index) => {
                        item.index = index + 1;
                        return item;
                      }),
                      totalElements: res?.totalElements || 0,
                      page,
                      size,
                    });
                  });
                // }
              })
              .catch((e) => {
                message.error(s?.message);
                reject(e);
              });
          })
          .catch((err) => {
            message.error(
              err?.message || "Lỗi không xác định vui lòng thử lại!"
            );
          });
      });
    },
    updateNbCovid: ({ changeStatus, ...payload }, state) => {
      const { nbCovid } = payload;
      return new Promise((resolve, reject) => {
        nbDvKhamProvider
          .updateNbCovid({ ...nbCovid })
          .then((s) => {
            let cloneThongTinChiTiet = { ...state.khamBenh.thongTinChiTiet };
            cloneThongTinChiTiet.nbCovid = s?.data;
            dispatch.khamBenh.updateData({
              thongTinChiTiet: cloneThongTinChiTiet,
            });
            if (s?.code === 0 && changeStatus) {
              dispatch.khamBenh.dangKham();
            }
            message.success("Đã lưu dữ liệu!");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    kiemTraTrangThaiLoadNguoiBenh: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        const { chuyenTrangThai, infoNb, forceUpdate } = payload;
        const { tenNb, maHoSo } = state.khamBenh.infoNb || {};
        const trangThaiKham =
          state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai;
        if (forceUpdate) {
          if (infoNb)
            dispatch.khamBenh.onLoadNb({
              infoNb,
              chuyenTrangThai,
              turnOffPopupCatch: true,
            });
          return;
        }
        switch (trangThaiKham) {
          case TRANG_THAI_DICH_VU.DANG_KHAM:
            reject(
              `Người bệnh ${maHoSo} - ${tenNb} đang thực hiện khám, Bạn có chắc chắn muốn gọi Người bệnh Tiếp theo`
            );
            break;
          case TRANG_THAI_DICH_VU.DANG_KET_LUAN:
            reject(
              `Người bệnh ${maHoSo} - ${tenNb} chưa được kết luận, Bạn có chắc chắn muốn gọi Người bệnh Tiếp theo`
            );
            break;
          default:
            if (infoNb)
              dispatch.khamBenh.onLoadNb({
                infoNb,
                chuyenTrangThai,
                turnOffPopupCatch: true,
              });
            resolve(true);
        }
      });
    },
  }),
};
