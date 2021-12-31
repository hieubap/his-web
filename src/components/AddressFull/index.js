import React, { memo, useState, useEffect } from "react";
import DropdownList from "../DropdownList";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";

const AddressFull = (props) => {
  const {
    onChange,
    selectAddress,
    value,
    disabled,
    inputRef,
    placeholder,
    onBlur,
    className,
    styleInput = {},
    children,
    readOnly,
    onError,
  } = props;
  const {
    listXaPhuong = [],
    listTinhTp = [],
    listQuanHuyen = [],
  } = useSelector((state) => state.address);
  const { getAllData } = useDispatch().address;

  const [address, setAddress] = useState([]);
  const [clearTimeOutAffterRequest, setclearTimeOutAffterRequest] = useState();
  const [size] = useState(8);
  const getProvinces = (text) => {
    return listTinhTp.filter((province) => province["vietTat"] === text);
  };
  const convertAddress = (e) => {
    const output = e;
    onChange(output);
    let xaPhuongText = "";
    let quanHuyenText = "";
    let tinhThanhPhoText = "";
    let xaPhuong = "";
    let quanHuyen = "";
    let tinhThanhPho = "";
    let addressList = [];
    let provinces = [];
    let districts = [];
    let zones = [];

    const shortText = output.split(",") || [];
    if (output?.length > 6 || output?.indexOf(" ") >= 0) {
      switch (shortText.length) {
        case 1:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          if (xaPhuongText && xaPhuongText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  xaPhuong.indexOf(xaPhuongText) >= 0 ||
                  quanHuyen.indexOf(xaPhuongText) >= 0 ||
                  tinhThanhPho.indexOf(xaPhuongText) >= 0
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setAddress(addressList);
          }
          break;
        case 2:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          quanHuyenText = shortText[1]
            ? shortText[1].trim().toLowerCase().unsignText()
            : "";
          if (quanHuyenText && quanHuyenText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  (xaPhuong.indexOf(xaPhuongText) >= 0 ||
                    quanHuyen.indexOf(xaPhuongText) >= 0 ||
                    tinhThanhPho.indexOf(xaPhuongText) >= 0) &&
                  (xaPhuong.indexOf(quanHuyenText) >= 0 ||
                    quanHuyen.indexOf(quanHuyenText) >= 0 ||
                    tinhThanhPho.indexOf(quanHuyenText) >= 0)
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setAddress(addressList);
          }
          break;
        case 3:
          xaPhuongText = shortText[0]
            ? shortText[0].trim().toLowerCase().unsignText()
            : "";
          quanHuyenText = shortText[1]
            ? shortText[1].trim().toLowerCase().unsignText()
            : "";
          tinhThanhPhoText = shortText[2]
            ? shortText[2].trim().toLowerCase().unsignText()
            : "";
          if (quanHuyenText && quanHuyenText.length) {
            addressList = listXaPhuong
              .filter((item) => {
                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                quanHuyen = (item.quanHuyen.ten || "")
                  .toLowerCase()
                  .unsignText();
                tinhThanhPho = (item.tinhThanhPho.ten || "")
                  .toLowerCase()
                  .unsignText();
                return (
                  (xaPhuong.indexOf(xaPhuongText) >= 0 ||
                    quanHuyen.indexOf(xaPhuongText) >= 0 ||
                    tinhThanhPho.indexOf(xaPhuongText) >= 0) &&
                  (xaPhuong.indexOf(quanHuyenText) >= 0 ||
                    quanHuyen.indexOf(quanHuyenText) >= 0 ||
                    tinhThanhPho.indexOf(quanHuyenText) >= 0) &&
                  (xaPhuong.indexOf(tinhThanhPhoText) >= 0 ||
                    quanHuyen.indexOf(tinhThanhPhoText) >= 0 ||
                    tinhThanhPho.indexOf(tinhThanhPhoText) >= 0)
                );
              })
              .map((zone) => ({
                ...zone,
                displayText: `${zone.ten}, ${
                  zone.quanHuyen && (zone.quanHuyen.ten || "")
                }, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`,
              }));
            setAddress(addressList);
          }
          break;
        default:
          break;
      }
    } else {
      const short = output.match(/.{1,2}/g) || [];
      switch (short.length) {
        case 1:
          provinces = listTinhTp
            ?.filter((province) => province["vietTat"] === short[0])
            .map((item) => ({ ...item, displayText: item?.ten }));
          addressList = provinces;
          setAddress(addressList);
          break;
        case 2:
          provinces = getProvinces(short[1]);
          provinces.forEach((province) => {
            listQuanHuyen
              .filter((district) => district.tinhThanhPhoId === province.id)
              .filter((district) => district["vietTat"] === short[0])
              .forEach((district) => {
                districts.push({ ...district, province });
              });
          });
          addressList = districts.map((item) => ({
            ...item,
            displayText: `${item?.ten || ""}, ${item?.tinhThanhPho?.ten || ""}`,
          }));
          setAddress(addressList);
          break;
        case 3:
          provinces = getProvinces(short[2]);
          provinces.forEach((province) => {
            listQuanHuyen
              .filter(
                (district) =>
                  district.tinhThanhPhoId === province.id &&
                  district["vietTat"] === short[1]
              )
              .forEach((district) => {
                zones = listXaPhuong
                  .filter(
                    (zone) =>
                      zone?.vietTat === short[0] &&
                      district?.id === zone?.quanHuyen?.id
                  )
                  .map((option) => ({
                    ...option,
                    displayText: `${option?.ten}, ${
                      option?.quanHuyen?.ten || ""
                    }, ${option?.tinhThanhPho?.ten || ""}`,
                  }));
                setAddress(zones);
              });
          });
          break;
        default:
          break;
      }
    }
    if (output && !addressList?.length && !zones.length) {
      onError && onError(output, addressList);
    }
  };

  const getSelectedAddress = (item) => {
    if (item) {
      onChange(`${item.displayText}`);
      selectAddress(item);
      setAddress([]);
    }
  };

  const closeAddressDropdown = () => {
    setAddress([]);
  };
  const convert = (e) => {
    let value = e.target.value;
    onChange(value);
    if (clearTimeOutAffterRequest) {
      try {
        clearTimeout(clearTimeOutAffterRequest);
      } catch (error) {}
    }
    let data = setTimeout(
      (value) => {
        convertAddress(value);
      },
      300,
      value
    );
    setclearTimeOutAffterRequest(data);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Main className="input-content">
      <input
        className={`form-control ${disabled ? "disabled" : ""} ${className}`}
        onChange={convert}
        value={value}
        disabled={disabled}
        ref={inputRef}
        placeholder={placeholder ? placeholder : "Nhập địa chỉ"}
        onBlur={onBlur}
        style={styleInput}
        readOnly={readOnly}
      />
      {address.length > 0 && (
        <DropdownList
          size={size}
          onClick={getSelectedAddress}
          closeDropList={closeAddressDropdown}
          listData={address}
        />
      )}
      {children}
    </Main>
  );
};

export default memo(AddressFull);
