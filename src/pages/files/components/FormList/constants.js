import React from "react";
import { Icon } from "antd";
import { groupBy } from "lodash";

const group = (list, search = "", isHSDD) => {
  search = search.toLowerCase().createUniqueText();
  list = list.filter((item) => !item.ignore && (!isHSDD || !!item.hsdd)); // lọc ra những item không bị đánh dấu ignore ra khỏi cây
  // debugger;
  const objG = groupBy(list, "maBieuMau");
  let groups = [];
  Object.keys(objG).map((key, index) => {
    let allItem = objG[key];

    let allEmr = [],
      allForm = [],
      allSign = [],
      allScan = [],
      allOther = [];

    allItem.forEach((item) => {
      switch (item.type) {
        case "emr":
          allEmr.push(item);
          break;
        case "form":
          allForm.push(item);
          break;
        case "signed":
          allSign.push(item);
          break;
        case "scan":
          allScan.push(item);
          break;
        case "xnlis":
        case "xnhis":
        case "cdhapacs":
        case "cdhahis":
          allOther.push(item);
          break;
      }
    });
    let item0 =
      allEmr[0] || allForm[0] || allSign[0] || allScan[0] || allOther[0];
    let parentKey = item0.key + "";
    let parent = {
      //create parent element
      ...item0,
      key: parentKey,
      parentKey: parentKey,
      title: item0.formName || "",
    };
    groups.push(parent); //add to tree

    let subs = [];
    allSign = allSign.filter((item) => {
      // lọc loại bỏ các file ký editor
      return !allEmr.find((item2) => item2.nbHoSoBaId == item.soPhieu); //nhung file ky emr là những file ký có số phiếu = nbHoSoBaId
    });

    allScan = allScan.filter((item) => {
      //lọc loại bỏ tất cả những file scan đã có ký số
      return !allSign.find((item2) => item2.soPhieu == item.soPhieu); //nhung file ky của scan là những file ký có số phiếu trùng với số phiếu của file scan
    });

    if (!item0.taoNhieuMau) {
      //neu bieu mâu ko được đánh dấu là tạo nhiều mẫu
      allEmr = allEmr.length ? [allEmr[0]] : []; //thì chỉ lấy biểu mẫu đầu tiên
    }
    subs = allEmr.map((item) => {
      return {
        ...item,
        parentKey: parentKey,
        title: item.isNew
          ? item.title + (allEmr.length == 1 ? "" : " - Chưa đặt tên")
          : item.tenPhieu || item.title,
      };
    });
    //add tất cả các form mặc định vào
    subs.push(
      ...allForm.map((item) => {
        return {
          ...item,
          parentKey: parentKey,
          title: item.isNew ? item.title : item.tenPhieu || item.title,
        };
      })
    );
    // gom nhóm các file ký có cùng số phiếu , lấy ra file ký mới nhất theo ngay Ky
    let menuCap2 = groupBy(allSign, "soPhieu");
    subs.push(
      ...Object.keys(menuCap2)
        .map((key) => {
          let item = menuCap2[key].sort((a, b) => {
            if (a.ngayKy > b.ngayKy) return -1;
            return 1;
          });
          return item[0];
        })
        .map((item, index) => {
          item.parentKey = parentKey;
          return item;
        })
    );

    // gom nhóm các file scan có cùng số phiếu , lấy ra file scan mới nhất theo ngay Ky
    menuCap2 = groupBy(allScan, "soPhieu");
    subs.push(
      ...Object.keys(menuCap2)
        .map((key) => {
          let item = menuCap2[key].sort((a, b) => {
            if (a.ngayThucHien > b.ngayThucHien) return -1;
            return 1;
          });
          return item[0];
        })
        .map((item, index) => {
          item.parentKey = parentKey;
          return item;
        })
    );

    //add các file còn lại
    allOther
      .sort((a, b) => {
        if (a.ngayThucHien > b.ngayThucHien) return -1;
        return 1;
      })
      .forEach((item, index) => {
        item.parentKey = parentKey;
        subs.push(item);
      });

    if (subs.length > 1) {
      parent.hasChild = false;
      parent.sub = subs;
    }
  });

  groups = groups
    .filter((item) => {
      if (
        //neu search = rỗng, hoặc title group thoả mãn thì return luôn group
        !search ||
        item.title?.toLowerCase().createUniqueText().includes(search)
      ) {
        return true;
      } else {
        // nguoc lại, lọc trong list sub, nếu có phần tử thì return group
        item.sub = item.sub?.filter((item2) =>
          item2.title?.toLowerCase().createUniqueText().includes(search)
        );
        if (item.sub?.length) return true;
        return false;
      }
    })
    .sort((a, b) => {
      if (a.stt > b.stt) {
        return 1;
      }
      return -1;
    });
  return groups;
};

const renderTitle = (level = 1, searchValue, handleDelete, title, item) => {
  const index = title
    .toLocaleLowerCase()
    .indexOf(searchValue.toLocaleLowerCase());
  const beforeStr = title.slice(0, index);
  const middleStr = title.slice(index, index + searchValue.length);
  const afterStr = title.slice(index + searchValue.length);

  const deleteItem = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    handleDelete(item);
  };

  return (
    <div className={`main-title level-${level}`}>
      {index > -1 ? (
        <div
          className={`file-name-render item-level-${level}`}
          title={`${beforeStr ? beforeStr + " " : ""}${
            middleStr ? middleStr + " " : ""
          }${afterStr ? afterStr + " " : ""}`}
        >
          {beforeStr}
          <span style={{ color: "#f50" }}>{middleStr}</span>
          {afterStr}
        </div>
      ) : (
        <div className={`file-name-render item-level-${level}`} title={title}>
          {title}
        </div>
      )}

      {!item.sub?.length && item.trangThai != "Da_Ky"
        ? item &&
          (item["nbHoSoBaId"] || item.isNew) && (
            <Icon
              onClick={deleteItem}
              className={"tree-delete-icon"}
              type={"close-circle"}
            />
          )
        : null}
    </div>
  );
};

const checkAvailableToAdd = (item, files) => {
  if (!item.bieuMau.editor) {
    return false;
  }
  let file = files.find((f) => f.formId === item.bieuMau.formId);
  if (item.active) {
    if (!file || item.taoNhieuMau) {
      return true;
    }
  }
  return false;
};

export { group, renderTitle, checkAvailableToAdd };
