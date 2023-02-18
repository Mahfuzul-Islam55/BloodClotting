import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useHistory } from "react-router-dom";

export const VideoCall = () => {

  let { roomID } = useParams();
 
  const myMeeting = async (element) => {
    const appID = 1870304133;
    const serverSecret = "11f85f72f7de40846b07c9e245aa89bb";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "hasan"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      sharedLinks: [
        {
          name: "copy link",
          url: `http://localhost:3000/room/${roomID}`,
        },
      ],
      showScreenSharingButton: true,
    });
  };

  return (
    <div>
      <div ref={myMeeting}  />
    </div>
  );
};
