import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import { Main } from "./styledModal";
import { Input } from "antd";
import { withTranslate } from 'react-redux-multilingual';
function index(props, ref) {
    const refCallback = useRef(null);
    const { translate, onChange, value, dataDepartment, onClick } = props;
    const [state, _setState] = useState({});
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };

    useImperativeHandle(ref, () => ({
        show: (data = {}, callback) => {
            setState({
                show: data.show,
            });
            refCallback.current = callback;
        },
    }));

    const handleClose = (data) => {
        if (data) {
            setState({
                show: false
            });
            if (refCallback.current) refCallback.current(data);
        }
    };
    return (
        <Main
            visible={state.show}
            onCancel={handleClose}
            title={"Chọn"}
            className="modal-department"
            footer={[
                <div onClick={handleClose}>{translate("no")}</div>
            ]}
        >
            <div className="body-department">
                <Input
                    onChange={onChange}
                    placeholder={translate("nhapvaotukhoa")}
                    value={value}
                />
                {dataDepartment && dataDepartment.length ? dataDepartment.map((item, index) => {
                    return (
                        <div
                            className="name"
                            key={index}
                            onClick={() => onClick(item)}
                        >{item.ten}</div>
                    )
                }) : null}
            </div>
        </Main>
    );
}

export default withTranslate(forwardRef(index));
