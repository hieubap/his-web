import React from "react";
import { connect } from 'react-redux';

const Authorization = ({
  arrRole = [],
  children,
  auth: { authorities = [] }
}) => {
  const isAuth = authorities.some(item => arrRole.includes(item))
  if (!isAuth)
    return null
  return <>{children}</>
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
    }
  }
)(Authorization)
