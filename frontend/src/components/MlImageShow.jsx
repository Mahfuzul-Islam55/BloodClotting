import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { MlSectionClose } from "../store/actions/messengerAction";
function MlImageShow({ mlData }) {
  const multiplyCE = Math.floor(mlData.CE * 100);
  const multiplyLAA = Math.ceil(mlData.LAA * 100);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(MlSectionClose());
  };
  return (
    <div>
      <div onClick={handleClose} style={{ cursor: "pointer" }}>
        <AiFillCloseCircle />
      </div>
      <h3
        style={{
          display: "flex",
          color: "#000000",
          justifyContent: "center",
          fontSize: "25px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Blood Clotting Image
      </h3>
      <img
        src={`data:image/png;base64,${mlData.img_data}`}
        style={{
          display: "block",
          width: "75%",
          height: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
        alt=""
      />
      <h3
        style={{
          display: "flex",
          color: "#000000",
          justifyContent: "center",
          fontSize: "20px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        {" "}
        CE Value: {multiplyCE} %
      </h3>
      <h3
        style={{
          display: "flex",
          color: "#000000",
          justifyContent: "center",
          fontSize: "20px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        LAA Value: {multiplyLAA} %
      </h3>
    </div>
  );
}

export default MlImageShow;
