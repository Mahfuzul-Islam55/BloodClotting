import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
function Loading({ loadingMessage }) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 2000);
  }, []);
  return (
    <div>
      {isDisplayed && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <MagnifyingGlass
              visible={true}
              height="100"
              width="100"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              color: "#000000",
            }}
          >
            {loadingMessage}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Loading;
