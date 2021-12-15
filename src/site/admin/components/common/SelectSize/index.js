import React from 'react'
import './style.scss';
import { Dropdown, Menu } from 'antd';
import { withTranslate } from 'react-redux-multilingual';

function index(props) {
    const { translate } = props;
    let className = 'select-data-size ';
    if (props.className)
        className += props.className
    const selectItem = (item) => () => {
        if (props.selectItem) {
            props.selectItem(item);
        }
    }
    return (
        <div className={className}>
            <label className='label'>{props.label || translate("sohanghienthi")} </label>
            <Dropdown overlay={<Menu>
                {
                    (props.options || [10, 20, 50, 100]).map((item, key) => {
                        return <Menu.Item key={key} >
                            <a onClick={selectItem(item)}>
                                {item}</a>
                        </Menu.Item>

                    })
                }
            </Menu>}>
                <label className="value" onClick={e => e.preventDefault()}>
                    {props.value} <img src={require("./images/ic-dropdown.png")} />
                </label>
            </Dropdown>
        </div>
    )
}
export default withTranslate(index);