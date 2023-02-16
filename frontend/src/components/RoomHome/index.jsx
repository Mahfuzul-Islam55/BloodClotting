import React, { useState ,useCallback} from "react";
import { useAlert } from "react-alert";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, Redirect} from 'react-router-dom'
import axios from "axios";

const Videocall=( handleRoom)=> {
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );

  //const Redirect= Redirect()
    const [value ,setValue]=useState();

    const handleJoinRoom =useCallback(()=>{
        //Redirect (`/room/${value}`)
        <Redirect to={`/room/${value}`} />
    },[Redirect,value])
   

      
  return (
    <div>
        <input 
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        type="text" 
        placeholder="Enter Room Code" 
        />
        <button onClick={handleJoinRoom}>Join </button>
        </div>
        )
}
export default Videocall;