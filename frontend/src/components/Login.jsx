import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {userLogin} from '../store/actions/authAction';  
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authTypes';

function Login({history}) {

    const alert=useAlert();
    const {loading,successMessage,error,myInfo,authenticate}=useSelector(state=>state.auth);

    const dispatch=useDispatch();

    const [state,setState]=useState({
        email:'',
        password:''
    });

    const inputHandler=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const login=(e)=>{
        e.preventDefault(); 
        dispatch(userLogin(state));
    }

    useEffect(()=>{

        if(authenticate){
            history.push('/');
        }

        if(successMessage){
             alert.success(successMessage);
             dispatch({type:SUCCESS_MESSAGE_CLEAR})
        }

        if(error){
            error.map(err=>alert.error(err));
            dispatch({type:ERROR_CLEAR})
        }
    },[successMessage,error])

    
    return (
       <div className="login">
           <div className="card">
               <div className="card-header">
                   <h3>Login</h3>
               </div>
               <div className="card-body">
                   <form onSubmit={login}>
                   <div className="form-group">
                           <label htmlFor="email" >Email</label>
                           <input onChange={inputHandler} value={state.email}type="email" placeholder="Email" className="form-control" id="email" name="email"/>
                       </div>
                       <div className="form-group">
                           <label htmlFor="password" >Password</label>
                           <input onChange={inputHandler} value={state.password} type="password" placeholder="Password" className="form-control" id="password"  name="password"/>
                       </div>
                       <div className="form-group">
                           <input type="submit" value="Login" id='login' className='btn'/>
                       </div>
                       <div className="form-group">
                           <span><Link to="/messenger/register">Register Your Account</Link></span>
                       </div>
                   </form>
               </div>
           </div>
       </div>
    )
}

export default Login
