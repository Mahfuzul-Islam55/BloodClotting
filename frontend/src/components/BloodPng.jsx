import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const BloodPng = ({ handleShowPng }) => {
  const { StainImage, mlDataSendSuccess } = useSelector(
    (state) => state.messenger
  );
  
  return (
    <div>
      <div style={{ cursor: "pointer",overflow:"hidden" }}>
        <AiFillCloseCircle />
      </div>
      <h3
        style={{
          display: "flex",
          color: "#fff",
          justifyContent: "center",
          fontSize: "25px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Stain Image
      </h3>
      <img
        src={`data:image/png;base64,${StainImage.img_h}`}
        style={{
          display: "block",
          width: "75%",
          height: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      />
      <img
        src={`data:image/png;base64,${StainImage.img_e}`}
        style={{
          display: "block",
          width: "75%",
          height: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      />

      <img
        src={`data:image/png;base64,${StainImage.img_d}`}
        style={{
          display: "block",
          width: "75%",
          height: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      />

      <img
        src={`data:image/png;base64,${StainImage.img_z}`}
        style={{
          display: "block",
          width: "75%",
          height: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};

export default BloodPng;
