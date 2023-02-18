import React from "react";

const BloodTiff = ({ handleShowTiff, TiffSend }) => {
  return (
    <div>
      <div className="file hover-image">
        <input
          onChange={TiffSend}
          type="file"
          id="pic"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default BloodTiff;
