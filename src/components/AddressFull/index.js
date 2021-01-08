import React, { memo, useState } from 'react';
import ZonesDB from 'utils/IndexedDB/Zones';
import DropdownList from '../DropdownList';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AddressFilter = (props, ref) => {
    const { onChange, selectAddress, value, disabled, inputRef, placeholder } = props;
    const [address, setAddress] = useState([]);
    const [size] = useState(6);

    const convertAddress = (e) => {
        const output = e.target.value;
        onChange(output);

        let xaPhuongText = "";
        let quanHuyenText = "";
        let tinhThanhPhoText = "";
        let xaPhuong = "";
        let quanHuyen = "";
        let tinhThanhPho = "";
        let addressList = [];

        const shortText = output.split(",") || [];
        const soNha = shortText[0] ? `${shortText[0]}, ` : "";
        switch (shortText.length) {
            case 2:
                xaPhuongText = shortText[1] ? shortText[1].trim().toLowerCase().unsignText() : "";
                if (xaPhuongText && xaPhuongText.length)
                    ZonesDB.getAll((data) => {
                        addressList = data && data.length && data.filter((item) => (item.ten || "").toLowerCase().unsignText().indexOf(xaPhuongText) >= 0).map(zone => ({
                            ...zone,
                            displayText: `${soNha}${zone.ten}, ${zone.quanHuyen && (zone.quanHuyen.ten || "")}, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`
                        }));
                        setAddress(addressList);
                    });
                break;
            case 3:
                xaPhuongText = shortText[1] ? shortText[1].trim().toLowerCase().unsignText() : "";
                quanHuyenText = shortText[2] ? shortText[2].trim().toLowerCase().unsignText() : "";
                if (quanHuyenText && quanHuyenText.length)
                    ZonesDB.getAll((data) => {
                        addressList = data && data.length && data
                            .filter((item) => {
                                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                                quanHuyen = (item.quanHuyen.ten || "").toLowerCase().unsignText();
                                return xaPhuong.indexOf(xaPhuongText) >= 0 && quanHuyen.indexOf(quanHuyenText) >= 0
                            })
                            .map(zone => ({
                                ...zone,
                                displayText: `${soNha}${zone.ten}, ${zone.quanHuyen && (zone.quanHuyen.ten || "")}, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`
                            }));
                        setAddress(addressList);
                    });
                break;
            case 4:
                xaPhuongText = shortText[1] ? shortText[1].trim().toLowerCase().unsignText() : "";
                quanHuyenText = shortText[2] ? shortText[2].trim().toLowerCase().unsignText() : "";
                tinhThanhPhoText = shortText[3] ? shortText[3].trim().toLowerCase().unsignText() : "";
                if (quanHuyenText && quanHuyenText.length)
                    ZonesDB.getAll((data) => {
                        addressList = data && data.length && data
                            .filter((item) => {
                                xaPhuong = (item.ten || "").toLowerCase().unsignText();
                                quanHuyen = (item.quanHuyen.ten || "").toLowerCase().unsignText();
                                tinhThanhPho = (item.tinhThanhPho.ten || "").toLowerCase().unsignText();
                                return xaPhuong.indexOf(xaPhuongText) >= 0 && quanHuyen.indexOf(quanHuyenText) >= 0 && tinhThanhPho.indexOf(tinhThanhPhoText) >= 0
                            })
                            .map(zone => ({
                                ...zone,
                                displayText: `${soNha}${zone.ten}, ${zone.quanHuyen && (zone.quanHuyen.ten || "")}, ${zone.tinhThanhPho && (zone.tinhThanhPho.ten || "")}`
                            }));
                        setAddress(addressList);
                    });
                break;
            default:
                break;
        }

    };

    const getSelectedAddress = item => {
        if (item) {
            onChange(`${item.displayText}, Việt  Nam`);
            selectAddress(item);
            setAddress([]);
        }
    };

    const closeAddressDropdown = () => {
        setAddress([]);
    }
    return (
        <div className="input-content">
            <input
                className="form-control"
                onChange={convertAddress}
                value={value}
                disabled={disabled}
                ref={inputRef}
                placeholder={placeholder ? placeholder : "Nhập địa chỉ"}
            />
            {address.length > 0 && <DropdownList size={size} onClick={getSelectedAddress} closeDropList={closeAddressDropdown} listData={address} />}
        </div>
    );
};

const withConnect = connect(
    null,
    null,
    null,
    { forwardRef: true },
);

export default compose(withConnect, memo)(AddressFilter);