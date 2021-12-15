import React from 'react';
import './style.scss'
function index(props) {
    return (
        <div className="container__input">
            <div className="header">
                <div className="title">{props.title}</div>
            </div>
        </div>
    );
}

export default index;