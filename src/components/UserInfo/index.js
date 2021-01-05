import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Menu, Dropdown, Icon, Avatar } from "antd";
import { useTranslation } from "react-i18next";

const UserInfo = (props) => {
  const { t } = useTranslation();

  const onLogout = () => {
    props.onLogout();
  };
  return (
    <Main>
      <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <div className="btn-group">
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="p-0 btn"
                >
                  <Avatar
                    icon="user"
                    size="small"
                    size={42}
                    className="rounded-circle"
                  />
                </a>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right"
                >
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info">
                      <div className="menu-header-image opacity-2"></div>
                      <div className="menu-header-content text-left">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <Avatar
                                icon="user"
                                size="small"
                                size={42}
                                className="rounded-circle"
                              />
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {props.auth?.full_name}
                              </div>
                              <div className="widget-subheading opacity-8">
                                {props.auth?.username}
                              </div>
                            </div>
                            <div className="widget-content-right mr-2">
                              <button
                                className="btn-pill btn-shadow btn-shine btn btn-focus"
                                onClick={() => {
                                  onLogout();
                                }}
                              >
                                {t("user.logout")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget-content-left ml-3 header-user-info">
              <div className="widget-heading">{props.auth?.full_name}</div>
              <div className="widget-subheading">{props.auth?.username}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        overlayStyle={{ minWidth: 150 }}
      >
        <div className="user-info">
          
          <span className="user-name">{props.auth?.username}</span>
        </div>
      </Dropdown> */}
    </Main>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapState, ({ auth: { onLogout } }) => ({
  onLogout,
}))(UserInfo);
