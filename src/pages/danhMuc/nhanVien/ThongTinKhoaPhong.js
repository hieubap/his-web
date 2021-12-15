import React, { useEffect, useRef, useState } from "react";
import {
    HeaderSearch,
    TableWrapper,
    Select,
} from "components";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Space, Image, message } from "antd";
import { openInNewTab } from "utils";
import { isEqual } from "lodash";

const ThongTinKhoaPhong = (props) => {
    const [data, setData] = useState([]);
    const [showRow, setShowRow] = useState(false);
    const [newRecord, setNewRecord] = useState({ khoaQuanLy: true });
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const refCurrentItem = useRef(null);
    useEffect(() => {
        const data = props.dataSource.map((item, index) => {
            return { ...item, action: item, stt: index + 1 };
        });
        setData(data);
        setCurrentItem(null);
        setCurrentIndex(-1);
    }, [props.dataSource, props.isRefresh]);

    const onNew = () => {
        setShowRow(!showRow);
    };

    const onSaveNew = () => {
        if(!newRecord?.khoa){
            return message.error("Vui lòng chọn khoa")
        }
        if (newRecord.dsPhong && newRecord.dsPhong.length > 0) {
            newRecord.dsPhong = newRecord.dsPhong.map(e => {
                return e.lists;
            })
        }

        if (newRecord.dsToaNha && newRecord.dsToaNha.length > 0) {
            newRecord.dsToaNha = newRecord.dsToaNha.map(e => {
                return e.lists;
            })
        }
        let newData = [newRecord, ...data];
        setData(newData);
        props.addInfo(newData);
        setShowRow(false);
    }

    const onSave = (item, list, index) => {
        debugger
        if (index === currentIndex) {
            data[index] = currentItem;
            setCurrentItem(null);
            setCurrentIndex(-1);
            setData(data);
            props.addInfo(data);
        }
    }

    const onChange = (key, selector) => (e) => {
        let value = "";
        if (e?.target) {
            if (e.target.hasOwnProperty("checked")) value = e.target.checked;
            else value = e.target.value;
        } else if (e?._d) value = e._d;
        else value = e;
        if (currentItem) {
            if (selector) {
                if (!currentItem[selector]) currentItem[selector] = {};
                currentItem[selector][key] = value;
            } else currentItem[key] = value;
        }
    };

    const onMultiChange = (selector, key) => (value, option) => {
        debugger
        if (currentItem) {
            if (selector) {
                if (!currentItem[selector]) {
                    currentItem[selector] = [];
                } else {
                    if ("khoa" === selector) {
                        currentItem[selector] = option?.lists;
                    } else {
                        currentItem[selector] = option?.map((i) => i.lists);
                    }
                }

                if (key && currentItem[key]) {
                    debugger
                    currentItem[key] = value;
                }
            }
            refCurrentItem.current = currentItem;
        }
    };
    const onChangeCheckbox = (value, name) => {
        newRecord.khoaQuanLy = value;
        setNewRecord(newRecord);
    };

    const onChangeSelect = (value, option, name) => {
        if ("khoa" === name) {
            newRecord.khoa = option ? option.lists : {};
        } else if ("dsToaNha" === name) {
            newRecord.dsToaNha = option ? option : [];
        } else if ("dsPhong" === name) {
            newRecord.dsPhong = option ? option : [];
        }
        setNewRecord(newRecord);
    };

    const onRow = (record = {}, index) => {
        return {
           onClick: (event) => {
                if(refCurrentItem.current && !isEqual(refCurrentItem.current, record)) {
                    setCurrentItem(JSON.parse(JSON.stringify(refCurrentItem.current)));
                } else {
                    setCurrentItem(JSON.parse(JSON.stringify(record)));
                }
                setCurrentIndex(index)
            },
        };
    };

    const onEdit = (record, element, index) => {
        setCurrentItem(JSON.parse(JSON.stringify(record)));
        setCurrentIndex(index);
    };

    const onDelete = (item) => {
        let o = data.filter(e => e.action !== item);
        setData(o);
        let dsKhoaPhong = o.map(e => e.action);
        props.addInfo(dsKhoaPhong);
    }

    const columns = [
        {
            title: <HeaderSearch title="STT" />,
            width: 40,
            dataIndex: "stt",
            key: "stt",
            align: "center",
        },

        {
            title: (
                <HeaderSearch
                    title="Khoa"
                    sort_key="khoa"
                    searchSelect={showRow &&
                        <Select
                            placeholder="Chọn khoa"
                            data={props.khoa}
                            onChange={
                                (value, option) => {
                                    onChangeSelect(value, option, "khoa")
                                }
                            }
                        />
                    }
                />
            ),
            width: 193,
            dataIndex: "khoa",
            key: "khoa",
            render: (item, list, index) => {
                if (index === currentIndex) {
                    return (
                        <Select
                            data={props.khoa}
                            onChange={onMultiChange("khoa", "khoaId")}
                            style={{ width: "100%" }}
                            defaultValue={item && item.id}
                        />
                    );
                } else return item && item.ten;
            },
        },

        {
            title: (
                <HeaderSearch
                    title={(
                        <div
                            className="pointer"
                            onClick={() => openInNewTab("/danh-muc/toa-nha")}
                        >
                            Nhà
                        </div>
                    )}
                    sort_key="nha"
                    searchSelect={showRow &&
                        <Select
                            mode="multiple"
                            placeholder="Chọn nhà"
                            data={props.toaNha}
                            onChange={
                                (value, option) => {
                                    onChangeSelect(value, option, "dsToaNha")
                                }
                            }
                        />
                    }
                />
            ),
            width: 208,
            dataIndex: "dsToaNha",
            key: "dsToaNha",
            render: (item, list, index) => {
                if (index === currentIndex) {
                    return (
                        <Select
                            mode="multiple"
                            data={props.toaNha}
                            onChange={onMultiChange("dsToaNha")}
                            defaultValue={
                                item && item.map((e) => e.id)
                            }
                        />
                    )
                } else
                    return item && item.length > 0 && item.map((e) => e.ten && e.ten.length > 0 && e.ten).join(",")
            },
        },

        {
            title: (
                <HeaderSearch
                    title={(
                        <div
                            className="pointer"
                            onClick={() => openInNewTab("/danh-muc/phong")}
                        >
                            Phòng
                        </div>
                    )}
                    sort_key="phong"
                    searchSelect={showRow &&
                        <Select
                            mode="multiple"
                            placeholder="Chọn phòng"
                            data={props.phong}
                            onChange={
                                (value, option) => {
                                    onChangeSelect(value, option, "dsPhong")
                                }
                            }
                        />
                    }
                />
            ),
            width: 204,
            dataIndex: "dsPhong",
            key: "dsPhong",
            render: (item, list, index) => {
                if (index === currentIndex) {
                    return (
                        <Select
                            mode="multiple"
                            data={props.phong}
                            onChange={onMultiChange("dsPhong")}
                            defaultValue={
                                item && item.map((e) => e.id)
                            }
                        />
                    )
                }
                return item && item.length > 0 && item.map((e) => e.ten && e.ten.length > 0 && e.ten).join(",")
            },
        },
        {
            title: (
                <HeaderSearch
                    title="Khoa quản lý"
                    searchSelect={showRow &&
                        <Checkbox
                            defaultChecked="true"
                            onChange={(e) => {
                                onChangeCheckbox(e.target.value, "khoaQuanLy");
                            }}
                        />
                    }
                />
            ),
            width: 104,
            dataIndex: "khoaQuanLy",
            key: "khoaQuanLy",
            align: "center",
            render: (item, list, index) => {
                if (index === currentIndex) {
                    return (
                        <Checkbox defaultChecked={item} onChange={onChange("khoaQuanLy")} />
                    );
                } else return <Checkbox checked={item} />;
            },
        },

        {
            title: (
                <HeaderSearch
                    title="Actions"
                    searchSelect={showRow &&
                        <Image
                            preview={false}
                            src={require("assets/images/his-core/iconTick.png")}
                            onClick={onSaveNew}
                        />
                    }
                />
            ),
            width: 104,
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (item, element, index) => {
                const isEdit = index === currentIndex;
                return isEdit ?
                    (
                        <Space>
                            <Image preview={false} src={require("assets/images/his-core/iconTick.png")} onClick={() => { onSave(item, element, index) }} />
                            <Image preview={false} src={require("assets/images/his-core/iconDelete.png")} onClick={() => { onDelete(item) }} />
                        </Space>
                    )
                    :
                    (
                        <Space>
                            <Image preview={false} src={require("assets/images/his-core/iconEdit.png")} onClick={() => { onEdit(item, element, index) }} />
                            <Image preview={false} src={require("assets/images/his-core/iconDelete.png")} onClick={() => { onDelete(item) }} />
                        </Space>
                    )
            },

        }
    ];

    return (
        <div className="main-info">

            <div className="title-info">Thêm khoa phòng
                <button className="right-info" onClick={onNew}>+ Thêm</button>
            </div>
            <div className="table-info">
                <TableWrapper
                    columns={columns}
                    dataSource={data}
                    onRow={onRow}
                >
                </TableWrapper>
            </div>


        </div>


    )

}
export default ThongTinKhoaPhong;