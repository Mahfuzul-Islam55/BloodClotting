import React, { useState } from "react";
import { useAlert } from "react-alert";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export default function Prescription({ handleShow }) {
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

  return (
    <div className="prescription">
      <div className="card">
        <div className="card-header">
          <h3>Prescription</h3>
          <div onClick={() => handleShow()} style={{ cursor: "pointer" }}>
            <AiFillCloseCircle />
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={prescribe}>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                onChange={inputHendle}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="User name"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="age"
                value={state.age}
                name="age"
                onChange={inputHendle}
                className="form-control"
                placeholder="Age"
                id="age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Sex</label>
              <input
                type="sex"
                name="sex"
                onChange={inputHendle}
                value={state.sex}
                className="form-control"
                placeholder="Sex"
                id="sex"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Education</label>
              <input
                type="education"
                name="education"
                onChange={inputHendle}
                value={state.education}
                className="form-control"
                placeholder="Education"
                id="Education"
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <textarea
                type="text"
                name="text"
                onChange={inputHendle}
                value={state.text}
                className="form-control"
                placeholder="Text"
                id="text"
              />
            </div>

            <div className="form-group">
              <input type="submit" value="prescribe" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
