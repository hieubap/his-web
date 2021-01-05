import React, { useState } from 'react';
import T from 'prop-types';
import { Modal, Form, InputNumber } from 'antd';
import { formItemLayout, tailFormItemLayout } from "components/constanst";
import { connect } from "react-redux";
import { convertArray } from 'utils';
const ModalCustom = (props) => {
  
    const {  updateComponents, component } = props;
    const [visible, setVisible] = useState(true);
    const [rows, setRows] = useState([]);
    
    const [cols, setCols] = useState([]);
   
    
    const handleOk = e => {
        setVisible(false);
        updateComponents({
            ...component,
            props: {
                ...component.props,
                rows,
                cols
            }
        });
    };
    const handleCancel = e => {

        setVisible(false)
    };
    const changeRows = (e) => {
        
        const prop = 'height';
        const value = '';
     
        setRows(convertArray( e, prop, value))
        
    };
    const changeCols = (e) => {
        
        const prop = 'width';
        const value = 100;
       
        setCols( convertArray( e, prop, value))
       
    };
    return (
        <Modal
            title="Add rows and cols"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form {...formItemLayout}>
                <Form.Item
                    {...tailFormItemLayout}
                    label={"Number of rows"}
                    className={"props-form-item"}
                >

                    <InputNumber type="number" size={"small"}  onChange={changeRows} />
                </Form.Item>
                <Form.Item
                    {...tailFormItemLayout}
                    label={"Number of cols"}
                    className={"props-form-item"}
                >
                    <InputNumber type="number" size={"small"}  onChange={changeCols} />
                </Form.Item>
            </Form>
        </Modal>
    )
};
ModalCustom.defaultProps = {
    component: {},
    updateComponents: () => { },
};

ModalCustom.propTypes = {
    component: T.shape({}),
    updateComponents: T.func
};

const mapState = (state) => ({
    files: state.files,
    config: state.config
});
const mapDispatch = ({ config: { updateComponents, focusComponent } }) => ({ updateComponents, focusComponent });

export default connect(mapState, mapDispatch)(ModalCustom);


