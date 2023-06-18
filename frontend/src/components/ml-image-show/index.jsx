import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { MlSectionClose } from "../../store/actions/messengerAction";

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
      <h3 className="ml-image-title">Blood Clotting Image</h3>
      <img
        src={`data:image/png;base64,${mlData.img_data}`}
        className="ml-image"
        alt=""
      />
      <h3 className="ml-image-title"> CE Value: {multiplyCE} %</h3>
      <h3 className="ml-image-title">LAA Value: {multiplyLAA} %</h3>
    </div>
  );
}

export default MlImageShow;
