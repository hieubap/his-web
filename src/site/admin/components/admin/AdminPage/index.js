import React from "react";
import "./style.scss";
function index(props) {
  return (
    <div className={`admin-page ${props.className || ""}`} id={props.id || ""}>
      {props.subheader && props.header && (
        <div className="subheader">
          {Array.isArray(props.icon) ? (
            props.icon[0]
          ) : (
            <img
              src={props.icon}
              alt=" "
              onError={(i) => (i.target.style.display = "none")}
            />
          )}
          <h1 className="subheader-title">
            {props.header}
            {/* <i className={props.icon}></i>  */}
            {props.subheader && <small>{props.subheader}</small>}
          </h1>
        </div>
      )}
      {props.children}
    </div>
  );
}
export default index;
