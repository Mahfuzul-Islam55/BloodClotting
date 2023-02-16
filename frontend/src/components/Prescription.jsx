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

  return (
    <div className="prescription">
      <div
        ref={ref}
        style={{
          borderRadius: "5px",
          backgroundColor: "#f2f2f2",
          padding: "20px",
        }}
      >
        <div className="card-header">
          <h3>Prescription</h3>
          <div onClick={() => handleShow()} style={{ cursor: "pointer" }}>
            <AiFillCloseCircle />
          </div>
        </div>
        <label for="fname">First Name</label>
        <input
          style={{
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name.."
        />

        <label for="lname">Last Name</label>
        <input
          style={{
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name.."
        />
        <div className="form-group">
          <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => (
              <button onClick={toPdf}>
                <input
                  type="submit"
                  value="Send Prescription"
                  className="btn"
                />
              </button>
            )}
          </Pdf>
        </div>
      </div>
    </div>
  );
}
