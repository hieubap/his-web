import targetProvider from "@data-access/target-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import { Modal } from "antd";
import translate from '../../../translations';
import cacheProvider from '@data-access/datacache-provider';
const { confirm } = Modal;

function updateData(data) {
  return dispatch => {
    dispatch({
      type: "TARGET-UPDATE-DATA",
      data: data
    });
  };
}
function onSizeChange(size) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        size: size
      })
    );
    dispatch(gotoPage(0));
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    dispatch(updateData({ page: page }));
    let size = getState().target.size || 10;
    let ma = getState().target.searchMa
    let ten = getState().target.searchTen
    ten = encodeURIComponent(ten)
    let createdAt = getState().target.searchCreatedAt ? new Date(getState().target.searchCreatedAt).format("YYYY-MM-dd") : null
    let active = getState().target.searchActive
    let donViId = getState().target.searchDonViId
    let khuVucId = getState().target.searchKhuVucId
    let thongTienLienQuan = getState().target.searchThongTienLienQuan
    targetProvider.search(page, size, ma, ten, createdAt, active, donViId, khuVucId, thongTienLienQuan).then(s => {
      if (s && s.code === 0) {
        dispatch(
          updateData({
            total: s.totalElements || size,
            data: s.data || []
          })
        );
      }
    });
  };
}

function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().target.id;
      let ten = (getState().target.ten||"").trim();
      let ma = (getState().target.ma||"").trim();
      let donViIds = getState().target.donViIds;
      let ghiChu = (getState().target.ghiChu||"").trim();
      let active = getState().target.active;
      let thongTienLienQuan = (getState().target.thongTienLienQuan ||"").trim();
      let khuVucIds = getState().target.khuVucIds
      let trls = getState().target.trlsTarget
      targetProvider.createOrEdit(id, ten, ma, ghiChu, donViIds, active, thongTienLienQuan, khuVucIds, trls).then(s => {
        if (s.code == 0) {
          dispatch(
            updateData({
              id: "",
              ten: "",
              ma: "",
              donViIds: [],
              ghiChu: "",
              active: false,
              khuVucIds: [],
              thongTienLienQuan: "",
              trlsTarget:[]
            })
          );
          if (!id) {
            snackbar.show((dataTranslate.messages || {}).themmoidoituongthanhcong, "success");
          } else {
            snackbar.show((dataTranslate.messages || {}).capnhatthongtindoituongthanhcong, "success");
          }
          dispatch(gotoPage(0));
          resolve(s.data);
        } else if (s.code === 1602) {
          snackbar.show((dataTranslate.messages || {}).tendoituongtontai, "danger");
        } else if (s.code === 1603) {
          snackbar.show((dataTranslate.messages || {}).madoituongtontai, "danger");
        } else {
          if (!id) {
            snackbar.show(s.message || (dataTranslate.messages || {}).themmoidoituongthatbai, "danger");
          } else {
            snackbar.show(s.message || (dataTranslate.messages || {}).capnhatdoituongthatbai, "danger");
          }
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).themmoidoituongthatbai, "danger");
        reject();
      });
    });
  };
}
function onDeleteItem(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).oki,
        content: (dataTranslate.messages || {}).bancomuonxoadoituong + ` ${item.ten ||""}?`,
        okText: (dataTranslate.messages || {}).xoa,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).huy,
        onOk() {
          targetProvider
            .delete(item.id)
            .then(s => {
              if (s.code == 0) {
                snackbar.show((dataTranslate.messages || {}).bandaxoadoituong +" "+item.ten + " thành công", "success");
                dispatch(gotoPage(0));
                resolve();
              } else {
                snackbar.show((dataTranslate.messages || {}).xoadoituongthatbat, "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show((dataTranslate.messages || {}).xoadoituongthatbat, "danger");
              reject();
            });
        },
        onCancel() {
          reject();
        }
      });
    });
  };
}

const getDetail = (id) => {
return (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    targetProvider.getById(id).then(s => {
    if(s && s.code === 0){
      dispatch( updateData({
        id: s.data.id,
        ten: s.data.ten,
        ma: s.data.ma,
        donViIds: s.data.donViIds,
        ghiChu: s.data.ghiChu,
        active: s.data.active,
        khuVucIds: s.data.khuVucIds,
        thongTienLienQuan: s.data.thongTienLienQuan,
        trls:s.data.trls
      }))
      resolve(s.data)
    } else {
      snackbar.show("Không tồn tại dữ liệu")
      reject()
    }
    })
  }) 
}
}
export default {
  updateData,
  createOrEdit,
  gotoPage,
  onSizeChange,
  onDeleteItem,
  getDetail
};
