import React from "react";
import "./style.scss";
import { connect, useDispatch } from "react-redux";
import authAction from "@actions/auth";
import actionUsers from "@actions/users";
import actionIntl from "@actions/intl";
import ModalChangePass from "../../../containers/userinfo/modalChangePass";
import { IntlActions, withTranslate } from 'react-redux-multilingual';
import dataCacheProvider from '@data-access/datacache-provider';
import snackbar from "../../../../../utils/snackbar-utils";
import { Popover, Radio } from "antd";
import crosstab from 'crosstab';

function index(props) {
    const { translate } = props;
    const dispatch = useDispatch();
    const onUserInfo = () => {
    }
    const showModalChangePassword = () => {
        props.updateData({
            showChangePass: true,
        })
    }
    const closeModal = () => {
        props.updateData({
            showChangePass: false,
            id: "",
            password: "",
            newPassword: "",
            changePassword: ""
        })
    }
    const changeIntl = (intl) => {
        dataCacheProvider.save('', "INTL-UPDATE-DATA", intl);
        props.updateDataIntl({
            locale: intl
        });
        dispatch(IntlActions.setLocale(intl));
        snackbar.show(translate("tbchuyendoingonngu"), "success");
    }
    const content = (
        <div>
            <p><Radio
                checked={props.locale === "en"}
                value={"en"}
                onClick={(event) => {
                    changeIntl(event.target.value)
                }}>{translate("english")}</Radio></p>
            <p><Radio
                checked={props.locale === "vi"}
                value={"vi"}
                onClick={(event) => {
                    changeIntl(event.target.value)
                }}>{translate("vietnam")}</Radio></p>
        </div>
    );


    return (
        <header className="page-header" role="banner">
            <div className="page-logo">
                <a
                    href="#"
                    className="page-logo-link press-scale-down d-flex align-items-center position-relative"
                // data-toggle="modal"
                // data-target="#modal-shortcut"
                >
                    <img
                        src="/img/logo.png"
                        alt="iSofH"
                        aria-roledescription="logo"
                    />
                    <span className="page-logo-text mr-1">iSofH</span>
                    <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                    <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                </a>
            </div>
            <div className="hidden-md-down dropdown-icon-menu position-relative">
                <a
                    href="#"
                    className="header-btn btn js-waves-off"
                    data-action="toggle"
                    data-class="nav-function-hidden"
                    title="Hide Navigation"
                >
                    <i className="ni ni-menu"></i>
                </a>
                <ul>
                    <li>
                        <a
                            href="#"
                            className="btn js-waves-off"
                            data-action="toggle"
                            data-class="nav-function-minify"
                            title="Minify Navigation"
                        >
                            <i className="ni ni-minify-nav"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="btn js-waves-off"
                            data-action="toggle"
                            data-class="nav-function-fixed"
                            title="Lock Navigation"
                        >
                            <i className="ni ni-lock-nav"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="hidden-lg-up">
                <a
                    href="#"
                    className="header-btn btn press-scale-down waves-effect waves-themed"
                    data-action="toggle"
                    data-class="mobile-nav-on"
                >
                    <i className="ni ni-menu"></i>
                </a>
            </div>
            <div className="ml-auto d-flex">
                <Popover className="language-header" placement="bottomRight" title={translate("thaydoingonngu")} content={content} trigger="click">
                    <div className="intl-language">{props.locale === "vi" ? "Tiếng việt" : props.locale === "en" ? "English" : null}</div>
                </Popover>
                <div className="hidden-md-down">
                    <a
                        href="#"
                        className="header-icon"
                        data-toggle="modal"
                        data-target=".js-modal-settings"
                    >
                        <i className="fal fa-cog"></i>
                    </a>
                </div>
                <div>
                    <a
                        href="#"
                        data-toggle="dropdown"
                        title={(props.auth || {}).email}
                        className="header-icon d-flex align-items-center justify-content-center ml-2"
                    >
                        <img
                            src={props.auth && props.auth.donViLogo ? props.auth.donViLogo.absoluteFileUrl() : "/img/demo/avatars/avatar-admin.png"}
                            className="profile-image rounded-circle"
                            alt={(props.auth || {}).full_name}
                        />
                    </a>
                    <div className="dropdown-menu dropdown-menu-animated dropdown-lg">
                        <div className="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                            <div className="d-flex flex-row align-items-center mt-1 mb-1 color-white" style={{ cursor: "pointer" }} onClick={() => {
                                onUserInfo();
                            }}>
                                <span className="mr-2">
                                    <img
                                        src={props.auth && props.auth.donViLogo ? props.auth.donViLogo.absoluteFileUrl() : "/img/demo/avatars/avatar-admin.png"}
                                        className="rounded-circle profile-image"
                                        alt={(props.auth || {}).full_name}
                                    />
                                </span>
                                <div className="info-card-text">
                                    <div className="fs-lg text-truncate text-truncate-lg">
                                        {(props.auth || {}).full_name}
                                    </div>
                                    <span className="text-truncate text-truncate-md opacity-80">
                                        {(props.auth || {}).email}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-divider m-0"></div>
                        <a href="#" className="dropdown-item" data-action="app-reset">
                            {/* <span data-i18n="drpdwn.reset_layout">Reset Layout</span> */}
                            <span data-i18n="drpdwn.reset_layout">{translate("datlaibocuc")}</span>
                        </a>
                        <a
                            href="#"
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target=".js-modal-settings"
                        >
                            {/* <span data-i18n="drpdwn.settings">Settings</span> */}
                            <span data-i18n="drpdwn.settings">{translate("caidat")}</span>
                        </a>
                        <div className="dropdown-divider m-0"></div>
                        <a href="#" className="dropdown-item" data-action="app-fullscreen">
                            {/* <span data-i18n="drpdwn.fullscreen">Fullscreen</span> */}
                            <span data-i18n="drpdwn.fullscreen">{translate("toanmanhinh")}</span>
                            <i className="float-right text-muted fw-n">F11</i>
                        </a>
                        <a href="#" className="dropdown-item" data-action="app-print">
                            {/* <span data-i18n="drpdwn.print">Print</span> */}
                            <span data-i18n="drpdwn.print">{translate("in")}</span>
                            <i className="float-right text-muted fw-n">Ctrl + P</i>
                        </a>
                        <div className="dropdown-divider m-0"></div>
                        {
                            props.auth && props.auth.id ?
                                <a
                                    href="#"
                                    onClick={() => { showModalChangePassword() }}
                                    className="dropdown-item fw-500 pt-3 pb-3"
                                >
                                    <span data-i18n="drpdwn.page-logout">{translate("doimatkhau")}</span>
                                </a> : null
                        }
                        {
                            props.auth && props.auth.id ?
                                <a
                                    onClick={() => {
                                        localStorage.clear();
                                        props.updateDataAuth({
                                            auth: {}
                                        });
                                        crosstab && crosstab.broadcast('message', {
                                            event: "ivisitor_logout",
                                        })
                                        window.location.href = '/login';
                                    }}
                                    href="#"
                                    className="dropdown-item fw-500 pt-3 pb-3"
                                >
                                    <span data-i18n="drpdwn.page-logout">{translate("dangxuat")}</span>
                                </a> :
                                <a
                                    onClick={() => {
                                        localStorage.clear();
                                        props.updateDataAuth({
                                            auth: {}
                                        });
                                        window.location.href = '/login';
                                    }}
                                    href="#"
                                    className="dropdown-item fw-500 pt-3 pb-3"
                                >
                                    <span data-i18n="drpdwn.page-logout">{translate("dangnhap")}</span>
                                </a>
                        }
                    </div>
                </div>
            </div>
            {
                props.showChangePass ? <ModalChangePass onClose={closeModal} /> : null
            }
            {/* {state.changeLanguage && <ConfirmDialog title="Xác nhận" content={"Bạn có chắc chắn muốn chuyển đổi ngôn ngữ sang" + (props.locale === "vi" ? " tiếng anh?" : " tiếng việt?")} btnOk="Xác nhận" btnCancel="Hủy" cbFn={changeIntl.bind(this)} />} */}
        </header>
    );
}

export default connect(
    state => {
        return {
            auth: state.auth && state.auth.auth,
            locale: (state.Intl || {}).locale,
            showChangePass: state.users.showChangePass
        };
    },
    {
        onLogout: authAction.onLogout,
        updateDataAuth: authAction.updateData,
        updateData: actionUsers.updateData,
        updateDataIntl: actionIntl.updateData,
    }
)(withTranslate(index));
