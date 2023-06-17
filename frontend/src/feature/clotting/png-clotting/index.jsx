import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const BloodPng = ({ handleShowPng }) => {
  const { StainImage, mlDataSendSuccess } = useSelector(
    (state) => state.messenger
  );

  return (
    <div>
      <div
        onClick={handleShowPng}
        style={{ cursor: "pointer", overflow: "hidden" }}
      >
        <AiFillCloseCircle />
      </div>
      <h3 className="png-title">Stain Image</h3>
      <img
        src={`data:image/png;base64,${StainImage.img_h}`}
        className="png-clotting"
        alt=""
      />

      <img
        src={`data:image/png;base64,${StainImage.img_e}`}
        className="png-clotting"
        alt=""
      />

      <img
        src={`data:image/png;base64,${StainImage.img_d}`}
        className="png-clotting"
        alt=""
      />

      <img
        src={`data:image/png;base64,${StainImage.img_z}`}
        className="png-clotting"
        alt=""
      />
    </div>
  );
};

export default BloodPng;
