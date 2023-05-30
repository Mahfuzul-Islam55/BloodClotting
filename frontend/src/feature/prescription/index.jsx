import React, { useState } from "react";
import { useAlert } from "react-alert";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Pdf from "react-to-pdf";
export default function Prescription({ handleShow }) {
  const ref = React.createRef();
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );

  console.log(myInfo);

  const dispatch = useDispatch();
  const [state, setstate] = useState({
    userName: "",
    age: "",
    sex: "",
    education: "",
    text: "",
  });

  const inputHendle = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const prescribe = (e) => {
    const { userName, age, sex, education, text } = state;
    e.preventDefault();

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("age", age);
    formData.append("sex", sex);
    formData.append("education", education);
    formData.append("text", text);
    console.log(state);

    //dispatch(userRegister(formData));
  };

  return <div className="prescription">;sldfjas;dfj</div>;
}
