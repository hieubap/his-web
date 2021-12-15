import React from 'react'
import './style.scss';
import { Pagination } from 'antd';
import { withTranslate } from 'react-redux-multilingual';
function index(props) {
    const { translate } = props;
    let className = 'pagination-table ';
    if (props.className)
        className += props.className
    // const selectItem = (item) => () => {
    //     if (props.selectItem) {
    //         props.selectItem(item);
    //     }
    // }
    let { page, size, total } = props;
    let current = page * size;
    let current1 = (Number(page) - 1) * size + 1;
    current = Math.min(current, total);
    // let listPage = []
    // let _totalPage = " "
    // if (Math.floor(total / size) == (total / size)) {
    //     _totalPage = Math.floor(total / size)
    // } else {
    //     _totalPage = 1 + Math.floor(total / size)
    // }
    // for (let i = page - 2; i < page + 2; i++) {
    //     if (i > 0 && i <= _totalPage)
    //         listPage.push(i);
    // }
    let totalPage = parseInt(total / size);
    if (totalPage * size < total)
        totalPage += 1;
    if (page > totalPage) {
        page = totalPage;
    }
    if (page <= 0)
        page = 1;
    const onClick = (type) => () => {
        if (props.onPageChange) {
            // if (type == 0) {
            //     if (page > 1)
            //         props.onPageChange(page - 1);
            // } else {
            //     if (page < totalPage)
            //         props.onPageChange(page + 1);
            // }
            props.onPageChange(type)
        }
    }
    return (
        <div className={className}>

            <label className='label'> {
                total > 0 ? `${current1} - ${current} ${translate("trong")} ${total}` : ''
            } </label>
            <span onClick={onClick(1)} className={'btn-pre ' + (Number(page) === 1 ? " not-allowed" : "")}>{translate("trangdau")}</span>
            {/* <img className='btn-pre' src={require("./images/left.png")} onClick={onClick(0)} /> */}
            {/* {
                listPage && listPage.length && listPage.map((option, index) => {
                    return (
                        <label key={index} className={"current-page " + (page == option ? "active" : "")} onClick={() => { props.onPageChange(option) }}>
                            {option}
                        </label>
                    )
                })
            } */}
            <Pagination simple onChange={props.onPageChange} pageSize={Number(size)} current={Number(page)} total={total} />
            <span onClick={onClick(totalPage)} className={'btn-next ' + (Number(page) === Number(totalPage) ? " not-allowed" : "")}>{translate("trangcuoi")}</span>
            {/* <img className='btn-next' src={require("./images/right.png")} onClick={onClick(1)} /> */}
        </div>
    )
}
export default withTranslate(index);