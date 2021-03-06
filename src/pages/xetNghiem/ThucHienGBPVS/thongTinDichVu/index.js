import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Collapse, Form } from "antd";
import { Main, Header, Content } from "./styled";
import IcEx from "assets/images/xetNghiem/icEx.svg";
import IcArrow from "assets/images/xetNghiem/icArrow.svg";
import ThongTinChung from "../../chiTietDichVu/thongTinChung";
import FormContent from "./components/formContent";
import KetLuan from "./components/ketLuan";
import NhomChiSoCon from "./components/nhomChiSoCon";
import Select from "components/Select";
import { TRANG_THAI, SERVICE_STATUS } from "../../configs";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import printProvider from "data-access/print-provider";

const { Panel } = Collapse;

const ThongTinDichVu = ({ layerId, infoDichVu }) => {
  const {
    mauKetQuaXN: { listDataTongHop: listMauKetQuaXN },
    maMay: { listDataTongHop },
    utils: { listphanLoaiKetQuaXetNghiem },
  } = useSelector((state) => state);
  const {
    mauKetQuaXN: { getDataTongHop: getListMauKetQua },
    maMay: { getDataTongHop },
    xetNghiem: { updateKetQuaXetNghiem },
    layMauXN: { xacNhanlayMau },
    xnGiaiPhauBenhViSinh: {
      xacNhanKetQua,
      duyetKetQua,
      xacNhanTiepNhanMau,
      updateData,
      getTongHopDichVuXN,
      getPhieuKetQua,
    },
    utils: { getUtils },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const [openPopup, setOpenPopup] = useState(false);
  const [mauSelected, setMauSelected] = useState({});
  const [dsChiSoCon, setDsChiSoSon] = useState([]);
  const [form] = Form.useForm();
  const isDisabled = infoDichVu.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  const [status, setStatus] = useState(null);
  const refNotification = useRef(null);

  useEffect(() => {
    getListMauKetQua({ page: 0, size: 1000, active: true });
    getDataTongHop({ page: 0, size: 1000, active: true });
    getUtils({ name: "phanLoaiKetQuaXetNghiem" });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 27, //ESC
          onEvent: () => {
            setOpenPopup(false);
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (infoDichVu.trangThai) {
      setStatus(infoDichVu.trangThai);
    }
  }, [infoDichVu.trangThai]);

  const onClickViewDetail = () => {
    setOpenPopup(!openPopup);
  };

  const handleChangeMauKetQua = (value) => {
    const itemSelected = listMauKetQuaXN.find((item) => item.id === value);
    setMauSelected(itemSelected);
  };
  const handleClickSave = () => {
    form
      .validateFields()
      .then((values) => {
        values = { ...values, dsChiSoCon };
        if (infoDichVu.id) {
          updateKetQuaXetNghiem([{ id: infoDichVu.id, ...values }]).then(
            (s) => {
              updateData({ infoDichVu: s[0] });
            }
          );
        }
      })
      .catch((err) => {});
  };

  const showInfo = (data) => {
    setDsChiSoSon(data);
  };

  const listPanel = [
    {
      header: (
        <div>
          {infoDichVu.nhomDichVuCap2Id == 66
            ? "Vi sinh - k?? sinh tr??ng"
            : "Gi???i ph???u b???nh"}
        </div>
      ),
      content: <FormContent infoDichVu={infoDichVu} form={form} />,
      key: 1,
    },
    {
      header: (
        <div>
          K???t lu???n{" "}
          <Select
            placeholder="Ch???n m???u k???t qu???"
            data={listMauKetQuaXN}
            onChange={handleChangeMauKetQua}
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={isDisabled}
          />
        </div>
      ),
      content: (
        <>
          <KetLuan
            infoDichVu={infoDichVu}
            mauSelected={mauSelected}
            listDataTongHop={listDataTongHop}
            form={form}
            listphanLoaiKetQuaXetNghiem={listphanLoaiKetQuaXetNghiem}
          />
          <NhomChiSoCon
            infoDichVu={infoDichVu}
            showInfo={showInfo}
            listphanLoaiKetQuaXetNghiem={listphanLoaiKetQuaXetNghiem}
          />
        </>
      ),
      key: 2,
    },
  ];

  const handleSubmit = (status) => () => {
    xacNhanTiepNhanMau({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getTongHopDichVuXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }

      if (res.code == 7609) {
        refNotification.current &&
          refNotification.current.show({
            title: "Th??ng b??o",
            content: res.message,
            okText: "????ng",
            classNameOkText: "button-closel",
            showBtnOk: true,
          });
      }
    });
  };
  const handleCancel = (status) => () => {
    xacNhanlayMau({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getTongHopDichVuXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }
    });
  };
  const onResult = (status) => () => {
    xacNhanKetQua({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        const newInfoDichVu = {
          ...infoDichVu,
          trangThai: res?.data?.[0]?.trangThai,
        };
        updateData({ infoDichVu: newInfoDichVu });
        getTongHopDichVuXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
      }
    });
  };
  const onConfirmResult = (status) => () => {
    duyetKetQua({ data: [infoDichVu.id], status }).then((res) => {
      if (res?.code === 0) {
        if (res.code === 0) {
          const newInfoDichVu = {
            ...infoDichVu,
            trangThai: res?.data?.[0]?.trangThai,
          };
          updateData({ infoDichVu: newInfoDichVu });
          getTongHopDichVuXN({ nbDotDieuTriId: infoDichVu.nbDotDieuTriId });
        }
      }
    });
  };

  const onPriviewPdf = () => {
    getPhieuKetQua({}).then((s) => {
      let data = s.map((item) => {
        return item.file.pdf;
      });
      printProvider.printMergePdf(data);
    });
  };

  return (
    <Main>
      <Header>
        <div className="header-left">
          <div className="header-left__title">
            <div>
              D???ch v???:{" "}
              <span className="header-left__title--bold">
                {infoDichVu.maDichVu}
                {infoDichVu.tenDichVu && ` - ${infoDichVu.tenDichVu}`}
              </span>
            </div>
            <div>
              Ch???n ??o??n s?? b???:{" "}
              <span className="header-left__title--bold">
                {infoDichVu.cdSoBo}
              </span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="header-right__detail">
            Chi ti???t d???ch v??? <IcEx onClick={onClickViewDetail} />
            <IcArrow
              style={{ display: openPopup ? "block" : "none" }}
              className="header-right__arrow"
            />
            <div className="header-right__popup">
              <ThongTinChung
                style={{ display: openPopup ? "block" : "none" }}
                data={infoDichVu}
              />
            </div>
          </span>

          {TRANG_THAI["XAC_NHAN_TIEP_NHAN_MAU"].includes(status) && (
            <>
              {checkRole([ROLES["XET_NGHIEM"].TIEP_NHAN_MAU_GPB]) && (
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={handleSubmit("accept")}
                >
                  Ti???p nh???n m???u
                </Button>
              )}
              {checkRole([ROLES["XET_NGHIEM"].HUY_MAU_GPB]) && (
                <Button
                  className="header-right__btn"
                  onClick={handleCancel("cancel")}
                >
                  H???y m???u
                </Button>
              )}
            </>
          )}

          {TRANG_THAI["XAC_NHAN_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={handleSubmit("cancel")}
                >
                  H???y ti???p nh???n m???u
                </Button>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={onResult("accept")}
                >
                  C?? k???t qu???
                </Button>
              </>
            )}
          {TRANG_THAI["CO_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].DUYET_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn"
                  onClick={onResult("cancel")}
                >
                  H???y k???t qu???
                </Button>
                <Button
                  className="header-right__btn header-right__btn--blue"
                  onClick={onConfirmResult("accept")}
                >
                  Duy???t k???t qu???
                </Button>
              </>
            )}
          {TRANG_THAI["DUYET_KET_QUA"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].HUY_DUYET_KET_QUA_GPB]) && (
              <>
                <Button
                  className="header-right__btn"
                  onClick={onConfirmResult("cancel")}
                >
                  H???y duy???t k???t qu???
                </Button>
              </>
            )}
          {TRANG_THAI["IN"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].IN_KET_QUA_GPB]) && (
              <Button
                className="header-right__btn"
                onClick={() => onPriviewPdf()}
              >
                In k???t qu???
              </Button>
            )}
          {TRANG_THAI["SAVE"].includes(status) &&
            checkRole([ROLES["XET_NGHIEM"].NHAP_KET_QUA_GPB]) && (
              <Button
                className="header-right__btn"
                onClick={handleClickSave}
                disabled={!infoDichVu.id}
              >
                L??u l???i
              </Button>
            )}
        </div>
      </Header>
      <Content>
        <Collapse defaultActiveKey={["1", "2"]} expandIconPosition="right">
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </Collapse>
      </Content>
      <ModalNotification ref={refNotification} />
    </Main>
  );
};

export default ThongTinDichVu;
