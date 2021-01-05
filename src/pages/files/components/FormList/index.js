import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { connect } from "react-redux";
import { Tree, Modal, message, Button } from "antd";
import { group, renderTitle } from "./constants";
import CardTitle from "./CardTitle";
import AddForm from "./AddForm";
import ModalSelectCriteria from "../ModalSelectCriteria";
import { Main, MainDrawer } from "./styled";

const { TreeNode, DirectoryTree } = Tree;

const FormList = forwardRef((props, ref) => {
  const refCallBack = useRef(null);
  const { changeFile, template, templateName } = props;
  const [state, _setState] = useState({
    expandedKeys: [],
    selectedKeys: [],
    searchValue: "",
    files: [],
    groupFiles: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const containRef = useRef(null);
  const refModalSelectCriteria = useRef(null);

  const setSelectedKeys = (selectedKeys) => {
    if (
      selectedKeys.length != state.selectedKeys.lenght ||
      selectedKeys[0] != state.selectedKeys[0]
    )
      setState({ selectedKeys });
  };
  const setExpandedKeys = (expandedKeys) => {
    setState({
      expandedKeys,
    });
  };
  useImperativeHandle(ref, () => ({
    setExpandedKeys,
    setSelectedKeys,
    show: (data = {}, callback) => {
      setState({
        show: true,
      });
      refCallBack.current = callback;
    },
    next: (file = {}) => {
      let groups = state.groupFiles || [];
      if (!groups.length) return;
      let indexGroup = groups.findIndex(
        (item) => item.maBieuMau == file.maBieuMau
      );
      if (indexGroup != -1) {
        let group = groups[indexGroup];
        let index2 = null;
        if (!group.sub || !group.sub.length) {
          if (indexGroup + 1 < groups.length - 1) {
            indexGroup++;
          } else indexGroup = 0;
          group = groups[indexGroup];
          selectFile(group);
          setExpandedKeys([group.key + ""]);
        } else {
          index2 = group.sub.findIndex((item2) => item2.key == file.key);
          if (index2 < group.sub.length - 1) {
            index2++;
            let item = group.sub[index2];
            selectFile(item);
            setExpandedKeys([group.key + ""]);
          } else {
            if (indexGroup + 1 < groups.length - 1) {
              indexGroup++;
            } else indexGroup = 0;
            group = groups[indexGroup];
            selectFile(group);
            setExpandedKeys([group.key + ""]);
          }
        }
      }
    },
    back: (file = {}) => {
      let groups = state.groupFiles || [];
      if (!groups.length) return;
      let indexGroup = groups.findIndex(
        (item) => item.maBieuMau == file.maBieuMau
      );
      if (indexGroup != -1) {
        let group = groups[indexGroup];
        let index2 = null;
        if (!group.sub || !group.sub.length) {
          if (indexGroup - 1 > 0) {
            indexGroup--;
          } else indexGroup = groups.length - 1;
          group = groups[indexGroup];
          selectFile(group);
          setExpandedKeys([group.key + ""]);
        } else {
          index2 = group.sub.findIndex((item2) => item2.key == file.key);
          if (index2 > 0) {
            index2--;
            let item = group.sub[index2];
            selectFile(item);
            setExpandedKeys([group.key + ""]);
          } else {
            if (indexGroup - 1 > 0) {
              indexGroup--;
            } else indexGroup = group.sub.length - 1;
            group = groups[indexGroup];
            selectFile(group);
            setExpandedKeys([group.key + ""]);
          }
        }
      }
    },
  }));

  useEffect(() => {
    setState({
      files: props.listFiles,
    });
  }, [props.listFiles]); //khi listFiles thay đổi thì cập nhật lại vào state

  useEffect(() => {
    const data = group(state.files, state.searchValue, state.isHSDD);
    setState({
      groupFiles: data,
    });
  }, [state.files, state.searchValue, state.isHSDD]); //khi các giá trị filter thay đổi hoặc list files thay đổi thì thực hiện generate lại group

  const handleChangeView = (viewOnly) => {
    setState({
      isHSDD: viewOnly,
    });
  };

  const selectItem = (keys) => {
    console.log("select key " + keys[0]);
    const file = state.files.find((item) => {
      return item.key == keys[0];
    });
    if (file) {
      setSelectedKeys(keys);
      changeFile(file);
    }
  };
  const selectFile = (file = {}) => {
    setSelectedKeys([file.key]);
    changeFile(file);
  };

  const onHandleDelete = (file) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá bản ghi này?",
      content: `Bản ghi: ${file.formName}`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        if (file["nbHoSoBaId"]) {
          props.deleteFile({
            api: file.api,
            nbHsBaId: file["nbHoSoBaId"],
            patientDocument: props.patientDocument,
          });
        } else {
          const index = state.files.findIndex(
            (item) =>
              item.key === file.key ||
              (file.parentKey === `${item.key}` &&
                file["nbHoSoBaId"] === item["nbHoSoBaId"])
          );

          let objFs = state.files;
          objFs.splice(index, 1);
          const fileNext = state.files[index === 0 ? 0 : index - 1];
          setState({
            files: [...objFs],
          });
          changeFile(fileNext);
          setSelectedKeys([`${fileNext.key}`]);
        }
      },
    });
  };

  const onAddFile = (value, obj) => {
    // find file template
    const t = template.find((item) => item.bieuMau.ma === obj.key);
    if (t) { //thêm điều kiện kiểm tra xem tồn tại biểu mẫu
      let newKey = `${t.bieuMau.ma}_${new Date().getTime()}`;
      let newFile = {
        ...t.bieuMau,
        key: newKey,
        title: t.bieuMau.ten,
        formName: `${t.bieuMau.ten}`,
        isNew: true,
        taoNhieuMau: t.taoNhieuMau,
        maBieuMau: `${t.bieuMau.ma}`,
        type: "emr",
      };
      // //kiem tra xem phiếu đó đã tồn tại bản ghi nào chưa
      let y = state.files.filter(
        (item) => item.formId === newFile.formId && !item.ignore //thêm điều kiện loại bỏ các item đã dc gắn nhãn ignore (ignore bao gồm tất cả các biểu mẫu ko dc set macdinh=true và chưa có bản ghi emr nào)
      );
      // let x = y.find((f) => !!f["nbHoSoBaId"]);
      // if (y.length && !x) {
      //   message.warning("Vui lòng bấm lưu tạo bản ghi biểu mẫu trước khi thêm!");
      //   return;
      // }
      // //
      const onCreate = (recordId) => {
        if (t) {
          if (y.find((item) => !item.nbHoSoBaId)) {
            newFile = y.find((item) => !item.nbHoSoBaId);
            newFile.soPhieu = recordId;
            newKey = newFile.key;
            setState({
              files: [...state.files],
            });
          } else {
            newFile.soPhieu = recordId;
            setState({
              files: [...state.files, newFile],
            });
          }
          setSelectedKeys([newKey + ""]);
          changeFile(newFile);
          // }
        }
      };
      if (!t.taoNhieuMau) {
        if (state.files.find((item) => item.formId === newFile.formId)) {
          message.warning("Đã tồn tại biểu mẫu " + t?.bieuMau?.ten);
          return;
        }
        onCreate();
      } else if (t.taoNhieuMau && t.bieuMau?.apiTieuChi) {
        if (refModalSelectCriteria.current) {
          refModalSelectCriteria.current.show(
            {
              apiTieuChi: t.bieuMau?.apiTieuChi,
              tenTieuChi: t.bieuMau?.tenTieuChi,
            },
            (data) => {
              onCreate(data);
            }
          );
        }
      } else {
        onCreate();
      }
    }
  };

  const handleSearch = (e) => {
    setState({
      searchValue: e.target.value,
    });
  };

  const onOK = (ok) => () => {
    if (ok) {
      setState({ show: false });
      if (refCallBack.current) refCallBack.current(state.value);
    } else setState({ show: false });
  };
  let width = 350;
  if (props.windowWidth <= 450) width = "100%";
  return (
    <MainDrawer
      size={"small"}
      placement="right"
      closable={false}
      visible={state.show}
      onClose={onOK(false)}
      getContainer={false}
      style={{ position: "absolute" }}
      bodyStyle={{ padding: 0 }}
      width={width}
    >
      <Main
        size={"small"}
        title={
          <CardTitle
            handleSearch={handleSearch}
            searchValue={state.searchValue}
            setSearchValue={(value) => {
              setState({
                searchValue: value,
              });
            }}
            handleChangeView={handleChangeView}
          />
        }
        bordered={false}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className={"document-name"}>{templateName}</div>

          <AddForm
            template={template}
            onAddFile={onAddFile}
            files={state.files}
          />

          <div ref={containRef} className={"forms-contain"}>
            <DirectoryTree
              multiple
              expandedKeys={state.expandedKeys}
              onSelect={selectItem}
              onExpand={setExpandedKeys}
              selectedKeys={state.selectedKeys}
            >
              {state.groupFiles.map((item, index) => {
                if (!item.sub) {
                  return (
                    <TreeNode
                      title={renderTitle(
                        1,
                        state.searchValue,
                        onHandleDelete,
                        item.title,
                        item
                      )}
                      key={item.key}
                      isLeaf
                    />
                  );
                }
                return (
                  <TreeNode
                    title={renderTitle(
                      1,
                      state.searchValue,
                      onHandleDelete,
                      item.title,
                      item
                    )}
                    key={item.key}
                  >
                    {item.sub.map((f) => (
                      <TreeNode
                        title={renderTitle(
                          2,
                          state.searchValue,
                          onHandleDelete,
                          f.title,
                          f
                        )}
                        key={f.key}
                        isLeaf
                      />
                    ))}
                  </TreeNode>
                );
              })}
            </DirectoryTree>
          </div>
        </div>
        <Button onClick={onOK(false)}>Đóng</Button>
      </Main>
      <ModalSelectCriteria ref={refModalSelectCriteria} />
    </MainDrawer>
  );
});

const mapDispatch = ({ documents: { deleteFile } }) => ({
  deleteFile,
});

export default connect(
  (state) => {
    return {
      tenTieuChi: state.files.file?.tenTieuChi,
      apiTieuChi: state.files.file?.apiTieuChi,
      template: state.documents.template,
      templateName: state.documents.templateName,
      patientDocument: state.patient.patientDocument,
      listFiles: state.documents.files,
      windowWidth: state.application.width,
    };
  },
  mapDispatch,
  null,
  { forwardRef: true }
)(FormList);
