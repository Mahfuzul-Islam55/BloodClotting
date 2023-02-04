import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import Login from './Login';

const ProtectRoute = (props) => {
    const {authenticate}=useSelector(state=>state.auth);
  return (
      authenticate?<Route path={props.path} component={props.component} exact={props.exact}/>:<Redirect to="/messenger/login"/>
  )
}

export default ProtectRoute