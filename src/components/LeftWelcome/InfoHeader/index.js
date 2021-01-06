import React, {
    useState,
    useRef,
} from "react";
import { Col, Input, Select, DatePicker, Checkbox } from 'antd'
import { Main } from './styled';
import Camera from "components/Camera";

const { TextArea } = Input;
const { Option } = Select;

const Index = props => {
    const refCamera = useRef(null);
    const [state, _setState] = useState({
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    const { maHoSo } = state;
    const showModalCamera = () => {
        if (refCamera.current)
            refCamera.current.show({
                type: "anhDaiDien"
            });
    }
    const update = (value, variables) => {
        setState({
            [`${variables}`]: value
        })
    }
    const onSearchInfo = (value) => {

    }
    const onKeyDown = (event) => {
        if (event.nativeEvent.key === "Enter") {
            onSearchInfo(maHoSo);
        }
    }
    return (
        <Main>
            <Col sm={12} md={12} xl={6} xxl={4} className="avatar" onClick={() => showModalCamera()}>
                <Camera
                    ref={refCamera}
                    type={"anhDaiDien"}
                    title={"Upload avatar"}
                    className={"avatar__"}
                    image={require("assets/images/welcome/avatar.png")}
                    icon={require("assets/images/welcome/avatarIcon.png")}
                />
            </Col>
            <Col sm={12} md={12} xl={7} xxl={7} className="main__first">
                <div className="order"> Số thứ tự <span>0004</span></div>
                <div className="item__first">
                    <label>Mã người bệnh</label>
                    <Input
                        onChange={(e) => update(e.target.value, "maHoSo")}
                        className="item__first-input"
                        placeholder="Nhập mã người bệnh"
                        onBlur={(e) => onSearchInfo(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className="item__second">
                    <span>Đối tượng</span>
                    <Select className="item__second-select" defaultValue="Chọn đối tượng" >
                        <Option value="nam">nam</Option>
                    </Select>
                </div>
            </Col>
            <Col sm={12} md={12} xl={5} xxl={6} className="main__second">
                <div className="item">
                    <label>Ngày đăng kí</label>
                    <DatePicker
                        className="item__date"
                        format="DD/MM/YYYY - HH:mm:ss"
                    />
                </div>
                <div className="item">
                    <label>Mã hồ sơ</label>
                    <Input className="item__input" disabled />
                </div>
                <div className="item">
                    <label>Loại đối tượng</label>
                    <Select className="item__select" defaultValue="Bảo hiểm y tế">
                        <Option value="nam">nam</Option>
                    </Select>
                </div>
            </Col>
            <Col sm={12} md={12} xl={6} xxl={7} className="main__third">
                <div className="button">
                    <div className="button-first"> Thẻ khám bệnh</div>
                    <div className="button-second"> Tạo thẻ tạm</div>
                </div>
                <div className="text">
                    <label>Lý do đến khám</label>
                    <TextArea className="text-content"></TextArea>
                </div>
                <div className="box">
                    <Checkbox className="box-item">Là ưu tiên</Checkbox>
                    <Checkbox className="box-item">Là cấp cứu</Checkbox>
                </div>
            </Col>
        </Main>
    )
}
export default Index;