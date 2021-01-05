import React from 'react';
import { Table } from 'antd';
export default function index(props) {
    return (
        <Table
            pagination={false}
            {...props}
            className={props.className}
        />
    )
}
